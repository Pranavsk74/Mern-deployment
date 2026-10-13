const API = "/api/firms";
const $ = (id) => document.getElementById(id);
const form = $("firmForm");
const fields = ["name", "sector", "location", "investmentStage", "investmentRange", "website", "description"];

function readForm() {
  return Object.fromEntries(fields.map((field) => [field, $(field).value.trim()]));
}
function resetForm() {
  form.reset();
  $("firmId").value = "";
  $("saveBtn").textContent = "Add firm";
  $("formMessage").textContent = "";
}
$("resetBtn").addEventListener("click", resetForm);

async function loadFirms(search = "") {
  $("status").textContent = "Loading firms…";
  try {
    const url = search ? `${API}?search=${encodeURIComponent(search)}` : API;
    const response = await fetch(url);
    const firms = await response.json();
    if (!response.ok) throw new Error(firms.message || "Unable to load firms");
    $("firmCount").textContent = firms.length;
    $("status").textContent = firms.length ? `${firms.length} firm(s) found` : "No firms yet. Add one using the form above.";
    $("firmList").innerHTML = "";
    firms.forEach((firm) => {
      const card = document.createElement("article");
      card.className = "firm-card";
      const safe = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
      card.innerHTML = `
        <h3>${safe(firm.name)}</h3>
        <span class="tag">${safe(firm.sector)}</span><span class="tag">${safe(firm.investmentStage)}</span>
        <div class="meta">⌖ ${safe(firm.location)}<br>Investment range: ${safe(firm.investmentRange || "Not specified")}
        ${firm.website ? `<br>Website: <a href="${safe(firm.website)}" target="_blank" rel="noreferrer">${safe(firm.website)}</a>` : ""}</div>
        ${firm.description ? `<p class="description">${safe(firm.description)}</p>` : ""}
        <div class="card-actions"><button class="button secondary edit">Edit</button><button class="button delete">Delete</button></div>`;
      card.querySelector(".edit").addEventListener("click", () => {
        $("firmId").value = firm._id;
        fields.forEach((field) => $(field).value = firm[field] || (field === "investmentStage" ? "Growth" : ""));
        $("saveBtn").textContent = "Update firm";
        $("formMessage").textContent = "Editing selected firm.";
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      card.querySelector(".delete").addEventListener("click", async () => {
        if (!confirm(`Delete ${firm.name}?`)) return;
        const response = await fetch(`${API}/${firm._id}`, { method: "DELETE" });
        const result = await response.json();
        if (!response.ok) return alert(result.message || "Delete failed");
        loadFirms($("search").value.trim());
      });
      $("firmList").appendChild(card);
    });
  } catch (error) {
    $("status").textContent = `Error: ${error.message}. Check the server and MongoDB connection.`;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = $("firmId").value;
  const method = id ? "PUT" : "POST";
  const url = id ? `${API}/${id}` : API;
  $("saveBtn").disabled = true;
  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readForm())
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Save failed");
    $("formMessage").textContent = id ? "Firm updated." : "Firm added.";
    resetForm();
    await loadFirms($("search").value.trim());
  } catch (error) {
    $("formMessage").textContent = error.message;
  } finally {
    $("saveBtn").disabled = false;
  }
});
$("searchBtn").addEventListener("click", () => loadFirms($("search").value.trim()));
$("refreshBtn").addEventListener("click", () => loadFirms($("search").value.trim()));
$("search").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); loadFirms($("search").value.trim()); } });
loadFirms();

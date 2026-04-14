fetch("data/projects.json")
  .then((r) => r.json())
  .then((data) => {
    const tbody = document.getElementById("projectTable");
    if (!tbody) return;
    tbody.innerHTML = data
      .map(
        (p) => `
      <tr data-image="${p.image}">
        <td>${p.name}</td><td>${p.type}</td>
        <td><span class="status-badge">${p.status}</span></td>
        <td>${p.year}</td>
        <td>${p.preview}</td>
      </tr>`,
      )
      .join("");
    const prev = document.getElementById("projectImage");
    tbody.querySelectorAll("tr").forEach((row) => {
      row.addEventListener("click", () => {
        const s = row.dataset.image;
        if (!s || s === "None") {
          prev.style.display = "none";
          return;
        }
        if (prev.src.endsWith(s) && prev.style.display === "block") {
          prev.style.display = "none";
        } else {
          prev.src = s;
          prev.style.display = "block";
        }
      });
    });
  })
  .catch((e) => console.error(e));

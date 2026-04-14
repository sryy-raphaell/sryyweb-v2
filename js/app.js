const detailBox = document.getElementById("skillDetail");
const dTitle = document.getElementById("detailTitle");
const dTech = document.getElementById("detailTech");
const dStatus = document.getElementById("detailStatus");
const dProject = document.getElementById("detailProject");

function showDetail(k) {
  const d = skillsData[k];
  if (!d) return;
  dTitle.textContent = d.title;
  dTech.textContent = d.tech;
  dStatus.textContent = d.status;
  dProject.textContent = d.project;
  detailBox.classList.add("active");
  document.body.style.overflow = "hidden";
}
function hideDetail() {
  detailBox.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".skill-card").forEach((c) => {
c.addEventListener('click',()=>showDetail(c.dataset.skill));
  c.addEventListener("click", (e) => {
    e.stopPropagation();
    showDetail(c.dataset.skill);
  });
});
document.getElementById("detailClose").addEventListener("click", hideDetail);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideDetail();
});

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 80 + "ms";
  obs.observe(el);
});
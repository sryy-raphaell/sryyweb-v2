/* ── SKILLS ── */
const skillsData = {
  embedded: {
    title: "Embedded Systems & IoT Engineering",
    tech: "C, C++, Arduino, ESP32, STM32, MQTT, PCB Design",
    status: "Intermediate",
    project:
      "Smart Hydroponic Automation, Solar Monitoring System, Environmental Sensor Network",
  },
  software: {
    title: "Software Engineering & Web Development",
    tech: "HTML, CSS, JavaScript, React (Learning), Node.js, Git",
    status: "Beginner",
    project:
      "SRYY Portfolio Platform, Data Management System, REST API Project",
  },
  robotics: {
    title: "Robotics & Mechatronics Engineering",
    tech: "ROS (Planned), Servo Control, Motor Driver, CAD 3D Design",
    status: "Intermediate-Developing",
    project: "Autonomous Drone, Underwater Robot, Smart Actuator System",
  },
  game: {
    title: "Game Development & Interactive Technology",
    tech: "Unity, C#, Blender, Game Physics Logic",
    status: "Beginner-Developing",
    project: "Indie Exploration Game, Interactive Learning Simulation",
  },
  cyber: {
    title: "Cybersecurity & Network Engineering",
    tech: "Linux CLI, Basic Networking, Wireshark, Firewall Config",
    status: "Beginner",
    project:
      "Personal Secure Network Lab, Ethical Hacking Practice Environment",
  },
  product: {
    title: "Product Engineering / Tech Innovator",
    tech: "System Design Thinking, UI/UX Concept, Hardware Integration",
    status: "Concept & Research Stage",
    project: "Green Energy IoT Product, Smart Sustainable Device Line",
  },
};
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
  c.addEventListener("mouseenter", () => showDetail(c.dataset.skill));
  c.addEventListener("mouseleave", hideDetail);
  c.addEventListener("click", (e) => {
    e.stopPropagation();
    showDetail(c.dataset.skill);
  });
});
document.getElementById("detailClose").addEventListener("click", hideDetail);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") hideDetail();
});

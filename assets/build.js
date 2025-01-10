import { personalProjects } from "../assets/data";
// Render project cards
let projects = document.getElementById("projects");
let html = "";
for (let i = 0; i < personalProjects.length; i++) {
  let { name, description, icon, readMore, url } = personalProjects[i];

  html += `
    <div class="card">
      <img src='${icon}' alt="Project Thumbnail" style='object-fit:contain;background-color:#007bff;padding:20px 0px;'/>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-button">
          <a href='${url}'>Download</a>

 <a href="../projestDescription/index.html?id=${i}">Read More</a>;

        </div>
      </div>
    </div>
  `;
}

projects.innerHTML = html;

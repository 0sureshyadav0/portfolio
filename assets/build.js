// Render project cards
const buildPersonalProjects = (personalProjects) => {
  let projects = document.getElementById("projects");
  let html = "";
  for (let i = 0; i < personalProjects.length; i++) {
    let { name, description, icon, readMore, downloadUrl } =
      personalProjects[i];

    html += `
    <div class="card">
      <img src='${icon}' alt="Project Thumbnail" style='object-fit:contain;background-color:#007bff;padding:20px 0px;'/>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-button">
          <a href='${downloadUrl}'>Download</a>
 <a href="../projestDescription/personlaProjectDesc.html?product=${
   i + 1
 }">Read More</a>;

        </div>
      </div>
    </div>
  `;
  }

  projects.innerHTML = html;
};
function getIndex(i) {
  console.log(i);
}

const buildUpcomingProjects = (upcomingProjects) => {
  let domupcomingProjects = document.getElementById("upcomingProjects");
  let upcomingHtml = "";
  for (let i = 0; i < upcomingProjects.length; i++) {
    let { name, description, icon, readMore, downloadUrl } =
      upcomingProjects[i];

    upcomingHtml += `
    <div class="card">
      <img src='${icon}' alt="Project Thumbnail" style='object-fit:contain;background-color:#007bff;padding:20px 0px;'/>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-button">
          <a href='${downloadUrl}'>Download</a>

 <a href="#">Read More</a>;

        </div>
      </div>
    </div>
  `;
  }
  domupcomingProjects.innerHTML = upcomingHtml;
};

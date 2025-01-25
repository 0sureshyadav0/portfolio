// Render project cards
const buildPersonalProjects = (personalProjects) => {
  let projects = document.getElementById("projects");
  let html = "";
  for (let i = 0; i < personalProjects.length; i++) {
    let { name, description, icon, readMore, downloadUrl } =
      personalProjects[i];

    html += `
    <div class="card" data-aos="fade-up">
      <img src='${icon}' alt="Project Thumbnail" style='object-fit:contain;background-color:#007bff;padding:20px 0px;'/>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-button">
          <a href='./assets/apps/${name}.apk' download='${name}.apk'>Download</a>
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

const buildUpcomingProjects = (upcomingProjects) => {
  let domupcomingProjects = document.getElementById("upcomingProjects");
  let upcomingHtml = "";
  for (let i = 0; i < upcomingProjects.length; i++) {
    let { name, description, icon, readMore, downloadUrl } =
      upcomingProjects[i];

    upcomingHtml += `
    <div class="card" data-aos="fade-up">
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

const buildPackages = (packages) => {
  let packagesContainer = document.getElementById("packages");
  let Html = "";
  for (let i = 0; i < packages.length; i++) {
    let { name, description, icon, readMore, downloadUrl } = packages[i];

    Html += `
    <div class="card" data-aos="fade-up">
      <img src='${icon}' alt="Project Thumbnail" style='object-fit:contain;background-color:#007bff;'/>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-button">
  <a href="../projestDescription/packagesDesc.html?product=${
    i + 1
  }">Read More</a>;

        </div>
      </div>
    </div>
  `;
  }
  packagesContainer.innerHTML = Html;
};

// Render project cards - Hacker Terminal Design
const buildPersonalProjects = (personalProjects) => {
  let projects = document.getElementById("projects");
  if (!projects) return;
  
  let html = "";
  for (let i = 0; i < personalProjects.length; i++) {
    let { name, description, icon, readMore, downloadUrl } =
      personalProjects[i];

    html += `
    <div class="project-card" data-aos="fade-up" data-aos-delay="${i * 100}">
      <div class="card-image">
        <img src='${icon}' alt="${name} App Icon" loading="lazy" />
      </div>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-actions">
          ${
            i == 0
              ? `<a href='${downloadUrl}' class="card-btn"><span class="btn-icon">></span><span class="btn-text">download</span></a>`
              : `<a href="./assets/apps/${name}.apk" download="${name}.apk" class="card-btn"><span class="btn-icon">></span><span class="btn-text">download</span></a>`
          }
          <a href="../projestDescription/personlaProjectDesc.html?product=${
            i + 1
          }" class="card-btn"><span class="btn-icon">></span><span class="btn-text">read_more</span></a>
        </div>
      </div>
    </div>
  `;
  }
  projects.innerHTML = html;
};

const buildUpcomingProjects = (upcomingProjects) => {
  let domupcomingProjects = document.getElementById("upcomingProjects");
  if (!domupcomingProjects) return;
  
  let upcomingHtml = "";
  for (let i = 0; i < upcomingProjects.length; i++) {
    let { name, description, icon, readMore, downloadUrl } =
      upcomingProjects[i];

    upcomingHtml += `
    <div class="upcoming-card" data-aos="fade-up" data-aos-delay="${i * 100}">
      <div class="card-image">
        <img src='${icon}' alt="${name} App Icon" loading="lazy" />
      </div>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-actions">
          <a href='${downloadUrl}' class="card-btn card-btn-disabled"><span class="btn-icon">></span><span class="btn-text">coming_soon</span></a>
          <a href="#" class="card-btn card-btn-disabled"><span class="btn-icon">></span><span class="btn-text">read_more</span></a>
        </div>
      </div>
    </div>
  `;
  }
  domupcomingProjects.innerHTML = upcomingHtml;
};

const buildPackages = (packages) => {
  let packagesContainer = document.getElementById("packages");
  if (!packagesContainer) return;
  
  let Html = "";
  for (let i = 0; i < packages.length; i++) {
    let { name, description, icon, readMore, downloadUrl } = packages[i];

    Html += `
    <div class="package-card" data-aos="fade-up" data-aos-delay="${i * 100}">
      <div class="card-image">
        <img src='${icon}' alt="${name} Package Icon" loading="lazy" />
      </div>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-actions">
          <a href="../projestDescription/packagesDesc.html?product=${
            i + 1
          }" class="card-btn"><span class="btn-icon">></span><span class="btn-text">read_more</span></a>
        </div>
      </div>
    </div>
  `;
  }
  packagesContainer.innerHTML = Html;
};

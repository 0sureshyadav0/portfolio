const personalProjects = [
  {
    name: "Sangeet",
    description:
      "A music app that allows users to listen available songs on their device.",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/sangeet_0.0.1/blob/master/assets/images/icon.png?raw=true",
    downloadUrl:
      "https://www.mediafire.com/file/dobsb1afa1dm0ui/Sangeet.apk/file",
  },
  {
    name: "Todo",
    description:
      "A task tracker app that allows users to add and delete tasks to increase the productivity.",
    duration: "2024",
    icon: "https://github.com/0sureshyadav0/todo/blob/master/android/app/src/main/res/drawable/todoicon.jpeg?raw=true",
    tech: ["Flutter", "Dart"],
    downloadUrl: "https://www.mediafire.com/file/h6yxm234dgdu8ev/Todo.apk/file",
  },
  {
    name: "Mausam",
    description:
      "A weather app that provides users with current weather and forecast based on their current location.",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/mausam/blob/master/android/app/src/main/res/drawable/icon.png?raw=true",
    downloadUrl:
      "https://www.mediafire.com/file/baikeqv9988nw30/Mausam.apk/file",
  },
  {
    name: "Fly Bird",
    description:
      "A email generator app which uses AI to generate a random email based on user's subject.",
    duration: "2025",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/asstets/blob/main/icon.png?raw=true",

    // 'url': 'https://github.com/0sureshyadav0/mausam/tree/master',
    downloadUrl:
      "https://www.mediafire.com/file/jsdyuwvl08rppbb/Fly_Bird.apk/file",
  },
  {
    name: "TechVeda",
    description:
      "TechVeda is a app that offers guide for various programming languages, helping users learn and compare languages like Python, Java, Flutter, Dart and more in easy way through pdf.",
    duration: "2025",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/techVeda/blob/master/assets/images/techicon.png?raw=true",
    // 'url': 'https://github.com/0sureshyadav0/mausam/tree/master',
    downloadUrl:
      "https://www.mediafire.com/file/9sgk5blwypfnre4/TechVeda.apk/file",
  },
];

// Render project cards
let projects = document.getElementById("projects");
let html = "";
for (let i = 0; i < personalProjects.length; i++) {
  let { name, description, icon, readMore, downloadUrl } = personalProjects[i];

  html += `
    <div class="card">
      <img src='${icon}' alt="Project Thumbnail" style='object-fit:contain;background-color:#007bff;padding:20px 0px;'/>
      <div class="card-content">
        <h3 class="card-title">${name}</h3>
        <p class="card-description">${description}</p>
        <div class="card-button">
          <a href='${downloadUrl}'>Download</a>

 <a href="../projestDescription/index${i}.html">Read More</a>;

        </div>
      </div>
    </div>
  `;
}

projects.innerHTML = html;

// upcoming projects
const upcomingProjects = [
  {
    name: "Twitter Clone",
    description:
      "A twitter clone. Working on this project to get more clarity about how large scale software is being build.",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    // icon: "https://github.com/0sureshyadav0/sangeet_0.0.1/blob/master/assets/images/icon.png?raw=true",
    icon: "https://cdn-icons-png.flaticon.com/512/124/124021.png",
    downloadUrl: "#",
  },
];
let domupcomingProjects = document.getElementById("upcomingProjects");
let upcomingHtml = "";
for (let i = 0; i < upcomingProjects.length; i++) {
  let { name, description, icon, readMore, downloadUrl } = upcomingProjects[i];

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

// Example personal projects data
let personalProjects = [
  {
    name: "Sangeet ( Music App )",
    description:
      "A simple music app that allows users to play songs that is already on their devices.",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/sangeet_0.0.1/blob/master/assets/images/icon.png?raw=true",
    readMore:
      "https://raw.githubusercontent.com/0sureshyadav0/sangeet_0.0.1/master/README.md",
    url: "https://www.mediafire.com/file/dobsb1afa1dm0ui/Sangeet.apk/file",
  },
  {
    name: "Todo ( Task tracker App )",
    description:
      "A task tracker app that allows users to add, edit and delete tasks.",
    duration: "2024",
    icon: "https://github.com/0sureshyadav0/todo/blob/master/android/app/src/main/res/drawable/todoicon.jpeg?raw=true",
    tech: ["Flutter", "Dart"],
    readMore:
      "https://raw.githubusercontent.com/0sureshyadav0/todo/master/README.md",
    url: "https://www.mediafire.com/file/h6yxm234dgdu8ev/Todo.apk/file",
  },
  {
    name: "Mausam ( Weather App )",
    description:
      "A weather app that shows the current weather based on user's location.",
    duration: "2024",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/mausam/blob/master/android/app/src/main/res/drawable/icon.png?raw=true",
    readMore:
      "https://raw.githubusercontent.com/0sureshyadav0/mausam/master/README.md",
    url: "https://www.mediafire.com/file/baikeqv9988nw30/Mausam.apk/file",
  },
  {
    name: "Fly Bird ( Mail Generator App )",
    description:
      "A email generator app that generates random emails using AI  based on user's subject.",
    duration: "2025",
    tech: ["Flutter", "Dart"],
    icon: "https://github.com/0sureshyadav0/asstets/blob/main/icon.png?raw=true",
    readMore:
      "https://raw.githubusercontent.com/0sureshyadav0/mausam/master/README.md",
    url: "https://www.mediafire.com/file/jsdyuwvl08rppbb/Fly_Bird.apk/file",
  },
];

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

 <a href="../projestDescription/index.html">Read More</a>;

        </div>
      </div>
    </div>
  `;
}

projects.innerHTML = html;

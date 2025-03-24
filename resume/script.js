const _buildYears = (since, to = null) => {
  if (since) {
    let date = new Date(since);
    let now = new Date();
    if (to) {
      now = new Date(to);
    }
    let yearDiff = now.getFullYear() - date.getFullYear();
    let monthDiff = now.getMonth() - date.getMonth();

    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    if (yearDiff <= 0) {
      return "<span class='muted thin'> (" + monthDiff + "m" + ")</span>";
    }
    if (monthDiff <= 0) {
      return "<span class='muted thin'> (" + yearDiff + "y" + ")</span>";
    }
    return (
      "<span class='muted thin'> (" +
      yearDiff +
      "y " +
      monthDiff +
      "m" +
      ")</span>"
    );
  }
  return "";
};
const _buildScale = (scale) => {
  let scaleHtml = "<div class='scale'>";
  for (let s = 0; s < 5; s++) {
    if (scale > s) scaleHtml += "<span class='yes'></span>";
    else scaleHtml += "<span class='no'></span>";
  }
  scaleHtml += "</div>";
  return scaleHtml;
};

const _buildTags = (items) => {
  let tags = "";
  if (items.length > 0) {
    tags = "<ul class='tags'>";
    for (let i = 0; i < items.length; i++) {
      tags += "<li>" + items[i] + "</li>";
    }
    tags += "</ul><div class='clear'></div>";
  }
  return tags;
};

const _buildTagsBordered = (items) => {
  let tags = "";
  if (items.length > 0) {
    tags = "<ul class='tags bordered'>";
    for (let i = 0; i < items.length; i++) {
      tags +=
        "<li><i class='" +
        items[i].icon +
        " pr-5" +
        "'></i>" +
        items[i].title +
        "</li>";
    }
    tags += "</ul><div class='clear'></div>";
  }
  return tags;
};

const _buildList = (items) => {
  let tags =
    "<ul style='margin-top: 5px;padding-left: 15px;list-style-type: square'>";
  for (let i = 0; i < items.length; i++) {
    tags += "<li>" + items[i] + "</li>";
  }
  tags += "</ul>";
  return tags;
};

const buildSplash = (details) => {
  let { picture, name, designation } = details;
  let html = "<div>";
  if (picture !== undefined) {
    html += "<img alt='' src='" + picture.src + "'/>";
  }
  html += "<h1 class='upper white mt-10 center'>" + name + "</h1>";
  html += "<h3 class='white70 center'>" + designation + "</h3>";
  html += "</div>";
  let element = document.querySelector(".splash");
  element.innerHTML = html;
};

const getYears = (startDate) => {
  let now = new Date();
  let start = new Date(startDate);
  let MILLIS_TO_YEAR = 1000 * 60 * 60 * 24 * 365.25;
  return Math.floor((now - start) / MILLIS_TO_YEAR);
};
const buildTopHeader = (details) => {
  let element = document.querySelectorAll(".right-header");
  let picHtml = "";
  let { name, description, designation, startDate } = details;

  description = description.replaceAll("%expYears%", getYears(startDate));
  let html =
    "<table class='username'>" +
    "<tr>" +
    "<td>" +
    "<h2>" +
    name +
    "</h2>" +
    "<h4>" +
    designation +
    "</h4>" +
    "</td>" +
    picHtml +
    "</tr>" +
    "<tr>" +
    "<td>" +
    "<p class='justify'>" +
    description +
    "</p>" +
    "</td>" +
    "</tr>" +
    "</table>";
  for (let i = 0; i < element.length; i++) {
    element[i].innerHTML = html;
  }
};
const buildBottomHeader = (details) => {
  let element = document.querySelector(".left-header");
  let { picture, links } = details;
  let html = "<div class='p-10 flex'>";
  html += "<div class='stretch'>";
  for (let i = 0; i < links.length; i++) {
    let { icon, link, label, tooltip } = links[i];
    html +=
      "<a class='link-w-icon' title='" +
      tooltip +
      "' href='" +
      link +
      "'>" +
      "<i class='" +
      icon +
      "'></i>" +
      "<span>" +
      label +
      "</span>" +
      "</a> ";
  }
  html +=
    "</div>" +
    "<img class='avatar pull-right' alt='' src='" +
    picture.src +
    "'/>" +
    "</div>";
  element.innerHTML = html;
};
const buildSkills = (skills) => {
  let element = document.querySelector(".skill-set");
  let html = "<h2>Skills</h2>";
  for (let i = 0; i < skills.length; i++) {
    let { printBreak, icon, title, since, to, scale, tech, lib } = skills[i];
    if (printBreak === true) {
      html += "<div class='break extra-margin'></div>" + "<h2>Skills</h2>";
    }
    let techHtml = "";
    for (let x = 0; x < tech.length; x++) {
      techHtml += "<li>" + tech[x] + "</li>";
    }
    for (let x = 0; x < lib.length; x++) {
      techHtml += "<li class='o'>" + lib[x] + "</li>";
    }
    let iconHtml = !icon.startsWith("fa")
      ? icon
      : "<i class='" + icon + "'></i>";

    html +=
      "<table>" +
      "<tr>" +
      "<td class='icon'>" +
      iconHtml +
      "</td>" +
      "<td class='title'>" +
      title +
      _buildYears(since, to) +
      "</td>" +
      "<td class='progress'>" +
      _buildScale(scale) +
      "</td></tr>" +
      "<tr>" +
      "<td></td>" +
      "<td colspan='2' class='skills'>" +
      "<ul class='tags'>" +
      techHtml +
      "</ul>" +
      "</td></tr></table>";
  }
  element.innerHTML = html;
};

const buildLanguages = (languages) => {
  let element = document.querySelector(".languages");
  let html =
    "<div class='break extra-margin'></div><div></div>" + "<h2>Languages</h2>";
  for (let i = 0; i < languages.length; i++) {
    let { icon, name, scale, proficiency } = languages[i];
    html +=
      "<table>" +
      "<tr>" +
      "<td rowspan='2' class='text-icon'>" +
      icon +
      "</td>" +
      "<td class='title'>" +
      name +
      "</td>" +
      "<td class='progress'>" +
      _buildScale(scale) +
      "</td></tr>" +
      "<tr>" +
      "<td colspan='2' class='emphasis'>" +
      proficiency +
      "</td>" +
      "</tr></table>";
  }
  element.innerHTML = html;
};
const buildInterests = (interests) => {
  let element = document.querySelector(".interests");
  let html = "<h2>Interests</h2>";
  html +=
    "<table><tr><td>" + _buildTagsBordered(interests) + "</td></tr></table>";
  element.innerHTML = html;
};
const buildExperiences = (experiences) => {
  let element = document.querySelector(".experience");
  let html = "<h2>Experience</h2>";
  for (let i = 0; i < experiences.length; i++) {
    let { position, duration, company, tech, achievements } = experiences[i];
    html +=
      "<table>" +
      "<tr>" +
      "<td class='title'>" +
      position +
      "</td>" +
      "<td class='emphasis to-right'>" +
      duration +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan='2' class='description'>" +
      company +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan='2' class='grey'>" +
      _buildTags(tech) +
      _buildList(achievements) +
      "</td>" +
      "</tr></table>";
  }
  element.innerHTML = html;
};

const buildEducation = (education) => {
  let element = document.querySelector(".education");
  let html = "<h2>Education</h2>";
  for (let i = 0; i < education.length; i++) {
    let {
      printBreak,
      board,
      school,
      concentration,
      percentage,
      duration,
      achievements,
    } = education[i];
    if (printBreak === true) {
      html +=
        "<div class='break extra-margin container-inner'></div>" +
        "<h2>Education</h2>";
    }
    html +=
      "<table>" +
      "<tr>" +
      "<td colspan='2' class='title'>" +
      board +
      "</td>" +
      "</tr><tr>" +
      "<td colspan='2' class='description'>" +
      school +
      "</td>" +
      "</tr><tr>" +
      "<td colspan='2' class='emphasis'>" +
      concentration +
      "" +
      "<span class='pull-right'>" +
      percentage +
      "%</span></td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan='2' class='grey'>" +
      duration +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan='2' class='grey'>" +
      _buildList(achievements) +
      "</td>" +
      "</tr></table>";
  }
  element.innerHTML = html;
};

const buildPersonal = (personal) => {
  let element = document.querySelector(".personal");
  let html = "<h2>Personal</h2>";
  for (let i = 0; i < personal.length; i++) {
    let { icon, label, value } = personal[i];
    html +=
      "<table>" +
      "<tr>" +
      "<td rowspan='2' class='icon emphasis'><i class='" +
      icon +
      "'></i></td>" +
      "<td class='emphasis'>" +
      label +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td class='title'>" +
      value +
      "</td>" +
      "</tr></table>";
  }
  element.innerHTML = html;
};

const buildProjects = (projects, isNonPersonal = false) => {
  let selector = isNonPersonal ? ".company-projects" : ".personal-projects";
  let element = document.querySelector(selector);
  let html = isNonPersonal
    ? "<h2>Individual Projects</h2>"
    : "<h2>Open-Source Projects</h2>";
  for (let i = 0; i < projects.length; i++) {
    let { name, duration, description, tech, refs, team } = projects[i];
    let links = "";
    if (refs.length > 0) {
      links += "<div class='pull-right'>";
    }
    for (let r = 0; r < refs.length; r++) {
      let { tooltip, url, icon } = refs[r];
      links +=
        "<a target='_blank' class='icon-button' title='" +
        tooltip +
        "' href='" +
        url +
        "'>" +
        "<i class='" +
        icon +
        "'></i>" +
        "</a>";
    }
    if (refs.length > 0) {
      links += "</div>";
    }

    let teamHtml =
      team !== undefined
        ? "<tr>" +
          "<td class='emphasis'>" +
          "<i class='fa fa-users'></i> " +
          team.join(", ") +
          "</td>" +
          "</tr>"
        : "";
    html +=
      "<table>" +
      "<tr>" +
      "<td class='title'>" +
      name +
      "</td>" +
      "<td class='emphasis to-right'>" +
      duration +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td colspan='2' class='description'>" +
      description +
      "</td>" +
      "</tr>" +
      "<tr>" +
      "<td class='grey' colspan='2'>" +
      "<label class='pull-left'><i class='fa fa-code'></i>" +
      tech.join(", ") +
      "</label>" +
      links +
      "<div class='clear'></div> " +
      "</td>" +
      "</tr>" +
      teamHtml +
      "</table>";
  }
  element.innerHTML = html;
};

const buildFooter = (details) => {
  let element = document.querySelectorAll(".footer>.container-inner");
  let { sns, qrCode, updateDate } = details;
  let html = "<div class='pull-left'>";
  if (sns.length > 0) {
    html += "<h3>Find me on:</h3>" + "<ul class='social'>";
    for (let i = 0; i < sns.length; i++) {
      let { tooltip, link, icon } = sns[i];
      let cls = tooltip.replaceAll(" ", "-");
      html +=
        "<li>" +
        "<a class='" +
        cls +
        "' title='" +
        tooltip +
        "' target='_blank' href='" +
        link +
        "'>" +
        "<i class='" +
        icon +
        "'></i> " +
        "</a> " +
        "</li>";
    }
    html += "</ul>";
  }
  html +=
    "<div class='clear'></div>" +
    "<h6 class='mt-10 updated-date'>Last updated: " +
    new Date(updateDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }) +
    "</h6>" +
    "</div>";
  html += "<div class='pull-right'>";
  if (qrCode !== undefined) {
    html +=
      "<img class='qr' src='" + qrCode + "' alt='' style='height: 80px' />";
  }

  html += "</div><div class='clear'></div>";
  for (let i = 0; i < element.length; i++) {
    element[i].innerHTML = html;
  }
};

let isDark = false;

const themeChangeListener = () => {
  const matchPrefersDark = window.matchMedia("(prefers-color-scheme:dark)");
  if (matchPrefersDark.matches) {
    isDark = false;
    toggleTheme();
  }
  matchPrefersDark.addEventListener("change", (event) => {
    isDark = event.matches;
    toggleTheme();
  });
};

document.addEventListener("DOMContentLoaded", themeChangeListener);

const toggleTheme = () => {
  document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");
  isDark = !isDark;
};

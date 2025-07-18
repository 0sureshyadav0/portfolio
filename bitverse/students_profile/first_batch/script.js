const studentList = document.getElementById("student-list");

students.forEach((student) => {
  const card = document.createElement("div");
  card.className = "student-card";

  card.innerHTML = `
    <img src="${student.image}" alt="${student.name}" />
    <p class="student-name">${student.name}</p>
    <p class="student-stream">🎓 Stream: ${student.stream}</p>
    <p class="student-interest">💡 Interest: ${student.interest}</p>
    <p class="student-reason">🗣️ "${student.reason}"</p>
  `;

  studentList.appendChild(card);
});

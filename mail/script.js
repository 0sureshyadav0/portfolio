document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const subject = document.getElementById("subject").value;
  const message =
    "From" + name + ",\n" + document.getElementById("message").value;
  const toEmail = "sureshyadav.info.np@gmail.com";
  const response = await fetch("http://localhost:3000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ toEmail, subject, message }),
  });

  if (response.ok) {
    alert("Email sent successfully!");
  } else {
    alert("Failed to send email.");
  }
});

const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatToggleIcon = document.getElementById("chatToggleIcon");
const chatWindow = document.getElementById("chatWindow");
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Animate icon change smoothly
function changeIcon(newIcon, newTitle) {
  // Animate icon out
  chatToggleIcon.style.opacity = 0;
  chatToggleIcon.style.transform = "scale(0.3)";

  setTimeout(() => {
    chatToggleIcon.textContent = newIcon;
    chatToggleBtn.title = newTitle;
    // Animate icon in
    chatToggleIcon.style.opacity = 1;
    if (newTitle === "Open Chat") {
      chatToggleIcon.style.transform = "scale(1)";
    } else {
      chatToggleIcon.style.transform = "scale(0.8)";
    }
  }, 300);
}

// Toggle chat window visibility & update button icon/title with animation
chatToggleBtn.addEventListener("click", () => {
  const isOpen = chatWindow.classList.contains("open");

  if (isOpen) {
    chatWindow.classList.remove("open");
    chatToggleBtn.classList.remove("active");
    changeIcon("💬", "Open Chat");
  } else {
    chatWindow.classList.add("open");
    chatToggleBtn.classList.add("active");
    changeIcon("❌", "Close Chat");
    userInput.focus();
  }
});

// Append message to chat
function appendMessage(sender, message = "") {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

// Typewriter effect for bot reply
function showTypewriterReply(reply) {
  // Create container for image + message
  const botContainer = document.createElement("div");
  botContainer.style.display = "flex";
  botContainer.style.alignItems = "flex-start";
  botContainer.style.gap = "10px";
  botContainer.classList.add("message", "bot");

  // Create and append image
  const img = document.createElement("img");
  img.src = "./assets/images/circle_logo.png";
  // img.src =
  //   "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"; // A placeholder image

  // Replace with your asset image path
  img.alt = "Bot Avatar";
  img.style.width = "40px";
  img.style.height = "40px";
  img.style.borderRadius = "50%";
  img.style.flexShrink = "0";
  img.style.marginLeft = "0px";
  img.style.paddingLeft = "0px";

  botContainer.appendChild(img);

  // Create message element
  const msgElement = document.createElement("div");
  msgElement.style.flex = "1";
  msgElement.style.whiteSpace = "pre-wrap";
  botContainer.appendChild(msgElement);

  chatBox.appendChild(botContainer);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Typewriter effect
  let index = 0;
  function typeChar() {
    if (index < reply.length) {
      msgElement.textContent += reply.charAt(index);
      index++;
      chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(typeChar, 30);
    }
  }

  setTimeout(typeChar, 300);
}

// Keyword matching logic with max keyword overlap
function handleUserInput() {
  const input = userInput.value.trim();
  if (input === "") return;

  appendMessage("user", input);
  userInput.value = "";

  function getKeywords(text) {
    return text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 1);
  }

  const inputKeywords = getKeywords(input);

  let bestMatch = null;
  let maxOverlap = 0;

  faqChatData.forEach((faq) => {
    const faqKeywords = getKeywords(faq.question);
    const overlap = faqKeywords.filter((word) =>
      inputKeywords.includes(word)
    ).length;

    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      bestMatch = faq;
    }
  });

  const threshold = 1; // minimum keywords matched to reply
  const botReply =
    bestMatch && maxOverlap >= threshold
      ? bestMatch.answer
      : "Sorry, As a bot I don't have the answer to that. Please try asking something else or check our website for more information.";

  showTypewriterReply(botReply);
}

// Send message on button click or Enter press
sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserInput();
  }
});

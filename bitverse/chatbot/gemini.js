const GEMINI_API_KEY = "AIzaSyAhnZ9oCOlvsw-Dn8AaoFPFWO6H1POWN4U";

const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatToggleIcon = document.getElementById("chatToggleIcon");
const chatWindow = document.getElementById("chatWindow");
const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Cache the FAQ prompt context once since it never changes
const faqContext = faqChatData
  .map((faq, i) => `${i + 1}. Q: ${faq.question}\n   A: ${faq.answer}`)
  .join("\n\n");

function changeIcon(newIcon, newTitle) {
  chatToggleIcon.style.opacity = "0";
  chatToggleIcon.style.transform = "scale(0.3)";
  setTimeout(() => {
    chatToggleIcon.textContent = newIcon;
    chatToggleBtn.title = newTitle;
    chatToggleIcon.style.opacity = "1";
    chatToggleIcon.style.transform =
      newTitle === "Open Chat" ? "scale(1)" : "scale(0.8)";
  }, 300);
}

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

function appendMessage(sender, message = "") {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

function parseMarkdownToHTML(text) {
  // Simple conversion for **bold** and *italic*
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>"); // italic (optional)
}

function showTypewriterReply(reply) {
  const botContainer = document.createElement("div");
  botContainer.style.display = "flex";
  botContainer.style.alignItems = "flex-start";
  botContainer.style.gap = "10px";
  botContainer.classList.add("message", "bot");
  botContainer.style.marginLeft = "-25px";

  const img = document.createElement("img");
  img.src = "./assets/images/circle_logo.png";
  img.alt = "Bot Avatar";
  img.style.width = "40px";
  img.style.height = "40px";
  img.style.borderRadius = "50%";
  img.style.flexShrink = "0";

  const msgElement = document.createElement("div");
  msgElement.style.flex = "1";
  msgElement.style.whiteSpace = "pre-wrap";

  botContainer.appendChild(img);
  botContainer.appendChild(msgElement);
  chatBox.appendChild(botContainer);
  chatBox.scrollTop = chatBox.scrollHeight;

  let i = 0;

  function typeChar() {
    if (i < reply.length) {
      // Add characters one by one as text to avoid injecting raw HTML too early
      msgElement.textContent += reply.charAt(i);
      i++;
      chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(typeChar, 30);
    } else {
      // After typing completes, convert markdown to HTML
      msgElement.innerHTML = parseMarkdownToHTML(msgElement.textContent);
    }
  }

  setTimeout(typeChar, 300);
}

async function callGeminiFlashAPI(prompt) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": GEMINI_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errorData = null;
    try {
      errorData = await response.json();
    } catch {}
    throw new Error(errorData?.error?.message || "Network error");
  }

  return await response.json();
}

let isWaitingResponse = false; // prevent multiple calls

async function handleUserInput() {
  if (isWaitingResponse) return; // prevent spamming

  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";
  isWaitingResponse = true;
  sendBtn.disabled = true;

  showTypewriterReply("⏳ Thinking...");

  const prompt = `
You are a helpful chatbot. Use ONLY the information in these FAQs to answer the user's question.

FAQs:
${faqContext}

User question: "${input}"

Instructions:
- Provide a friendly, unique answer each time in your own words.
- Stay strictly within the FAQ information.
- If the question is outside the FAQ topics, respond exactly:
"I don't have knowledge about that. Please try asking something else from our services."
`;

  try {
    const result = await callGeminiFlashAPI(prompt);
    const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    const lastBotMsg = chatBox.querySelector(".message.bot:last-child");
    if (lastBotMsg) chatBox.removeChild(lastBotMsg);

    if (reply) {
      showTypewriterReply(reply);
    } else {
      showTypewriterReply("❌ No valid response received.");
    }
  } catch (error) {
    showTypewriterReply("❌ Error: " + error.message);
  } finally {
    isWaitingResponse = false;
    sendBtn.disabled = false;
  }
}

sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleUserInput();
  }
});

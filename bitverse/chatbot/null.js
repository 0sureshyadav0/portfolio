// const context = faqChatData
//   .map((faq, i) => `${i + 1}. Q: ${faq.question}\n   A: ${faq.answer}`)
//   .join("\n\n");

// async function fetchGeminiReply(userInput) {
//   const prompt = `
// You are an FAQ assistant for BitVerse.

// Only use the following FAQ data to answer user questions:

// ${context}

// User asked: "${userInput}"

// If the user's question is outside the scope of the FAQs, reply with:
// "I don’t have knowledge about that. Try asking something else."
//   `;

//   try {
//     const response = await fetch("/api/gemini", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt }),
//     });

//     const data = await response.json();
//     return (
//       data.reply ||
//       "I don’t have knowledge about that. Try asking something else."
//     );
//   } catch (error) {
//     console.error("Gemini fetch error:", error);
//     return "Something went wrong";
//   }
// }

// // Override handleUserInput for dynamic response
// async function handleUserInput() {
//   const input = userInput.value.trim();
//   if (input === "") return;

//   appendMessage("user", input);
//   userInput.value = "";

//   const reply = await fetchGeminiReply(input);
//   showTypewriterReply(reply);
// }

// sendBtn.addEventListener("click", handleUserInput);
// userInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") handleUserInput();
// });

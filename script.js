
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    appendMessage("Usuario", message);
    userInput.value = "";
    appendMessage("Asistente", "Escribiendo...");

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    chatBox.lastChild.remove();
    appendMessage("Asistente", data.reply);
}

function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

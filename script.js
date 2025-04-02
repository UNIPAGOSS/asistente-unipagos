
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("Usuario", message);
    userInput.value = "";

    appendMessage("Asistente", "Escribiendo...");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer SK_REEMPLAZAR"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Sos un asistente de atención al cliente de UNIPAGOS S.A.S. Ayudás a comerciantes y empleados a solicitar préstamos. Hablás de forma cordial, clara y profesional. Respondé siguiendo el siguiente flujo de preguntas: ¿sos comerciante o empleado?, ¿cuál es tu nombre completo?, ¿número de cédula?, ¿ingreso mensual?, ¿monto solicitado?, ¿destino del préstamo?."
                },
                {
                    role: "user",
                    content: message
                }
            ]
        })
    });

    const data = await response.json();
    chatBox.lastChild.remove();
    appendMessage("Asistente", data.choices[0].message.content);
}

function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}


export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
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
  res.status(200).json({ reply: data.choices[0].message.content });
}

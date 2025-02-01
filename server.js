const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const SECRET_KEY = "HolaAmigo234";
const ROBLOX_SERVER_URL = "https://games.roblox.com/v1/messaging-service/publish"; // 🔹 Para enviar comandos a Roblox

app.post("/execute", async (req, res) => {
    const { command, user, key } = req.body;

    if (key !== SECRET_KEY) {
        return res.status(403).json({ error: "Acceso denegado. Clave incorrecta." });
    }

    try {
        await axios.post(ROBLOX_SERVER_URL, {
            topic: "DiscordCommands",
            message: JSON.stringify({ command, user })
        });

        res.json({ status: "Comando enviado a Roblox." });
    } catch (error) {
        res.status(500).json({ error: "Error al enviar comando a Roblox." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API activa en el puerto ${PORT}`));

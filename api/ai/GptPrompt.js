const axios = require("axios")

module.exports = function(app) {

async function GptPrompt(query, prompt) {
try {
let response = await axios.post("https://chateverywhere.app/api/chat/", {
"model": {
"id": "gpt-3.5-turbo-0613",
"name": "GPT-3.5",
"maxLength": 12000,
"tokenLimit": 4000,
"completionTokenLimit": 2500,
"deploymentName": "gpt-35"
},
"messages": [
{
"pluginId": null,
"content": query, 
"role": "user"
}
],
"prompt": prompt, 
"temperature": 0.5
}, { headers: {
"Accept": "/*/",
"User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
}})
const result = {
message: response.data
}
return result
} catch (error) {
console.error(error)
throw error
}
}

app.get('/api/ai/gpt-prompt', async (req, res) => {
const query = req.query.query || ""
const prompt = req.query.prompt || ""
if (!query) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan query parameters !"
})
}
if (!prompt) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan prompt parameters !"
})
}
try {
const response = await GptPrompt(query, prompt)
res.status(200).json({
status: true,
creator: "GhostXdzz",
result: response
})
} catch (error) {
res.status(500).json({
status: false,
creator: "GhostXdzz",
message: "Error terjadi kesalahan !"
})
}
})
}
const axios = require("axios")

module.exports = function(app) {

async function mediafire(query) {
try {
const response = await axios.get(`https://api.agatz.xyz/api/mediafire?url=${query}`)    
return response.data.data
} catch (error) {
console.error(error)
throw error
}
}

app.get('/api/download/mediafire', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan url parameters !"
})
}
try {
const response = await mediafire(url)
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
const axios = require("axios")

module.exports = function(app) {

async function videy(url) {
try {
let UrlsLama = url.replace("v?id=", "")    
let NewUrl = UrlsLama.replace("https://", "https://cdn.")
const result = {
link: NewUrl + ".mp4"
}
return result
} catch (error) {
console.error(`Error the URL: ${error.message}`)
throw error
}
}

app.get('/api/download/videy', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan url parameters !"
})
}
try {
const response = await videy(url)
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
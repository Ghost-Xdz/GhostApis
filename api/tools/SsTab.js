const fetch = require('node-fetch')

module.exports = function(app) {

app.get('/api/tools/sstab', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan url parameters !"
})
}
try {
const response = await fetch(`https://api.screenshotmachine.com?key=392f47&url=${url}&device=tablet&dimension=800x1280`)
const buffer = await response.buffer()
res.set('Content-Type', 'image/jpeg')
res.send(buffer)
} catch (error) {
res.status(500).json({
status: false,
creator: "GhostXdzz",
message: "Error terjadi kesalahan !"
})
}
})
}
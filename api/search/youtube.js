const yts = require('yt-search')

module.exports = function(app) {

app.get('/api/search/youtube', async (req, res) => {
const query = req.query.query || ""
if (!query) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan query parameters !"
})
}
try {
const response = await yts.search(query)
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
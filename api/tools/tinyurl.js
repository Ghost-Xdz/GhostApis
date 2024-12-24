const axios = require('axios')

module.exports = function(app) {

async function tinyurl(url) {
try {
const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`)    
const result = {
link: response.data.toString()
}
return result
} catch (error) {
console.error(error)
throw error
}
}

app.get('/api/tools/tinyurl', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan url parameters !"
})
}
try {
const response = await tinyurl(url)
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
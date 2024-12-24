const axios = require("axios")

module.exports = function(app) {

async function fetchJson(url, options) {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

async function remini(url) {
try {
const response = await fetchJson(`https://api.nyxs.pw/tools/hd?url=${url}`)    
const result = {
link: response.result
}
return result
} catch (error) {
console.error(error)
throw error
}
}

app.get('/api/tools/remini', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan url parameters !"
})
}
try {
const response = await remini(url)
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
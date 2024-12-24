const axios = require("axios")

module.exports = function(app) {

async function tiktok(url) {
try {
const response = await axios.get('https://tiklok-down.vercel.app/api/download', {
params: {
url: url
},
headers: {
'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:128.0) Gecko/128.0 Firefox/128.0',
'Referer': 'https://tiklok-down.vercel.app/'
},
responseType: 'json'
});

return response.data;
} catch (error) {
console.error('Error fetching data:', error);
throw error;
}
}

app.get('/api/download/tiktok', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan url parameters !"
})
}
try {
const response = await tiktok(url)
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
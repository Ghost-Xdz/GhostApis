const axios = require("axios");

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

async function ytplay(query) {
try {
const response = await fetchJson(`https://api.vreden.my.id/api/ytplaymp3?query=${query}`)    
const result = {
videoId: response.result.metadata.videoId,
url: response.result.metadata.url,
title: response.result.metadata.title,
description: response.result.metadata.description,
thumbnail: response.result.metadata.thumbnail,
ago: response.result.metadata.ago,
views: response.result.metadata.views,
duration: {
seconds: response.result.metadata.duration.seconds,
timestamp: response.result.metadata.duration.timestamp
},
author: {
name: response.result.metadata.author.name,
url: response.result.metadata.author.url
},
download: {
url: response.result.download.url,
filename: response.result.download.filename
}
}
return result
} catch (error) {
console.error(error)
throw error
}
}

app.get('/api/search/ytplay', async (req, res) => {
const query = req.query.query || ""
if (!query) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan query parameters !"
})
}
try {
const response = await ytplay(query)
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
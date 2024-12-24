const axios = require("axios")

module.exports = function(app) {

const clientId = '8f777f61f80e4051b754d8e50310ad6e';
const clientSecret = '5802d3726d3149bfb880a577aa855fb3';
const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

async function spotify(query) {
try {
const tokenUrl = 'https://accounts.spotify.com/api/token';
const data = 'grant_type=client_credentials';
const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const tokenResponse = await axios.post(tokenUrl, data, {
headers: {
'Authorization': `Basic ${base64Credentials}`,
'Content-Type': 'application/x-www-form-urlencoded',
},
});
const accessToken = tokenResponse.data.access_token;
const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
const searchResponse = await axios.get(searchUrl, {
headers: {
'Authorization': `Bearer ${accessToken}`,
},
});
const tracks = searchResponse.data.tracks.items;
const result = tracks.map((track, index) => ({
trackNumber: index + 1,
trackName: track.name,
artistName: track.artists.map(artist => artist.name).join(', '),
previewUrl: track.preview_url,
externalUrl: track.external_urls.spotify,
}));
return result;
} catch (error) {
console.error('Error:', error.response ? error.response.data : error.message);
return { error: 'Failed to retrieve tracks' };
}
}

app.get('/api/search/spotify', async (req, res) => {
const query = req.query.query || ""
if (!query) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan query parameters !"
})
}
try {
const response = await spotify(query)
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

const axios = require("axios")
const cheerio = require("cheerio")

module.exports = function(app) {

async function wallpaper(query) {
try {
const response = await axios.get(`https://www.uhdpaper.com/search?q=${query}&by-date=true`);
const html = response.data;
const $ = cheerio.load(html);
const results = [];
$('article.post-outer-container').each((index, element) => {
const title = $(element).find('.snippet-title h2').text().trim();
const imageUrl = $(element).find('.snippet-title img').attr('src');
const resolution = $(element).find('.wp_box b').text().trim();
const link = $(element).find('a').attr('href');
results.push({ title, imageUrl, resolution, link });
});
return results;
} catch (error) {
console.error('Error scraping UHDPaper:', error);
return [];
}
}

app.get('/api/search/wallpaper', async (req, res) => {
const query = req.query.query || ""
if (!query) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan query parameters !"
})
}
try {
const response = await wallpaper(query)
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
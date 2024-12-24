const axios = require("axios")
const cheerio = require("cheerio")

module.exports = function(app) {

async function bukalapak(query) {
return new Promise(async (resolve, reject) => {
try {
const { data } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${query}&search_source=omnisearch_keyword&source=navbar`, {
headers: {
"user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0'
}
})
const $ = cheerio.load(data);
const dat = [];
const b = $('a.slide > img').attr('src');
$('div.bl-flex-item.mb-8').each((i, u) => {
const a = $(u).find('observer-tracker > div > div');
const img = $(a).find('div > a > img').attr('src');
if (typeof img === 'undefined') return
const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href');
const title = $(a).find('.bl-product-card__description-name > p > a').text().trim();
const harga = $(a).find('div.bl-product-card__description-price > p').text().trim();
const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim();
const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim();
const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim();
const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim();
const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href');
const res_ = {
title: title,
rating: rating ? rating : 'No rating yet',
terjual: terjual ? terjual : 'Not yet bought',
harga: harga,
image: img,
link: link,
store: {
lokasi: dari,
nama: seller,
link: link_sel
}
};
dat.push(res_);
})
if (dat.every(x => x === undefined)) return resolve({ message: 'Tidak ada result!' })
resolve(dat)
} catch (err) {
console.error(err)
}
})
}

app.get('/api/search/bukalapak', async (req, res) => {
const query = req.query.query || ""
if (!query) {
return res.status(400).json({
status: false,
creator: "GhostXdzz",
message: "Masukkan query parameters !"
})
}
try {
const response = await bukalapak(query)
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
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
app.enable("trust proxy")
app.set("json spaces", 2)

app.use(express.static(path.join(__dirname, 'views')))

// Middleware CORS
app.use(cors())

// Import Ai
require('./api/ai/alicia')(app)
require('./api/ai/bard')(app)
require('./api/ai/bing')(app)
require('./api/ai/esia')(app)
require('./api/ai/gemini')(app)
require('./api/ai/GptPrompt')(app)
require('./api/ai/luminai')(app)
require('./api/ai/mora')(app)
require('./api/ai/openai')(app)
require('./api/ai/sindy')(app)
require('./api/ai/siska')(app)

// Import Download
require('./api/download/capcut')(app)
require('./api/download/facebook')(app)
require('./api/download/instagram')(app)
require('./api/download/mediafire')(app)
require('./api/download/spotify')(app)
require('./api/download/tiktok')(app)
require('./api/download/videy')(app)
require('./api/download/ytmp3')(app)
require('./api/download/ytmp4')(app)

// Import Search
require('./api/search/bukalapak')(app)
require('./api/search/chord')(app)
require('./api/search/gimage')(app)
require('./api/search/google')(app)
require('./api/search/lirik')(app)
require('./api/search/pinterest')(app)
require('./api/search/spotify')(app)
require('./api/search/tiktok')(app)
require('./api/search/wallpaper')(app)
require('./api/search/youtube')(app)
require('./api/search/ytplay')(app)

// Import Tools
require('./api/tools/CekCuaca')(app)
require('./api/tools/remini')(app)
require('./api/tools/SsHp')(app)
require('./api/tools/SsPc')(app)
require('./api/tools/SsTab')(app)
require('./api/tools/tinyurl')(app)

// Endpoint untuk halaman HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});

module.exports = app
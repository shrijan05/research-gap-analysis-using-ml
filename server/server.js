const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/research', require('./routes/researchRoutes'))
app.use('/api/embedding', require('./routes/embeddingRoutes'))
app.use('/api/similarity', require('./routes/similarityRoutes'))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Research Gap Finder API Running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
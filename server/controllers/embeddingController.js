const createEmbedding = require('../services/embeddingService')

const testEmbedding = async(req, res) => {

    try {

        const text = `
        Deep learning for natural language processing
        using transformers and attention mechanisms
        `

        const embedding = await createEmbedding(text)

        res.json({
            success: true,
            dimensions: embedding.length,
            sample: embedding.slice(0, 10)
        })

    } catch(error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: 'Embedding error'
        })
    }
}

module.exports = {
    testEmbedding
}
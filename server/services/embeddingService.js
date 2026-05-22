const { pipeline } = require('@xenova/transformers')

let extractor = null

const loadModel = async () => {

    if(!extractor) {

        console.log('Loading embedding model...')

        extractor = await pipeline(
            'feature-extraction',
            'Xenova/all-MiniLM-L6-v2'
        )

        console.log('Embedding model loaded')
    }
}

const createEmbedding = async(text) => {

    await loadModel()

    const output = await extractor(text, {
        pooling: 'mean',
        normalize: true
    })

    return Array.from(output.data)
}

module.exports = createEmbedding
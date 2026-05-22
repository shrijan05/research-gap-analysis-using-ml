const cosineSimilarity =
    require('../utils/similarity')

const createEmbedding =
    require('./embeddingService')

const compareSections = async(
    paperA,
    paperB
) => {

    let scores = []

    const sectionPairs = [

        [
            paperA.sections.methodology,
            paperB.sections.methodology
        ],

        [
            paperA.sections.futureWork,
            paperB.sections.futureWork
        ],

        [
            paperA.sections.conclusion,
            paperB.sections.conclusion
        ],

        [
            paperA.sections.limitations,
            paperB.sections.limitations
        ]
    ]

    for(const pair of sectionPairs) {

        const textA = pair[0]
        const textB = pair[1]

        if(
            textA.length > 50 &&
            textB.length > 50
        ) {

            const embeddingA =
                await createEmbedding(textA)

            const embeddingB =
                await createEmbedding(textB)

            const similarity =
                cosineSimilarity(
                    embeddingA,
                    embeddingB
                )

            scores.push(similarity)
        }
    }

    if(scores.length === 0) {

        return 0
    }

    const avg =
        scores.reduce(
            (a, b) => a + b,
            0
        ) / scores.length

    return avg
}

module.exports =
    compareSections
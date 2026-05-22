const extractText = require('../services/pdfService')

const createEmbedding = require('../services/embeddingService')

const cosineSimilarity = require('../utils/similarity')

const calculateNovelty =
    require('../services/noveltyService')

const {

    detectResearchGaps,

    detectFutureOpportunities

} = require('../services/gapService')


const generateGapExplanations =
    require('../services/gapExplanationService')

const extractSections =
    require('../services/sectionService')


const chunkText =
    require('../services/chunkService')

const compareSections =
    require('../services/sectionSimilarityService')

const { v4: uuidv4 } = require('uuid')

const comparePapers = async (req, res) => {

    try {

        const files = req.files

        if (!files || files.length === 0) {

            return res.status(400).json({
                success: false,
                message: 'No papers uploaded'
            })
        }

        let papers = []

        for (const file of files) {

            const text = await extractText(file.path)

            const trimmedText =
                text.substring(0, 3000)

            const chunks =
                chunkText(trimmedText)

            const sections =
                extractSections(trimmedText)

            let chunkEmbeddings = []

            for (const chunk of chunks) {

                const embedding =
                    await createEmbedding(chunk)

                chunkEmbeddings.push({
                    chunk,
                    embedding
                })
            }

            papers.push({

                id: uuidv4(),

                title: file.originalname,

                text: trimmedText,

                sections,

                chunks: chunkEmbeddings
            })
        }

        let similarities = []

        for (let i = 0; i < papers.length; i++) {

            for (let j = i + 1; j < papers.length; j++) {

                let scores = []

                for (
                    const chunkA of papers[i].chunks
                ) {

                    for (
                        const chunkB of papers[j].chunks
                    ) {

                        const similarity =
                            cosineSimilarity(
                                chunkA.embedding,
                                chunkB.embedding
                            )

                        scores.push(similarity)
                    }
                }

                scores.sort((a, b) => b - a)

                const topScores =
                    scores.slice(0, 5)

                const avgSimilarity =
                    topScores.reduce(
                        (a, b) => a + b,
                        0
                    ) / topScores.length


                const sectionSimilarity =
                    await compareSections(
                        papers[i],
                        papers[j]
                    )



                similarities.push({

                    source: papers[i].title,

                    target: papers[j].title,

                    similarity:

                        (
                            (
                                avgSimilarity * 0.6
                            ) +

                            (
                                sectionSimilarity * 0.4
                            )

                        ).toFixed(4)
                })
            }
        }
        const noveltyScore =
            calculateNovelty(similarities)

        const researchGaps =
            detectResearchGaps(similarities)

        const futureOpportunities =
            detectFutureOpportunities(similarities)

        const gapExplanations =
            generateGapExplanations(similarities)



        res.json({

            success: true,

            papers,

            similarities,

            noveltyScore,

            researchGaps,

            futureOpportunities,

            gapExplanations
        })


    } catch (error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: 'Similarity error'
        })
    }
}

module.exports = {
    comparePapers
}
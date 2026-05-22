const extractSections = (text) => {

    const lower =
        text.toLowerCase()

    const sections = {

        methodology: '',

        futureWork: '',

        conclusion: '',

        limitations: ''
    }

    const methodologyKeywords = [
        'methodology',
        'method',
        'approach',
        'framework'
    ]

    const futureKeywords = [
        'future work',
        'future scope'
    ]

    const conclusionKeywords = [
        'conclusion',
        'conclusions'
    ]

    const limitationKeywords = [
        'limitations',
        'limitation'
    ]

    methodologyKeywords.forEach(keyword => {

        const index =
            lower.indexOf(keyword)

        if(index !== -1) {

            sections.methodology =
                text.substring(
                    index,
                    index + 1200
                )
        }
    })

    futureKeywords.forEach(keyword => {

        const index =
            lower.indexOf(keyword)

        if(index !== -1) {

            sections.futureWork =
                text.substring(
                    index,
                    index + 1200
                )
        }
    })

    conclusionKeywords.forEach(keyword => {

        const index =
            lower.indexOf(keyword)

        if(index !== -1) {

            sections.conclusion =
                text.substring(
                    index,
                    index + 1200
                )
        }
    })

    limitationKeywords.forEach(keyword => {

        const index =
            lower.indexOf(keyword)

        if(index !== -1) {

            sections.limitations =
                text.substring(
                    index,
                    index + 1200
                )
        }
    })

    return sections
}

module.exports = extractSections
const detectResearchGaps = (similarities) => {

    let gaps = 0

    similarities.forEach(item => {

        const similarity =
            parseFloat(item.similarity)

        if(similarity < 0.35) {

            gaps++
        }
    })

    return gaps
}

const detectFutureOpportunities =
(similarities) => {

    let opportunities = 0

    similarities.forEach(item => {

        const similarity =
            parseFloat(item.similarity)

        if(
            similarity > 0.20 &&
            similarity < 0.60
        ) {

            opportunities++
        }
    })

    return opportunities
}

module.exports = {

    detectResearchGaps,

    detectFutureOpportunities
}
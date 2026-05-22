const calculateNovelty = (similarities) => {

    if(similarities.length === 0) {

        return 0
    }

    let total = 0

    similarities.forEach(item => {

        total += parseFloat(item.similarity)
    })

    const average =
        total / similarities.length

    const novelty =
        (1 - average) * 10

    return novelty.toFixed(1)
}

module.exports = calculateNovelty
const generateGapExplanations =
(similarities) => {

    let explanations = []

    similarities.forEach(item => {

        const similarity =
            parseFloat(item.similarity)

        if(similarity < 0.35) {

            explanations.push(

                `
Potential unexplored research bridge
between:

"${item.source}"

and

"${item.target}"

Low semantic overlap suggests
a weakly explored interdisciplinary
connection.
`
            )
        }
    })

    return explanations
}

module.exports =
    generateGapExplanations
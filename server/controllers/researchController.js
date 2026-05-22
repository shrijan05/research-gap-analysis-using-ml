const extractText = require('../services/pdfService')
const analyzeResearch = require('../services/openaiService')

const analyzePapers = async(req, res) => {

    try {

        const files = req.files

        let texts = []

      for(const file of files) {

    const text = await extractText(file.path)

    console.log(text)

    if(text && text.trim().length > 0) {
        texts.push(text.substring(0, 1000))
    }
}
console.log(texts)

        const analysis = await analyzeResearch(texts)

        res.json({
            success: true,
            analysis
        })

    } catch(error) {

        console.log(error)

        res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

module.exports = {
    analyzePapers
}
const axios = require('axios')

const analyzeResearch = async(texts) => {

    const combinedText = texts.join('\\n\\n')

    const prompt = `
You are an expert AI research analyst.

Analyze these research papers.

Find:
1. Overlapping ideas
2. Research gaps
3. Weakly explored areas
4. Future work opportunities
5. Potential thesis directions
6. Innovation opportunities

Research Papers:

${combinedText}

Return detailed structured analysis.
`

    const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
            
model: 'openai/gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    )

    return response.data.choices[0].message.content
}

module.exports = analyzeResearch
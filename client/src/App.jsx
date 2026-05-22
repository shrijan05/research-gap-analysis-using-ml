import { useState } from 'react'
import API from './api'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { FiUploadCloud } from 'react-icons/fi'
import ResearchGraph from './ResearchGraph'

function App() {

  const [files, setFiles] = useState([])
  const [result, setResult] = useState('')
  const [similarities, setSimilarities] = useState([])
  const [noveltyScore, setNoveltyScore] = useState(0)
  const [researchGaps, setResearchGaps] = useState(0)
  const [futureOpportunities, setFutureOpportunities] = useState(0)
  const [gapExplanations, setGapExplanations] = useState([])
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {

    if (files.length === 0) {
      alert('Please upload research papers')
      return
    }

    const formData = new FormData()

    for (let file of files) {
      formData.append('papers', file)
    }

    try {

      setLoading(true)

      const response = await API.post(
        '/research/analyze',
        formData
      )

      setResult(response.data.analysis)
      const graphResponse = await API.post(
        '/similarity/compare',
        formData
      )

      setSimilarities(
        graphResponse.data.similarities
      )

      setNoveltyScore(
        graphResponse.data.noveltyScore
      )

      setResearchGaps(
        graphResponse.data.researchGaps
      )

      setFutureOpportunities(
        graphResponse.data.futureOpportunities
      )

      setGapExplanations(
        graphResponse.data.gapExplanations
      )

    } catch (error) {

      console.log(error)

      alert('Error analyzing papers')
    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <div className="border-b border-slate-800 p-6 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          AI Research Gap Finder
        </h1>

        <div className="text-slate-400">
          GenAI Research Intelligence Platform
        </div>

      </div>

      {/* Hero Section */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >

          <h1 className="text-6xl font-bold leading-tight">

            Discover Research Gaps <br />

            <span className="text-blue-500">
              Using AI
            </span>

          </h1>

          <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto">

            Upload research papers and let AI identify:
            overlapping ideas, unexplored areas,
            novelty opportunities, and future thesis directions.

          </p>

        </motion.div>

        {/* Upload Card */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-14 bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl"
        >

          <div className="flex flex-col items-center">

            <FiUploadCloud size={70} className="text-blue-500" />

            <h2 className="text-3xl font-bold mt-5">
              Upload Research Papers
            </h2>

            <p className="text-slate-400 mt-3">
              Upload 1–10 PDF papers
            </p>

            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={(e) => setFiles(e.target.files)}
              className="mt-8"
            />

            <button
              onClick={handleUpload}
              className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition duration-300"
            >
              Analyze Research Papers
            </button>

          </div>

        </motion.div>

        {/* Loading */}

        {loading && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 bg-slate-900 p-8 rounded-2xl text-center"
          >

            <div className="animate-pulse text-2xl">

              AI agents analyzing research papers...

            </div>

          </motion.div>
        )}

        <div className="mt-14">

          <ResearchGraph
            similarities={similarities}
          />
        </div>
        {/* Results */}

        {result && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12"
          >

            <div className="grid md:grid-cols-3 gap-6 mb-10">

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="text-slate-400">
                  Novelty Score
                </div>

                <div className="text-5xl font-bold mt-3 text-blue-500">
                  {noveltyScore}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="text-slate-400">
                  Research Gaps
                </div>

                <div className="text-5xl font-bold mt-3 text-green-400">
                  {researchGaps}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                <div className="text-slate-400">
                  Future Opportunities
                </div>

                <div className="text-5xl font-bold mt-3 text-purple-400">
                  {futureOpportunities}
                </div>
              </div>

            </div>


            {/* AI Gap Intelligence */}

            {gapExplanations.length > 0 && (

              <div className="mb-10">

                <div className="text-4xl font-bold mb-8">

                  AI Discovered Research Opportunities

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {gapExplanations.map(
                    (gap, index) => (

                      <motion.div

                        key={index}

                        initial={{
                          opacity: 0,
                          y: 20
                        }}

                        animate={{
                          opacity: 1,
                          y: 0
                        }}

                        className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            hover:border-blue-500
            transition
          "
                      >

                        <div className="
            text-blue-400
            text-lg
            font-semibold
            mb-4
          ">

                          Potential Gap #{index + 1}

                        </div>

                        <div className="
            text-slate-300
            leading-8
          ">

                          {gap}

                        </div>

                      </motion.div>
                    ))}
                </div>

              </div>
            )}

            {/* AI Report */}

            <div className="bg-slate-900 border border-slate-800 p-10 rounded-3xl">

              <h2 className="text-4xl font-bold mb-10">
                AI Research Intelligence Report
              </h2>

              <div className="prose prose-invert max-w-none leading-8">

                <ReactMarkdown>
                  {result}
                </ReactMarkdown>

              </div>

            </div>

          </motion.div>
        )}

      </div>

    </div>
  )
}

export default App
import CytoscapeComponent from 'react-cytoscapejs'

function ResearchGraph({ similarities }) {

    if (!similarities || similarities.length === 0) {

        return null
    }

    let graphElements = []

    const papers = new Set()

    similarities.forEach(item => {

        papers.add(item.source)

        papers.add(item.target)
    })

    papers.forEach(paper => {

        graphElements.push({

            data: {
                id: paper,
                label: paper
            }
        })
    })

    similarities.forEach((item, index) => {

        if (
            parseFloat(item.similarity)
            < 0.35
        ) {
            return
        }

        graphElements.push({

            data: {

                id: `edge-${index}`,

                source: item.source,

                target: item.target,

                label: item.similarity
            }
        })
    })

    return (

        <div className='bg-slate-900 rounded-3xl p-5 border border-slate-800 mt-14'>

            <div className='text-3xl font-bold mb-5'>
                Semantic Research Graph
            </div>

            <CytoscapeComponent

                elements={graphElements}

                style={{
                    width: '100%',
                    height: '650px'
                }}

                layout={{
                    name: 'cose'
                }}

                stylesheet={[

                    {
                        selector: 'node',

                        style: {

                            label: 'data(label)',

                            'background-color': '#3b82f6',

                            color: 'white',

                            'text-wrap': 'wrap',

                            'text-max-width': '120px',

                            'text-valign': 'center',

                            'text-halign': 'center',

                            'font-size': '12px',

                            width: 90,

                            height: 90
                        }
                    },

                    {
                        selector: 'edge',

                        style: {

                            width: 4,

                            label: 'data(label)',

                            'line-color': '#64748b',

                            'target-arrow-color': '#64748b',

                            'target-arrow-shape': 'triangle',

                            color: 'white',

                            'font-size': '12px',

                            'curve-style': 'bezier'
                        }
                    }
                ]}
            />

        </div>
    )
}

export default ResearchGraph
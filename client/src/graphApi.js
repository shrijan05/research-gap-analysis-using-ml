import axios from 'axios'

const GRAPH_API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

export default GRAPH_API
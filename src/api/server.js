import axios from 'axios'

export default axios.create({
    baseURL: "http://ae277cd367a3.ngrok.io/api/"
    // baseURL: "http://peaceful-cliffs-40451.herokuapp.com/api/"
})
import axios from 'axios'

export default axios.create({
    baseURL: "http://d8ce9f4412e1.ngrok.io/api/"
    // baseURL: "http://peaceful-cliffs-40451.herokuapp.com/api/"
})
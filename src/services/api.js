import axios from 'axios';


export default axios.create({
    baseURL: 'https://desafioecomerce.herokuapp.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})
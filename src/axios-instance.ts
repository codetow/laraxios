import axios from 'axios'

export default axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})

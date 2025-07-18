import axios from 'axios'

const handlePayment = async (payment: any) => {
  try {
    const response = await axios.post('http://localhost:3000/payments', payment)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default handlePayment

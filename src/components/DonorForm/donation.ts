import axios from 'axios'

const handlePayment = async (payment: any) => {
  try {
    const response = await axios.post('https://ryjh7s-3000.csb.app/payments', payment)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default handlePayment

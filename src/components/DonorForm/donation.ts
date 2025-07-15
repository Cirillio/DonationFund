import axios from 'axios'

interface payment {
  amount: number
  paymentType: string
}

const handlePayment = async (payment: payment) => {
  await axios.post('/api/donate', payment).then((res) => {
    console.log(res)
  })
}

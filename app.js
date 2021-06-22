const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.use((req, res, next) => {
  // TODO: Validate the Auth token for each call, which will vary depending on the provider/source
  const token = req.headers.authorization;
  if (tokenIsValid(token)) {
    next()
  } else {
    res.status(401).send('Invalid Token')
  }
});

const tokenIsValid = token => {
  // TODO: Actual token validation logic goes here
  if (token) {
    return true
  }
}

const fetchProviderCreds = (cultivoUserId) => {
  // TODO: Query the Payment Provider table to get providerUserId & providerUserToken
  const providerUserId = "22c4bda1-f468-4ded-8711-3fc42395c2f6"
  const providerUserToken = "6874ed95-e815-49c5-a9f5-14693ddcfbbe"
  if (cultivoUserId) {
    return {
      providerUserId, providerUserToken
    }
  }
}

const fetchPaymentMethods = (providerUserToken, providerUserId) => {
  // TODO: Submit a network request to the provider and retrieve all current payment methods
  if (providerUserId && providerUserToken) {
    return [{
      paymentMethodId: "e32fbda2-7213-4de1-9bea-165b8caf80e9",
      paymentMethodDetails: {}
    }]
  }
}

const addNewPaymentMethod = (providerUserToken, providerUserId, methodDetails) => {
  // TODO: POST the new payment method details alongside Provider User Token and Provider User Id
  // Ran out of time to wrap this in a Promise so that I could accurately mimic a network call
  if (providerUserId && providerUserToken && methodDetails) {
    return {status: 200}
  }
}

const storeProviderCreds = (providerUserToken, providerUserId) => {
  // TODO: Store/Update the provider credentials (updated tokens)
}

app.get('/methods', (req, res) => {
  // TODO: Fetch the provider creds, fetch the current list of methods from the Provider
  res.send([
    {
      paymentMethodId: "ff633445-9914-4d8c-91d4-6ffc695e01a5",
      paymentMethodDetails: {}
    }
  ])
})

app.post('/addPayMethod', (req, res) => {
  const {
    cultivoUserId,
    methodDetails
  } = req.body;
  const {providerUserId, providerUserToken} = fetchProviderCreds(cultivoUserId)

  // TODO: Code that I would have used if I had time to mimic the async network call
  // addNewPaymentMethod(providerUserId,providerUserToken, methodDetails).then(() => {
  //   const updatedMethods = fetchPaymentMethods(providerUserToken, providerUserId)
  //   res.send(updatedMethods)
  // })

  // TODO: Error Handling (expired token, etc)
  addNewPaymentMethod(providerUserId,providerUserToken, methodDetails)
  const updatedMethods = fetchPaymentMethods(providerUserToken, providerUserId)
  res.send(updatedMethods)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

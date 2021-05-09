const ObjectId = require('mongoose').Types.ObjectId
const Validator = require('validatorjs')
/**
@description Validates the client input.
@param {clientInput} object Contains the client input fields.
 */
function clientInputValidator (clientInput) {
  // Trim client input
  Object.keys(clientInput).forEach(
    key => {
      if (key === 'location') {
        Object.keys(clientInput.location).forEach(key => {
          clientInput.location[key] = trim(clientInput.location[key])
        })
      }
      if (key === 'contact') {
        Object.keys(clientInput.contact).forEach(key => {
          clientInput.contact[key] = trim(clientInput.contact[key])
        })
      }
      if (key === 'birthday') return
      clientInput[key] = trim(clientInput[key])
    }
  )

  // Validator rules
  const rules = {
    name: 'required|string|max:35',
    gender: 'required|alpha|string|max:10',
    birthday: 'required|date',
    contact: {
      email: 'string|required|email|max:100',
      phone: 'required|string|max:16'
    },
    location: {
      city: 'string|required|max:40',
      state: 'string|required|max:20',
      address: 'string|required|max:100'
    }
  }

  const validation = new Validator(clientInput, rules)

  if (validation.fails()) return validation.errors.all()
  return null
}

function ticketInputValidator (ticket) {
  // Trim client input
  Object.keys(ticket).forEach(
    key => {
      if (key === 'area' || key === 'price' || key === 'emissionDate' || key === 'promissory') return
      ticket[key] = trim(ticket[key])
    }
  )

  // Validator rules
  const rules = {
    id: 'string',
    propertyId: 'string',
    status: 'required|string|max:20',
    area: 'numeric',
    price: 'numeric',
    currency: 'required|string|max:3',
    emissionDate: 'required|date',
    promissory: {
      months: 'numeric',
      payments: 'numeric'
    },
    paymentLocation: 'required|string|max:50',
    paymentAddress: 'required|string|max:100'
  }

  const validation = new Validator(ticket, rules)

  if (validation.fails()) return validation.errors.all()
  return null
}

const isObjectIdValid = id => ObjectId.isValid(id) ? !!String(new ObjectId(id) === id) : false
const trim = string => string.replace(/^\s+|\s+$|\s+(?=\s)/g, '')

module.exports = {
  isObjectIdValid,
  trim,
  clientInputValidator,
  ticketInputValidator
}

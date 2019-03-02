const accounts = []

const getById = (id) => {
    const account = accounts.find(account => account._id === id)
    return Promise.resolve(account)
}
  
const list = () => Promise.resolve(accounts)

const createAccount = (email, password, username) => {
    const account = {
        username, 
        password, 
        email, 
        isActive: true,
        company: '',
        phone: '',
        address: '',
        about: '',
        registered: Date.now(),
        _id: Date.now().toString()
    }
    accounts.push(account)
    return Promise.resolve(account)
}

// assuming that email is unique
const findByEmail = (email) => {
    const res = accounts.find(account => account.email === email)
    return Promise.resolve(res)
}

export default {
    getById,
    list,
    findByEmail,
    createAccount
}
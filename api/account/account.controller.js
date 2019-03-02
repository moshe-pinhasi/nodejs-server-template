const accountService = require('./account.service')

const getAccount = async (req, res) => {
    const account = await accountService.getById(req.params.id)
    res.send({account})
}
  
const listAccounts = async (req, res) => {
    const accounts = await accountService.list()
    res.send({accounts})
}

module.exports = {
    getAccount,
    listAccounts
}
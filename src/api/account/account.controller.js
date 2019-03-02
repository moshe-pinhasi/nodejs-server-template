import accountService from './account.service'

export const getAccount = async (req, res) => {
    const account = await accountService.getById(req.params.id)
    res.send(account)
}
  
export const listAccounts = async (req, res) => {
    const accounts = await accountService.list()
    res.send(accounts)
}
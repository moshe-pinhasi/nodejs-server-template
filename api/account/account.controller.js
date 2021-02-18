const accountService = require('./account.service')
const { RequestValidationError, NotFoundError } = require('../../models/errors')

const getAccount = async (req, res, next) => {
    try {
        const errors = _validateGetAccountParams(req.params)
        if (errors.length > 0) {
            throw new RequestValidationError(errors)
        }
        const account = await accountService.getById(req.params.id)
        if (!account) {
            throw new NotFoundError('account not found')
        }
        res.status(200).send({account})
    } catch(err) {
        next(err)
    }
}
  
const getAccounts = async (req, res, next) => {
    try {
        const accounts = await accountService.list()
        res.status(200).send({accounts})
    } catch(err) {
        next(err)
    }
}

const _validateGetAccountParams = ({id}) => {
    const errors = []
    if (!id) {
        errors.push({message: 'account id is required', param: 'id'})
    }

    return errors
}

module.exports = {
    getAccount,
    getAccounts
}
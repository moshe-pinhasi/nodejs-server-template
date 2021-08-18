
const errorHandler = require('../errorHandler.middleware')
const { InternalError, BadRequestError } = require('../../models/errors')

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('errorHandler.middleware', () => {

    it('should convert error as string to internal error with status code 500', async () => {
        const res = mockResponse()
        errorHandler('some error', null, res)
        expect(res.status).toHaveBeenCalledWith(500);
    })

    it('should convert an error instance to internal error with status code 500', async () => {
        const res = mockResponse()
        errorHandler(new Error('some error'), null, res)
        expect(res.status).toHaveBeenCalledWith(500);
    })

    it('should call a BadRequestError with status code 400', async () => {
        const res = mockResponse()
        errorHandler(new BadRequestError(), null, res)
        expect(res.status).toHaveBeenCalledWith(400);
    })


    
})






// const { InternalError } = require('../../models/errors')
// const Logger = require('../../services/logger.service')

// const errorHandler = (err, req, res, next) => {
    
//     let error = err
//     // if (typeof err === 'object' && err.type === 'system')  skip

//     // default to 500 server error
//     if (typeof (err) === 'string') {
//         error = new InternalError(err)
//     } else if (err.type !== 'system') {
//         error = new InternalError(err.message || err.stack)
//     }

//     Logger.error(`[ERROR-HANDLER] [${error.code}] [${error.name}] - ${error.message}`)
//     res.status(error.code).json({ name: error.name, errors: error.serialize()})
// }


// module.exports =  errorHandler



const errorHandler = require('../errorHandler.middleware')
const { BadRequestError } = require('../../models/errors')

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



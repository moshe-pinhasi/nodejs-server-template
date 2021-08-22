
const authService = require('../auth.service')
const {login, signup} = require('../auth.controller')
const { RequestValidationError, BadRequestError } = require('../../../models/errors')

jest.mock('../auth.service.js')

const mockRequest = (query = {}, body = {}) => ({ query, body })
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('auth.controller', () => {

    describe('login', () => {
        const email = 'john@mail.com'
        const password = '123456'
        const token = "jdhhghdasdw"

        beforeEach(() => {
            authService.login.mockReset()
        });

        it('should login successfully', async () => {
            authService.login.mockResolvedValue(token);
            const req = mockRequest({}, { email, password })
            
            const res = mockResponse()
            await login(req, res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({message: "login success!", token});
            expect(authService.login).toHaveBeenCalled()
        })

        it('should fail to login due to missing params', async () => {
            expect.assertions(4);
            const req = mockRequest({}, {})
            const res = mockResponse()

            try {
                await login(req, res)
            } catch(e) {
                expect(e).toBeTruthy()
                expect(e.code).toBe(404)
                const errors = e.serialize()
                expect(Object.keys(errors).length).toBe(2)
                expect(e instanceof RequestValidationError).toBeTruthy()
            }
        })

        it('should fail to login due to invalid email', async () => {
            expect.assertions(4);

            authService.login.mockResolvedValue(null);
            const req = mockRequest({}, { email, password })
            const res = mockResponse()

            try {
                await login(req, res)
            } catch(e) {
                expect(e).toBeTruthy()
                expect(e.code).toBe(400)
                const errors = e.serialize()
                expect(Object.keys(errors).length).toBe(1)
                expect(e instanceof BadRequestError).toBeTruthy()
            }
        })
    })
    
    describe('signup', () => {
        const email = 'john@mail.com'
        const password = '123456'
        const username = '123456'
        const token = "jdhhghdasdw"
        const account = {email, username}

        beforeEach(() => {
            authService.login.mockReset()
            authService.signup.mockReset()
        });

        it('should singup successfully', async () => {
            authService.signup.mockResolvedValue(account);
            authService.login.mockResolvedValue(token);
            const req = mockRequest({}, { email, password, username })
            const res = mockResponse()
            
            await signup(req, res)

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({token});
            expect(authService.signup).toHaveBeenCalled()
            expect(authService.login).toHaveBeenCalled()
        })

        it('should fail to signup when missing params', async () => {
            authService.signup.mockResolvedValue(account);
            authService.login.mockResolvedValue(token);
            const req = mockRequest({}, {})
            const res = mockResponse()
            expect.assertions(4);

            try {
                await signup(req, res)
            } catch (e) {
                expect(e).toBeTruthy()
                expect(e.code).toBe(404)
                const errors = e.serialize()
                expect(Object.keys(errors).length).toBe(3)
                expect(e instanceof RequestValidationError).toBeTruthy()
            }
        })

        it('should fail to signup invalid data', async () => {
            expect.assertions(4);
            authService.signup.mockResolvedValue(null);
            const req = mockRequest({}, { email, password, username })
            const res = mockResponse()

            try {
                await signup(req, res)
            } catch (e) {
                expect(e).toBeTruthy()
                expect(e.code).toBe(400)
                const errors = e.serialize()
                expect(Object.keys(errors).length).toBe(1)
                expect(e instanceof BadRequestError).toBeTruthy()
            }
        })
    })
})

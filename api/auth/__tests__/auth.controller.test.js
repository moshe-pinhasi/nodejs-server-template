
const authService = require('../auth.service')
const {login, signup} = require('../auth.controller')
const { RequestValidationError, BadRequestError } = require('../../../models/errors')

jest.mock('../auth.service.js')

const reqFunc = (query = {}, body = {}) => ({ query, body })

const res = { 
    send: (data) =>  data
}

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
            const req = reqFunc({}, { email, password })
            
            const results = await login(req, res)
            expect(results.token).toBeTruthy()
            expect(results.message).toBeTruthy()
            expect(authService.login).toHaveBeenCalled()
        })

        it('should fail to login due to missing params', async () => {
            const req = reqFunc({}, {})
            expect.assertions(4);

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
            authService.login.mockResolvedValue(null);
            const req = reqFunc({}, { email, password })
            expect.assertions(4);

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
            const req = reqFunc({}, { email, password, username })
            
            const results = await signup(req, res)
            expect(results.token).toBeTruthy()
            expect(results.message).toBeTruthy()
            expect(authService.signup).toHaveBeenCalled()
            expect(authService.login).toHaveBeenCalled()
        })

        it('should fail to signup when missing params', async () => {
            authService.signup.mockResolvedValue(account);
            authService.login.mockResolvedValue(token);
            const req = reqFunc({}, {})
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
            authService.signup.mockResolvedValue(null);
            const req = reqFunc({}, { email, password, username })
            expect.assertions(4);

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


const request = require('supertest');
const authService = require('../auth.service')
const app = require('../../../server')

jest.mock('../auth.service.js')

const BASE_URL = '/api/auth'

describe('auth.routes', () => {

    describe('POST /auth/login', () => {
        const email = 'john@mail.com'
        const password = '123456'
        const token = "jdhhghdasdw"

        beforeEach(() => {
            authService.login.mockReset()
        });

        it('should login successfully', (done) => {
            authService.login.mockResolvedValue(token);
            request(app)
                .post(BASE_URL + '/login')
                .send({email, password})
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    expect(response.body.token).toBeTruthy()
                    expect(response.body.token).toBe(token)
                    done();
                })
        })

        it('should fail to login', (done) => {
            request(app)
                .post(BASE_URL + '/login')
                .send({email: 'john@mail.com'})
                .set('Accept', 'application/json')
                .expect(404)
                .then(response => {
                    expect(response.body.errors).toBeTruthy()
                    const errors = response.body.errors
                    expect(Object.keys(errors).length).toBeGreaterThan(0)
                    done();
                })
        })
    })

    describe('POST /auth/signup', () => {
        const email = 'john@mail.com'
        const password = '123456'
        const username = '123456'
        const token = "jdhhghdasdw"

        beforeEach(() => {
            authService.login.mockReset()
            authService.signup.mockReset()
        });

        it('should singup successfully', (done) => {
            authService.login.mockResolvedValue("jdhhghdasdw");
            authService.signup.mockResolvedValue({});
            request(app)
                .post(BASE_URL + '/signup')
                .send({email, password, username})
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    expect(response.body.token).toBeTruthy()
                    expect(response.body.token).toBe(token)
                    done();
                })
        })

        it('should fail to signup missing params', (done) => {
            request(app)
                .post(BASE_URL + '/signup')
                .send({email: 'john@mail.com'})
                .set('Accept', 'application/json')
                .expect(404)
                .then(response => {
                    expect(response.body.errors).toBeTruthy()
                    const errors = response.body.errors
                    expect(Object.keys(errors).length).toBeGreaterThan(0)
                    done();
                })
        })
    })
})

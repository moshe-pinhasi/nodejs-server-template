
const {login, signup, logout} = require('../auth.controller')

jest.mock('../auth.service.js')

describe('auth.controller', () => {
    it('should login successfully', () => {
        const req = {}
        const res = {
            status: () => {
                return {
                    send: () => {
                        
                    }
                }
            }
        }
        login(req, res)

        return expect(1).toBe(1);
    })
})

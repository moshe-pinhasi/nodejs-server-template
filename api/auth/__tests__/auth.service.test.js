
const authService = require('../auth.service')
const accountService = require('../../account/account.service')
const tokenService = require('../../../services/token.service')
const bcrypt = require('bcrypt')

jest.mock('../../account/account.service')
jest.mock('../../../services/token.service')
jest.mock('bcrypt')

describe('auth.service', () => {
    beforeEach(() => {
        accountService.findByEmail.mockReset()
    });

    it('should return null as a result when login due to missing email', async () => {
        expect.assertions(1);
        const res = await authService.login()
        expect(res).toBe(null);
    })

    it('should return null as a result when login due to missing password', async () => {
        expect.assertions(1);
        const res = await authService.login('admin@mail.com')
        expect(res).toBe(null);
    })

    it('should return null when login with incorrect email', async () => {
        expect.assertions(2);
        accountService.findByEmail.mockResolvedValue(null);
        const res = await authService.login('admin@mail.com', '123456')
        expect(res).toBe(null);
        expect(accountService.findByEmail).toHaveBeenCalled()
    })

    it('should return null when login with incorrect password', async () => {
        expect.assertions(3);
        accountService.findByEmail.mockResolvedValue({});
        bcrypt.compare.mockResolvedValue(false);
        const res = await authService.login('admin@mail.com', '123456')
        expect(res).toBe(null);
        expect(accountService.findByEmail).toHaveBeenCalled()
        expect(bcrypt.compare).toHaveBeenCalled()
    })

    it('should reject login due to signing failure', async () => {
        expect.assertions(3);
        accountService.findByEmail.mockResolvedValue({});
        bcrypt.compare.mockResolvedValue(true);
        tokenService.sign.mockRejectedValue('some error');

        try {
            await authService.login('admin@mail.com', '123456')
        } catch (e) {
            expect(e).toBeTruthy();
            expect(accountService.findByEmail).toHaveBeenCalled()
            expect(bcrypt.compare).toHaveBeenCalled()
        }
    })

    it('should login successfuly', async () => {
        const account = {
            id: 123,
            email: 'admin@mail.com',
            usename: 'admini'
        } 

        accountService.findByEmail.mockResolvedValue(account);
        bcrypt.compare.mockResolvedValue(true);
        tokenService.sign.mockResolvedValue({ email: account.email, username: account.username, accountId: account.id });

        const res = await authService.login(account.email, '123456')
        expect(res).toBeTruthy();
        expect(accountService.findByEmail).toHaveBeenCalled()
        expect(bcrypt.compare).toHaveBeenCalled()
        expect(tokenService.sign).toHaveBeenCalled()
        expect(res.email).toBe(account.email);
        expect(res.accountId).toBe(account.id);
        expect(res.username).toBe(account.username);
    })
})

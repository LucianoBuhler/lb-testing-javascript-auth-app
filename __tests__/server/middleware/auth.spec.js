/**
 * @jest-environment node
 */

import User from '@models/User'
import authMidleware from '@middleware/auth'
import Response from '@tests/utils/response'
import { connect, disconnect } from '@tests/utils/mongoose'


describe('Auth Middleware', () => {
  const user = {
    name: 'Test User',
    email: 'john.doe@test.com',  
    password: 'password'
  }

  let createdUser;

  beforeAll(async () => {
    await connect()
    createdUser = await User.create(user)
  })

  it('should call next if validation passes', async () => {
    const access_token = createdUser.generateToken()

    const req = {
      body: {
        access_token
      }
    }

    const res = new Response()
    const next = jest.fn()

    await authMidleware(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it('should return 401 if validation fails', async () => {
    const req = {
      body: {}
    }

    const res = new Response()
    const next = jest.fn()
    const statusSpy = jest.spyOn(res, 'status')
    const jsonSpy = jest.spyOn(res, 'json')

    await authMidleware(req, res, next)

    expect(next).toHaveBeenCalledTimes(0)
    expect(statusSpy).toHaveBeenCalledWith(401)
    expect(jsonSpy).toHaveBeenCalledWith({
      message: 'Unauthenticated.'
    })
  })

  afterAll(async() => {
    await disconnect()
  })
})
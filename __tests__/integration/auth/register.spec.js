/**
 * @jest-environment node
 */
import server from '@server/app'
import supertest from "supertest";
import { disconnect } from '@tests/utils/mongoose';
import User from '@models/User'

const app = () => supertest(server)

describe("Register process", () => {
  const REGISTER_ENDPOINT = '/api/v1/auth/register'
  const user = {
    name: 'Test User',
    email: 'test@test.com',
    password: 'password'
  }

  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('should register a user', async () => {
    const response = await app()
      .post(REGISTER_ENDPOINT)
      .send(user)
      
    expect(response.status).toBe(200)
    expect(response.body.data.token).toBeDefined()
    expect(response.body.message).toBe('Account registered.')
  })
  
  it('should return 422 if the registration fails: email alrady exists', async () => {
    // prepare
    await User.create(user)
    
    // action
    const response = await app()
    .post(REGISTER_ENDPOINT)
    .send(user)
    
    // assertion
    expect(response.status).toBe(422)
    expect(response.body.message).toBe('Validation failed.')
    expect(response.body.data.errors).toEqual({
      email: 'This email has already been taken.',
    })
  })

  afterAll(async() => {
    await disconnect()
  })
})
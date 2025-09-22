/**
 * @jest-environment node
 */ 
import User from '@models/user';
import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '@config';

const mongoUri = 'mongodb://localhost:27017/lb-testing-javascript-auth-app';

describe('User Model', () => {
  const user = {
    name: 'Test User',
    email: 'john.doe@test.com',  
    password: 'plaintextpassword'
  }

  let createdUser;

  beforeAll(async () => {
    await mongoose.connect(mongoUri, { useNewUrlParser: true})

    createdUser = await User.create(user)
  })

  it('should hash password before saving to the DB', async () => {
    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true)

  })

  it('should set the email confirm code for the user before saving to the database', async () => {
    expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
  })

  describe('The generateToken method', () => {
    it('should generate a JWT token for the user', () => {
      const token = createdUser.generateToken()

      const { id } = jwt.verify(token, config.jwtSecret)

      expect(id).toEqual(JSON.parse(JSON.stringify(createdUser._id)))
    })
  })
  
  afterAll(async() => {
    await mongoose.connection.close()
  })
})
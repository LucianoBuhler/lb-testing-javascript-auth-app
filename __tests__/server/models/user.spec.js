/**
 * @jest-environment node
 */ 
import User from '@models/user';
import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

const mongoUri = 'mongodb://localhost:27017/lb-testing-javascript-auth-app';
const user = {
    name: 'Test User',
    email: 'john.doe@test.com',  
    password: 'plaintextpassword'
  }

describe('User Model', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoUri, { useNewUrlParser: true})
  })

  it('should hash password before saving to the DB', async () => {
    const createdUser = await User.create(user);

    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true)

  })

  it('should set the email confirm code for the user before saving to the database', async () => {
      const createdUser = await User.create(user)

      expect(createdUser.emailConfirmCode).toEqual(expect.any(String))
    })
  
  afterAll(async() => {
    await mongoose.connection.close()
  })
})
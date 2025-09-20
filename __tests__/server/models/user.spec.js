/**
 * @jest-environment node
 */ 
import User from '@models/user';
import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

const mongoUri = 'mongodb://localhost:27017/lb-testing-javascript-auth-app';

describe('User Model', () => {
  it('should hash password before saving to the DB', async () => {
    await mongoose.connect(mongoUri, { useNewUrlParser: true})

    const user = {
      name: 'Test User',
      email: 'john.doe@test.com',  
      password: 'plaintextpassword'
    }

    const createdUser = await User.create(user);

    expect(Bcrypt.compareSync(user.password, createdUser.password)).toBe(true)

    await mongoose.connection.close()
  })
})
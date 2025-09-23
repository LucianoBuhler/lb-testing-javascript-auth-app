import mongoose from "mongoose";

 const mongoUri = 'mongodb://localhost:27017/lb-testing-javascript-auth-app';
    
 export const connect = () => mongoose.connect(mongoUri, { useNewUrlParser: true})

 export const disconnect = () => mongoose.connection.close()
//First import mongodb
import { MongoClient } from 'mongodb'

// Database Name
const dbName = 'user-profile';

//Initialize mongo db connection URI
const mongoURI = `mongodb://mongousername:mongopassword@localhost:27017`

//Initialize a mongo client with URI above
const dbClient = new MongoClient(mongoURI)

async function dbConnect() {
  try {
    // Use connect method to connect to the server
    dbClient.connect().d;
    const mongoClient = dbClient.db(dbName)
    console.log('Connected successfully to server');
    return mongoClient
  } catch (error) {
    console.log('Error establishing connection with mongo db ::', error.stack)
  }
}

export default dbConnect
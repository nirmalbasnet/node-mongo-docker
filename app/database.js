//First import mongodb
import mongodb from 'mongodb'


// Database Name
const dbName = 'user-profile';

//Initialize mongo db connection URI
const mongoURI = `mongodb://root:password@mongodb_server:27017`

//Initialize a mongo client with URI above
const dbClient = new mongodb.MongoClient(mongoURI, { useUnifiedTopology: true })

async function dbConnect() {
  try {
    // Use connect method to connect to the server
    dbClient.connect().d;
    const mongoClient = dbClient.db(dbName)
    console.log('Connected successfully to mongo server');
    return mongoClient
  } catch (error) {
    console.log('Error establishing connection with mongo db ::', error.stack)
  }
}

export default dbConnect
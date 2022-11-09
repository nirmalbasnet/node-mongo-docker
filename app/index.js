import express from 'express'
import path from 'path'
import {fileURLToPath} from 'url';
import fs from 'fs'
import bodyParser from 'body-parser';

import dbConnect from './database.js'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbClient

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/get-profile', async (req, res) => {
  const userId = 1
  let user = await dbClient.collection('users').findOne({
    userId
  })

  if (!user) {
    await dbClient.collection('users').insertOne({
      userId,
      name: "Nirmal Basnet",
      email: "nirmalbasnet@email.com",
      interests: "Sleeping all day"
    })
    user = await dbClient.collection('users').findOne({
      userId
    })
  }
  res.json(user)
})

app.get('/profile-picture', (req, res) => {
  const image = fs.readFileSync('images/profile-1.jpg')
  res.writeHead(200, {
    'Content-Type': 'image/jpg'
  })
  res.end(image, 'binary')
})

app.patch('/:userId/update-profile', async (req, res) => {
  const userId = req.params.userId
  const userData = req.body
  const updatedUser = await dbClient.collection('users').findOneAndUpdate({
    userId: parseInt(userId)
  }, {
    $set: userData
  }, {
    returnDocument: 'after'
  })
  res.json(updatedUser.value)
})

app.listen(3001, async () => {
  console.log('App is listening on port 3001')
  dbClient = await dbConnect()
})
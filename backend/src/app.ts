// IMPORT PACKAGES
import express from 'express'
import mongoose from 'mongoose'

/* This is checking to see if the environment variable NODE_ENV 
is not equal to production. 
In this case it will require the dotenv package and then 
call the config function on it. */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// IMPORT ROUTES
import userRoutes from './routes/user'
import postRoutes from './routes/post'

// DECLARATION OF "APP": USE "EXPRESS"
const app = express()

// ACCESS TO THE "PATH" OF THE SERVER
import path from 'path'

// IMPORT DATABASE URI
const uri = process.env.DB_ACCESS

// DATABASE CONNECTION OPTIONS
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}

// CONNECTING TO THE MONGODB DATABASE
mongoose.connect(uri, options, function (error: any) {
  if (error) {
    console.log('Connection to MongoDB failed!')
  } else {
    console.log('Connection to MongoDB successful!')
  }
})

// REQUESTS HANDLING
/**
 * To handle the requests coming from the front-end application,
 * we need to extract the JSON body:
 * takes all requests that have Content-Type "application/json"
 * and provides their "body" directly on the "req" object
 */
app.use(express.json())

//IMPLEMENTATION OF "CORS"
/**
 * Create headers that allow:
 * - to access our API from any origin ( '*' );
 * - add the mentioned headers to requests sent to our API
 *    (Origin , X-Requested-With , etc.);
 * - to send requests with the mentioned methods ( GET , POST , etc.).
 * @param {Object}   req  the request object
 * @param {Object}   res  the response oject
 * @param {Function} next continue to the next function
 */
app.use(
  (
    _req: any,
    res: { setHeader: (arg0: string, arg1: string) => void },
    next: () => void
  ) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    )
    next()
  }
)

// ROUTING HANDLER FOR THE "IMAGES" RESOURCE
/**
 * tells Express to handle the "images" resource statically
 * (a subdirectory of our home directory, __dirname)
 * each time it receives a request to the /images route.
 */
app.use('/images', express.static(path.join(__dirname, 'images')))

// USING IMPORTED ROUTES
app.use('/api/posts', postRoutes)
app.use('/api/auth', userRoutes)

// EXPORT "APP"
export default app

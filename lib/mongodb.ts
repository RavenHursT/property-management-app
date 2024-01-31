import mongoose, {Model, Mongoose} from 'mongoose'


import {Property} from './Property.schema'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let clientPromise: Promise<{
  connection:  Mongoose
  Property: Model<any>
}>

const connect = async () => {
  const connection = await mongoose
    .connect(process.env.MONGODB_URI as string)

  return {
    connection,
    Property
  }
}

clientPromise = connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

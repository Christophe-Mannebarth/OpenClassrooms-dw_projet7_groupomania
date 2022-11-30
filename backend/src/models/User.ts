// IMPORT MODULES
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// USER MODEL
/**
 * In the schema, the "unique" value
 * (with the mongoose-unique-validator element passed as a plugin),
 * will ensure that no two users can share the same email address.
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
})

/**
 * the mongoose-unique-validator element is passed as a plugin to the schema
 */
userSchema.plugin(uniqueValidator)

// EXPORT USER MODEL
export default mongoose.model('User', userSchema)

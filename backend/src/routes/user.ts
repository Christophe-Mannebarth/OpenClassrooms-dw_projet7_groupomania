// IMPORT PACKAGE
import express from 'express'
// IMPORT EMAIL MIDDLEWARE
import email from '../middleware/email'
// IMPORT PASSWORD MIDDLEWARE
import password from '../middleware/password'
// IMPORT USERNAME MIDDLEWARE
import username from '../middleware/username'
// IMPORT USER CONTROLLER
import { signup, login } from '../controllers/user'

// USE THE ROUTER FUNCTION OF EXPRESS MODULE
const router = express.Router()

// USER ROUTES
/**
 * For the user signup:
 *  - call the username validation
 *  - Call the email validation,
 *  - then the password validation,
 *  - if everything is ok with the validations:
 *      - call the signup function in the user controller.
 *  - else:
 *      - each middleware return an error message.
 * For the user login:
 *  - Call the login function in the user controller
 */
router.post('/signup', username, email, password, signup)
router.post('/login', login)

// EXPORT USER ROUTES
export default router

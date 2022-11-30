// IMPORT PACKAGES
import bcrypt from 'bcrypt'
import cryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'

import { Request, Response } from 'express'

// IMPORT USER MODEL
import User from '../models/User'

// IMPORT TOKEN KEY
const tokenKey = process.env.TOKEN_KEY

// IMPORT SECRET KEY
const emailkey = process.env.EMAIL_KEY

// EMAIL ENCRYPTION
/**
 * Encrypt the email adress witn HmacSHA256 module of crypto-js:
 * It takes the email address from the request body,
 * and uses the emailkey to encrypt it.
 * @param {Request} req  The request object
 * @returns {String}    A string of the encrypted email
 */
function emailCrypto(req: Request): string {
  return cryptoJS.HmacSHA256(req.body.email, emailkey).toString()
}

// EXPORT ALL BUSINESS LOGIC CONCERNING USER ROUTES:
// I) USER REGISTRATION
/**
 * - Encrypt the email adress witn HmacSHA256 module of crypto-js
 * - Calls the hash function of "bcrypt" in the password
 *   and asks him to "salt" the password 10 times.
 * - It's a Asynchronous function that returns a Promise
 *   in which we receive the generated hash.
 * - Create a user and save it in the database,
 *   returning a success response if successful,
 *   and errors with the error code in case of failure.
 * @param {Request} req  The request object
 * @param {Response} res  The response object
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const emailEncrypted = emailCrypto(req)
    const reqPassword = req.body.password
    const reqUsername = req.body.username
    const hashPassword = await bcrypt.hash(reqPassword, 10)

    const user = new User({
      email: emailEncrypted,
      password: hashPassword,
      username: reqUsername,
    })

    user.save((error) => {
      if (!error) {
        return res.status(201).json({
          userName: user.username,
          userId: user._id,
          isAdmin: user.isAdmin,
          token: jwt.sign(
            { userId: user._id, userName: user.username },
            tokenKey,
            {
              expiresIn: '24h',
            }
          ),
          message: `User ${user.username} created and loggued in!`,
        })
      } else if (
        error.message ==
        `User validation failed: email: Error, expected \`email\` to be unique. Value: \`${user.email}\``
      ) {
        return res.status(409).json({
          error: 'An account with this email address already exists!',
          message: 'Un compte avec cette adresse email existe déja!',
        })
      } else if (
        error.message ==
        `User validation failed: username: Error, expected \`username\` to be unique. Value: \`${user.username}\``
      ) {
        return res.status(409).json({
          error: 'An account with this pseudonym already exists !',
          message: 'Un compte avec ce pseudonyme existe déja !',
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      error: 'A server error occurred',
      message: 'Une erreur serveur est survenue',
    })
  }
}

// II) USER LOGIN
/**
 * Uses the "User model" to verify that the email entered by the user
 * matches an existing database user:
 * Otherwise, returns a 401 "Unauthorized" error.
 * If the email matches an existing user, continue.
 * Use the "compare" function of "bcrypt" to compare the entered password
 * by the user with the hash saved in the database:
 * If they don't match, returns a 401 "Unauthorized" error
 * with the same message as when the user was not found.
 * If they match, our user's credentials are valid.
 * In this case, returns a 200 response containing the user ID and a "TOKEN".
 * Uses "sign" from "jsonwebtoken" to encrypt a new token.
 * This token contains the user's ID as a "payload" (the data encoded in the token).
 * Uses a secret string to encrypt the token
 * This string serves as the key for encrypting and decrypting the token,
 * Set the validity period of the token to 24 hours.
 * Returns the token to the front-end with the response.
 * @param {Request} req  The request object
 * @param {Response} res  The response object
 */
export const login = async (req: Request, res: Response) => {
  try {
    const emailEncrypted = emailCrypto(req)
    const reqPassword = req.body.password
    const user = await User.findOne({ email: emailEncrypted })
    if (!user) {
      return res.status(401).json({
        error: 'User not found !',
        message: 'Utilisateur inconnu ! ',
      })
    }
    const userPassword = user.password
    const valid = await bcrypt.compare(reqPassword, userPassword)

    if (valid) {
      return res.status(200).json({
        userName: user.username,
        userId: user._id,
        isAdmin: user.isAdmin,
        token: jwt.sign({ userId: user._id }, tokenKey, {
          expiresIn: '24h',
        }),
        message: `User ${user.username} loggued in!`,
      })
    } else {
      return res.status(401).json({
        error: 'Incorrect password !',
        message: 'Mot de passe incorrect !',
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: 'A server error occurred',
      message: 'Une erreur serveur est survenue',
    })
  }
}

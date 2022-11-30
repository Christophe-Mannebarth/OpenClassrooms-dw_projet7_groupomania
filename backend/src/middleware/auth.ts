// IMPORT PACKAGE
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// EXPORT OF BUSINESS LOGIC CONCERNING AUTHENTICATION
/**
 * Extracts the token from the Authorization header of the incoming request.
 * It will also contain the keyword "Bearer",
 * so use the "split()" function to get everything after the space in the "header".
 * Errors generated here will show up in the "catch" block.
 * Then use the "verify()" function to decode our token.
 * If this is not valid, an error will be generated.
 * Extract the user ID from our token, add it to the "Request" object
 * so that our different routes can exploit it.
 * Otherwise, everything works and our user is authenticated.
 * Proceed to execution using the next() function.
 * @param {Object}   req  the request object
 * @param {Object}   res  the response object
 * @param {Function} next continue to the next function
 */

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1]
    const tokenKey = process.env.TOKEN_KEY
    const decodedToken = jwt.verify(token, tokenKey!) as jwt.JwtPayload
    const userId = decodedToken.userId
    //@ts-ignore
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'An authentication error took place' })
  }
}

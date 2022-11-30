import { Request, Response, NextFunction } from 'express'

// EXPORT OF BUSINESS LOGIC CONCERNING PASSWORD
/**
 * Check if the password has a correct format:
 * if the password is correct:
 *  - continue to the next function
 * else:
 *  - return a response with a status 400 and a message
 * @param {Request}   req  the request object
 * @param {Response}   res  the response object
 * @param {NextFunction} next continue to the next function
 * @returns {Object}  status of the response with a message
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const password = req.body.password
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,15})/
  if (re.test(password)) {
    next()
  } else {
    return res.status(400).json({ error: 'incorrect password format' })
  }
}

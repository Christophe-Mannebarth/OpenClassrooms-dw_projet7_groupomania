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
  const username = req.body.username
  // no _ or . at the beginning
  // username is 3-15 characters long
  // no __ or _. or ._ or .. inside
  // allowed characters: a-zA-Z0-9._
  // no _ or . at the end
  const re = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  if (re.test(username)) {
    next()
  } else {
    return res.status(400).json({ error: 'incorrect user name format' })
  }
}

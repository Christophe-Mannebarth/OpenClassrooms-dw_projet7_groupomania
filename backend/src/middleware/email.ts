import { Request, Response, NextFunction } from 'express'

// EXPORT OF BUSINESS LOGIC CONCERNING EMAIL
/**
 * Check if the email has a correct format:
 * if the email is correct:
 *  - continue to the next function
 * else:
 *  - return a response with a status 400 and a message
 * @param {Request}   req  the request object
 * @param {Response}   res  the response object
 * @param {NextFunction} next continue to the next function
 * @returns {Object}  status of the response with a message
 */
export default (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email
  const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g
  if (re.test(email)) {
    next()
  } else {
    return res.status(400).json({ error: 'incorrect email format' })
  }
}

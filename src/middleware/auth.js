import jwt from 'jsonwebtoken'

async function auth(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({ message: 'Access token não informado.' })
  }

  const [, accessToken] = token.split(' ')
  const secret = process.env.SECRET
  try {
    jwt.verify(accessToken, secret)

    const { id, email, role } = await jwt.decode(accessToken)

    req.userId = id
    req.userEmail = email
    req.userRole = role

    return next()
  } catch (err) {
    return res.status(401).send({ message: 'Usuario não autorizado.' })
  }
}

export default auth

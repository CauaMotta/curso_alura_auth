function roles(listOfRoles) {
  return async (req, res, next) => {
    const { userRole } = req

    const validate = listOfRoles
      .map(role => role.toUpperCase())
      .includes(userRole)

    if (!validate) {
      return res.status(401).send({ message: 'Sem permissões.' })
    }

    return next()
  }
}

export default roles

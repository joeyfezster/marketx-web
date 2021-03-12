const TOKEN_KEY = 'jwt'

// TODO: secure this, don't save jwt on local storage
export const saveUserJWT = (jwt: string) => {
  localStorage.setItem(TOKEN_KEY, jwt)
}

export const getUserJWT = () => {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export const invalidateJWT = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const doesJWTExist = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true
  }

  return false
}

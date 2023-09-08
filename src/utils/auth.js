export function getToken() {
  const loggedUserData = localStorage.getItem('logged_user')
  if (loggedUserData) {
    const loggedUser = JSON.parse(loggedUserData)
    return loggedUser.token
  }
  return null
}

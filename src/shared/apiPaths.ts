const baseUrl = process.env.REACT_APP_API_BASEURL

const apiPaths = {
  LOGIN: `${baseUrl}/auth/local`,
  REGISTER: `${baseUrl}/auth/local/register`,
}

export default apiPaths

const baseUrl = process.env.REACT_APP_API_BASEURL

const apiPaths = {
  LOGIN: `${baseUrl}/auth/local`,
  REGISTER: `${baseUrl}/auth/local/register`,
  DEAL_PARTICIPANTS: `${baseUrl}/deal-participants`,
  DEAL_PARTICIPANT: (id: string | undefined) => `${baseUrl}/deal-participants/${id}`,
  DEALS: `${baseUrl}/deals`,
}

export default apiPaths

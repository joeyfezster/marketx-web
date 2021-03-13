const baseUrl = process.env.REACT_APP_API_BASEURL

const apiPaths = {
  LOGIN: `${baseUrl}/auth/local`,
  REGISTER: `${baseUrl}/auth/local/register`,
  DEALS: `${baseUrl}/deals`,
  GROUP_DEAL: (id: number) => `${baseUrl}/deals/${id}`,
  DEAL_PARTICIPANTS: `${baseUrl}/deal-participants`,
  DEAL_PARTICIPANT: (id: string | number | undefined) => `${baseUrl}/deal-participants/${id}`,
}

export default apiPaths

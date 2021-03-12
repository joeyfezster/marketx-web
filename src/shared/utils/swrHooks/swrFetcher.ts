import axios from 'axios'
import { getUserJWT } from '../loginUtils'

export function fetcher(url: string) {
    const jwt = getUserJWT()
    let options
    if (jwt) {
        options = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    }
    return axios.get(url, options).then((res) => res.data)
}
import { pathsAPI } from '../../paths';
import { AxiosResponse } from 'axios'
import { TAuthAPI, IAuthAPIData, TAuthAPIResponse } from '../../types' 
import axios from '../axios'

export const authAPI:TAuthAPI  = {
    login: (data: IAuthAPIData ): Promise<AxiosResponse<TAuthAPIResponse>> => axios.post(pathsAPI.login, data, { withCredentials: true }),
    logout: (): Promise<AxiosResponse<TAuthAPIResponse>> => axios.post(pathsAPI.logout, { withCredentials: true }),
}
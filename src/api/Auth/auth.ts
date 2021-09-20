import { pathsAPI } from '../../paths';
import { AxiosResponse } from 'axios'
import { TAuthAPI, IAuthAPIData, TAuthAPIResponse } from '../../types' 
import axios from '../axios'

// { withCredentials: true }
export const authAPI:TAuthAPI  = {
    login: (data: IAuthAPIData ): Promise<AxiosResponse<TAuthAPIResponse>> => axios.post(pathsAPI.login, data),
    logout: (): Promise<AxiosResponse<TAuthAPIResponse>> => axios.post(pathsAPI.logout, ),
}
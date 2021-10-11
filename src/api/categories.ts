import { TCategoryAPI, TCategoryAPIResponse } from '../types';
import { pathsAPI } from '../paths'
import axios from './axios'
import { AxiosResponse } from 'axios';

export const categoryAPI: TCategoryAPI = {
    categories: (): Promise<AxiosResponse<TCategoryAPIResponse>> => axios.get(pathsAPI.categories)
}
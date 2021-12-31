import { TCvAPI, TCvAPIResponse, TCvForm } from '../types';
import { pathsAPI } from '../paths'
import axios from './axios'
import { AxiosResponse } from 'axios';

export const cvAPI: TCvAPI = {
    all: (): Promise<AxiosResponse<TCvAPIResponse>> => axios.get(pathsAPI.cv),
    add: (data: TCvForm ): Promise<AxiosResponse<TCvAPIResponse>> => axios.post(pathsAPI.cvAdd, data),
    edit: (id: string | number, data: TCvForm ): Promise<AxiosResponse<TCvAPIResponse>> => axios.post(pathsAPI.cvEdit(id), data),
    remove: (id: string | number ): Promise<AxiosResponse<TCvAPIResponse>> => axios.post(pathsAPI.cvRemove(id)),
}
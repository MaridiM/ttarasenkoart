import { TPictureForm, TPictureAPIResponse, TPictureAPI } from '../types';
import { pathsAPI } from '../paths'
import axios from './axios'
import { AxiosResponse } from 'axios';

export const pictureAPI: TPictureAPI = {
    pictures: (): Promise<AxiosResponse<TPictureAPIResponse>> => axios.get(pathsAPI.pictures),
    picture: (id: string | number): Promise<AxiosResponse<TPictureAPIResponse>> => axios.get(pathsAPI.picture(id)),
    add: (data: TPictureForm ): Promise<AxiosResponse<TPictureAPIResponse>> => axios.post(pathsAPI.add, data),
    edit: (id: string | number, data: TPictureForm ): Promise<AxiosResponse<TPictureAPIResponse>> => axios.post(pathsAPI.edit(id), data),
    remove: (id: string | number ): Promise<AxiosResponse<TPictureAPIResponse>> => axios.post(pathsAPI.remove(id)),
}
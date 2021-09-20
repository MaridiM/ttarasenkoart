import { TPictureAPIResponse, TPictureAPI } from '../types';
import { pathsAPI } from '../paths'
import axios from './axios'
import { AxiosResponse } from 'axios';

export const pictureAPI: TPictureAPI = {
    pictures: (): Promise<AxiosResponse<TPictureAPIResponse>> => axios.get(pathsAPI.pictures),
    picture: (id: string | number): Promise<AxiosResponse<TPictureAPIResponse>> => axios.get(pathsAPI.picture(id)),
}
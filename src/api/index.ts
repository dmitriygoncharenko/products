

import { Api } from "./api";
import {useStore} from "@/pinia/store";
import {pinia} from "@/pinia";
import {storeToRefs} from "pinia";
import type {AxiosError} from "axios";

export const api = new Api({ baseURL: import.meta.env.VITE_API_URL });

const store = useStore(pinia)
const {loading} = storeToRefs(store)
api.instance.interceptors.request.use((request) => {
    loading.value += 1;
    return request;
})
api.instance.interceptors.response.use((response) => {
    loading.value -= 1;
    return response;
}, (err: AxiosError) => {
    if (err.request.status === 404) {
        window.location.href='/error/404'
    }
    loading.value -= 1;
    return Promise.reject(err);
})
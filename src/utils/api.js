import axios from 'axios';
import isEmpty from 'lodash/isEmpty';

const paramConverter = require('jquery-param');

const BASE_URL = process.env.VUE_APP_API_BASE_URL;

const httpClient = axios.create({
    baseURL: BASE_URL,
    timeout: false,
    params: {}, // In need if you want to add new params.
});

const addParam = ({ ...rest } = {}) => {
    return {
        ...rest,
    };
};

export default {
    async getData(action, query = {}, requestParams = {}) {
        let urlToCall = action;
        if (!isEmpty(query)) {
            urlToCall += `?${paramConverter(query)}`;
        }
        return await httpClient.get(urlToCall, addParam(requestParams));
    },

    async postData(action, data, requestParams = {}) {
        return await httpClient.post(action, data, addParam(requestParams));
    },

    async putData(action, data) {
        return await httpClient.put(action, data);
    },

    async deleteData(action) {
        return await httpClient.delete(action);
    },

    async uploadloadFiles(action, data, requestParams = {}) {
        return await httpClient.post(
            action,
            data,
            addParam({
                ...requestParams,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        );
    },
};

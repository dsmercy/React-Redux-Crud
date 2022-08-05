import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials=true;

const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 300));

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        // case 401:
        //     toast.error(data.title);
        //     break;
        case 404:
            console.log('500',data);
            break;
        case 500:
console.log('500',data);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Employee = {
    getAllEmployees: () => requests.get('employees'),
    getEmployee: (id: number) => requests.get(`employees/${id}`),
    addEmployee: (values: any) => requests.post('employees', values),
    editEmployee: (id: number,values: any) => requests.put(`employees/${id}`, values),
    removeEmployee: (id: number) => requests.delete(`employees/${id}`)
}


const agent = {
Employee
}

export default agent;
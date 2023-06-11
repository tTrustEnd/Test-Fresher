import axios from "../utils/axios-customize";
export const fetchUserRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}
export const fetchLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}
export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}
export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}
export const getAllUsers = (query) => {
    return axios.get(`api/v1/user?${query}`)
}
export const callAddNew = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user', { fullName, email, password, phone })
}
export const ImportListUser = (data) => {
    return axios.post('api/v1/user/bulk-create', data);
}
export const CallUpdate = (data) => {
    return axios.put('/api/v1/user', data)
}
export const CallDelete = (_id) => {
    return axios.delete(`api/v1/user/${_id}`)
}
export const getAllBook = (query) => {
    return axios.get(`api/v1/book${query}`)
}
export const updateBook = (_id,data) => {
    return axios.put(`api/v1/book/${_id}`,data)
}
export const getCategory = () =>{
   return axios.get('/api/v1/database/category')
}
export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
    method: 'post',
    url: '/api/v1/file/upload',
    data: bodyFormData,
    headers: {
    "Content-Type": "multipart/form-data",
    "upload-type": "book"
    },
    });
    }
export const createBook = ({slider,mainText,author,price,sold,quantity,category,thumbnail}) =>{
    return axios.post('/api/v1/book',{slider,mainText,author,price,sold,quantity,category,thumbnail})
}

export const callDeleteBook = (id) =>{
    return axios.delete(`/api/v1/book/${id}`)
}
export const callHistory = () => {
    return axios.get(`/api/v1/history?`)
}
export const callChangePassword = (email,oldpass,newpass) =>{
    return axios.post(`/api/v1/user/change-password`,{email,oldpass,newpass})
}
export const createOrder = (data) => {
    return axios.post('/api/v1/order/',data)
}
export const getAllOrdesAx = (querry) => {
    return axios.get(`/api/v1/order?${querry}`)
}
export const StatisticAX = () =>{
    return axios.get('api/v1/database/dashboard')
}
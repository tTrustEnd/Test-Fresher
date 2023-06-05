import axios from "../utils/axios-customize";
export const fetchUserRegister = (fullName, email, password, phone) =>{
return axios.post('/api/v1/user/register',{fullName, email, password, phone})
}
export const fetchLogin = (username, password) => {
   return axios.post('/api/v1/auth/login',{username, password})
}
export const callFetchAccount = () =>{
    return axios.get('/api/v1/auth/account')
}
export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}
export const getAllUsers =(query) => {
    return axios.get(`api/v1/user?${query}`)
}
export const callAddNew = (fullName,email, password, phone) => {
    return axios.post('/api/v1/user',{fullName, email, password, phone})
}
export const ImportListUser = (data) => {
    return axios.post('api/v1/user/bulk-create',data);
}
export const CallUpdate =(data) =>{
    return axios.put('/api/v1/user',data)
}
export const CallDelete = (_id) => {
    return axios.delete(`api/v1/user/${_id}`)
}
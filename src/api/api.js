import * as axios from "axios";

let instanse = axios.create({
    withCredentials: true,
    headers: {'API-KEY':'8e4e8245-e26f-4f04-aad8-74bedbfe3233'},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const userAPI = {
    getUsers(currentPage, pageSize, term = ''){
        return instanse.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
            .then(response => {
                return response.data
            })
    },
    getFriends(currentPage, pageSize){
        return instanse.get(`users?page=${currentPage}&count=${pageSize}&friend=${true}`)
            .then(response => {
                return response.data
            })
    },
    unfollow(userId){
        return instanse.delete(`follow/${userId}`)
    },
    follow(userId){
        return instanse.post(`follow/${userId}`)
    }
}

export const profileAPI = {
    getProfile(userId){
        return instanse.get(`profile/` +userId)
    },
    getStatus(userId){
        return instanse.get(`profile/status/`+ userId)
    },
    updateStatus(status){
        return instanse.put('profile/status', {status})
    },
    savePhoto(photoFile){
        let formData = new FormData()
        formData.append('image', photoFile)

        return instanse.put('profile/photo', formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    },
    saveProfile(profileInfo){
        return instanse.put('profile', profileInfo)
    }
}

export const authAPI = {
    me(){
        return instanse.get('auth/me')
    },
    login(email, password, rememberMe, captcha = null){
        return instanse.post(`auth/login`,{email, password, rememberMe, captcha});
    },
    logout(){
        return instanse.delete(`auth/login`);
    }
}

export const dialogsAPI = {
    getMessages(userId){
        return instanse.get(`dialogs/${userId}/messages`)
    },
    sendMessage(userId, body){
        return instanse.post(`dialogs/${userId}/messages`,{body});
    },
    getAllDialogs(){
        return instanse.get(`dialogs`)
    }
}

export const securityAPI = {
    getCaptchaUrlApi(){
        return instanse.get('security/get-captcha-url')
    }
}
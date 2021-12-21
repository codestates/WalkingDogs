import api from './index';

const user = {
 
    loginApi: async (userInfo) => {
        const result = await api({
            method: 'POST',
            url:`/login`, 
            data:{           
                email: userInfo.email, 
                password: userInfo.password
            }
        });
        return result;
    },

    logoutApi: async () => {
        const result = await api({
            method: 'POST',
            url: `/logout`,
            data: null
        })
        return result;
    },

    signupApi: async (userInfo) => {
        const result = await api({method: 'POST', 
            url: `/signup`,
            data:{
                email: userInfo.email,
                password: userInfo.password,
                username: userInfo.username,
                image: userInfo.image,
            }
        });
        return result;        
    },

    checkApi: async () => {
        const result = await api({
            method: 'GET',
            url: '/check',
        })
    
        return result
    },

    userImageApi: async (data) => {
        const result = await api({
            headers: { 'Content-Type': 'multipart/form-data' },
            method: 'POST',
            url: '/user-image',
            data: data
        })
        return result;
    },

    dogImageApi: async (data) => {
        const result = await api({
            method: 'POST',
            url: '/dog-image',
            data: data
        })
        return result;
    },

}

export default user;
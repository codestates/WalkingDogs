import api from './index';

const loginApi = async(userInfo) => {
    const result = await api({
            method: 'POST',
            url:`/login`, 
            data:{           
                email: userInfo.email, 
                password: userInfo.password
            }
        });
        return result;
    };

const logoutApi = () => {
    const result = api({
            method: 'POST',
            url: `/logout`,
            data: null
            })
            return result;
}

const signupApi = async (userInfo) => {
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
        };

const checkApi = async () => {
    const result = await api({
        method: 'GET',
        url: '/check',
    })

    return result
}

const userImageApi = async (data) => {
    const result = await api({
        headers: { 'Content-Type': 'multipart/form-data' },
        method: 'POST',
        url: '/user-image',
        data: data
    })
    return result;
}

const dogImageApi = async (data) => {
    const result = await api({
        method: 'POST',
        url: '/dog-image',
        data: data
    })
    return result;
}


export default { loginApi, logoutApi, signupApi, checkApi, userImageApi, dogImageApi };
import api from './index';

const loginApi = async(userInfo) => {
    console.log(userInfo);
    const result = await api({method: 'POST',
            url:`/login`, 
            data:{
                email:userInfo.email, 
                password:userInfo.password
            }
        });
        return result;
    };

const logoutApi = () => {
    const result = api({method: 'POST',
            url: `/logout`, 
            })
}

const signupApi = () => {
    const result = api({method: 'POST', 
                        url: `/signup`,
                    })
                    
}



export default {loginApi,logoutApi};
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
    console.log(userInfo)
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



export default {loginApi,logoutApi,signupApi};
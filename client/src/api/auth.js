import api from './index'


const passwordApi = async(userInfo) => {
    const result = await api({
            method: 'POST',
            url:`/password`, 
            data:{           
                password: userInfo.password
            }
        });
        return result;
    };


export default {passwordApi}
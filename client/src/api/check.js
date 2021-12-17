import api from './index';

const check = {

    checkApi: async (cookies) => {
        const result = await api({
            method: 'POST',
            url: `/check`,
            data: {
                cookies,
            },
        });

        return result;
    }

}

export default check;

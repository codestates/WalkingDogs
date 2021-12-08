const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
    const userInfo = await isAuthorized(req);
    if(userInfo.accessToken) {
        res.status(400).json({ message: 'you should renew your access token' });
      }
      
    console.log(userInfo);
    if(!userInfo) {
        
        res.status(401).send({ message: 'this token is not authorized' });
    } else {
       
        const id = userInfo.id;
        const dogList = await user.findOne({
            where: {
                id: id
            },
            include: dog
        })
        if (!dogList) {
            res.status(401).send({message: 'no such user in the database' });
        } else {
            res.status(200).send({ dogs: dogList.dataValues.dogs, message: 'ok' });
        }
    }
};

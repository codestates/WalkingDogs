const { user, room } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
    const userInfo = await isAuthorized(req);
    if(userInfo.accessToken) {
        res.status(400).json({ message: 'you should renew your access token' });
    }
      
    if(!userInfo) {
        res.status(401).send({ message: 'this token is not authorized' });
    } else {
        const id = userInfo.id;
        const roomList = await user.findOne({
            where: {
                id: id
            },
            include: room
        })
        if (!roomList) {
            res.status(401).send({message: 'no such user in the database' });
        } else {
            console.log(roomList.dataValues);
            res.status(200).send({ rooms: roomList.dataValues.rooms, message: 'ok' });
        }
    }
};

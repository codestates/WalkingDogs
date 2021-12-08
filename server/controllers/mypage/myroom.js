const { user, room, user_room } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
    const userInfo = await isAuthorized(req);
    if(!userInfo) {
        res.status(401).send({ message: 'this token is not authorized' });
    } else {
        const id = userInfo.id;
        const roomList = await user_room.findAll({
            where: {
                user_id: id
            },
            include: {
                model: room,
            },
        })

        if (!roomList) {
            res.status(401).send({message: 'no such user in the database' });
        } else {
            const rooms = []
            roomList.forEach((el) => {
                rooms.push(el.room)
            })

            res.status(200).send({ rooms, message: 'ok' });
        }
    }
};

const { room_join_req, room_join_req_dog, room } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 1. 현재는 신청버튼을 누르자마자 바로 수락된다.
// 2. 권한설정은 반드시 해줘야한다.
// 3. 그럼 누르자마자 바로 수락되면 안된다...?
// 4. 그럼 DB 스키마에 모임방 Req Table이 있어야 함.
module.exports = async (req, res) => {
  console.log('joinRoomAPI');
  try {
    const roomId = Number(req.params.room_id);
    const { dogs, request_time } = req.body;
    const userInfo = await isAuthorized(req);

    console.log(request_time)
    const date_array = request_time.split('T');
    const time_array = date_array[1].split(':');
    time_array[0] = String(Number(time_array[0]) + 9);
    const modified_time = date_array[0]+ 'T' + time_array.join(':');

    if (userInfo.accessToken) {
      return res.status(401).json({ message: 'you should renew your access token' });
    }

    if (!userInfo) {
      return res.status(401).json({ message: 'unauthorized' });
    }

   const roomInfo = await room
      .findOne({
        where: {
          id: roomId
        }
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(400)
          .json({ message: 'no such room in the database' });
      });
     
    if (Date.parse(modified_time) > Date.parse(roomInfo.dataValues.meeting_time)) {
          return res
            .status(200)
            .json({ message: 'expired', data: 'meeting time is over' });
    } 
      
    const reqInfo = await room_join_req
      .findOne({
        where: {
          user_id: userInfo.id,
          room_id: roomId
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'server error' });
      });

    if (!reqInfo) {
      await room_join_req.create({
        user_id: userInfo.id,
        room_id: roomId
      })
      .then((result) => {
        console.log('result2: ', result);
      })
      .catch((err) => {
        console.log('err2: ', err);
      })

      dogs.forEach(async (el) => {
        await room_join_req_dog.create({
          dog_id: el.id,
          room_id: roomId
        });
      });

      return res.status(200).json({ message: 'ok', data: null });
    }

    return res.status(400).json({ message: 'you already sended join request' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};

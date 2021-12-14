const { user_room, dog, room_join_req, room_join_req_dog, room_dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// reqPermission의 역할
// 유저 인증을 하지 않고, room 정보와 room에 들어가려는 유저의 정보, 요청을 수락하는 여부를 body로 받아서
// user정보와 room의 정보를 user_room 테이블을 이용해 연결

// 요청 수락 및 거절 api
module.exports = async (req, res) => {
  console.log('reqPermisstionAPI')
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      return res.status(401).json({ message: 'you should renew your access token' });
    }

    if (!userInfo) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    
    const { candidate_id, room_id, is_accepted } = req.body;
    
    const myDogs = await dog.findAll({
      where: {
          user_id: candidate_id,
      },
    })

    if (is_accepted) {  // 수락이면 생성
      // 유저와 방의 join 테이블 생성
      await user_room.create({
        user_id: candidate_id,
        room_id: room_id,
      });

      // 유저와 강아지의 join 테이블 생성
      myDogs.forEach(async (el) => {
        await room_dog.create({
          room_id: room_id,
          dog_id: el.dataValues.id,
        })
      })
    }
    // 아래부터 해당하는 req 전부 삭제
    await room_join_req
      .destroy({
        where: { user_id: candidate_id, room_id: room_id },
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'bad request' });
      });
    
    myDogs.forEach(async (el) => {
      await room_join_req_dog
      .destroy({
        where: { dog_id: el.dataValues.id, room_id },
      })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'bad request' });
      });  
    })

    return res.status(200).json({ message: 'ok' });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server err' });
  }
};

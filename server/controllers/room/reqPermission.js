const { user_room } = require('../../models');
const { room_join_req } = require('../../models');

// reqPermission의 역할
// 유저 인증을 하지 않고, room 정보와 room에 들어가려는 유저의 정보, 요청을 수락하는 여부를 body로 받아서
// user정보와 room의 정보를 user_room 테이블을 이용해 연결

// 요청 수락 및 거절 api
module.exports = async (req, res) => {
  const { candidate_id, room_id, is_accepted } = req.body;

  try {
    if (is_accepted) {
      await user_room.create({
        user_id: candidate_id,
        room_id: room_id,
      });
    }
    await room_join_req.destroy({
      where: { user_id: candidate_id, room_id: room_id },
    })
    .then((result) => {
      console.log(result);
    })
    res.status(200).json({ message: 'ok' });
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server err' });
  }
};
const { room_join_req } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 1. 현재는 신청버튼을 누르자마자 바로 수락된다.
// 2. 권한설정은 반드시 해줘야한다.
// 3. 그럼 누르자마자 바로 수락되면 안된다...?
// 4. 그럼 DB 스키마에 모임방 Req Table이 있어야 함.
module.exports = async (req, res) => {
  const roomId = req.params.room_id;
  const userInfo = await isAuthorized(req);

  if (!userInfo) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const reqInfo = await room_join_req.findOne({
    where: {
      user_id: userInfo.id,
      room_id: roomId,
    },
  });

  if (!reqInfo) {
    await room_join_req.create({
      user_id: userInfo.id,
      room_id: roomId,
    });

    return res.status(200).json({ message: 'ok' });
  }

  return res.status(400).json({ message: 'you already sended join request' });
};

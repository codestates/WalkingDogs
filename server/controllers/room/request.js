const { room_join_req } = require('../../models');
const { room } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// --------------- request의 역할
// 모든 유저가 room join request에 대한 요청이 가능하다.
// 리더의 정보를 token으로 받아서
// 그 리더가 모임의 리더로 있는 방들을 전부 조회
// 그 방에 들어온 join 요청을 또 조회 => room_join_req테이블에서 조회
// 조회한 정보들을 return
// ---------------------------------------------------------

module.exports = async (req, res) => {
  const leaderInfo = await isAuthorized(req);
  console.log(leaderInfo);

  if (!leaderInfo) {
    res.status(401).json({ message: 'unauthorized' });
  }

  try {
    let arr = [];
    const roomInfo = await room.findAll({
      where: { leader_id: leaderInfo.id },
    });
    if (roomInfo) {
      for (let i = 0; i < roomInfo.length; i++) {
        let roomId = roomInfo[i].dataValues.id;
        await room_join_req
          .findAll({
            where: { room_id: roomId },
          })
          .then(result => {
            arr.push({ roomData: result });
          });
      }
    }
    console.log(arr);
    res.status(200).json({ data: arr, message: 'ok' });
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server err' });
  }
};
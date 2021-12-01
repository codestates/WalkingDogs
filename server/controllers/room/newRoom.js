const { room } = require('../../models');
const { room_dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 남은 것
// 1. meeting_time 보내기
// 현재는 meeting_time new Date()로 테스트함
// Client에서 미팅 시작 시간을 정해서 보내주면 그것으로 저장

// 2. address 저장하기
// 현재는 청담동으로 테스트함
// Client에서 보내준 위도와 경도를 받아서 카카오톡 지도 API로 주소를 검색 후, DB에 저장한다.
// 좌표로 주소 변환하기(https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address)
module.exports = async (req, res) => {
  const {
    latitude,
    longitude,
    selected_dogs,
    room_title,
    member_limit,
    meeting_time,
  } = req.body;
  const userInfo = await isAuthorized(req);

  if (!userInfo) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const createdRoom = await room.create({
    title: room_title,
    member_limit: member_limit ? member_limit : 4,
    leader_id: userInfo.id,
    latitude: latitude,
    longitude: longitude,
    meeting_time: new Date(),
    address: '청담동',
  });

  for (let i = 0; i < selected_dogs.length; i++) {
    await room_dog.create({
      dog_id: selected_dogs[i].id,
      room_id: createdRoom.dataValues.id,
    });
  }

  return res.status(200).json({ message: 'ok' });
};

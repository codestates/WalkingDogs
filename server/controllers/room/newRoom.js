const { room } = require('../../models');
const { room_dog } = require('../../models');
const { user_room } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 남은 것

// 1. meeting_time 보내기
// 현재는 meeting_time new Date()로 테스트함
// Client에서 미팅 시작 시간을 정해서 보내주면 그것으로 저장

// 1 - 1. client에서 DATE 형식에 맞게 meeting_time을 보내줘야 함.
//        또는 client에서 받아온 meeting_time을 서버에서 DATE형식으로 바꿔야 함.

// 2. address 저장하기
// 현재는 청담동으로 테스트함
// Client에서 보내준 위도와 경도를 받아서 카카오톡 지도 API로 주소를 검색 후, DB에 저장한다.
// 좌표로 주소 변환하기(https://developers.kakao.com/docs/latest/ko/local/dev-guide#coord-to-address)

// 2 - 1. address 저장할 때, 도, 시, 동 등 행정구역별로 나누어서 저장할 지 결정하기 -> 통째로 저장하기

module.exports = async (req, res) => {
  console.log('newRoomAPI');
  
  try {
    const {
      latitude,
      longitude,
      address,
      selected_dogs,
      room_title,
      member_limit,
      meeting_time
    } = req.body;
    console.log('address: ', address);
    console.log('address.road_address: ', address.road_address)
    const userInfo = await isAuthorized(req);
    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    //-------------------------------------
    // 카카오 api 요청 보내는 수정 전 코드
    //--------------------------------------
    // const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}&input_coord=WGS84`;

    // if (!userInfo) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // await axios.get(url, { headers: { Authorization: 'KakaoAK ' + `${process.env.KAKAO_REST_API_KEY}` }})
    // // await axios.get(url, { headers: { Authorization: 'KakaoAK ' + `8be48eec2d2c5c58e770b9b8039956` }})
    // .then((result) => {
    //   if (result.data.documents) {
    //     console.log(result.data.documents[0]);
    //     address = result.data.documents[0];
    //   } else {
    //     res.status(400).json({ message: 'not an appropriate coordinate'})
    //   }

    // })
    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json({ message: 'server error' });
    // })

    if (!userInfo) {
      res.status(401).json({ message: 'unauthorized' });
    }

    // console.log(meeting_time)

    const roomInfo = await room.findAll({
      where: {
        title: room_title
      }
    });
    // console.log('roomInfo : \n', roomInfo);

    // room_title이 데이터베이스에 이미 존재할 경우 조건문을 통해서 분기시켰습니다.
    // createRoom을 할 때, user_room에 leader_id에 해당하는 유저를 추가해야 하는지 test하기
    if (roomInfo.length !== 0) {
      res.status(409).json({ message: 'conflict' });
    } else {
      const createdRoom = await room.create({
        title: room_title,
        member_limit: member_limit ? member_limit : 4,
        leader_id: userInfo.id,
        latitude: latitude,
        longitude: longitude,
        meeting_time: meeting_time,
        address: address.address.road_address !== null && !address.address.road_address ? address.address.road_address.address_name : address.address.address.address_name,
        region_1depth_name: address.address.address.region_1depth_name,
        region_2depth_name: address.address.address.region_2depth_name,
        region_3depth_name: address.address.address.region_3depth_name,
      });

      if (!createdRoom) {
        res.status(400).json({ message: 'bad request' });
      }

      const createdUserRoom = await user_room.create({
        user_id: userInfo.id,
        room_id: createdRoom.dataValues.id
      });

      // console.log(createdRoom)
      // console.log(createdUserRoom)

      for (let i = 0; i < selected_dogs.length; i++) {
        const dogInfo = await room_dog.create({
          dog_id: selected_dogs[i].id,
          room_id: createdRoom.dataValues.id
        });

        // console.log(dogInfo)

        if (!dogInfo) {
          res.status(400).json({ message: 'bad request' });
        }
      }
      return res.status(200).json({ message: 'ok' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
};

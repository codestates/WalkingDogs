const { room, user, user_room } = require('../../models');
const haversine = require('haversine');

module.exports = async (req, res) => {
  // const { lat, lon } = req.query;

  //----------------------------------
  // haversine 예시
  //-----------------------------------

  // const  kyobo = { lat: 37.504030, lon: 127.024099} // 교보 문고 위도/경도
  // const gangnam = (37.497175,127.027926) // 강남역 위도 경도
  // console.log(haversine(kyobo, gangnam) * 1000)

  // // 교보문고
  // const start = {
  //   latitude: 37.50403,
  //   longitude: 127.024099,
  // };

  // // 강남역
  // const end = {
  //   latitude: 37.497175,
  //   longitude: 127.027926,
  // };

  // console.log(haversine(start, end)); // --> 0.8336591732367004
  // console.log(haversine(start, end, { unit: 'mile' })); // --> 0.5181745920604823
  // console.log(haversine(start, end, { unit: 'meter' })); // --> 833.6591732367003
  // console.log(haversine(start, end, { threshold: 1 })); // --> true
  // console.log(haversine(start, end, { threshold: 1, unit: 'mile' })); //--> true
  // console.log(haversine(start, end, { threshold: 1, unit: 'meter' })); // --> false

  // console.log(haversine((testLat, testLon), (37.497175,127.027926))) * 1000

  //------------------------------------------
  // 수정한 코드
  //-------------------------------------------

  // room하고 user가 leader_id를 통해서 연결되어 있다.
  // room과 user를 join하면 해당 room에 leader에 대한 정보만 들어온다. (나머지 유저에 대한 정보도 들어와야 함)

  // const users = await User.findAll({ include: { model: Tool, as: 'Instruments',
  // include: { model: Teacher,
  // include: [ /* etc */ ] } } });
  try {
    const [lat, lon] = [
      parseFloat(req.query.latitude),
      parseFloat(req.query.longitude),
    ];
    const result = [];

    // roomInfo 변수를 안써도 되지 않을까..?
    await room
      .findAll({
        include: { model: user_room, include: user },
      })
      .then(rooms => {
        for (let i = 0; i < rooms.length; i++) {
          const latitude = rooms[i].dataValues.latitude;
          const longitude = rooms[i].dataValues.longitude;
          const dist = haversine(
            { latitude: latitude, longitude: longitude },
            { latitude: lat, longitude: lon },
            { unit: 'meter' },
          );
          if (dist <= 1500) {
            result.push(rooms[i]);
          }
        }
        return res.status(200).json({ rooms: result, message: 'ok' });
      })
      .catch(err => {
        console.log(err);
        return res.status(400).json({ message: 'bad request' });
      });
    // if (!roomInfo) {
    //   return res.status(400).json({ message: 'bad request' });
    // } else {
    //   return res.status(200).json({ rooms: result, message: 'ok' });
    // }
  } catch (err) {
    console.error;
    return res.status(500).json({ message: 'server error' });
  }
};

//---------------------------------
// 수정 전 코드
//---------------------------------

// await room.findAll({
//   attributes: {
//     include: [
//       [
//         haversine(
//           {
//             // start
//             latitude: Sequelize.col('latitude'),
//             longitude: Sequelize.col('longitude'),
//           },
//           {
//             // end
//             latitude: lat,
//             longitude: lon,
//           },
//           { unit: 'meter' },
//         ),
//         'distance',
//       ],
//     ],
//   },
// });

//   console.log(roomInfo.coordinates);
// console.log(roomInfo);

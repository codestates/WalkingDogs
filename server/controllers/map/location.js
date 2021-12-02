const { room } = require('../../models');
const { Sequelize } = require('sequelize');
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

  const [lat, lon] = [parseFloat(req.query.lat), parseFloat(req.query.lon)];
  const result = [];
  try {
    await room.findAll().then(rooms => {
      for (let i = 0; i < rooms.length; i++) {
        const latitude = rooms[i].dataValues.latitude;
        const longitude = rooms[i].dataValues.longitude;
        const dist = haversine(
          { latitude, longitude },
          { latitude: lat, longitude: lon },
          { unit: 'meter' },
        );
        if (dist <= 5000) {
          result.push(rooms[i]);
        }
      }
    });

    // console.log(result);
    res.status(200).json({ data: result, message: 'ok' });
  } catch (err) {
    console.error;
    res.status(400).json({ message: 'bad request' });
  }

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
};

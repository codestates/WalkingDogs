const { room, user, user_room, room_dog, dog } = require('../../models');
const haversine = require('haversine');

module.exports = async (req, res) => {
  console.log('locationAPI')
  try {

    if(!req.query.isSearch){
      const [lat, lon] = [
        parseFloat(req.query.latitude),
        parseFloat(req.query.longitude),
      ];
      const result = [];
  
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
    }
    else {
      await room
        .findAll({
          include: [
            { model: user_room, include: user },
            { model: room_dog, include: dog },
          ],
        })
        .then(rooms => {
          return res.status(200).json({ rooms, message: 'ok' })
        })
        .catch(err => {
          console.log(err);
          return res.status(400).json({ message: 'bad request' })
        })
      
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'server error' });
  }
};

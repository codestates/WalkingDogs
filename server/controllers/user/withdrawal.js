// const { EmptyResultError } = require('sequelize/dist');
const {
  user,
  room,
  user_room,
  room_join_req,
  dog,
  comment,
} = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
require('dotenv').config();

// 2021.12.1 완료
module.exports = async (req, res) => {
//   const token = req.cookies['accessToken'];
  const decoded = await isAuthorized(req);
//   console.log(decoded)
  if (decoded.accessToken) {
    return res.status(401).json({ message: 'you should renew your access token' });
  }
  try {
    const userId = decoded.id;
    // console.log(userId)
    const userInfo = await user.findOne({
      where: {
        id: userId,
      },
    });
    // console.log(userInfo);
    if(!userInfo) {
        return res.status(401).json({ message: 'unauthorized' });
    }

    // room 테이블 + user_room 테이블
    const roomInfo = await user_room.findAll({
      where: {
        user_id: userInfo.id,
      },
      include: room,
    });
    console.log(roomInfo);
    if (!roomInfo) {
        return res.status(400).json({ message: 'bad request' })
    } else {
      for (let i = 0; i < roomInfo.length; i++) {
        if (roomInfo[i].dataValues.leader_id === userInfo.id) {
          // 이 유저가 room의 리더일 경우
          await room.destroy({
            where: {
              id: roomInfo[i].dataValues.room_id,
            },
          });
          // user_room 테이블에서도 삭제
          await user_room.destroy({
            where: {
              user_id: userInfo.dataValues.id,
            },
          });
        } else {
          // 리더가 아닐 경우
          await user_room.destroy({
            where: {
              user_id: userInfo.dataValues.id,
            },
          });
        }
      }
    }

    // room_join_req 테이블
    const roomJoinReqInfo = await room_join_req.destroy({
      where: {
        user_id: userInfo.dataValues.id,
      },
    });
    console.log('roomJoinReqInfo: ', roomJoinReqInfo)
    if (typeof roomJoinReqInfo !== 'number') {
        return res.status(400).json({ message: 'bad request' })
    }

    // dog 테이블
    const dogInfo = await dog.destroy({
      where: {
        user_id: userInfo.dataValues.id,
      },
    });
    if (!dogInfo) {
        return res.status(400).json({ message: 'bad request' })
    }

    // // comment 테이블
    // const count = await user.update(
    //   { username: 'anonymous',
    //   email: ''
    //  },
    //   {
    //     where: {
    //       id: userInfo.dataValues.id,
    //     },
    //   },
    // );
    // if (!count) {
    //     return res.status(400).json({ message: 'bad request' })
    // }
    
    // user 테이블
    const withdraw = await user.update({
        is_member: false
    },
    {
        where: {
            id: userId
        }
    });
    if(!withdraw) {
        return res.status(400).json({ message: 'bad request' })
    }
  } catch (err) {
    console.error;
    return res.status(500).json({ message: 'server error' });
  }

  return res.status(200).json({ message: 'ok' });
};

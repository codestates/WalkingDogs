const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 2021/12/03 수정
// 성공(200)시 response에 request로 받은 image와 username, dogs를 그대로 보내주도록 수정했습니다.
// 이렇게 수정해도 괜찮은 걸까요?
module.exports = async (req, res) => {
  console.log('profileAPI');
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      return res
        .status(401)
        .json({ message: 'you should renew your access token' });
    }

    // console.log('userInfo : ', userInfo);
    if (!userInfo) {
      return res.status(401).json('this is an invalid token');
    } else {
      const { username, dogs, image } = req.body;

      // console.log(dogs);

      if (username) {
        // 들어온 username이 있다면
        await user
          .update(
            { username },
            {
              where: {
                id: userInfo.id,
              },
            },
          )
          .catch(err => {
            console.log(err);
            return res.status(400).json({ message: 'bad request' });
          });
      }

      if (image) {
        // 들어온 image가 있다면
        await user
          .update(
            { image },
            {
              where: {
                id: userInfo.id,
              },
            },
          )
          .catch(err => {
            console.log(err);
            return res.status(400).json({ message: 'bad request' });
          });
      }

      if (dogs) {
        // 들어온 dogs가 있다면
        const stack = []; // 빈 stack을 선언
        for (let i = 0; i < dogs.length; i++) {
          // dogs의 idx로 참조해 각 강아지들을 선택
          // id가 null인 강아지? === 새로 추가된 강아지
          const selectedDog = await dog.findOne({
            where: {
              id: dogs[i].id ? dogs[i].id : null,
            },
          });

          // selectedDog이 있다면? 원래 내가 등록했던 강아지
          if (selectedDog) {
            // 그 강아지를 stack에 잠시 저장하고
            stack.push(dogs[i].id);
            // 강아지 정보를 주어진대로 업데이트
            await dog
              .update(
                {
                  name: dogs[i].name,
                  breed: dogs[i].breed,
                  image: dogs[i].image,
                  neutering: dogs[i].neutering,
                },
                {
                  where: {
                    id: selectedDog.dataValues.id,
                  },
                },
              )
              .catch(err => {
                console.log(err);
                return res.status(400).json({ message: 'bad request' });
              });
          } else {
            // 없는 강아지라면 새로 만들어준다.
            await dog
              .create({
                user_id: userInfo.id,
                name: dogs[i].name,
                breed: dogs[i].breed,
                image: dogs[i].image,
                neutering: dogs[i].neutering,
              })
              .then(result => {
                // stack에 푸쉬
                stack.push(result.dataValues.id);
              })
              .catch(err => {
                console.log(err);
                return res.status(400).json({ message: 'bad request' });
              });
          }
        }

        // 모든 강아지 목록을 검색하고
        const dogList = await dog.findAll({
          where: {
            user_id: userInfo.id,
          },
        });

        // 강아지 목록이 없다면?
        if (!dogList) {
          return res.status(200).json({
            data: {
              image: updatedUserInfo.image,
              username: updatedUserInfo.username,
              dogs: [],
            },
            message: 'ok',
          });
        }

        // 강아지 목록이 있는 경우에는 전체 강아지 List만큼
        for (let i = 0; i < dogList.length; i++) {
          // 만약 아까 update 또는 create 해준 강아지가 stack에 없다면? -> 삭제한 강아지
          if (!stack.includes(dogList[i].dataValues.id)) {
            // 강아지 목록을 삭제해준다.
            await dog
              .destroy({
                where: {
                  id: dogList[i].dataValues.id,
                },
              })
              .catch(err => {
                console.log(err);
                return res.status(400).json({ message: 'failed to delete' });
              });
          }
        }
      } else {
        // 들어온 강아지가 애초에 없으면
        await dog
          .destroy({
            where: {
              user_id: userInfo.id,
            },
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({ message: 'failed to delete' });
          });
      }

      // 수정된 유저의 정보
      const updatedUserInfo = await user.findOne({
        where: {
          id: userInfo.id,
        },
      });

      const updatedDogInfo = await dog.findAll({
        where: {
          user_id: userInfo.id,
        },
      });

      // res.status(200).end();
      return res.status(200).json({
        data: {
          image: updatedUserInfo.image,
          username: updatedUserInfo.username,
          dogs: [...updatedDogInfo],
        },
        message: 'ok',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'server error' });
  }
};

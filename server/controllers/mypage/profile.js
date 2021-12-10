const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 2021/12/03 수정
// 성공(200)시 response에 request로 받은 image와 username, dogs를 그대로 보내주도록 수정했습니다.
// 이렇게 수정해도 괜찮은 걸까요?
module.exports = async (req, res) => {
  try {
    const userInfo = await isAuthorized(req);

    if (userInfo.accessToken) {
      res.status(401).json({ message: 'you should renew your access token' });
    }

    // console.log('userInfo : ', userInfo);
    if (!userInfo) {
      res.status(401).json('this is an invalid token');
    } else {
      const { username, dogs, image } = req.body;

      // console.log(dogs);

      if (username) {
        const usernameInfo = await user.update(
          { username },
          {
            where: {
              id: userInfo.id,
            },
          },
        );
        if (!usernameInfo) {
          res.status(400).json({ message: 'bad request' });
        }
      }

      if (image) {
        const imageInfo = await user.update(
          { image },
          {
            where: {
              id: userInfo.id,
            },
          },
        );
        if (!imageInfo) {
          res.status(400).json({ message: 'bad request' });
        }
      }

      if (dogs) {
        const stack = [];
        for (let i = 0; i < dogs.length; i++) {
          const selectedDog = await dog.findOne({
            where: {
              id: dogs[i].id ? dogs[i].id : null,
            },
          });

          if (selectedDog) {
            stack.push(dogs[i].id);
            const updateDogs = await dog.update(
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
            );
            if (!updateDogs) {
              res.status(400).json({ message: 'bad request' });
            }
          } else {
            const createDogs = await dog
              .create({
                user_id: userInfo.id,
                name: dogs[i].name,
                breed: dogs[i].breed,
                image: dogs[i].image,
                neutering: dogs[i].neutering,
              })
              .then(result => {
                stack.push(result.dataValues.id);
              });
            if (!createDogs) {
              res.status(400).json({ message: 'bad request' });
            }
          }
        }

        const dogList = await dog.findAll({
          where: {
            user_id: userInfo.id,
          },
        });
        if (!dogList) {
          res.status(400).json({ message: 'bad request' });
        }
        for (let i = 0; i < dogList.length; i++) {
          if (!stack.includes(dogList[i].dataValues.id)) {
            await dog
              .destroy({
                where: {
                  id: dogList[i].dataValues.id,
                },
              })
              .catch(err => {
                console.log(err);
                res.status(400).json({ message: 'failed to delete' });
              });
          }
        }
      } else {
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

      const updatedUserInfo = await user.findOne({
        where: {
          id: userInfo.id,
        },
      });
      if (!updatedUserInfo) {
        res.status(400).json({ message: 'bad request' });
      }

      const updatedDogInfo = await dog.findAll({
        where: {
          user_id: userInfo.id,
        },
      });
      if (!updatedDogInfo) {
        res.status(400).json({ message: 'bad request' });
      }

      // res.status(200).end();
      res.status(200).json({
        data: {
          image: updatedUserInfo.image,
          username: updatedUserInfo.username,
          dogs: [...updatedDogInfo],
        },
        message: 'ok',
      });
    }
  } catch (err) {
    console.error;
    res.status(500).json({ message: 'server error' });
  }
};

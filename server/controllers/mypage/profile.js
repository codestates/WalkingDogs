const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 2021/12/03 수정
// 성공(200)시 response에 request로 받은 image와 username, dogs를 그대로 보내주도록 수정했습니다.
// 이렇게 수정해도 괜찮은 걸까요?
module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  console.log(req.cookies);
  if (!userInfo) {
    res.status(401).send('this is an invalid token');
  } else {
    const { username, dogs, image } = req.body;

    if (username) {
      await user.update(
        { username },
        {
          where: {
            id: userInfo.id,
          },
        },
      );
    }
    if (image) {
      await user.update(
        { image },
        {
          where: {
            id: userInfo.id,
          },
        },
      );
    }

    if (dogs) {
      const stack = [];
      for (let i = 0; i < dogs.length; i++) {
        stack.push(dogs[i].id);
        const selectedDog = await dog.findOne({
          where: {
            id: dogs[i].id,
          },
        });

        if (selectedDog) {
          await dog.update(
            {
              name: dogs[i].name,
              breed: dogs[i].breed,
              image: dogs[i].image,
              gender: dogs[i].gender,
            },
            {
              where: {
                id: selectedDog.dataValues.id,
              },
            },
          );
        } else {
          await dog
            .create({
              user_id: userInfo.id,
              name: dogs[i].name,
              breed: dogs[i].breed,
              image: dogs[i].image,
              gender: dogs[i].gender,
            })
            .then(result => {
              stack.push(result.dataValues.id);
            });
        }
      }

      const dogList = await dog.findAll({
        where: {
          user_id: userInfo.id,
        },
      });
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
            });
        }
      }
    } else {
      await dog.destroy({
        where: {
          user_id: userInfo.id,
        },
      });
    }

    // res.status(200).end();
    res.status(200).send({
      data: {
        image: image,
        username: username,
        dogs: dogs
      },
      message: 'ok',
    });
  }
};

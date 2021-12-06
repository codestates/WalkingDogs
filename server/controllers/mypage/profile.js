const { user, dog } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

// 2021/12/03 수정
// 성공(200)시 response에 request로 받은 image와 username, dogs를 그대로 보내주도록 수정했습니다.
// 이렇게 수정해도 괜찮은 걸까요?
module.exports = async (req, res) => {
  const userInfo = await isAuthorized(req);
  console.log('userInfo : ', userInfo);
  if (!userInfo) {
    res.status(401).send('this is an invalid token');
  } else {
    const { username, dogs, image } = req.body;

    console.log(dogs)

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
        const selectedDog = await dog.findOne({
          where: {
            id: dogs[i].id ? dogs[i].id : null,
          },
        });
        
        if (selectedDog) {
          stack.push(dogs[i].id);
          await dog.update(
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
        }
        else {
          await dog
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
    
    const updatedUserInfo = await user.findOne({
      where: {
        id: userInfo.id,
      },
    })

    const updatedDogInfo = await dog.findAll({
      where: {
        user_id: userInfo.id,
      }
    })
    
    // res.status(200).end();
    res.status(200).send({
      data: {
        image: updatedUserInfo.image,
        username: updatedUserInfo.username,
        dogs: [ ...updatedDogInfo ]
      },
      message: 'ok',
    });
  }
};

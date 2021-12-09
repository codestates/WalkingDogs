const { logout } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
require('dotenv').config();

// 2021.12.1 완료
module.exports = async (req, res) => {
  // const token = req.cookies['accessToken'];
  const decoded = await isAuthorized(req);

  // 액세스 토큰은 만료되었는데, 리프레쉬 토큰은 유효한 상태
  // if(decoded.accessToken) {
  //   res.status(400).json({ message: 'you should renew your access token' });
  // }
  
  // 액세스 토큰과 리프레쉬 토큰이 모두 만료된 상태 (decoded === null)
  // 유효하지 않는 유저이기 때문에 401에러를 반환
  console.log(decoded);  
  if (!decoded) {
    return res.status(401).json({ message: 'authorization failed' });
  } else {
    res.clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    res.clearCookie('refreshToken', {
      secure: true,
      sameSite: 'none',
    })
    return res.status(200).json({message: 'ok'})
  }
}
  //   const isLogout = await logout.findOne({
  //     where: { token: token },
  //   });

  //   if (!isLogout) {
  //     //로그아웃에 없을 때, 저장
  //     await logout.create({ token: token });

  //     return res.status(200).json({ message: 'ok' });
  //   } else {
  //     // 로그아웃 테이블에 로그아웃한 유저가 존재하면
  //     // 단순히 400에러가 아니라 로그아웃을 시켜줘야함
  //     return res
  //       .status(400)
  //       .json({ message: 'bad request! you already logouted!' });
  //   }
  // }

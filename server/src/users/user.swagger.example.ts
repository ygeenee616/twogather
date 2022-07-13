export class UserResExample {
  public readonly signup = {
    status: 201,
    description: '유저 생성 완료',
    success: true,
  };
  public readonly login = {
    statusCode: 200,
    message: '로그인 성공',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Q1OTU0QG5hdmVyLmNvbSIsImlhdCI6MTY1NzczNzY2MSwiZXhwIjoxNjU3NzczNjYxfQ.BHl0INbKtM258Rao4juL8LZ0z8_LHJVslJZneo4IjZ8',
    success: true,
  };

  public readonly getAll = {
    statusCode: 200,
    message: '유저 조회 성공',
    data: [
      {
        id: 41,
        nickname: 'test678',
        email: 'test678@naver.com',
        password:
          '$2a$10$NWv0JutXwYJUaA8oUX45weRdBNuTpO3AjjlizhdSpUDcwjNwV2k7q',
        name: null,
        sex: null,
        profileImage: null,
        phoneNumber: null,
        businessNumber: null,
        businessName: null,
        businessAddress: null,
        accountNumber: null,
      },
      {
        id: 43,
        nickname: 'test6789',
        email: 'test6789@naver.com',
        password:
          '$2a$10$WKS7MfQZiVoZxvvIrm3FJ.f.o8lqTjPChx2ZL3ze.IifGLqV3SoRm',
        name: null,
        sex: null,
        profileImage: null,
        phoneNumber: null,
        businessNumber: null,
        businessName: null,
        businessAddress: null,
        accountNumber: null,
      },
    ],
  };

  public readonly getOneById: JSON;

  public readonly getMyInfo;

  public readonly getOneByEmail: JSON;

  public readonly updateUserInfo: JSON;

  public readonly removeUser: JSON;

  public readonly wihdrawal: JSON;
}

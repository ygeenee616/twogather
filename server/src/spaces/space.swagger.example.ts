export class SpaceResExample {
  public readonly create = {
    status: 201,
    description: '새로운 공간 등록 완료',
    success: true,
    data: {
      type: '세미나12312실',
      address1: '서울',
      address2: '노원구',
      address3: '192번지',
      name: '좋은 세미나실',
      notice: '이곳은 아주 좋은 세미나실이랍니다~!21312',
      intro: '안녕하세요. ㅋㅋㅋㅋ',
      user: {
        id: 74,
        isAdmin: false,
        loginType: 'local',
        nickname: 'TESTER',
        email: 'tester@t.com',
        password: '****',
        name: 'TWOGATHER',
        sex: null,
        profileImage: null,
        phoneNumber: '01012345678',
        businessNumber: '1234567890',
        businessName: '테트리스',
        businessAddress: null,
        accountNumber: '',
      },
      id: 94,
    },
  };
  public readonly findAll = {
    status: 200,
    description: '전체 공간 목록 조회 성공',
    success: true,
    data: {
      spaces: {
        totalPage: 3,
        paginatedSpaces: [
          {
            id: 94,
            type: '세미나12312실',
            address1: '서울',
            address2: '노원구',
            address3: '192번지',
            name: '좋은 세미나실',
            notice: '이곳은 아주 좋은 세미나실이랍니다~!21312',
            intro: '안녕하세요. ㅋㅋㅋㅋ',
            rooms: [],
          },
          {
            id: 93,
            type: '',
            address1: '',
            address2: '',
            address3: '',
            name: 'asd',
            notice: 'asdas',
            intro: 'asd',
            rooms: [
              {
                id: 73,
                name: 'ㅇ',
                capacity: 11,
                price: 11,
                description: 'ㅇ',
              },
            ],
          },
          {
            id: 89,
            type: '',
            address1: '',
            address2: '',
            address3: '',
            name: '좋은 세미나실',
            notice: '이곳은 아주 좋은 세미나실이랍니다~!21312',
            intro: '안녕하세요. ㅋㅋㅋㅋ',
            rooms: [
              {
                id: 68,
                name: 'rzzz안녕ㅋㅋㅋz이제는  안녕',
                capacity: 6,
                price: 6000,
                description: '6인실!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ!!',
              },
            ],
          },
          {
            id: 86,
            type: '',
            address1: '',
            address2: '',
            address3: '',
            name: '좋은 세미나실',
            notice: '이곳은 아주 좋은 세미나실이랍니다~! 자주 이용해주세요!!',
            intro: '안녕하세요. ㅋㅋㅋㅋ',
            rooms: [
              {
                id: 63,
                name: '수정된 좋은방3',
                capacity: 5,
                price: 4000,
                description: '수정된 좋은방3은 4,000원에 5명 수용가능합니다.',
              },
              {
                id: 64,
                name: 'ㅇㄹㅇㅁㄴㅇㅇㄹ',
                capacity: 6,
                price: 6000,
                description: '6인실!!!',
              },
            ],
          },
        ],
      },
    },
  };

  public readonly findOne = {
    status: 200,
    success: true,
    description: 'ID로 공간 조회 성공',
    data: {
      id: 94,
      type: '세미나12312실',
      address1: '서울',
      address2: '노원구',
      address3: '192번지',
      name: '좋은 세미나실',
      notice: '이곳은 아주 좋은 세미나실이랍니다~!21312',
      intro: '안녕하세요. ㅋㅋㅋㅋ',
      user: {
        id: 74,
        isAdmin: false,
        loginType: 'local',
        nickname: 'TESTER',
        email: 'tester@t.com',
        password: '****',
        name: 'TWOGATHER',
        sex: null,
        profileImage: null,
        phoneNumber: '01012345678',
        businessNumber: '1234567890',
        businessName: '테트리스',
        businessAddress: null,
        accountNumber: '',
      },
      rooms: [],
      qnas: [],
      hashtags: [],
      reviews: [],
    },
  };

  public readonly findByType = {
    status: 200,
    description: '유형별 공간 목록 조회',
    data: {
      status: 200,
      success: true,
      description: 'ID로 공간 조회 성공',
      data: {
        id: 26,
        type: '세미나실',
        address: '서울시 어쩌구',
        name: '좋은 세미나실',
        notice: '공지사항 어쩌구 저쩌구',
        intro: '넓고 깔끔',
        user: {
          id: 57,
          isAdmin: false,
          nickname: 'test2',
          email: 'test2@naver.com',
          password: '****',
          name: '김태훈',
          sex: null,
          profileImage: null,
          phoneNumber: null,
          businessNumber: null,
          businessName: null,
          businessAddress: null,
          accountNumber: null,
          reservations: [],
          spaces: [
            {
              id: 26,
              type: '세미나실',
              address: '서울시 어쩌구',
              name: '좋은 세미나실',
              notice: '공지사항 어쩌구 저쩌구',
              intro: '넓고 깔끔',
            },
            {
              id: 25,
              type: '스터디룸',
              address: '여기서 멀어요',
              name: '스터디룸 ㅋㅋ',
              notice: '공지사항 어쩌구 저쩌구',
              intro: '넓고 깔끔',
            },
          ],
        },
        hashtags: [],
      },
    },
  };

  public readonly findMySpaces = {
    status: 200,
    success: true,
    description: '내가 생성한 공간 목록 조회 성공',
    data: [
      {
        id: 83,
        type: '',
        address1: '',
        address2: '',
        address3: '',
        name: '종원종원룸',
        notice: '눈물주의 배꼽빠짐 개그맨임',
        intro: '종원님이 숨어있어요',
        rooms: [
          {
            id: 75,
            name: '예정룸',
            capacity: 2,
            price: 2000,
            description: '스튜디오',
          },
          {
            id: 76,
            name: '연진룸',
            capacity: 6,
            price: 3000,
            description: '스튜디오',
          },
          {
            id: 77,
            name: '미지룸',
            capacity: 5,
            price: 2500,
            description: '스튜디오',
          },
          {
            id: 79,
            name: 'asa',
            capacity: 11,
            price: 1111111,
            description: 'ㅁㅇㄴ',
          },
        ],
      },
      {
        id: 84,
        type: '',
        address1: '',
        address2: '',
        address3: '',
        name: 'asd',
        notice: 'ㅁㅇㅁㄴㅇ',
        intro: 'asdas',
        rooms: [
          {
            id: 78,
            name: '테스트룸',
            capacity: 4,
            price: 2800,
            description: '테스트',
          },
        ],
      },
      {
        id: 94,
        type: '세미나12312실',
        address1: '서울',
        address2: '노원구',
        address3: '192번지',
        name: '좋은 세미나실',
        notice: '이곳은 아주 좋은 세미나실이랍니다~!21312',
        intro: '안녕하세요. ㅋㅋㅋㅋ',
        rooms: [],
      },
    ],
  };

  public readonly updateSpace = {
    status: 201,
    description: 'ID로 특정 공간 정보 수정',
    success: true,
    data: {
      affected: true,
    },
  };

  public readonly updateMySpace = {
    status: 201,
    description: '내 공간 정보 수정 성공',
    success: true,
    data: {
      affected: true,
    },
  };

  public readonly removeSpace = {
    status: 201,
    description: '특정 space 삭제 성공',
    success: true,
  };

  public readonly removeMySpace = {
    status: 201,
    description: '내 공간 삭제 성공',
    success: true,
  };
}

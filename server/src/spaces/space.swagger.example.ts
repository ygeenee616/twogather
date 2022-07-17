export class SpaceResExample {
  public readonly create = {
    status: 201,
    description: 'space 생성 완료',
    success: true,
    data: {
      status: 201,
      description: '새로운 공간 등록 완료',
      success: true,
      data: {
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
          password:
            '$2a$10$Omwa5FeAGh9Jieo2kPDa2O5vzIaYoxBbuhAVDCNTqNFCrkyleAKZy',
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
              id: 25,
              type: '스터디룸',
              address: '여기서 멀어요',
              name: '스터디룸 ㅋㅋ',
              notice: '공지사항 어쩌구 저쩌구',
              intro: '넓고 깔끔',
              hashtags: [],
            },
          ],
        },
        id: 26,
      },
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
            id: 49,
            type: '세미나실',
            address: '',
            name: 'asd',
            notice: 'asda',
            intro: 'asda',
            user: {
              id: 76,
              isAdmin: false,
              nickname: 'aaaa',
              email: '11@11.com',
              password:
                '$2a$10$Wf470a.QJtiqGSKFdeQr1OpWvtoejtSNRzKr6/5cXsSfjOQKf.ZRO',
              name: null,
              sex: null,
              profileImage: null,
              phoneNumber: null,
              businessNumber: null,
              businessName: null,
              businessAddress: null,
              accountNumber: null,
            },
          },
          {
            id: 48,
            type: '세미나실\n',
            address: '어딘가\n',
            name: '파티파티룸\n\n',
            notice: '졸리당\n',
            intro: '죠습니당\n',
            user: {
              id: 76,
              isAdmin: false,
              nickname: 'aaaa',
              email: '11@11.com',
              password:
                '$2a$10$Wf470a.QJtiqGSKFdeQr1OpWvtoejtSNRzKr6/5cXsSfjOQKf.ZRO',
              name: null,
              sex: null,
              profileImage: null,
              phoneNumber: null,
              businessNumber: null,
              businessName: null,
              businessAddress: null,
              accountNumber: null,
            },
          },
          {
            id: 47,
            type: '세미나실\n',
            address: '어딘가\n',
            name: '',
            notice: '졸리당\n',
            intro: '죠습니당\n',
            user: {
              id: 76,
              isAdmin: false,
              nickname: 'aaaa',
              email: '11@11.com',
              password:
                '$2a$10$Wf470a.QJtiqGSKFdeQr1OpWvtoejtSNRzKr6/5cXsSfjOQKf.ZRO',
              name: null,
              sex: null,
              profileImage: null,
              phoneNumber: null,
              businessNumber: null,
              businessName: null,
              businessAddress: null,
              accountNumber: null,
            },
          },
          {
            id: 46,
            type: '세미나실\n',
            address: '어딘가\n',
            name: null,
            notice: '졸리당\n',
            intro: '죠습니당\n',
            user: {
              id: 76,
              isAdmin: false,
              nickname: 'aaaa',
              email: '11@11.com',
              password:
                '$2a$10$Wf470a.QJtiqGSKFdeQr1OpWvtoejtSNRzKr6/5cXsSfjOQKf.ZRO',
              name: null,
              sex: null,
              profileImage: null,
              phoneNumber: null,
              businessNumber: null,
              businessName: null,
              businessAddress: null,
              accountNumber: null,
            },
          },
          {
            id: 45,
            type: '세미나실\n',
            address: '어딘가\n',
            name: null,
            notice: '졸리당\n',
            intro: '죠습니당\n',
            user: {
              id: 76,
              isAdmin: false,
              nickname: 'aaaa',
              email: '11@11.com',
              password:
                '$2a$10$Wf470a.QJtiqGSKFdeQr1OpWvtoejtSNRzKr6/5cXsSfjOQKf.ZRO',
              name: null,
              sex: null,
              profileImage: null,
              phoneNumber: null,
              businessNumber: null,
              businessName: null,
              businessAddress: null,
              accountNumber: null,
            },
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
        password:
          '$2a$10$Omwa5FeAGh9Jieo2kPDa2O5vzIaYoxBbuhAVDCNTqNFCrkyleAKZy',
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
          password:
            '$2a$10$Omwa5FeAGh9Jieo2kPDa2O5vzIaYoxBbuhAVDCNTqNFCrkyleAKZy',
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
    description: '내가 생성한 공간 목록 조회 성공',
    data: {
      status: 200,
      success: true,
      description: '내가 생성한 공간 목록 조회 성공',
      data: [
        {
          id: 25,
          type: '스터디룸',
          address: '여기서 멀어요',
          name: '스터디룸 ㅋㅋ',
          notice: '공지사항 어쩌구 저쩌구',
          intro: '넓고 깔끔',
          hashtags: [],
        },
        {
          id: 26,
          type: '세미나실',
          address: '서울시 어쩌구',
          name: '좋은 세미나실',
          notice: '공지사항 어쩌구 저쩌구',
          intro: '넓고 깔끔',
          hashtags: [],
        },
      ],
    },
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
    data: {
      status: 201,
      description: '내 공간 정보 수정 성공',
      success: true,
      data: {
        affected: true,
      },
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
    data: {
      status: 201,
      description: '내 공간 삭제 성공',
      success: true,
    },
  };
}

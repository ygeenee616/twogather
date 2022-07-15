export class SpaceResExample {
  public readonly create = {
    status: 201,
    description: 'space 생성 완료',
    success: true,
  };
  public readonly findAll = {
    status: 200,
    description: '전체 space 조회',
    data: [
      {
        id: 1,
        type: '스터디룸',
        address: '서울특별시 강남구 논현로 401',
        name: '서울 강남 스터디룸',
        notice: '공지사항1',
        intro:
          '안녕하세요 :) 2호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 1호점입니다.',
        hostId: 41,
      },
      {
        id: 2,
        type: '파티룸',
        address: '서울특별시 강남구 논현로 401',
        name: '서울 강남 바베큐 파티룸 루프탑',
        notice: '공지사항2',
        intro:
          '안녕하세요 :) 1호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 2호점입니다.',
        hostId: 43,
      },
    ],
  };
  public readonly getMySpaces = {
    status: 200,
    success: true,
    message: '내가 생성한 모든 space 조회 성공',
    data: [
      {
        id: 1,
        type: '스터디룸',
        address: '서울특별시 강남구 논현로 401',
        name: '서울 강남 스터디룸',
        notice: '공지사항1',
        intro:
          '안녕하세요 :) 2호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 1호점입니다.',
        hostId: 41,
      },
      {
        id: 2,
        type: '파티룸',
        address: '서울특별시 강남구 논현로 401',
        name: '서울 강남 바베큐 파티룸 루프탑',
        notice: '공지사항2',
        intro:
          '안녕하세요 :) 1호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 2호점입니다.',
        hostId: 43,
      },
    ],
  };
  public readonly findOne = {
    status: 200,
    success: true,
    message: '특정 space 조회 성공',
    data: {
      id: 1,
      type: '스터디룸',
      address: '서울특별시 강남구 논현로 401',
      name: '서울 강남 스터디룸',
      notice: '공지사항1',
      intro:
        '안녕하세요 :) 2호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 1호점입니다.',
      hostId: 41,
    },
  };
  public readonly updateSpace = {
    status: 201,
    description: 'space 정보 수정 성공',
    data: {
      id: 2,
      type: '파티룸',
      address: '서울특별시 강남구 논현로 401',
      name: '서울 강남 바베큐 파티룸 루프탑',
      notice: '공지사항2',
      intro:
        '안녕하세요 :) 1호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 2호점입니다.',
      hostId: 43,
    },
  };
  public readonly removeSpace = {
    status: 201,
    description: '특정 space 삭제 성공',
    success: true,
  };
}

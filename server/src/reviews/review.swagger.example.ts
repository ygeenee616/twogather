export class ReviewResExample {
  public readonly create = {
    status: 201,
    description: '새로운 리뷰 등록 완료',
    success: true,
    data: {
      id: 1,
      createdTime: '2022-07-16 02:30:00',
      content: '파티하기에 정말 좋은 장소였어요 추천합니다.',
      reservation: {
        id: 5,
        startTime: 'string',
        endTime: 'string',
        date: '2022-07-16',
        createdTime: '2022-07-16 02:30:00',
        user: {},
        room: {},
      },
    },
  };
  public readonly findAll = {
    status: 200,
    description: '전체 리뷰 목록 조회 성공',
    success: true,
    data: [
      {
        id: 1,
        createdTime: '2022-07-16 02:30:00',
        content: '파티하기에 정말 좋은 장소였어요 추천합니다.',
        reservation: {
          id: 5,
          startTime: 'string',
          endTime: 'string',
          date: '2022-07-16',
          createdTime: '2022-07-16 02:30:00',
          user: {},
          room: {},
        },
      },
      {
        id: 2,
        createdTime: '2022-07-16 02:30:00',
        content: '파티하기에 정말 좋은 장소였어요 추천합니다.',
        reservation: {
          id: 5,
          startTime: 'string',
          endTime: 'string',
          date: '2022-07-16',
          createdTime: '2022-07-16 02:30:00',
          user: {},
          room: {},
        },
      },
    ],
  };
  public readonly findOne = {
    status: 200,
    success: true,
    description: 'reviewId로 review 조회 성공',
    data: {
      id: 1,
      createdTime: '2022-07-16 02:30:00',
      content: '파티하기에 정말 좋은 장소였어요 추천합니다.',
      reservation: {
        id: 5,
        startTime: 'string',
        endTime: 'string',
        date: '2022-07-16',
        createdTime: '2022-07-16 02:30:00',
        user: {},
        room: {},
      },
    },
  };
  public readonly updateReview = {
    status: 201,
    description: 'reviewId로 특정 reivew 수정',
    success: true,
    data: { affected: true },
  };

  public readonly removeReview = {
    status: 201,
    description: 'reviewId로 특정 review 삭제 성공',
    success: true,
  };
}

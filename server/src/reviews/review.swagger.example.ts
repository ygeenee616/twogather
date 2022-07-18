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

  public readonly removeMyReview = {
    status: 201,
    description: '내가 쓴 특정 review 삭제 성공',
    success: true,
  };

  public readonly findMyReviews = {
    status: 200,
    description: '내가 쓴 리뷰 목록 조회 성공',
    success: true,
    data: [
      {
        reviewId: 8,
        reviewCreatedTime: '2022-07-17T19:33:30.000Z',
        content: '좋은 방이었습니다.2',
        reservationId: 42,
        date: '2022-07-20T15:00:00.000Z',
        personnel: 5,
        reservationCreatedTime: '2022-07-17T07:07:42.000Z',
        userId: 74,
        startTime: 3,
        endTime: 10,
        roomId: 6,
        nickname: 'ttest',
        email: 'tester@t.com',
        name: 'dd',
        phoneNumber: '01012345678',
      },
      {
        reviewId: 7,
        reviewCreatedTime: '2022-07-17T19:33:23.000Z',
        content: '좋은 방이었습니다.1',
        reservationId: 43,
        date: '2022-07-20T15:00:00.000Z',
        personnel: 5,
        reservationCreatedTime: '2022-07-17T07:10:34.000Z',
        userId: 74,
        startTime: 3,
        endTime: 10,
        roomId: 7,
        nickname: 'ttest',
        email: 'tester@t.com',
        name: 'dd',
        phoneNumber: '01012345678',
      },
      {
        reviewId: 6,
        reviewCreatedTime: '2022-07-17T17:23:54.000Z',
        content: '좋은 방이었습니다.',
        reservationId: 44,
        date: '2022-07-20T15:00:00.000Z',
        personnel: 5,
        reservationCreatedTime: '2022-07-17T07:11:01.000Z',
        userId: 74,
        startTime: 3,
        endTime: 10,
        roomId: 8,
        nickname: 'ttest',
        email: 'tester@t.com',
        name: 'dd',
        phoneNumber: '01012345678',
      },
    ],
  };

  public readonly updateMyReview = {
    status: 201,
    description: '내가 쓴 특정 reivew 수정 성공',
    success: true,
    data: {
      affected: true,
    },
  };
}

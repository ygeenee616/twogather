export class NoticeResExample {
  public readonly create = {
    status: 201,
    description: '새로운 공지사항 등록 완료',
    success: true,
    data: {
      title: '공지사항 제목1',
      content: '공지사항 내용1',
      user: {
        id: 81,
        isAdmin: true,
        nickname: '관리자 계정',
        email: 'admin123@naver.com',
        password: '****',
        name: null,
        sex: null,
        profileImage: null,
        phoneNumber: null,
        businessNumber: null,
        businessName: null,
        businessAddress: null,
        accountNumber: null,
      },
      id: 1,
    },
  };
  public readonly findAll = {
    status: 200,
    description: '전체 공지사항 목록 조회 성공',
    success: true,
    data: [
      {
        id: 2,
        title: '공지사항 제목2',
        content: '공지사항 내용2',
      },
      {
        id: 1,
        title: '공지사항 제목1',
        content: '공지사항 내용1',
      },
    ],
  };
  public readonly findOne = {
    status: 200,
    success: true,
    description: '공지사항Id로 특정 공지사항 조회 성공',
    data: {
      id: 2,
      title: '공지사항 제목2',
      content: '공지사항 내용2',
    },
  };
  public readonly updateNotice = {
    status: 201,
    description: '공지사항Id로 특정 공지사항 수정',
    success: true,
    data: {
      affected: true,
    },
  };
  public readonly removeNotice = {
    status: 201,
    description: '공지사항Id로 특정 공지사항 삭제 성공',
    success: true,
  };
}

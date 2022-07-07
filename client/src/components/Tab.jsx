import React from 'react';
import styled from 'styled-components';

Tab.defaultProps = {
  "contents" : [
    {
      "introduce": [
        "1호점과 다른 컨셉으로 공간을 채운 24평 규모의 렌탈스튜디오 홈스윗홈 2호점입니다. \n",
        "방문해주시는 게스트분들의 인원에 따른 추가요금 없이 전액 무료로 지원하고 있습니다. (최대 수용인원 약 20명) \n",
        "저희 스튜디오는 촬영하시는 컨셉을 위해 크게 3개의 섹션을 한 공간안에 구성하였습니다. \n",
        "*대형러그와 쇼파를 배치한 아늑한 느낌의 거실 공간 \n",
        "*편안한 느낌의 우드활용과 메이플&화이트 조합의 침실 공간 \n",
        "*깨끗한 올화이트 가구와 핑크 소품들로 포인트를 준 파우더룸 공간 \n",
      ],
      "notice": [
        "안전 및 도난 방지를 위하여 CCTV 가 작동중입니다.\n",
        "전문 촬영팀을 위한 가성비 공간으로 기본적으로 제공하는 촬영장비는 없습니다.\n",
        "퇴실후 항상 정리 및 내부 소독 진행 합니다(예약시간이 붙어있는 경우는 불가하니 양해 부탁드립니다)\n",
        "기존의 가구 및 소품등 구조를 필요에 의해 변경하신 경우 마감시간 전에 원상복구 해주세요. 다음 게스트님에게 피해가 됩니다.\n",
        "지하인 관계로 자연광은 들어오지 않지만 자연광 연출을 위해 커튼 안쪽에 조명이 설치되어 있습니다.\n",
      ],
      "review": [
        "너무 만족스러웠습니다 공간도 이뻤어요 생각보다 넓네요 \n",
        "쾌적하고 좋았습니다. 인상깊어요 \n",
        "예약할 때도 사장님께서 배려해주시고, 장소 너무 깔끔히 되어있어서 잘 사용하였습니다!ㅎㅎ 다음 촬영 때도 또 사용하고 싶은 장소입니다~~😊 \n"
      ],
      "qna": "냉방 가능한가요?\n"
    },
  ]
}

function changeTab(props) {
  const thisContent = document.querySelector(`.${props}`);
  thisContent.scrollIntoView({behavior: 'smooth', block: 'center'})
  console.log(thisContent)
}

export default function Tab({contents}) {
  return (

    <Container>
      <Tabs>
        <TabTitle id="tab1" onClick={(e) => changeTab(e.target.id)}>공간소개</TabTitle>
        <TabTitle id="tab2" onClick={(e) => changeTab(e.target.id)}>유의사항</TabTitle>
        <TabTitle id="tab3" onClick={(e) => changeTab(e.target.id)}>후기</TabTitle>
        <TabTitle id="tab4" onClick={(e) => changeTab(e.target.id)}>Q & A</TabTitle>
      </Tabs>

      {contents.map((content, i) => {
        return (
          <div key={i} className="tab-box">
            <TabContent className="tab1">
              <h2>공간소개</h2>
              <p>{content.introduce}</p>
            </TabContent>
            <TabContent className="tab2">
              <h2>유의사항</h2>
              <p>{content.notice}</p>
            </TabContent>
            <TabContent className="tab3">
              <h2>후기</h2>
              <p>{content.review}</p>
            </TabContent>
            <TabContent className="tab4">
              <h2>Q&A</h2>
              <p>{content.qna}</p>
            </TabContent>
          </div>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin: 20px 0;
  margin: 30px 0;
`

const Tabs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: solid #BBD3F2;
  border-width: 2px 0;
  font-size: 0.9rem;
`

const TabTitle = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: normal;
  padding: 10px 0;
  margin: 0;
  
  & + div {
    border-left: 2px solid #BBD3F2;
  }

  &:hover {
    font-weight: bold;
  }
`

const TabContent = styled.div`
  width: 100%;
  padding: 20px;
  white-space: pre-wrap;
  font-size: 0.9rem;

  & + div {
    border-top: 2px solid #BBD3F2;
  }

  p {
    line-height: 2.3rem;
  }
`
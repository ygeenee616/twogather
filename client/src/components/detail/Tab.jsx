import React from "react";
import styled from "styled-components";

// 탭 스크롤 함수
function changeTab(props) {
  const thisContent = document.querySelector(`.${props}`);
  thisContent.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function Tab({ contents }) {
  return (
    <TabContainer>
      <Tabs>
        <TabTitle id="tab1" onClick={(e) => changeTab(e.target.id)}>
          공간소개
        </TabTitle>
        <TabTitle id="tab2" onClick={(e) => changeTab(e.target.id)}>
          유의사항
        </TabTitle>
        <TabTitle id="tab3" onClick={(e) => changeTab(e.target.id)}>
          후기
        </TabTitle>
        <TabTitle id="tab4" onClick={(e) => changeTab(e.target.id)}>
          Q & A
        </TabTitle>
      </Tabs>

      <div style={{ width: "100%" }}>
        <TabContent className="tab1">
          <h2>공간소개</h2>
          <p>{contents.introduce}</p>
        </TabContent>
        <TabContent className="tab2">
          <h2>유의사항</h2>
          <p>{contents.notice}</p>
        </TabContent>
        <TabContent className="tab3">
          <h2>후기</h2>
          {contents.review.map((item, i) => {
            return (
              <div key={i} className="itemBox">
                <p className="itemUser">{item.id}</p>
                <p className="itemContent">{item.content}</p>
              </div>
            );
          })}
        </TabContent>
        <TabContent className="tab4">
          <h2>Q&A</h2>
          {contents.qna.map((item, i) => {
            return (
              <div key={i} className="itemBox">
                <p className="itemUser">{item.id}</p>
                <p className="itemContent">{item.question}</p>
                <p className="itemContent">↪ {item.answer}</p>
              </div>
            );
          })}
        </TabContent>
      </div>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  width: 100%;
  margin: 30px 0;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: solid #bbd3f2;
  border-width: 2px 0;
  font-size: 0.9rem;
`;

const TabTitle = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: normal;
  padding: 10px 0;
  margin: 0;

  & + div {
    border-left: 2px solid #bbd3f2;
  }

  &:hover {
    font-weight: bold;
  }
`;

const TabContent = styled.div`
  width: 100%;
  padding: 20px 0;
  white-space: pre-wrap;
  font-size: 0.9rem;
  text-align: left;

  & + div {
    border-top: 2px solid #bbd3f2;
  }

  & .itemBox + .itemBox {
    border-top: 1px solid #f2f2f2;
  }

  & .itemUser + .itemUser {
    font-weight: bold;
  }

  & .itemContent {
    margin-left: 7%;
  }

  p {
    line-height: 2.3rem;
  }
`;

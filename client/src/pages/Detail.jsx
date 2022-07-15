import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ImageSlider from "../components/detail/ImageSlider";
import Map from "../components/detail/Map";
import Dropbox from "../components/detail/DropBox";
import { MyDatePicker } from "../components/detail/DatePicker";
import ToTop from "../components/ToTop";
import axios from "axios";

// 탭 스크롤 함수
function changeTab(props) {
  const thisContent = document.querySelector(`.${props}`);
  thisContent.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function Detail() {
  const [data, setData] = useState(0);
  const [people, setPeople] = useState(0);
  const currPeople = useRef(0);
  const [possible, setPossible] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const req = await axios.get("/dummyDetail.json");
        const space = await req.data.space;
        setData(space);
        console.log(space);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const title = data.title;
  const hashTag = data.hashTag;
  const contents = data.contents;
  const rooms = data.rooms;
  const images = data.images;

  useEffect(() => {
    console.log(people);
    // Number(currPeople.current) >= Number(people)
    //   ? setPossible(true)
    //   : setPossible(false);
    // console.log(possible);
  }, [people]);

  return (
    data && (
      <FullContainer>
        <DetailHeader>
          <Title>[{title}]</Title>
          <div style={{ margin: "20px 0" }}>
            {hashTag.map((tag, i) => (
              <HashTag key={i}>{tag}</HashTag>
            ))}
          </div>
        </DetailHeader>

        <DetailContainer>
          <LeftContainer>
            <ImageSlider images={images} />
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

              <div className="tab-box">
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
            <Map />
          </LeftContainer>

          <RightContainer>
            <Dropbox rooms={rooms} currPeople={currPeople} />
            <MyDatePicker />
            <Personnel>
              예약 인원:
              <input
                type="number"
                value={people}
                onChange={(e) => {
                  setPeople(e.target.value);
                }}
              />
              명
            </Personnel>
            <p className="OverPeople" possible={possible}>
              * 예약 인원이 수용 가능 인원을 초과하였습니다.
            </p>
            <Button>
              <Link to="/book" className="move">
                예약하기
              </Link>
            </Button>
          </RightContainer>

          <ToTop />
        </DetailContainer>
      </FullContainer>
    )
  );
}

const FullContainer = styled.div`
  max-width: 100%;
  margin: 5% 10%;
  display: flex;
  flex-direction: column;
`;

const DetailHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.5rem;
`;

const HashTag = styled.span`
  display: inline-block;
  background-color: #9ba3eb;
  color: white;
  border-radius: 20px;
  padding: 0 10px;
  margin-right: 10px;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  width: 70%;
`;

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
  padding: 20px;
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

const RightContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .OverPeople {
    font-size: 0.7rem;
    color: red;
    ${({ possible }) => (possible ? `display: block;` : `display: none;`)};
  }
`;

const Personnel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  & > input {
    width: 50%;
    max-height: 22px;
    border: 2px solid #8daef2;
    border-radius: 5px;
    text-align: center;
    padding: 0;
    margin: 0;
  }

  /* 스피너 제거 */
  /* Chrome, Safari, Edge, Opera */
  & > input::-webkit-outer-spin-button,
  & > input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  & > input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  border: none;
  background: #8daef2;
  transition: all 0.3s;

  &:hover {
    box-shadow: 2px 2px 5px -1px #a6a9b6;
  }

  & .move {
    text-decoration: none;
    color: #fff;
  }
`;

import React from "react";
import styled from 'styled-components';

DetailHeader.defaultProps = {
  title: "스튜디오 709",
  hashTag: ["스튜디오", "촬영대관"]
}

export default function DetailHeader({title, hashTag}) {
  return (
    <Header>
      <Title>[{title}]</Title>
      <div style={{margin: "20px 0"}}>
      {hashTag.map((tag, i) => {
        return (
          <HashTag key={i}>{tag}</HashTag>
        )
      })}
      </div>
    </Header>
  )
}

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.div`
  font-weight: bold;
  font-size: 2.5rem;
`

const HashTag = styled.span`
  display: inline-block;
  background-color: #9BA3EB;
  color: white;
  border-radius: 20px;
  padding: 0 5px;
  margin-right: 10px;
`
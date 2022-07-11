import styled from "styled-components";
import { RiEdit2Fill } from "react-icons/ri";
import ListItem from "./ListItem";
function StripeLayout({ datas, headers, mainTitle, columnTemplete }) {
  return (
    <>
      <Container>
        <ReservationHeader>
          <TitleName>
            <MainTitle className="roomName">{mainTitle}</MainTitle>
            <Title className="title"></Title>
          </TitleName>
        </ReservationHeader>

        <ReservationForm>
          <List>
            {headers.map((name) => {
              return <Header>{name}</Header>;
            })}
          </List>
          {datas.map((item) => {
            return (
              <ListItem
                item={item}
                columnTemplete={columnTemplete}
                //"1fr 2fr 1fr 1fr 2fr 1fr 1.2fr"
              ></ListItem>
            );
          })}
        </ReservationForm>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const ReservationHeader = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 10%;
`;

const ReservationForm = styled.div`
  margin: 0 auto;
  border-top: 2px solid #8daef2;
  border-bottom: 2px solid #8daef2;
  padding: 10px;

  width: 100%;
  height: 100%;
  padding-bottom: 0;
`;

const TitleName = styled.div`
  border-bottom: 2px solid #8daef2;
`;

const Title = styled.span`
  font-size: 1.2rem;
  line-height: 35px;
  margin: 10px;
`;

const MainTitle = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #8daef2;
`;

const Header = styled.div`
  background-color: white;
  font-size: 1.2rem;
  line-height: 2.4rem;
  text-align: center;
  height: 3rem;
  font-weight: bold;

  margin: 0;

  &:last-child {
    border-right: none;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 2fr 1fr 1.2fr;
  border-bottom: 2px solid #8daef2;
  column-gap: 3px;
`;

export default StripeLayout;

import styled from 'styled-components';
import ImageSlider from "../components/ImageSlider";
import Tab from '../components/Tab';
import SelectRoom from "../components/SelectRoom";
import { MyDatePicker, MyTimePicker } from "../components/DatePicker";


export default function Detail() {
  return (
    <DetailContainer>
      <LeftContainer>
        <ImageSlider />
        <Tab />
      </LeftContainer>

      <RightContainer>
        <SelectRoom />
        <MyDatePicker />
        <MyTimePicker />
      </RightContainer>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const LeftContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
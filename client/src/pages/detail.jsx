import ImageSlider from "../components/ImageSlider";
import { MyDatePicker, MyTimePicker } from "../components/DatePicker";
import SelectRoom from "../components/SelectRoom";
import styled from 'styled-components';

export default function Detail() {
  return (
    <DetailContainer>
      <ImageSlider />
      <SideContainer>
        <SelectRoom />
        <br/>
        <MyDatePicker />
        <MyTimePicker />
      </SideContainer>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const SideContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
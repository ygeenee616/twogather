import { MyDatePicker, MyTimePicker } from "../components/DatePicker";
import SelectRoom from "../components/SelectRoom";

export default function Detail() {
  return (
    <div>
      <SelectRoom />
      <br/>
      <MyDatePicker />
      <MyTimePicker />
    </div>
  )
}
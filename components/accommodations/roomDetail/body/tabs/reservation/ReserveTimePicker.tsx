import { Dispatch, FC, SetStateAction } from "react";
import { DateRange } from "react-date-range"
import { addMonths } from "date-fns";
import ko from "date-fns/locale/ko"
import { useAppSelector } from "store/hooks";
import { mainColor } from "styles/GlobalStyles";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangeType } from "@reservation/ReserveModal";

type ReserveTimeProps = {
  date: DateRangeType
  setDate: Dispatch<SetStateAction<DateRangeType>>
  roomId: string
}
const ReserveTimePicker: FC<ReserveTimeProps> = ({ date, setDate, roomId }) => {
  const { rooms } = useAppSelector(state => state.rooms.roomData!)
  const findedRoom = rooms.find((room: RoomType) => room.roomId === roomId)

  const onRangeChange = (ranges: any) => {
    setDate({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate,
      key: ranges['selection'].key
    })
  }

  return (
    <DateRange
      locale={ko}
      editableDateInputs={true}
      onChange={onRangeChange}
      moveRangeOnFirstSelection={false}
      ranges={[date]}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 1)}
      rangeColors={[mainColor]}
      disabledDates={findedRoom!.reservedDates.map(date => new Date(date))}
      dateDisplayFormat="yyyy년 MM월 dd일"
    />
  )
}

export default ReserveTimePicker
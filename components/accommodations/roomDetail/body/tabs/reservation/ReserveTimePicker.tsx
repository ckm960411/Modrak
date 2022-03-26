import { FC, useState } from "react";
import { DateRange } from "react-date-range"
import { addDays, addMonths } from "date-fns";
import ko from "date-fns/locale/ko"
import { mainColor } from "styles/GlobalStyles";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type DateRangeType = {
  startDate: Date
  endDate: Date
  key: string
}
const ReserveTimePicker: FC = () => {
  const [date, setDate] = useState<DateRangeType>({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  })

  const onRangeChange = (ranges: any) => {
    console.log(ranges)
    setDate({
      startDate: ranges['selection'].startDate,
      endDate: ranges['selection'].endDate.toString() === ranges['selection'].startDate.toString() ? addDays(ranges['selection'].startDate, 1) : ranges['selection'].endDate,
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
      disabledDates={[ new Date('Sat Mar 28 2022 00:00:00 GMT+0900 (한국 표준시)') ]}
      dateDisplayFormat="yyyy년 MM월 dd일"
    />
  )
}

export default ReserveTimePicker
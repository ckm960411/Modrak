import { Dispatch, FC, SetStateAction, useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from "@mui/material";
import { format } from "date-fns";

type ReserveTimePickerProps = {
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
}
const ReserveTimePicker: FC<ReserveTimePickerProps> = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker 
        label="날짜 선택"
        disablePast
        value={date}
        onChange={(newValue) => setDate(newValue)}
        onAccept={() => {
          if (!date) return
          console.log('date: ',  format(Date.parse(`${date}`), 'yyyy년 MM월 dd일'))
        }}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default ReserveTimePicker
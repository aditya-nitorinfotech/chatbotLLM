import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { sizeHeight } from "@mui/system";
import { TextField } from "@mui/material";

type sizeProps = {
  width?: string;
  height?: string;
  sizeProp?: "small" | "medium" | undefined;
};

const DatePickerViews = ({ width, height, sizeProp }: sizeProps) => {
  const [date, setDate] = useState(2012);
  console.log("Date", date);

  const handleYear = (year: any) => {
    console.log("year", year.$y);
    setDate(year.$y);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker", "DatePicker"]}>
        {/* <DatePicker
          label={'"year", "month" and "day"'}
          views={["year", "month", "day"]}
        /> */}
        <DatePicker
          label={"Select year"}
          views={["year"]}
          slotProps={{ textField: { size: sizeProp } }}
          onChange={handleYear}
        />
        {/* <DatePicker label={'"month" and "year"'} views={["month", "year"]} /> */}
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerViews;

import React from "react";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import { Button } from "@material-ui/core";

type Props = {};

const DateRangePickerExample: React.FunctionComponent<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const toggle = () => setOpen(!open);
  const handleClickOpenPicker = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button onClick={handleClickOpenPicker}>
        <span style={{ fontWeight: 500 }}>
          {dateRange.startDate?.getMonth()}/{dateRange.startDate?.getDate()}
        </span>
        <span style={{ margin: 5 }}>-</span>
        <span style={{ fontWeight: 500 }}>
          {dateRange.endDate?.getMonth()}/{dateRange.endDate?.getDate()}
        </span>
      </Button>
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => setDateRange(range)}
        initialDateRange={dateRange}
      />
    </>
  );
};

export default DateRangePickerExample;

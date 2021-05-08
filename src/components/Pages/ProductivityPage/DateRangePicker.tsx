import React from 'react';
import { DateRange, DateRangePicker } from 'materialui-daterange-picker';
import { Button } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { format } from 'date-fns';

type Props = {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
};

const DateRangePickerExample: React.FunctionComponent<Props> = (props) => {
  const { dateRange, setDateRange } = props;
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen(!open);
  const handleClickOpenPicker = () => {
    setOpen(!open);
    console.log(dateRange);
  };

  const { startDate, endDate } = dateRange;

  return (
    <>
      <Button onClick={handleClickOpenPicker} startIcon={<DateRangeIcon />}>
        <span style={{ fontWeight: 500 }}>
          {startDate ? format(startDate, 'yyyy-MM-dd') : null}
        </span>
        <span style={{ margin: 5 }}>-</span>
        <span style={{ fontWeight: 500 }}>
          {endDate ? format(endDate, 'yyyy-MM-dd') : null}
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

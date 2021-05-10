import React from "react";
import { DateRange, DateRangePicker } from "materialui-daterange-picker";
import { Button } from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { format } from "date-fns";
const { useQueryParams } = require("react-router-query-hooks");

type Props = {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
};

const DateRangePickerExample: React.FunctionComponent<Props> = (props) => {
  const { dateRange, setDateRange } = props;
  const [open, setOpen] = React.useState(false);
  const [query, { replaceQuery }] = useQueryParams();

  const toggle = () => setOpen(!open);
  const handleClickOpenPicker = () => {
    setOpen(!open);
  };

  const { startDate, endDate } = dateRange;

  return (
    <>
      <Button onClick={handleClickOpenPicker} startIcon={<DateRangeIcon />}>
        <span style={{ fontWeight: 500 }}>
          {startDate ? format(startDate, "yyyy-MM-dd") : null}
        </span>
        <span style={{ margin: 5 }}>-</span>
        <span style={{ fontWeight: 500 }}>
          {endDate ? format(endDate, "yyyy-MM-dd") : null}
        </span>
      </Button>
      <DateRangePicker
        open={open}
        toggle={toggle}
        onChange={(range) => {
          replaceQuery({
            repo: query.repo,
            startDate: range.startDate
              ? format(range.startDate, "yyyy-MM-dd")
              : null,
            endDate: range.endDate ? format(range.endDate, "yyyy-MM-dd") : null,
          });
          setDateRange(range);
        }}
        initialDateRange={dateRange}
      />
    </>
  );
};

export default DateRangePickerExample;

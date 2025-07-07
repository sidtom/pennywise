import { Calendar } from "@mantine/dates";
import Day from "../dayRenderer/day.JSX";
import AnalyticsRow from "../analyticsRow/analyticsRow";
import "@mantine/dates/styles.css";
import "./calendar.css";
import PropTypes from "prop-types";

export default function DashboardCalendar({ selectedMonth, onMonthChange }) {
  return (
    <div className="calendar-container">
      <Calendar
        renderDay={(date) => <Day date={date} />}
        size="xl"
        date={selectedMonth}
        onDateChange={onMonthChange}
      />
      <AnalyticsRow selectedMonth={selectedMonth} />
    </div>
  );
}

DashboardCalendar.propTypes = {
  selectedMonth: PropTypes.instanceOf(Date),
  onMonthChange: PropTypes.func.isRequired,
};

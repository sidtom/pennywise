import { Calendar } from '@mantine/dates';
import Day from '../dayRenderer/day.JSX';
import "@mantine/dates/styles.css";
import "./calendar.css";

export default function DashboardCalendar() {
  return (
    <div className="calendar-container">
      <Calendar renderDay={((date) => <Day day={date.getDate()}/>)}/>
    </div>
  );
}

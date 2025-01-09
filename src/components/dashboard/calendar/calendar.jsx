import { Calendar } from '@mantine/dates';
import "@mantine/dates/styles.css";
import "./calendar.css";

export default function DashboardCalendar() {
  return (
    <div className="calendar-container">
      <Calendar />
    </div>
  );
}

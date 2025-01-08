import { Calendar } from '@mantine/dates';
import "@mantine/dates/styles.css";
import "./calendar.css";
import { useEffect, useRef } from 'react';
export default function DashboardCalendar() {
  const calendarRef = useRef(null);

  useEffect(() => {  console.log(calendarRef);},[calendarRef])
  return (
    <div className="calendar-container">
      <Calendar ref={calendarRef}/>
    </div>
  );
}

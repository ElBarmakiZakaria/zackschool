"use client"

import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
 
import '@schedule-x/theme-default/dist/index.css'
import { useEffect } from 'react'
import eventsData from "@/lib/events.json";


const Scheduler = () => {
    const plugins = [createEventsServicePlugin()]
 
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: eventsData,
  }, plugins)
 
  useEffect(() => {
    // get all events
    calendar.eventsService.getAll()
  }, [])

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
      
    </div>
  )
}

export default Scheduler
import React, { Dispatch, SetStateAction, useState } from 'react'
import { createContext } from 'react'
import EventLog from '../../interfaces/EventLog.interface'

interface ctxInterface {
  events: EventLog[]
  setEvents: Dispatch<SetStateAction<EventLog[]>>
}

const ctxInitial = {
  events: [] as EventLog[],
  setEvents: (state: EventLog[]) => {},
} as ctxInterface

export const EventsContext = createContext(ctxInitial)

const EventsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<EventLog[]>(ctxInitial.events)

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  )
}

export default EventsContextProvider

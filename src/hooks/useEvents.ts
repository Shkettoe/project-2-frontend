import { useContext, useEffect, useRef, useState } from 'react'
import EventLog from '../interfaces/EventLog.interface'
import useAPI from '../hooks/useAPI'
import { EventsContext } from '../store/context/EventsContext'
import { ProfileSettingsContext } from '../store/context/ProfileSettingsContext'

declare global {
  interface EventTarget {
    value?: any
    type?: any
    tagName?: any
    baseURI?: any
  }
  interface MouseEvent {
    type?: any
  }
}

const useEvents = () => {
  const { events, setEvents } = useContext(EventsContext)
  const eventsRef = useRef<EventLog[]>(events)
  const [, , apiFetch] = useAPI()

  enum types {
    A = 'anchor',
    BUTTON = 'button',
    INPUT = 'input',
    IMG = 'image',
    DIV = 'division',
    P = 'paragraph',
    SPAN = 'span',
  }

  const supplyEvent = (e: MouseEvent | Event) => {
    //@ts-ignore
    var ct = types[e.target?.tagName]
    if (!ct && e.type !== 'scroll') return
    if (e.target?.type === 'password') return
    else if (ct == 'input') ct = `input:${e.target?.type}`
    const event: EventLog = {
      action: e.type,
      compotent_type: ct,
      date: new Date(),
      location: e.target?.baseURI,
      new_value: e.target?.value || '',
    }

    setEvents((p: EventLog[]) => {
      return [...p, event]
    })
  }

  const uploadEvents = () => {
    if (eventsRef.current.length) {
      apiFetch({ method: 'post', url: 'event-logs', data: eventsRef.current })
      setEvents([])
    }
  }

  useEffect(() => {
    eventsRef.current = events
  }, [events, setEvents])

  const listen = () => {
    window.onclick = e => supplyEvent(e)
    window.oninput = e => supplyEvent(e)
    window.onscroll = e => supplyEvent(e)
    window.addEventListener('beforeunload', () => uploadEvents())
    return () => {
      window.removeEventListener('beforeunload', () => uploadEvents())
    }
  }

  return [listen, uploadEvents] as const
}

export default useEvents

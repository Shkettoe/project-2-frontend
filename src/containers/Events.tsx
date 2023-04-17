import { useEffect } from 'react'
import Error from '../components/Error'
import Event, { EventsHeader } from '../components/Event'
import useAPI from '../hooks/useAPI'
import LoadingScreen from '../layouts/Loading'
import EventLog from '../interfaces/EventLog.interface'

const Events = () => {
  const [response, error, apiFetch] = useAPI<EventLog[]>()

  useEffect(() => {
    apiFetch({
      method: 'get',
      url: 'event-logs',
    })
  }, [])

  if (!response?.data && !error) return <LoadingScreen />
  if (error) return <Error>{error}</Error>
  return (
    <div>
      <EventsHeader />
      {response?.data.map((e: EventLog) => (
        <Event event={e} key={e.id} />
      ))}
    </div>
  )
}

export default Events

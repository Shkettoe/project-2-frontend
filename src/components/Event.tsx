import styled from 'styled-components'
import { eColours, eFontWeights } from '../assets/Vars'
import EventLog from '../interfaces/EventLog.interface'
import iCommonSt from '../interfaces/props/Common.props.interface'

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const STEvent = styled.div<iCommonSt>`
  min-height: 40px;
  min-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 20px;
  background-color: ${p => p.bgColour || eColours.primaryBlue};
  color: ${eColours.black};
  border-radius: 4px;
  padding: 12px;
  margin: 16px;
  font-weight: ${p => p.fontWeight};
  &:hover {
    color: ${p => !p.bgColour && eColours.yellowOrange};
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    min-width: 130px;
    max-width: 200px;
  }
`

export const EventsHeader = () => (
  <STEvent bgColour={eColours.primaryOrange} fontWeight={eFontWeights.bold}>
    <div>Component</div>
    <div>Date & Time</div>
    <div>Action</div>
    <div>Location</div>
    <div>User</div>
  </STEvent>
)

const Event = ({ event }: { event?: EventLog }) => {
  const user = event?.user?.first_name + ' ' + event?.user?.last_name
  const location = event?.location.split('/')[-1] || 'root'
  const date: Date = new Date(event?.date.toString() || '')
  return (
    <STEvent>
      <div>{event?.component_type}</div>
      <div>
        <p>
          {date?.getDate() +
            '. ' +
            months[date?.getMonth()] +
            ' ' +
            date.getFullYear() +
            ' '}
        </p>
        <p>
          {date.getHours() +
            'h ' +
            date.getMinutes() +
            'min ' +
            date.getSeconds() +
            's'}
        </p>
      </div>
      <div>{event?.action}</div>
      <div>{location}</div>
      <div>{user}</div>
    </STEvent>
  )
}

export default Event

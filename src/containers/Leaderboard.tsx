import styled from 'styled-components'
import { eColours, eFontSizes } from '../assets/Vars'
import Paragraph from '../components/Paragraph'
import Place from '../components/Place'
import ProfileImage from '../components/ProfileImage'
import Guess from '../interfaces/Guess.interface'
import iCommonSt from '../interfaces/props/Common.props.interface'

const STLeaderboard = styled.div`
  margin-top: 13px;
  padding: 4px, 8px;
  display: flex;
  flex-direction: column;
  width: 460px;
  height: 720px;
  overflow: scroll;
  gap: 8px;
`

const Entry = styled.div<iCommonSt>`
  background-color: ${props => props.bgColour || '#fff'};
  border-radius: 4px;
  padding: 8px 8px;
  width: 420px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & p {
    color: ${props => props.fgColour || eColours.primaryBlue};
    text-align: right;
    max-width: 40px;
  }
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    & div {
      display: flex;
      flex-direction: column;
      gap: 4px;
      & p {
        text-align: left;
        min-width: 260px;
      }
    }
  }
`

const getDate = (date: string) => {
  const d = date.split('T')[0].split('-')
  return `${d[2]}. ${d[1]}. ${d[0]}`
}

const Leaderboard = ({
  guesses,
  userId,
}: {
  guesses: Guess[]
  userId: number
}) => {
  const getLeaderBoard = () =>
    !guesses.length ? (
      <Paragraph textAlign='left' color={eColours.orange}>
        Nobody guessed yet
      </Paragraph>
    ) : (
      <STLeaderboard>
        <>
          {guesses.map((g, index) => (
            <Entry
              bgColour={g.user.id === userId ? eColours.primaryBlue : '#fff'}
              fgColour={g.user.id === userId ? '#fff' : eColours.primaryBlue}
              key={g.id}>
              <div>
                <Place index={index}>{index + 1}</Place>
                <ProfileImage src={`${g.user.avatar}`} />
                <div>
                  <Paragraph fontSize={eFontSizes.body}>
                    {g.user.id === userId
                      ? 'You'
                      : `${g.user.first_name} ${g.user.last_name}`}
                  </Paragraph>
                  <Paragraph fontSize={eFontSizes.caption}>
                    {getDate(g.created_at)}
                  </Paragraph>
                </div>
              </div>
              <Paragraph>{Number(g.error_distance) < 1000 ? g.error_distance + "m" : Math.floor(Number(g.error_distance)/1000) + "km"}</Paragraph>
            </Entry>
          ))}
        </>
      </STLeaderboard>
    )

  return (
    <div>
      <Paragraph textAlign={'left'} color={'#000'} fontSize={'34px'}>
        Leaderboard
      </Paragraph>
      {getLeaderBoard()}
    </div>
  )
}

export default Leaderboard

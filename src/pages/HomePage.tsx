import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { eColours, eFontSizes } from '../assets/Vars'
import Button from '../components/Button'
import Error from '../components/Error'
import Paragraph from '../components/Paragraph'
import Polaroid from '../components/Polaroid'
import { Trinity } from '../containers/Trinity'
import useAPI from '../hooks/useAPI'
import useR from '../hooks/useR'
import Guess from '../interfaces/Guess.interface'
import Location from '../interfaces/Location.interface'

const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 23px;
  & p {
    width: 100%;
    text-align: left;
  }
`

const HomePage = () => {
  const [user] = useR()
  const [limit, setLimit] = useState<number>(3)
  const [limit2, setLimit2] = useState<number>(3)
  const [response, error, apiFetch] = useAPI<[Location[]]>()
  const [locations, setLocations] = useState<Location[]>()

  useEffect(() => {
    apiFetch({
      method: 'get',
      url: `locations`,
    })
  }, [])

  useEffect(() => {
    if (response?.data.length) setLocations(response.data[0])
  }, [response])

  return (
    <Home>
      <Error>{error}</Error>
      <Paragraph color={eColours.primaryBlue} fontSize={eFontSizes.headline4}>
        Personal best guesses
      </Paragraph>
      <Paragraph>
        Your personal best guesses appear here. Go on and try to beat your
        personal records or set a new one!
      </Paragraph>
      {!user.guesses.length ? (
        <Paragraph color={eColours.orange}>
          You haven't guessed anything yet.
        </Paragraph>
      ) : (
        <>
          <Trinity>
            {user.guesses.slice(0, limit).map((g: Guess) => (
              <Polaroid
                id={g.location.id}
                src={g.location.image_url}
                filter={1}
                content={g.error_distance}
                key={g.id}
              />
            ))}
          </Trinity>

          {limit < user.guesses.length && (
            <Button
              width={'132px'}
              height={'43px'}
              fgColour={eColours.primaryBlue}
              bgColour={'#ffffff'}
              borderColour={eColours.primaryBlue}
              borderWidth={'1px'}
              onClick={() => setLimit(prev => prev + 3)}>
              Load more
            </Button>
          )}
        </>
      )}
      <Paragraph color={eColours.primaryBlue} fontSize={eFontSizes.headline4}>
        New locations
      </Paragraph>
      <Paragraph>
        New uploads from users. Try to guess all the locations by pressing on a
        picture.
      </Paragraph>
      {!locations?.length ? (
        <Paragraph color={eColours.orange}>
          Nobody posted on my app yet.
        </Paragraph>
      ) : (
        <>
          <Trinity>
            {locations.slice(0, limit2).map((l: Location) => (
              <Polaroid id={l.id} key={l.id} src={l.image_url} />
            ))}
          </Trinity>
          {limit2 < locations.length && (
            <Button
              width={'132px'}
              height={'43px'}
              fgColour={eColours.primaryBlue}
              bgColour={'#ffffff'}
              borderColour={eColours.primaryBlue}
              borderWidth={'1px'}
              onClick={() => setLimit2(prev => prev + 3)}>
              Load more
            </Button>
          )}
        </>
      )}
    </Home>
  )
}

export default HomePage

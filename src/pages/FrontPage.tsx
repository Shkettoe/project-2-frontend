import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import Polaroid from '../components/Polaroid'
import { Trinity } from '../containers/Trinity'
import useAPI from '../hooks/useAPI'
import Location from '../interfaces/Location.interface'

const WelcomeScreen = styled.div`
  display: flex;
  margin-left: 202px;
  width: 100%;
  min-height: 643px;
  flex-direction: column;
  align-items: baseline;
  background: url('/worldmap.png') no-repeat;
  background-position: right;
  background-size: 1250px;
  & p {
    text-align: left;
    max-width: 420px;
    margin: 16px;
  }
  & button {
    margin: 16px;
  }
`

const SubTitle = styled.div`
  max-width: 587px;
  margin: 52px;
  & p {
    margin: 29px;
  }
`

const FrontPage = () => {
  const [response, error, apiFetch] = useAPI<[Location[]]>()

  useEffect(() => {
    apiFetch({
      method: 'get',
      url: `locations?limit=3`,
    })
  }, [])

  return (
    <>
      <WelcomeScreen>
        <Paragraph
          fontSize={eFontSizes.headline2}
          fontWeight={eFontWeights.medium}
          color={eColours.primaryBlue}>
          Explore the world with Geotagger!
        </Paragraph>
        <Paragraph fontSize={eFontSizes.body} fontWeight={eFontWeights.light}>
          Geotagger is website that allows you to post picture and tag it on the
          map. Other user than try to locate it via Google Maps.{' '}
        </Paragraph>
        <Button width={'137px'} height={'39px'}>
          <Link to={'register'}>Sign Up</Link>
        </Button>
      </WelcomeScreen>
      <SubTitle>
        <Paragraph color={eColours.primaryBlue} fontSize={eFontSizes.headline4}>
          Try yourself at Geotagger!
        </Paragraph>
        <Paragraph>
          Try to guess the location of image by selecting position on the map.
          When you guess it, it gives you the error distance.
        </Paragraph>
      </SubTitle>
      {response?.data.length && (
        <Trinity>
          {response.data[0].map((l: Location) => (
            <Polaroid
              filter={1}
              content='lock'
              key={l.id}
              id={l.id}
              src={l.image_url}
            />
          ))}
        </Trinity>
      )}
      <Button
        style={{ marginTop: '82px' }}
        width={'132px'}
        height={'43px'}
        fgColour={'#ffffff'}
        bgColour={eColours.primaryBlue}>
        <Link to={'register'}>Sign up</Link>
      </Button>
    </>
  )
}

export default FrontPage

import React, { useRef } from 'react'
import styled from 'styled-components'
import {
  eColours,
  eFontSizes,
  eFontWeights,
  eLocationImageSizes,
} from '../assets/Vars'
import Button from '../components/Button'
import { InputA } from '../components/Input'
import iCommonSt from '../interfaces/props/Common.props.interface'

const FormContainer = styled.div`
  width: 860px;
  display: flex;
  flex-direction: column;
  gap: 23px;
  & img {
    max-width: ${eLocationImageSizes.widthUploadPreview};
    max-height: ${eLocationImageSizes.heightUplaod};
    min-height: ${eLocationImageSizes.heightUplaod};
    object-fit: cover;
  }
  & p {
    text-align: left;
    min-width: 860px;
  }
  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & div {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 33px;
      & a {
        padding: 10px;
        color: ${eColours.black};
      }
    }
    & button {
      float: left;
    }
  }
`

const Head = styled.h1`
  font-weight: ${eFontWeights.light};
  font-size: ${eFontSizes.headline4};
  & span {
    color: ${eColours.primaryBlue};
  }
`

const LocationImageForm = ({
  children,
  content,
  src,
}: { src?: string; children?: React.ReactNode } & iCommonSt) => {
  return (
    <>
      <InputA
        type={'file'}
        hidden
        multiple={false}
        accept={'.jpeg, .jpg, .png'}
        id='file'
        name='file'
      />
      <FormContainer>
        <Head>
          {content} <span>location</span>.
        </Head>
        <img src={src || 'placeholder.png'} alt='' />
        {children}
      </FormContainer>
    </>
  )
}

export const UploadImage = ({
  setImage,
}: {
  setImage: (image: File) => void
}) => {
  const fileInput = useRef<HTMLInputElement>(null)
  return (
    <>
      <InputA
        ref={fileInput}
        type={'file'}
        onChange={(e: React.ChangeEvent<any>) =>
          e.target.files[0] && setImage(e.target.files[0])
        }
        hidden
        multiple={false}
        accept={'.jpeg, .jpg, .png'}
      />
      <Button
        onClick={() => fileInput.current?.click()}
        type={'button'}
        width={'200px'}>
        Upload Image
      </Button>
    </>
  )
}

export default LocationImageForm

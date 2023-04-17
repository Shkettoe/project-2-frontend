import styled from 'styled-components'
import { eFontSizes, eFontWeights, eLocationImageSizes } from '../assets/Vars'
import iCommonSt from '../interfaces/props/Common.props.interface'

export const Trinity = styled.div`
  min-width: 1298px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 19px;
`
export const Filtre = styled.div<iCommonSt & { filter?: number }>`
  display: flex;
  font-size: ${eFontSizes.headline5};
  font-weight: ${eFontWeights.bold};
  width: ${props => props.width || eLocationImageSizes.widthBig};
  height: ${props => props.height || eLocationImageSizes.heightBig};
  line-height: ${props => props.height || eLocationImageSizes.heightBig};
  position: relative;
  &::after {
    z-index: -1;
    content: '';
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-image: ${({ filter }) =>
      filter &&
      `linear-gradient(90deg, rgba(102, 159, 137, 0.6) 50%, rgba(159, 193, 129, 0.6) 128%);`};
  }
  a {
    display: flex;
    font-size: ${eFontSizes.headline5};
    font-weight: ${eFontWeights.bold};
    width: ${props => props.width || eLocationImageSizes.widthBig};
    height: ${props => props.height || eLocationImageSizes.heightBig};
    line-height: ${props => props.height || eLocationImageSizes.heightBig};
    position: relative;
    &::after {
      z-index: -1;
      content: '';
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background-image: ${({ filter }) =>
        filter &&
        `linear-gradient(90deg, rgba(102, 159, 137, 0.6) 50%, rgba(159, 193, 129, 0.6) 128%);`};
    }
    & img {
      position: absolute;
      z-index: -2;
      border-radius: 4px;
      object-fit: cover;
      width: ${props => props.width || eLocationImageSizes.widthBig};
      height: ${props => props.height || eLocationImageSizes.heightBig};
    }
    & p {
      text-align: center !important;
      color: #fff;
      width: 100%;
    }
  }
  & div {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start !important;
    & button {
      z-index: 1;
      & img {
        z-index: 0;
        object-fit: scale-down;
      }
    }
  }
`

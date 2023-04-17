import { Link, useNavigate } from 'react-router-dom'
import { eColours } from '../assets/Vars'
import { Filtre } from '../containers/Trinity'
import iCommonSt from '../interfaces/props/Common.props.interface'
import Button from './Button'
import Lock from './Lock'

const Polaroid = ({
  width,
  height,
  src,
  filter,
  content,
  id,
  interactable = 0,
  deleteLoc,
}: iCommonSt & {
  src: string
  filter?: number
  id: number
  interactable?: number
  deleteLoc?: (id: number) => void
}) => {
  const navigate = useNavigate()

  return (
    <Filtre width={width} height={height} filter={filter}>
      {interactable > 0 && (
        <div>
          <Button
            onClick={() => navigate(`/location/${id}/edit`)}
            width={'40px'}
            height={'40px'}>
            <img src='Edit.png' alt='edit' />
          </Button>
          <Button
            onClick={() => deleteLoc && deleteLoc(id)}
            width={'40px'}
            height={'40px'}
            bgColour={eColours.red}>
            <img src='Delete.png' alt='edit' />
          </Button>
        </div>
      )}
      <Link to={content != 'lock' ? `location/${id}` : ''}>
        <img src={src} alt='' />
        {content == 'lock' ? <Lock /> : <p>{content}</p>}
      </Link>
    </Filtre>
  )
}

export default Polaroid

import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
  <Svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="pause"
    className="svg-inline--fa fa-pause fa-w-14"
    role="img"
    viewBox="0 0 448 512"
    {...props}
  >
    <Path
      fill={props.fill}
      d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
    />
  </Svg>
)

export default SvgComponent
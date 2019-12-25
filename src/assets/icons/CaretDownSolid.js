import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
  <Svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="caret-down"
    className="svg-inline--fa fa-caret-down fa-w-10"
    role="img"
    viewBox="0 0 320 512"
    {...props}
  >
    <Path
      fill={props.fill}
      d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
    />
  </Svg>
)

export default SvgComponent

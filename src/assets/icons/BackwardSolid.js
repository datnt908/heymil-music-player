import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgComponent = props => (
  <Svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="backward"
    className="svg-inline--fa fa-backward fa-w-16"
    role="img"
    viewBox="0 0 512 512"
    {...props}
  >
    <Path
      fill={props.fill}
      d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
    />
  </Svg>
)

export default SvgComponent

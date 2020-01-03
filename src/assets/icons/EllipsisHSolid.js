import React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="ellipsis-h"
      className="prefix__svg-inline--fa prefix__fa-ellipsis-h prefix__fa-w-16"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        fill={props.fill}
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
      />
    </Svg>
  )
}

export default SvgComponent

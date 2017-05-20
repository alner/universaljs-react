// @flow
import React from 'react'

type Props = {
  message: String,
}

const Message = ({message}: Props) => 
  <p>{message}</p>

export default Message
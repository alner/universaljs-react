// @flow

import React from 'react'

type Props = {
  label: String,
  handleClick: Function,
}

const Button = ({ label, handleClick }: Props) =>
  <button onClick={handleClick}>{label}</button>

export default Button
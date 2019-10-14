import React, { useState } from 'react'

export default function (props) {
  const [data] = useState({a: {b: '1'}})
  return (<div onClick={() => {data.a.b++ }}>{data.a.b}</div>)
}
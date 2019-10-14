import React, { useState } from 'react'

export default function (props) {
  const [data, setData] = useState({list: [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
    {name: '5'}
  ]})
  return (
  <div onClick={() => {
    let da = data.list.filter(_ => _.name === '5').pop()
    da.name = '6'
    console.log(JSON.stringify(data, null, 2))
    setData(data)
    // setData(JSON.parse(JSON.stringify(data, null, 2)))
  }}>
    {data.list.map(({name}, index) => (<div key={index}>name: {name}</div>))}
  </div>)
}
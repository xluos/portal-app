import React from 'react'
import Loadable from 'react-loadable';
// import Loading from '../components/Loading';
function Loading () {
  return (<div>loading...</div>)
}

export const Component = (Component) => Loadable({
  loader: Component,
  loading: Loading,
  delay: 300,
  timeout: 10000,
});
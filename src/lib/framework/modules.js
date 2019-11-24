import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from "react-loadable"

export function require (_module) {
  const modules = {
    react: React,
    'react-dom': ReactDOM,
    'react-loadable': Loadable
  }
  if (modules[_module]) {
    return modules[_module]
  } else {
    return {}
  }  
}
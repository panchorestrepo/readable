import React from 'react'
import { ReactSVG, ReduxSVG, UdacitySVG } from '../components/logos'

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export const inline = {display: 'inline-block',verticalAlign : 'middle'}

export const RenderLogoEntry = ({name}) => {
  return (
    <div>
      <div style={inline}>
        {Logos[name]}
      </div>
      <div style={inline}>
        {name}
      </div>
    </div>
  )
}
const allCompoment = () => {
  return (<div></div>)
}
export const Logos = {'react' : <ReactSVG/>, 'redux' : <ReduxSVG/>, 'udacity' : <UdacitySVG/>, 'all' : <allCompoment/>}

export function createCategoriesOption(categories) {
  return categories.map(
    (cat) => {return { key : cat.name, value : cat.name, text : cat.name, content : <RenderLogoEntry name={cat.name}/>}}
  )
}
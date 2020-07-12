import React from 'react'

function Image(props){

  const url = "http://localhost:3002/"+props.image

  return (
   <div className="Image">
    <img src={url} width="300" height="300" alt="pictures"/>

    <h1>{props.caption}</h1>
   </div>
  )
}

export default Image
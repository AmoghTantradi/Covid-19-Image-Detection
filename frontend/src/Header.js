import React from 'react'

function Header(props){


  return (
   <div className="container">
     <div className="jumbotron">
       <div className="header"><h1>Covid App</h1> </div>
        <p>This application allows doctors to upload PAN X-ray images of their patients and get a prediction from an extremely accurate model whether the patient has COVID or not</p>
     </div>
   </div>
   

   
  )
}

export default Header
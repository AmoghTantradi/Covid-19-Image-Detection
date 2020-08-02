import React from 'react'

function Footer({link}){

  return (
    <div>
      
<footer className="page-footer font-small blue">

 <div className="footer-copyright text-center py-3">
   © 2020 Copyright:
    <a href={"/"+link}> Amogh Tantradi</a>
  </div>

</footer>

  </div>
  )




}

export default Footer
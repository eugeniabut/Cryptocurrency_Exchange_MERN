import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SecuredRoutes({children, authenticated}) {

    console.log("authenticated",authenticated)
    const navigate = useNavigate()
    if(!authenticated) navigate('/login')
  return (
    <>
     {children} 
    </>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function SmallButton({name, style, to, onClick, children}) { 
  
  return (
    <Link to={"/"+to} onClick={onClick} type="button" className={`border-2 border-black/10 hover:bg-gradient-to-br font-medium rounded-full text-md px-5 py-2 text-center shadow-lg hover:shadow-xl ${style}`}>{name}{children}</Link>
  )
}
 
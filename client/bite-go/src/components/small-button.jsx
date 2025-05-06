import React from 'react'
import { Link } from 'react-router-dom'

export default function SmallButton({name, style, to, onClick}) { 
  
  return (
    <Link to={"/"+to} onClick={onClick} type="button" className={` hover:bg-gradient-to-br font-medium rounded-lg text-md px-5 py-2 text-center shadow-lg hover:shadow-xl ${style}`}>{name}</Link>
  )
}
 
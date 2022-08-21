import React from 'react'
import {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'

function User() {

    const params= useParams()
    const {user, getUser} = useContext(GithubContext)

    useEffect(() =>{

        getUser(params.login)

    },[])
  return (
    <div>user</div>
  )
}

export default User
import React from 'react'
import Notes from './Notes'

const Home = (props) => {
 

  return (
    <>
    <Notes showAlert={props.showAlert}></Notes>
    </>
  )
}

export default Home

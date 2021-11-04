import React from 'react'
import { NextPage } from 'next'
import MainHeading from '@src/components/main-heading/main-heading'
import Nav from '@src/components/nav/nav'

const Home: NextPage = () => {
  return (
    <>
      <Nav />
      <MainHeading>Hello There</MainHeading>
    </>
  )
}

export default Home

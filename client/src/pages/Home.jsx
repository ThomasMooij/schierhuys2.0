import React, { lazy } from 'react'

import Landing from '../components/home/Landing'
const Photos = lazy(() => import('../components/home/Photos'))
const Reserve = lazy(() => import('../components/home/Reserve'))
const Reviews = lazy(() => import('../components/home/Reviews'))
const Contact = lazy(() => import('../components/home/Contact'))
const Footer = lazy(() => import('../components/home/Footer'))

const Home = ( {setSelectedPage}) => {
  return (
    <>
      <Landing setSelectedPage={setSelectedPage}/>
      <Photos />
      <Reserve />
      <Reviews />
      <Contact />
     <Footer />
    </>
  )
}

export default Home

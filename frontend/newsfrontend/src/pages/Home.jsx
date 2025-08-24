import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Search from '../components/Search'
import TrendingNews from '../components/TreandingNews'
import CallToAction from '../components/CallToAction'


const home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Search />
      <TrendingNews />
      <CallToAction />
      
    </div>
  )
}

export default home
import './App.css'
import { Routes, Route, NavLink } from 'react-router-dom'
import Contexts from './pages/Contexts/Contexts'
import AddContext from './pages/AddContext/AddContext'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import React from 'react'
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'

function App() {

  const userStored = JSON.parse(localStorage.getItem('userStored'))


  return (
    <>
      <header>
        <nav className="login">
          <Grid>
            <GridItem><NavLink to="/login">Login 🔐</NavLink></GridItem>
            <GridItem>{userStored ? <NavLink to="/profile">Profile 🙋🏻‍♀️</NavLink> : null}</GridItem>
          </Grid>
        </nav>
        <Heading as="h1" size="2xl">The IADB</Heading>
        <nav>
          <Tabs variant='enclosed'>
            <TabList>
              <Tab><NavLink to="/">Contexts</NavLink></Tab>
              <Tab>{userStored ? <NavLink to="/add-context">Add Context</NavLink> : null}</Tab>
            </TabList>
          </Tabs>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<h2>Loading...</h2>}><Contexts /></React.Suspense>
        } />
        <Route path="/add-context" element={
          <React.Suspense fallback={<h2>Loading...</h2>}><AddContext /></React.Suspense>
        } />
        <Route path="/login" element={
          <React.Suspense fallback={<h2>Loading...</h2>}><Login /></React.Suspense>
        } />
        <Route path="/profile" element={
          <React.Suspense fallback={<h2>Loading...</h2>}><Profile /></React.Suspense>
        } />
      </Routes>

    </>
  )
}

export default App

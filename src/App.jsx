import {RouterProvider,createBrowserRouter,createRoutesFromElements,Route} from 'react-router'
import Map from './pages/Map.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import React, { Suspense, useEffect } from 'react'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import RestrictedPublicRoutes from './components/RestrictedPublicRoutes.jsx'
import PageLoader from './components/PageLoader.jsx'
import { DarkModeProvider } from './contexts/Darkmode.jsx'
import { socket } from './socket/socket.js'
import { sendNotification } from './helper/notification.js'
import Story from './pages/Story.jsx'
import Profile from './pages/Profile.jsx'
import ErrorWrapper from './components/error/ErrorWrapper.jsx'
import Vault from './pages/Vault'
import LandingPage from './pages/Landing.jsx'
import useLocation from './lib/hooks/useLocation.js'

const About = React.lazy(()=> (import('./pages/About.jsx')))
const Upload = React.lazy(()=> (import('./pages/Upload.jsx')))
// const Vault = React.lazy(()=>(import('./pages/vault.jsx')))

function App() {
  useLocation()
  useEffect(()=>{
    socket.on('connect',()=>{
      console.log('socket connected')
    })
    socket.on('notification', (data)=>{
      sendNotification(data.msg)
      
    })

    return () => {
      socket.off('connect')
      socket.off('notification')
      socket.disconnect()
    }
  },[])

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<ErrorWrapper />}>
      <Route element={<RestrictedPublicRoutes />}>
      <Route path='login' element={<Login />}></Route> 
      <Route path='signup' element={<Signup />}></Route> 
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path='profile' element={
              <Suspense fallback={<PageLoader/>}>
                <Profile />
              </Suspense>} />
        <Route path='upload' element={
              <Suspense fallback={<PageLoader/>}>
                <Upload />
              </Suspense>} />
          <Route path='story/:id' element={
              <Suspense fallback={<PageLoader/>}>
                <Story />
              </Suspense>} /> 

      </Route>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path='' element={<Map />} />
          <Route path='vault' element={
              <Suspense fallback={<PageLoader/>}>
                <Vault />
              </Suspense>} /> 
        </Route> 
      </Route>
      <Route path='/home' element={<LandingPage />} />
    </Route>
    </>
  )
)

  return (
    <DarkModeProvider>
    <RouterProvider router={router} />
    </DarkModeProvider>
  )
}

export default App

import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import BrowseEventsPage from './pages/BrowseEventsPage'
import MyListPage from './pages/MyListPage'
import AttendanceDetailPage from './pages/AttendanceDetailPage'
import EditAttendancePage from './pages/EditAttendancePage'
import UserPage from './pages/UserPage'
import Navbar from './components/Navbar'
import EventDetailPage from './pages/EventDetailPage'
import './App.css'

function App() {

  return (
    <>

    <Navbar/>
  
      <Routes>
      <Route path="/" element={<AuthPage/>} />
      <Route path="/events" element={<BrowseEventsPage/>} />
      <Route path="/events/:id" element={<EventDetailPage/>}/>
      <Route path="/my-list" element={<MyListPage/>}/>
      <Route path="/user" element={<UserPage/>}/>
      <Route path="/attendances/:id" element={<AttendanceDetailPage/>}/>
      <Route path="/attendances/:id/edit" element={<EditAttendancePage/>}/>

    </Routes>

     </>
  )
}

export default App

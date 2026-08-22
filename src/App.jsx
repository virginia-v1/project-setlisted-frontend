import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import BrowseEventsPage from './pages/BrowseEventsPage'
import MyListPage from './pages/MyListPage'
import AttendanceDetailPage from './pages/AttendanceDetailPage'
import EditAttendancePage from './pages/EditAttendancePage'
import UserPage from './pages/UserPage'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage/>} />
      <Route path="/events" element={<BrowseEventsPage/>} />
      <Route path="/my-list" element={<MyListPage/>}/>
      <Route path="/user" element={<UserPage/>}/>
      <Route path="/attendance/:id" element={<AttendanceDetailPage/>}/>
      <Route path="/attendance/:id/edit" element={<EditAttendancePage/>}/>

    </Routes>
  )
}

export default App

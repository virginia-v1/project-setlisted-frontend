import { useState, useEffect } from 'react'
import api from '../api/axios'
import {Link} from 'react-router-dom'



export default function BrowseEventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events')
        setEvents(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchEvents()
  }, [])



  return (
    <div className="events-page">
      <h1>Browse Events</h1>

      <div className="events-grid">
        {events.map((event)=>
        <Link key={event._id} to={`/events/${event._id}`} className="card event-card">
           <span className="tag">{event.genre}</span>
           <p className="event-name">{event.artistName}</p>
           <p className="event-details">
            {event.venueCity}, {event.venueCountry} - {new Date (event.date).toLocaleDateString()}
            </p>
            </Link>
        )}
        
          </div>
      </div>
  )
}
/* View option to be added to lead to "Event Card Page" where users can view the event details */
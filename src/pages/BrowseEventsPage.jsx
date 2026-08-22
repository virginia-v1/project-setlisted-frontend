import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function BrowseEventsPage() {
  const [events, setEvents] = useState([])
  const [message, setMessage] = useState('')

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

  const handleAdd = async (eventId) => {
    try {
      await api.post('/attendance', { event: eventId, status: 'wishlist' })
      setMessage('Added to your list!')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not add')
    }
  }

  return (
    <div className="events-page">
      <h1>Browse Events</h1>
      {message && <p className="events-message">{message}</p>}

      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="card event-card">
            <span className="tag">{event.genre}</span>
            <p className="event-name">{event.artistName}</p>
            <p className="event-details">
              {event.venueCity}, {event.venueCountry}. {new Date(event.date).toLocaleDateString()}
            </p>
            <button className="button-primary" onClick={() => handleAdd(event._id)}>
              Add to my list
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
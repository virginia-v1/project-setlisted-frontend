import { useState, useEffect } from 'react'
import api from '../api/axios'
import {Link} from 'react-router-dom'
import Searchbar from '../components/Searchbar'



export default function BrowseEventsPage() {
  const [events, setEvents] = useState([])
  const [attendedEventIds, setAttendedEventIds] = useState (new Set())
  const [search, setSearch] = useState ('')
  const [genreFilter, setGenreFilter] = useState('All')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events')
        setEvents(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchAttendances = async () => {
      try {
        const response = await api.get('/attendances')
        const ids = new Set(response.data.map((a) => a.event?._id || a.event))
        setAttendedEventIds(ids)
      } catch (error) {
        console.log(error)
      }
    }

    fetchEvents()
    fetchAttendances()
  }, [])

  const genres = ['All', ...new Set(events.map((e)=> e.genre))] 

  const visibleEvents = events.
  filter((event)=> !attendedEventIds.has(event._id))
  .filter((event)=> genreFilter === 'All' || event.genre === genreFilter)
  .filter((event)=> !search || event.artistName?.toLowerCase().includes(search.toLowerCase()))


  return (
    <div className="events-page">
      <h1>Browse Events</h1>

      <Searchbar search={search} setSearch={setSearch}/>

      <div className="genre-filters">
        {genres.map((genre)=> (
          <span 
          key={genre}
          className={genreFilter === genre? 'filter-pill active' : 'filter-pill'}
          onClick={()=> setGenreFilter(genre)} >
            {genre}
          </span>
        ))}
      </div>

      <div className="events-grid">
        {visibleEvents.map((event)=>
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
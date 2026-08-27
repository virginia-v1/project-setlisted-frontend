# Setlisted

A personal concert and festival tracker. Browse a catalogue of live music from around the world, save the shows you're excited about, and keep a record of the ones you've already been to — with star ratings and comments.

Built as a final project for the Ironhack Web Development Bootcamp.

## Repos

- **Backend:** [project-setlisted-backend](https://github.com/virginia-v1/project-setlisted-backend)
- **Frontend:** [project-setlisted-frontend](https://github.com/virginia-v1/project-setlisted-frontend)

## Tech stack

**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT authentication, bcrypt
**Frontend:** React (Vite), react-router-dom, plain CSS

## Features

- Sign up, log in, log out — with hashed passwords and JWT-based sessions
- Browse a shared event catalogue, with search and genre filters
- Add events to a personal wishlist, or mark them as attended
- Rate and leave comments on events you've attended
- Full CRUD on your personal attendance list — create, view, edit, delete

## Data models

- **User** — username, email, hashed password
- **Event** — the shared catalogue (artist, venue, date, genre); read-only, seeded ahead of time
- **Attendance** — a user's personal link to an event, storing status (attended/wishlist), rating, and comments; the model with full CRUD

## API routes

### Auth
| Method | Route | Protected |
|---|---|---|
| POST | /api/auth/signup | No |
| POST | /api/auth/login | No |
| GET | /api/auth/verify | Yes |

### Events
| Method | Route | Protected |
|---|---|---|
| GET | /api/events | No |
| GET | /api/events/:id | No |

### Attendances
| Method | Route | Protected |
|---|---|---|
| POST | /api/attendances | Yes |
| GET | /api/attendances | Yes |
| GET | /api/attendances/:id | Yes |
| PUT | /api/attendances/:id | Yes |
| DELETE | /api/attendances/:id | Yes |

## Setup — backend

```bash
git clone https://github.com/virginia-v1/project-setlisted-backend.git
cd project-setlisted-backend
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

```bash
node server.js
```

## Setup — frontend

```bash
git clone https://github.com/virginia-v1/project-setlisted-frontend.git
cd project-setlisted-frontend
npm install
```

Update the `baseURL` in `src/api/axios.js` to point to your running backend, then:
```bash
npm run dev
```

## Pages

- Auth — combined login/signup
- Browse Events — search and genre filtering
- Event Detail — add to wishlist or mark as attended
- My List — attended vs. wishlist views
- Attendance Detail — view, edit, delete an entry
- User — account stats and sign out
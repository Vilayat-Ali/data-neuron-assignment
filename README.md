# Documentation

## Getting Started

### Frontend

1. Clone the repo and install deps
2. add a `.env` file at root of frontend and add the following

```text
VITE_APP_BACKEND_URL=http://localhost:8000/api/
```

### Backend

1. Clone the repo and install deps
2. add a `.env` file at root of frontend and add the following

```text
PORT=8000
MONGO_URI=mongodb://127.0.0.1/dataneuron
```

### Running

1. Run backend with command `npm run start:dev`
2. Run frontend with command `npm run dev`
3. Go to `http://localhost:5173`

## Frontend 

### Tech Stack

- React.js
- Vite
- Redux
- @Reduxjs/toolkit
- TypeScript

### Feature Set

- Caching
- Responsive Layout Design

## Backend

### Tech Stack

- Nest.js
- MongoDB

### Feature Set

- Bootstrap method to setup `Count` document inorder to record operation counts.
- Maintainable and scalable architecture.
- Distributed code, better suited for both - monolithic and microservice architecture.
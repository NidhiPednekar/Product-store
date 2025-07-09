# Product Store

A full-stack e-commerce application with JWT authentication, product filters and search, Stripe payments, automated deployment using Docker and GitHub Actions.

## Features
- User registration and login with JWT authentication
- Product listing, filtering, and search
- Stripe payment integration
- MongoDB for data storage
- Dockerized frontend, backend, and database
- Automated CI/CD with GitHub Actions

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Payments:** Stripe
- **Containerization:** Docker, Docker Compose
- **CI/CD:** GitHub Actions

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/) (if running locally)  

### Environment Variables
Create a `.env` file in the `backend/` directory:
```
PORT=5005
MONGODB_URI=mongodb://localhost:27017/product-store
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
NODE_ENV=development
```

### Local Development
#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### MongoDB
- Make sure MongoDB is running locally, or use Docker Compose as below.

### Using Docker Compose
```bash
docker-compose up --build
```
- The backend will be available at `http://localhost:5005`
- The frontend will be available at `http://localhost:5173`
- MongoDB will run on port `27017`

### Running Tests
```bash
cd backend
npm test
cd ../frontend
npm test
```




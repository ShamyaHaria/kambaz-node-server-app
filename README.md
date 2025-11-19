# Kambaz Node Server App

Backend API server for the Kambaz learning management system, built with Node.js and Express.

## 🚀 Features

- **RESTful API** for course management system
- **Session-based authentication** with express-session
- **CORS enabled** for cross-origin requests
- **Lab5 endpoints** for learning Node.js fundamentals
- **Full CRUD operations** for courses, modules, assignments, and enrollments

## 📁 Project Structure
```
kambaz-node-server-app/
├── Kambaz/
│   ├── Assignments/      # Assignment routes and data access
│   ├── Courses/          # Course routes and data access
│   ├── Database/         # JSON data files
│   ├── Enrollments/      # Enrollment routes and data access
│   ├── Modules/          # Module routes and data access
│   └── Users/            # User authentication and routes
├── Lab5/                 # Lab exercises endpoints
│   ├── PathParameters.js
│   ├── QueryParameters.js
│   ├── WorkingWithArrays.js
│   └── WorkingWithObjects.js
├── Hello.js              # Hello world route
├── index.js              # Main server file
└── .env                  # Environment variables
```

## 🛠️ Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/ShamyaHaria/kambaz-node-server-app.git
   cd kambaz-node-server-app
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Create `.env` file:**
```env
   CLIENT_URL=http://localhost:3000
   SESSION_SECRET=your_secret_key
   SERVER_ENV=development
   PORT=4000
```

4. **Start the server:**
```bash
   node index.js
```

   Server will run on `http://localhost:4000`

## 📚 API Endpoints

### Authentication
- `POST /api/users/signup` - Create new user account
- `POST /api/users/signin` - Sign in user
- `POST /api/users/signout` - Sign out user
- `POST /api/users/profile` - Get current user profile
- `PUT /api/users/:userId` - Update user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/users/current/courses` - Get enrolled courses for current user
- `POST /api/users/current/courses` - Create new course
- `PUT /api/courses/:courseId` - Update course
- `DELETE /api/courses/:courseId` - Delete course

### Modules
- `GET /api/courses/:courseId/modules` - Get modules for a course
- `POST /api/courses/:courseId/modules` - Create module for course
- `PUT /api/modules/:moduleId` - Update module
- `DELETE /api/modules/:moduleId` - Delete module

### Assignments
- `GET /api/courses/:courseId/assignments` - Get assignments for course
- `POST /api/courses/:courseId/assignments` - Create assignment
- `PUT /api/assignments/:assignmentId` - Update assignment
- `DELETE /api/assignments/:assignmentId` - Delete assignment

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/courses/:courseId/enroll` - Enroll in course
- `DELETE /api/courses/:courseId/enroll` - Unenroll from course

### Lab5 Endpoints
- `GET /lab5/welcome` - Welcome message
- `GET /lab5/add/:a/:b` - Add two numbers (path params)
- `GET /lab5/subtract/:a/:b` - Subtract two numbers
- `GET /lab5/multiply/:a/:b` - Multiply two numbers
- `GET /lab5/divide/:a/:b` - Divide two numbers
- `GET /lab5/calculator?operation=add&a=5&b=3` - Calculator (query params)
- `GET /lab5/assignment` - Get assignment object
- `GET /lab5/assignment/title` - Get assignment title
- `GET /lab5/assignment/title/:newTitle` - Update assignment title
- `GET /lab5/module` - Get module object
- `GET /lab5/module/name` - Get module name
- `GET /lab5/todos` - Get all todos
- `GET /lab5/todos/:id` - Get todo by ID
- `GET /lab5/todos/create` - Create new todo
- `POST /lab5/todos` - Create todo (POST)
- `PUT /lab5/todos/:id` - Update todo
- `DELETE /lab5/todos/:id` - Delete todo

## 🔧 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **express-session** - Session management
- **cors** - Cross-origin resource sharing
- **uuid** - Generate unique IDs
- **dotenv** - Environment variable management

## 🌐 Deployment

Deployed on **Render**: [https://kambaz-node-server-app-ey4i.onrender.com](https://kambaz-node-server-app-ey4i.onrender.com)

### Environment Variables (Production)
```env
CLIENT_URL=https://your-vercel-app.vercel.app
SESSION_SECRET=your_production_secret
SERVER_ENV=production
```

## 👤 Author

**Shamya Haria**
- GitHub: [@ShamyaHaria](https://github.com/ShamyaHaria)

## 📝 License

This project is for educational purposes as part of CS5610 Web Development course at Northeastern University.
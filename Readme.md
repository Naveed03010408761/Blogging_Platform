# 📝 Blogging Platform - MERN Stack Application

A full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create, read, update, and delete blog posts and comments.

## 🌟 Features

### 🔐 Authentication & Authorization

- User registration and login with JWT tokens
- Protected routes for authenticated users
- Password encryption with bcrypt
- Token refresh functionality

### 📄 Blog Posts

- Create, read, update, and delete blog posts
- Rich text content support
- Author attribution and timestamps
- User-specific post management
- Responsive post listing and details view

### 💬 Comments System

- Add comments to blog posts
- Edit and delete own comments
- Real-time comment updates
- Comment moderation

### 👤 User Profiles

- User profile management
- Edit profile information
- View personal post history
- User dashboard with statistics

### 🎨 UI/UX Features

- Responsive design with Tailwind CSS
- Modern and clean interface
- Loading states and error handling
- Intuitive navigation

## 🛠️ Tech Stack

### Frontend

- **React** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Context** - State management

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd blogging_platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the Application

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🗄️ Database Schema

### User Model

```javascript
{
  userName: String,
  email: String,
  password: String,
  refreshToken: String
}
```

### Post Model

```javascript
{
  title: String,
  content: String,
  author: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Comment Model

```javascript
{
  content: String,
  author: ObjectId (ref: User),
  post: ObjectId (ref: Post),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/logout` - User logout

### Posts

- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create new post (protected)
- `PUT /api/v1/posts/:id` - Update post (protected)
- `DELETE /api/v1/posts/:id` - Delete post (protected)
- `GET /api/v1/posts/my-posts` - Get user's posts (protected)

### Comments

- `GET /api/v1/comments` - Get all comments
- `GET /api/v1/comments/post/:postId` - Get comments for a post
- `POST /api/v1/comments/:postId` - Create comment (protected)
- `PUT /api/v1/comments/:commentId` - Update comment (protected)
- `DELETE /api/v1/comments/:commentId` - Delete comment (protected)

### Users

- `GET /api/v1/users/profile` - Get user profile (protected)
- `PUT /api/v1/users/profile` - Update user profile (protected)

## 🎯 Usage

1. **Register/Login**: Create an account or login to access all features
2. **Create Posts**: Use the "Create Post" button to write new blog posts
3. **Manage Posts**: View, edit, or delete your posts from the "My Posts" section
4. **Interact**: Read other users' posts and leave comments
5. **Update Profile**: Manage your account information from the profile page

## 🔧 Development

### Project Structure

```
blogging_platform/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
└── README.md
```

### Available Scripts

**Backend:**

```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

**Frontend:**

```bash
npm start        # Start development server
npm build        # Build for production
npm test         # Run tests
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Check your connection string in `.env`
2. **CORS Errors**: Ensure backend CORS configuration is correct
3. **JWT Errors**: Verify your secret keys in environment variables
4. **Port Conflicts**: Change ports in `.env` files if needed

### Getting Help

1. Check the browser console for frontend errors
2. Check the terminal for backend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB is running and accessible

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Happy Blogging!** 🚀

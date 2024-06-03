# SocioVerse
SocioVerse is a web-based social media platform created using the MERN stack. Users can share posts, like/dislike each other's posts, and comment on posts. The platform includes real-time chat functionality and allows users to manage their profiles and friendships.

# Tech Stack
## Frontend
- ReactJS
- MaterialUI
- Redux
- Formik
- Yup
- react-toastify
- emoji-picker-react
- socket.io-client
## Backend
- MongoDB
- Express
- Multer
- Cors
- Helmet
- Socket.IO

# Features 
- User authentication (Login, Register)
- Create, edit, delete posts
- Like/Dislike posts
- Comment on posts
- Add/Remove friends
- Edit user profile
- Delete account
- Toggle between dark mode and light mode
- Report a problem
- Real-time chatting with friends
- Search functionality to find other users

# Screenshots

## Login Page
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/5a4d3716-46d6-4bf8-b952-8397e374c433)

## Registration Page
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/8b435c94-6075-4b92-9c50-999054a1801c)

## Home Page 
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/6be39bc8-f505-4325-b6d4-0e505c707934)

## Profile Page 
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/f94f63fd-27f4-4fc4-83d7-ff09c19ac4ca)

## Search functionality
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/401616c1-1f39-4ff7-ac61-a4b561ed4070)

## Comments
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/1705ebd0-9612-41fd-bb6a-547faae3bd20)

# Installation 
1. Clone the repo or download the zip file.
> git clone https://github.com/dashakankhya20/SocioVerse.git
2. Navigate to the server folder and install dependencies.
> cd server 
> npm install
3. Navigate to the client folder and install dependencies.
> cd client
> npm install
4. Create a .env file in the server directory and add the following environment variables:
> MONGO_URI=your_mongo_database_uri
> JWT_SECRET=your_jwt_secret
> PORT=your_preferred_port 
5. Start the client application.
> cd client
> npm start
6. Open another terminal and start the server application.
> cd server
> npm start

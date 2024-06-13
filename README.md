# SocioVerse
SocioVerse is a social media web app built with the MERN stack. Users can register and log in, create and manage posts, and interact with others through likes, dislikes, and comments. The app also features real-time chat, profile management, friend management, and a responsive design that works on all devices. Users can toggle between dark and light modes, search for other users, and report issues. Password management includes OTP verification for password recovery and changes.

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
## User Authentication
- Login, Register
- Forgot password and change password through OTP verification

## Profile Management
- View profile
- Edit profile
- Delete account

## Post Management
- Create a post
- Delete a post
- Like/Dislike a post
- Comment on a post

## Friends Management
- Add or remove friends

## User Interface
- Toggle between dark mode and light mode
- Fully responsive design

## Communication
- Real-time chatting with friends

## Search Functionality
- Find people online

## Report Issues
- Report a problem

# Screenshots

## Login Page
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/b8f7ab52-f132-4ed6-a679-c188319bc0ee)

## Registration Page
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/9dfe3ceb-aacb-4220-b27a-8255e9a05a73)

## Home Page 
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/72c04a99-ac6d-48f2-a2b2-8a56d858978a)

## Profile Page 
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/fdb91b80-aacd-4104-9697-c7a8e11d2c04)

## Search functionality
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/ce5eb876-0cb6-4c17-9d30-b268ac0d813f)

## Comments
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/dce39804-12ae-4f71-a6ba-5feb0f38e068)

## Report Problem
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/a31aa17f-efad-4d46-94ef-1ebab9ade485)

## Chat Page
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/4f58493f-4e49-4cc9-88b1-b5dbd5b3b955)

## Chatting With Your Friend
![image](https://github.com/dashakankhya20/SocioVerse/assets/144155014/04f1a0a3-b092-431a-8b2b-97c72b237ab4)


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
> CLOUD_NAME=your_cloudinary_cloud_name
> CLOUDINARY_URL=your_cloudinary_url
> CLOUDINARY_API_KEY=your_cloudinary_api_key
> CLOUDINARY_API_SECRET=your_cloudinary_api_secret
> SMTP_HOST=smtp_host_address
> SMTP_PORT=smtp_port_number
> SMTP_USER=smtp_username
> SMTP_PASS=smtp_password

5. Start the client application.
> cd client
> npm start
6. Open another terminal and start the server application.
> cd server
> npm start

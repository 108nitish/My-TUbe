# 🎥 My-TUbe

A full-stack video streaming platform where users can **upload**, **watch**, and **interact** with videos — inspired by YouTube.

Built using **Node.js**, **Express.js**, **MongoDB**, and **Supabase** for video/image storage. It includes user authentication, like/comment features, dark mode, and a responsive UI.

---

## 🚀 Features

- ✅ User Authentication
- 🎥 Upload and stream videos
- 👍 Like & 💬 Comment system
- 📈 View count tracking
- 🖼️ Video thumbnail support
- 🌙 Dark Mode
- 📱 Fully responsive design

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Storage**: Supabase (for videos & thumbnails)
- **Authentication**: Custom Auth / JWT

---

## 📂 Project Structure

My-TUbe/ │ ├── public/ # Static files ├── routes/ # Express routes ├── views/ # Frontend pages (if using EJS) ├── uploads/ # Temporary file storage ├── .env # Environment variables ├── app.js # Main server file └── README.md # This file

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/My-TUbe.git
cd My-TUbe
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root folder and add the following:

env
Copy
Edit
PORT=3000
MONGO_URI=your_mongodb_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_role_key

4. Start the Server
bash
Copy
Edit
npm start
Visit: http://localhost:8080

✅ Don’t forget to configure environment variables on the deployed platform.
 

🧠 Lessons Learned
How to manage media file uploads and real-time streaming

Using Supabase for file storage and secure access

Structuring and organizing full-stack applications

Implementing interactive UI and backend logic for a streaming platform

🙌 Acknowledgements
Supabase for storage integration

MongoDB Atlas for the database

Node.js & Express for backend

And the open-source community for continuous inspiration

🧑‍💻 Author
Nitish
📫 [Connect on LinkedIn] (https://www.linkedin.com/in/nitish-jangra-93716b320 ) 

💬 Feedback
If you have any feedback or suggestions, please open an issue or contact me directly on LinkedIn.

⭐ Support
If you like this project, consider giving it a ⭐ on GitHub to support the work and help others find it!
 

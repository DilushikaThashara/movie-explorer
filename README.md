# 🎬 Movie Explorer – Discover Your Favorite Films

A responsive, modern React web app to explore trending and popular movies using The Movie Database (TMDb) API. Includes search, filtering, favorites, dark/light mode, and more.

## 🌟 Live Demo

👉 [View Live on netlify](https://681f99f032fbf162de5f3e44--singular-douhua-2300f2.netlify.app/)  

---

##  Default Credentials

Use these to log in:
- **Username**: `user1`
- **Password**: `1234`

---

##  Features

 Trending movies listing  
 Search with real-time results  
 Genre-based filtering  
 Light/Dark theme toggle  
 Add/Remove favorites (with persistence using localStorage)  
 Infinite scroll functionality  
 Responsive design (Mobile-first)  
 Logout and session management  
 Trailer preview with YouTube embedding  
 Error handling & validation  
 Last search persistence

---

##  Tech Stack

- **Frontend**: React, React Router, Material UI (MUI)
- **State Management**: React Context API
- **API**: [TMDb API](https://www.themoviedb.org/)
- **Deployment**: Vercel / Netlify


##  How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://gitlab.com/your-username/movie-explorer.git
   cd movie-explorer

2. **Install dependencies**
     npm install

3. **Create file in the root**
    REACT_APP_TMDB_API_KEY=your_tmdb_api_key

4. **Run the app**
   Run the app

5. **Visit in browser**
Navigate to http://localhost:3000

##  TMDb API Usage
The app uses the TMDb API to fetch:
Trending movies
Genre list
Movie search results
Movie details including YouTube trailer links

You must sign up at TMDb to get a free API key.
Paste your API key into the .env file as shown above.

## Deployment (netlify)
Recommended: Use Vercel for easy React deployment.

Step-by-step:
1. Push your project to GitLab or GitHub.
2. Go to vercel.com, log in, and click "New Project".
3. Import your Git repo.
4. Set the environment variable during setup:
    Key: REACT_APP_TMDB_API_KEY
Value: your_tmdb_api_key

5. Click Deploy – your live site will be ready in seconds.
You can also use Netlify similarly.

## Deliverables
 GitLab Repo with well-structured, commented code
 Responsive UI
 Full feature set
 usage for API key
 Complete README.md
 Live deployment link (netlify )

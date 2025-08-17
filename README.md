### 🎵 Spotify Review

This is a **Spotify integration project**, built with **React** and **TypeScript**, that lets users connect their Spotify account and view personalized insights like their top tracks, artists, and listening habits.

The app focuses on clean state management, strong typing, and smooth integration with the Spotify Web API.

---

### 🚀 Tech Stack

- **React:** For building an interactive, responsive web interface.
- **TypeScript:** Ensures type safety and maintainability across the codebase.
- **Redux Toolkit:** Handles Spotify authentication tokens and user data reliably.
- **Spotify Web API:** Provides access to user data such as top tracks, artists, and playback history.

---

### 🎯 Purpose

I created this project to practice working with **third-party APIs and OAuth flows**, specifically focusing on:

- Implementing the **Spotify PKCE authentication flow** securely.
- Handling and refreshing access tokens.
- Displaying dynamic user data in a clean, intuitive way.

This project also gave me the opportunity to improve my skills with **TypeScript, React state management, and API integration.**

---

### 🔒 Note on Access

This project is a personal portfolio piece, not a public application. Due to the requirements of the Spotify Web API and its OAuth flow, the application is **not accessible to the public**. Only the developer who created it (me!) can log in and use it with my own Spotify account. This is a common practice for securing third-party API integrations and highlights a key aspect of my learning process.

---

### 🛠️ Technical Deep Dive

While the application isn't publicly available, here is a detailed breakdown of the technical components and user flow:

1.  **Secure Authentication with PKCE:** The user clicks a "Login with Spotify" button, which starts the **Proof Key for Code Exchange (PKCE)** authorization flow. This redirects them to Spotify's website for login. After they grant permission, Spotify sends a secure authorization code back to the app. This code is then exchanged for a short-lived **access token** and a long-lived **refresh token**. The PKCE flow ensures that this process is secure, as no client secrets are exposed.

2.  **Centralized State Management:** I used **Redux Toolkit** to manage the state of the application. This is crucial for handling the authentication tokens and user data from the Spotify API. Storing this information in a central store ensures that any component in the application can easily access the user's data and tokens in a predictable way.

3.  **Dynamic Data Retrieval & Display:** Once the access token is acquired, the app makes authenticated requests to various Spotify API endpoints (e.g., `/me/top/tracks`, `/me/top/artists`). The retrieved JSON data is then processed and mapped into **React components**, allowing for the dynamic display of the user's personalized music stats. The UI automatically updates as new data is fetched, demonstrating a seamless integration with the API and an understanding of React's state-driven UI.

---

### 🌱 Features & Future Development

- **🔑 Spotify Authentication** (OAuth with PKCE)
- **🎶 View Top Tracks & Artists** based on user listening data
- **📈 Personalized Stats** to reflect user listening habits
- **🔄 Token Refresh Handling** to keep sessions alive without repeated logins
- **📱 Responsive Design** for both desktop and mobile browsers

Planned improvements include:

- **Playlist Insights:** View playlists and analyze track/artist frequency.
- **Listening Trends:** Charts showing how listening habits change over time.
- **Global Leaderboards:** Compare your top tracks with other users.
- **Design Enhancements:** Improved UI/UX and visualizations for music stats.

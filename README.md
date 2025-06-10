# 📚 Electronic Bookstore

A modern mobile reading and writing platform built with React Native, allowing users to read, discover, and publish digital books.

## ✨ Features

### For Readers
- 📖 **Immersive Reading Experience** - Customizable fonts, themes, and reading settings
- 📚 **Personal Library** - Organize books with library and archive collections
- 🔍 **Smart Search** - Find books by keywords, genres, and categories
- ⭐ **Reviews & Ratings** - Rate and review books from the community
- 📱 **Cross-platform** - Seamless experience on iOS and Android

### For Authors
- ✍️ **Content Creation** - Write and publish books directly in the app
- 📊 **Analytics** - Track views, ratings, and reader engagement
- 🗂️ **Chapter Management** - Organize content with easy chapter navigation
- 🏷️ **Tagging System** - Categorize books with genre tags

### General Features
- 🔐 **Secure Authentication** - JWT-based auth with social login support
- 🎨 **Customizable Interface** - Dark/light themes and font preferences
- 💾 **Offline Reading** - Save books for offline access
- 🔄 **Real-time Sync** - Keep reading progress synchronized

## 🛠️ Tech Stack

- **Frontend**: React Native
- **Navigation**: React Navigation
- **State Management**: Zustand
- **Authentication**: JWT + Social OAuth
- **Storage**: AsyncStorage
- **Media**: Firebase Storage
- **API Communication**: Axios

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- React Native CLI
- iOS Simulator / Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zlash01/Electronic_bookstore.git
   cd Electronic_bookstore
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   # Create .env file and add your configuration
   API_BASE_URL=your_backend_url
   FIREBASE_CONFIG=your_firebase_config
   ```

4. **Run the application**
   ```bash
   # For iOS
   npx react-native run-ios
   
   # For Android
   npx react-native run-android
   ```

## 📱 Screenshots
![Login Screen](screenshot\0.png)
![Main Menu](screenshots\1.png)
![Reading](screenshots\2.png)
![Book Detail](screenshots\3.png)
![Create Book and Chapter](screenshots\4.png)

### Authentication & Home
<div align="center">
  <img src="./screenshots/login.png" width="250" alt="Login Screen"/>
  <img src="./screenshots/register.png" width="250" alt="Register Screen"/>
  <img src="./screenshots/home.png" width="250" alt="Home Screen"/>
</div>

### Reading Experience
<div align="center">
  <img src="./screenshots/book-detail.png" width="250" alt="Book Detail"/>
  <img src="./screenshots/reading.png" width="250" alt="Reading Screen"/>
  <img src="./screenshots/font-settings.png" width="250" alt="Font Settings"/>
</div>

### Library & Search
<div align="center">
  <img src="./screenshots/library.png" width="250" alt="Library"/>
  <img src="./screenshots/search.png" width="250" alt="Search"/>
  <img src="./screenshots/search-results.png" width="250" alt="Search Results"/>
</div>

### Content Creation
<div align="center">
  <img src="./screenshots/write-publish.png" width="250" alt="Published Books"/>
  <img src="./screenshots/create-book.png" width="250" alt="Create Book"/>
  <img src="./screenshots/chapter-creation.png" width="250" alt="Chapter Creation"/>
</div>

## 🏗️ Project Structure

```
src/
├── api/                # API controllers and services
├── assets/             # Images, fonts, and static resources
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── bookDetail/    # Book detail screens
│   ├── home/          # Home screen components
│   ├── library/       # Library management
│   ├── read/          # Reading interface
│   ├── search/        # Search functionality
│   └── write/         # Content creation tools
├── router/            # Navigation configuration
├── store/             # State management
└── util/              # Utility functions and constants
```

## 🌐 Backend

This app works with a NestJS backend. Check out the backend repository:
- **Backend Repository**: [BE-Reading-App-Mobile](https://github.com/nkd0210/BE-Reading-App-Mobile)
- **API Documentation**: Available at backend deployment
- **Deployment**: Hosted on Render

## 🔧 Architecture

### Frontend Architecture
- **Client-Server**: React Native app communicating with NestJS backend
- **State Management**: Zustand for global state
- **Authentication**: JWT tokens with refresh mechanism
- **Data Flow**: RESTful API calls with axios interceptors

### Key Features Implementation
- **Reading Interface**: Customizable font sizes, themes, and reading modes
- **Library Management**: Personal collections with archive functionality
- **Content Creation**: Rich text editor for authors
- **Search System**: Multi-parameter search with category filtering

## 🧪 Testing

The app has been tested for:
- ✅ User authentication flows
- ✅ Book navigation and reading experience
- ✅ Library management operations
- ✅ Search functionality
- ✅ Content creation and publishing
- ✅ Cross-platform compatibility

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔮 Future Enhancements

### Planned Features
- 🔄 **Multi-device Sync** - Synchronize reading progress across devices
- 📱 **Offline Mode** - Enhanced offline reading capabilities
- 💬 **Community Features** - Discussion forums and book clubs
- 🤖 **AI Recommendations** - Smart book suggestion system
- 📊 **Advanced Analytics** - Detailed insights for authors

### Technical Improvements
- Performance optimizations for large libraries
- Enhanced caching strategies
- Server-side rendering for web version
- End-to-end encryption for sensitive data


---

<div align="center">
  <strong>Built with ❤️ using React Native</strong>
  <br>
  <sub>Electronic Bookstore - Your Digital Reading Companion</sub>
</div>
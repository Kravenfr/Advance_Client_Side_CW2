# Estate Agent Property Search Application

A modern, fully responsive web-based real estate search platform built with React. This application allows users to browse, filter, and manage property listings with advanced search capabilities and an intuitive drag-and-drop favorites system.

**Live Demo**: [https://Kravenfr.github.io/Advance_Client_Side_CW2](https://Kravenfr.github.io/Advance_Client_Side_CW2)

---

## 🎯 Features

### Advanced Property Search
- **Multi-Criteria Filtering**
  - Property type (House, Flat, or Any)
  - Price range (minimum and maximum)
  - Number of bedrooms (minimum and maximum)
  - Location/postcode area search
  - Date added filter for recently listed properties
- Instant search results that update in real-time
- Clean, organized filtering interface

### Interactive Property Listings
- Grid-based property display with images and key information
- Quick property overview cards showing type, price, and location
- Direct navigation to detailed property pages
- Drag-and-drop functionality to add properties to favorites

### Detailed Property Pages
- **Tabbed Information Organization**
  - Description: Full property details, bedroom count, and tenure
  - Floorplan: Visual layout representation
  - Map: Embedded Google Maps showing property location
- Image gallery with main display and clickable thumbnails
- Multiple image viewing capability
- Back navigation to search results

### Favorites Management
- **Persistent Storage**: Favorites saved to browser localStorage
- **Drag-and-Drop Interface**: Intuitively add properties from results
- **Quick Management**: Remove individual favorites or clear all at once
- **Visual Feedback**: Highlights drop zone when dragging over

---

## 🛠️ Tech Stack

- **React** (19.2.3) - UI library
- **React Router DOM** (6.30.2) - Client-side routing with hash-based navigation
- **React Widgets** (5.8.6) - Enhanced form inputs (dropdowns, number pickers)
- **React Tabs** (6.1.0) - Tabbed interface for property details
- **@hello-pangea/dnd** (18.0.1) - Drag-and-drop functionality
- **Framer Motion** (12.23.26) - Smooth animations
- **Create React App** - Project scaffolding and build tooling
- **GitHub Pages** - Deployment hosting

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kravenfr/Advance_Client_Side_CW2.git
   cd Advance_Client_Side_CW2/estate-agent-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - The page will reload when you make changes
   - Console will display any lint errors

### Available Scripts

#### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`
Launches the test runner in interactive watch mode. Tests use Jest and React Testing Library.

#### `npm run build`
Builds the app for production to the `build` folder. The build is minified and filenames include hashes. The app is ready to be deployed.

#### `npm run deploy`
Deploys the app to GitHub Pages. Requires proper `homepage` configuration in `package.json`.

---

## 📁 Project Structure

```
estate-agent-app/
├── public/
│   ├── img/
│   │   ├── prop1/, prop2/, ... (property images)
│   │   └── floorplan/ (floorplan images)
│   ├── manifest.json
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PropertyCard.js (draggable property display component)
│   │   └── SearchForm.js (multi-criteria search filters)
│   ├── pages/
│   │   ├── SearchPage.js (main search & favorites page)
│   │   └── PropertyDetails.js (detailed property view with tabs)
│   ├── data/
│   │   └── properties.json (property database)
│   ├── App.js (main routing component)
│   ├── App.css (global styling)
│   └── index.js (entry point)
├── package.json (dependencies and scripts)
├── README.md (this file)
└── .gitignore
```

---

## 💡 Key Components

### SearchPage.js
- **Purpose**: Primary page featuring search functionality and favorites sidebar
- **Features**:
  - Drag-and-drop context management
  - Real-time property filtering
  - LocalStorage persistence for favorites
  - Dynamic property grid rendering
- **Props**: None
- **State**: `filteredProperties`, `favorites`

### PropertyDetails.js
- **Purpose**: Detailed view of individual properties
- **Features**:
  - Image gallery with thumbnail selection
  - Tabbed information (description, floorplan, map)
  - Google Maps embedding
  - URL-based property identification
- **Route**: `/property/:id`
- **State**: `mainImage`

### SearchForm.js
- **Purpose**: Advanced search filter component
- **Features**:
  - Property type dropdown
  - Price range inputs
  - Bedroom range inputs
  - Location search
  - Date picker for recent listings
  - Form validation
- **Props**: `onSearch` (callback function)
- **State**: All search criteria fields

### PropertyCard.js
- **Purpose**: Individual property listing card with drag functionality
- **Features**:
  - Draggable wrapper
  - Property image display
  - Quick info (type, price, location)
  - Link to detailed view
  - Visual feedback during dragging
- **Props**: `property` (object), `index` (number)

---

## 📊 Data Structure

Properties are stored in `src/data/properties.json` with the following structure:

```json
{
  "properties": [
    {
      "id": "prop1",
      "type": "House",
      "bedrooms": 3,
      "price": 45000000,
      "tenure": "Freehold",
      "location": "Mount Lavinia, Colombo",
      "description": "Property description...",
      "picture": "/img/prop1/1.jpg",
      "images": ["/img/prop1/1.jpg", "/img/prop1/2.jpg", ...],
      "floorplan": "/img/floorplan/1.png",
      "added": {
        "month": "October",
        "day": 12,
        "year": 2024
      }
    },
    ...
  ]
}
```

---

## 🎨 Features in Detail

### Advanced Search Functionality
- **Real-time Filtering**: Results update instantly as criteria change
- **Multi-Parameter Search**: Combine multiple filters for precise results
- **Date Handling**: Cross-browser compatible date parsing
- **Flexible Postcode Search**: Case-insensitive location matching

### Favorites System
- **Persistence**: Favorites automatically saved to `localStorage`
- **Drag-and-Drop**: Intuitive interface for adding properties
- **Quick Access**: Sidebar for easy management
- **Clear All**: Reset favorites with single button click

### Image Gallery
- **Thumbnail Navigation**: Click thumbnails to change main display
- **Active State Highlighting**: See which image is currently displayed
- **Responsive Sizing**: Images maintain aspect ratio across devices
- **Multiple Images Per Property**: Showcase multiple views

### Responsive Design
- **Mobile-Friendly**: Optimized for all screen sizes
- **Flexible Layout**: Sidebar becomes available space on larger screens
- **Touch-Friendly**: Buttons and interactive elements sized for touch
- **CSS Grid**: Modern layout using CSS Grid and Flexbox

---

## 🌍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: The application uses modern JavaScript features and may not work in older browsers (IE11 and below).

---

## 🔧 Configuration

### Deployment to GitHub Pages

1. Update `homepage` in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/Advance_Client_Side_CW2"
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

### Environment Variables

If needed, create a `.env` file in the project root:
```
REACT_APP_API_BASE_URL=your_api_url
```

---

## 📝 Search Filtering Logic

The search algorithm filters properties based on:

1. **Property Type**: Exact match or "Any" for all types
2. **Price**: Property price must fall within min-max range
3. **Bedrooms**: Property bedrooms must fall within min-max range
4. **Location**: Case-insensitive substring match
5. **Date Added**: Property added date must be on or after selected date (if provided)

All criteria must be satisfied (AND logic) for a property to appear in results.

---

## 🐛 Known Limitations

- Property data is static (stored in JSON file)
- No backend API integration
- Favorites stored only in browser (not synced across devices)
- Map embeds use Google Maps iframe

---

## 🚀 Future Enhancements

- Backend API integration for dynamic property listings
- User authentication and cloud-based favorites
- Advanced filters (agent, amenities, etc.)
- Property comparison tool
- Image upload for agents
- Review and rating system
- Contact agent functionality
- Virtual tours support

---

## 📄 License

This project is provided as-is for educational purposes.

---

## 👨‍💻 Author

Created as part of Advanced Client-Side Development coursework.

**Repository**: [Advance_Client_Side_CW2](https://github.com/Kravenfr/Advance_Client_Side_CW2)

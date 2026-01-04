import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import PropertyDetails from './pages/PropertyDetails';
import './App.css';

/**
 * App Component
 * Uses React Router to manage the two main views:
 * 1. The Search Results Page (Home)
 * 2. The Individual Property Details Page
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Path "/" renders the main property search page */}
          <Route path="/" element={<SearchPage />} />

          {/* Path "/property/:id" uses a dynamic ID to show specific details */}
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
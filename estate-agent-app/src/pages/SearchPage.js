import React, { useState } from 'react';
// IMPORTING DATA: Using local JSON to meet the "no server-side" constraint
import propertyData from '../data/properties.json';

const SearchPage = () => {
    // STATE MANAGEMENT: Storing properties in state for reactive UI updates
    const [filteredProperties] = useState(propertyData.properties);

    return (
        <div className="search-page">
            <header className="page-header">
                <h1>Estate Agent Property Search</h1>
                <p>Showing <strong>{filteredProperties.length}</strong> properties.</p>
            </header>

            {/* Placeholder for Step 7 Search Form */}
            <section className="search-section">
                <div className="search-placeholder">
                    <h3>Search Filters</h3>
                    <p>The Search Form with React Widgets will be added here in the next step.</p>
                </div>
            </section>

            {/* RESULTS DISPLAY: Mapping JSON data to the UI */}
            <section className="results-grid">
                {filteredProperties.map((property) => (
                    <div key={property.id} className="property-card">
                        <div className="image-container">
                            <img src={property.picture} alt={property.type} />
                        </div>
                        <div className="property-info">
                            <h4>{property.type} - £{property.price.toLocaleString()}</h4>
                            <p className="location"><strong>Location:</strong> {property.location}</p>
                            <p className="description">{property.description.substring(0, 100)}...</p>
                            <button className="details-btn">View Details</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default SearchPage;
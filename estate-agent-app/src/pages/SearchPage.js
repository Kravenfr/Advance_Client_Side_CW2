import React, { useState } from 'react';
import propertyData from '../data/properties.json';
// IMPORTING COMPONENT: Bringing in the SearchForm we just built
import SearchForm from '../components/SearchForm';

const SearchPage = () => {
    // We keep the filtered list in state to update the UI later
    const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

    // This function will eventually hold our search logic in Step 8
    const handleSearch = (searchCriteria) => {
        console.log("Search criteria received:", searchCriteria);
        // For now, it just sits here so the form has a place to send data
    };

    return (
        <div className="search-page">
            <header className="page-header">
                <h1>Estate Agent Property Search</h1>
                <p>Showing <strong>{filteredProperties.length}</strong> properties.</p>
            </header>

            {/* RENDER THE FORM: This makes the widgets appear on screen */}
            <section className="search-section">
                <SearchForm onSearch={handleSearch} />
            </section>

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
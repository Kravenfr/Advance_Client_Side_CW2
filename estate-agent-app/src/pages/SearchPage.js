import React, { useState } from 'react';
import propertyData from '../data/properties.json';
import SearchForm from '../components/SearchForm';

const SearchPage = () => {
    // We keep the filtered list in state to update the UI instantly
    const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

    const handleSearch = (criteria) => {
        // We use the .filter() method to check every property against the user's input
        const results = propertyData.properties.filter(prop => {

            // 1. Convert the JSON date (month/day/year) into a real JavaScript Date object
            const propDate = new Date(`${prop.added.month} ${prop.added.day}, ${prop.added.year}`);

            // 2. Logic for each of the 5 required search criteria
            const matchType = criteria.type === 'any' || prop.type === criteria.type;
            const matchPrice = prop.price >= criteria.minPrice && prop.price <= criteria.maxPrice;
            const matchBedrooms = prop.bedrooms >= criteria.minBedrooms && prop.bedrooms <= criteria.maxBedrooms;

            // Postcode: We check if the search text is inside the location string
            const matchPostcode = prop.location.toLowerCase().includes(criteria.postcode.toLowerCase());

            // Date: Only show properties added AFTER the selected date
            const matchDate = propDate >= criteria.dateAdded;

            // Only return true if the property matches ALL conditions
            return matchType && matchPrice && matchBedrooms && matchPostcode && matchDate;
        });

        // Update the screen with the new results
        setFilteredProperties(results);
    };

    return (
        <div className="search-page">
            <header className="page-header">
                <h1>Estate Agent Property Search</h1>
            </header>

            <section className="search-section">
                <SearchForm onSearch={handleSearch} />
            </section>

            <p className="results-count">
                Found <strong>{filteredProperties.length}</strong> matching properties.
            </p>

            <section className="results-grid">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
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
                    ))
                ) : (
                    /* Requirement: Displaying a message when no results are found */
                    <div className="no-results">
                        <h3>No results found</h3>
                        <p>Try adjusting your filters or checking your postcode.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SearchPage;
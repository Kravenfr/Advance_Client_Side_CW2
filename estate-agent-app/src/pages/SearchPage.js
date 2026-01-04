import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Requirement: Navigation using Link
import propertyData from '../data/properties.json'; // Requirement: JSON data source
import SearchForm from '../components/SearchForm';

const SearchPage = () => {
    // STATE: Storing the filtered results to trigger UI re-renders
    const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

    /**
     * SEARCH LOGIC: Handles the filtering for all 5 required criteria.
     * This function is passed to SearchForm as a prop.
     */
    const handleSearch = (criteria) => {
        const results = propertyData.properties.filter(prop => {
            // 1. Logic for Date: Convert JSON string to JS Date object
            const propDate = new Date(`${prop.added.month} ${prop.added.day}, ${prop.added.year}`);

            // 2. Logic for Property Type
            const matchType = criteria.type === 'any' || prop.type === criteria.type;

            // 3. Logic for Price Range
            const matchPrice = prop.price >= criteria.minPrice && prop.price <= criteria.maxPrice;

            // 4. Logic for Number of Bedrooms
            const matchBedrooms = prop.bedrooms >= criteria.minBedrooms && prop.bedrooms <= criteria.maxBedrooms;

            // 5. Logic for Postcode/Location (Case-insensitive)
            const matchPostcode = prop.location.toLowerCase().includes(criteria.postcode.toLowerCase());

            // 6. Logic for Date Added (Must be after selected date)
            const matchDate = propDate >= criteria.dateAdded;

            // Only return true if all conditions are met
            return matchType && matchPrice && matchBedrooms && matchPostcode && matchDate;
        });

        setFilteredProperties(results);
    };

    return (
        <div className="search-page">
            <header className="page-header">
                <h1>Estate Agent Property Search</h1>
            </header>

            {/* SEARCH COMPONENT: Using React Widgets inside SearchForm */}
            <section className="search-section">
                <SearchForm onSearch={handleSearch} />
            </section>

            <p className="results-count">
                Found <strong>{filteredProperties.length}</strong> properties matching your criteria.
            </p>

            {/* RESULTS GRID: Responsive display of property cards */}
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

                                {/* NAVIGATION: Link to the Property Details Page */}
                                <Link to={`/property/${property.id}`} className="details-btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Requirement: Displaying a message when no results match */
                    <div className="no-results">
                        <h3>No properties found</h3>
                        <p>Please try adjusting your filters or checking your postcode.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SearchPage;
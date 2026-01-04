import React from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyData from '../data/properties.json';

const PropertyDetails = () => {
    // Requirement: Use URL parameters to identify the selected property
    const { id } = useParams();

    // Logic to find the property in our local JSON data
    const property = propertyData.properties.find(p => p.id === id);

    // Error handling if a user manually types a wrong ID in the URL
    if (!property) {
        return (
            <div className="property-details-page">
                <h2>Property not found</h2>
                <Link to="/" className="back-link">Return to Search</Link>
            </div>
        );
    }

    return (
        <div className="property-details-page">
            <header className="details-header">
                <Link to="/" className="back-link">← Back to Search Results</Link>
                <h1>{property.type} - {property.location}</h1>
            </header>

            <div className="details-layout">
                <section className="image-gallery">
                    {/* Multimedia Requirement: Showing the main property image */}
                    <img src={property.picture} alt={property.type} className="hero-image" />
                </section>

                <section className="property-specs">
                    <h2 className="details-price">£{property.price.toLocaleString()}</h2>
                    <div className="specs-grid">
                        <div className="spec-item"><strong>Bedrooms:</strong> {property.bedrooms}</div>
                        <div className="spec-item"><strong>Tenure:</strong> {property.tenure}</div>
                        <div className="spec-item"><strong>Added on:</strong> {property.added.day} {property.added.month} {property.added.year}</div>
                    </div>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{property.description}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PropertyDetails;
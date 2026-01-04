import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertyData from '../data/properties.json';

const PropertyDetails = () => {
    const { id } = useParams();
    const property = propertyData.properties.find(p => p.id === id);

    // State to handle which image is currently being viewed in the large hero area
    const [mainImage, setMainImage] = useState(property ? property.picture : '');

    if (!property) return <div className="search-page"><h2>Property not found</h2></div>;

    return (
        <div className="property-details-page">
            <header className="details-header">
                <Link to="/" className="back-link">← Back to Search</Link>
                <h1>{property.type} - {property.location}</h1>
            </header>

            <div className="details-layout">
                {/* MULTIMEDIA SECTION: Hero image + Thumbnails */}
                <section className="multimedia-section">
                    <img src={mainImage} alt="Property" className="hero-image" />
                    <div className="thumbnail-grid">
                        {/* If you added the images array to JSON, map through it here */}
                        {property.images && property.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`View ${index}`}
                                className={mainImage === img ? "thumb active" : "thumb"}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </section>

                {/* ORGANIZATION SECTION: Tabs for Description/Floorplan/Map */}
                <section className="info-tabs-section">
                    <h2 className="details-price">£{property.price.toLocaleString()}</h2>

                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Floorplan</Tab>
                            <Tab>Map</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="tab-content">
                                <p>{property.description}</p>
                                <div className="specs-list">
                                    <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                                    <p><strong>Tenure:</strong> {property.tenure}</p>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="tab-content">
                                <div className="placeholder-box">
                                    <p>Floorplan Image (Multimedia Requirement)</p>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="tab-content map-container">
                                {/* The 'q=' part of the URL is where we inject the dynamic location */}
                                <iframe
                                    title="Property Location"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0, borderRadius: '8px' }}
                                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_FREE_EMBED_URL_OR_SEARCH_QUERY&q=${encodeURIComponent(property.location)}&output=embed`}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>

                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <strong>Location:</strong> {property.location}
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </section>
            </div>
        </div>
    );
};

export default PropertyDetails;
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import propertyData from '../data/properties.json';

const PropertyDetails = () => {
    /* getting the id from the url so we know which house to show */
    const { id } = useParams();
    const property = propertyData.properties.find(p => p.id === id);

    /* state to swap the big main photo when someone clicks a thumbnail */
    const [mainImage, setMainImage] = useState(property ? property.picture : '');

    /* quick check just in case the id doesn't match anything in the json */
    if (!property) return <div className="search-page"><h2>Property not found</h2></div>;

    return (
        <div className="property-details-page">
            <header className="details-header">
                <Link to="/" className="back-link">← Back to Search</Link>
                <h1>{property.type} - {property.location}</h1>
            </header>

            <div className="details-layout">
                {/* GALLERY: showing the big image and then mapping through the others below it */}
                <section className="multimedia-section">
                    <img src={mainImage} alt="Property" className="hero-image" />
                    <div className="thumbnail-grid">
                        {/* looping through the images array from the json file */}
                        {property.images && property.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`View ${index}`}
                                /* adding 'active' class so we can highlight the current thumb in css */
                                className={mainImage === img ? "thumb active" : "thumb"}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </section>

                {/* INFO SECTION: using tabs to keep the page from getting too long */}
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
                                    <img
                                        src={property.floorplan}
                                        alt="Property Floorplan"
                                        style={{ width: '100%', maxWidth: '600px', filter: 'grayscale(100%)' }}
                                    />
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="tab-content map-container">
                                {/* injecting the location string into the google maps search query */}
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
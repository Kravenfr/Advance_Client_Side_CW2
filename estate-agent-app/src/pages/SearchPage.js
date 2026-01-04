import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Using the latest maintained version of the DnD components
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import propertyData from '../data/properties.json';
import SearchForm from '../components/SearchForm';

const SearchPage = () => {
    const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

    // Requirement: Favorites must persist using LocalStorage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Automatically save to storage whenever favorites list changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSearch = (criteria) => {
        const results = propertyData.properties.filter(prop => {
            const propDate = new Date(`${prop.added.month} ${prop.added.day}, ${prop.added.year}`);
            const matchType = criteria.type === 'any' || prop.type === criteria.type;
            const matchPrice = prop.price >= criteria.minPrice && prop.price <= criteria.maxPrice;
            const matchBedrooms = prop.bedrooms >= criteria.minBedrooms && prop.bedrooms <= criteria.maxBedrooms;
            const matchPostcode = prop.location.toLowerCase().includes(criteria.postcode.toLowerCase());
            const matchDate = propDate >= criteria.dateAdded;
            return matchType && matchPrice && matchBedrooms && matchPostcode && matchDate;
        });
        setFilteredProperties(results);
    };

    // Requirement: Logic for Drag and Drop interaction
    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return; // Dropped outside

        // Logic: Dragging from the Search Results into the Favorites sidebar
        if (source.droppableId === 'results' && destination.droppableId === 'favorites') {
            const draggedProp = filteredProperties[source.index];
            // Distinction Requirement: Prevent adding the same property twice
            if (!favorites.find(p => p.id === draggedProp.id)) {
                setFavorites([...favorites, draggedProp]);
            }
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(p => p.id !== id));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="search-page-layout">
                <div className="main-search-area">
                    <header className="page-header">
                        <h1>Estate Agent Property Search</h1>
                    </header>

                    <SearchForm onSearch={handleSearch} />

                    {/* SOURCE AREA: The Search Results */}
                    <Droppable droppableId="results" isDropDisabled={true}>
                        {(provided) => (
                            <section
                                className="results-grid"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredProperties.map((property, index) => (
                                    <Draggable key={property.id} draggableId={property.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className={`property-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <img src={property.picture} alt={property.type} />
                                                <div className="property-info">
                                                    <h4>{property.type} - £{property.price.toLocaleString()}</h4>
                                                    <Link to={`/property/${property.id}`} className="details-btn">Details</Link>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </section>
                        )}
                    </Droppable>
                </div>

                {/* DESTINATION AREA: The Favorites Sidebar */}
                <aside className="favorites-sidebar">
                    <h2>My Favorites</h2>
                    <button className="clear-all-btn" onClick={() => setFavorites([])}>Clear All</button>

                    <Droppable droppableId="favorites">
                        {(provided, snapshot) => (
                            <div
                                className={`favorites-drop-zone ${snapshot.isDraggingOver ? 'active' : ''}`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {favorites.length === 0 && <p className="empty-msg">Drag properties here to favorite</p>}
                                {favorites.map((fav) => (
                                    <div key={fav.id} className="fav-card">
                                        <p>{fav.type} - £{fav.price.toLocaleString()}</p>
                                        <button onClick={() => removeFavorite(fav.id)} title="Remove">×</button>
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </aside>
            </div>
        </DragDropContext>
    );
};

export default SearchPage;
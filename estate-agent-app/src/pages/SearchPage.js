import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import propertyData from '../data/properties.json';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';

const SearchPage = () => {
    const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleSearch = (criteria) => {
        const results = propertyData.properties.filter(prop => {
            /* VIVA: parsing the JSON date manually to ensure it works on all browsers */
            const months = {
                January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
                July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
            };
            const propDate = new Date(prop.added.year, months[prop.added.month], prop.added.day);

            const matchType = criteria.type === 'any' || prop.type === criteria.type;
            const matchPrice = prop.price >= criteria.minPrice && prop.price <= criteria.maxPrice;
            const matchBedrooms = prop.bedrooms >= criteria.minBedrooms && prop.bedrooms <= criteria.maxBedrooms;
            const matchPostcode = prop.location.toLowerCase().includes(criteria.postcode.toLowerCase());

            /* SAFETY: if the user clears the date widget, we don't filter by date at all */
            let matchDate = true;
            if (criteria.dateAdded && !isNaN(criteria.dateAdded.getTime())) {
                matchDate = propDate >= criteria.dateAdded;
            }

            return matchType && matchPrice && matchBedrooms && matchPostcode && matchDate;
        });
        setFilteredProperties(results);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;

        if (source.droppableId === 'results' && destination.droppableId === 'favorites') {
            const draggedProp = filteredProperties[source.index];
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

                    <Droppable droppableId="results" isDropDisabled={true}>
                        {(provided) => (
                            <section
                                className="results-grid"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {filteredProperties.map((property, index) => (
                                    <PropertyCard key={property.id} property={property} index={index} />
                                ))}
                                {provided.placeholder}
                            </section>
                        )}
                    </Droppable>
                </div>

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
                                        <p>{fav.type} - Rs.{fav.price.toLocaleString()}</p>
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
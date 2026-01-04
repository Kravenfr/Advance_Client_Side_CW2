import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from '@hello-pangea/dnd';

const PropertyCard = ({ property, index }) => {
    return (
        /* Each card is Draggable so it can be moved to fvorites */
        <Draggable draggableId={property.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`property-card ${snapshot.isDragging ? 'dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {/* standardizing image ratio in CSS via the property card class */}
                    <img src={property.picture} alt={property.type} />

                    <div className="property-info">
                        <h4>{property.type} - £{property.price.toLocaleString()}</h4>
                        <p className="location-text">{property.location}</p>

                        <Link to={`/property/${property.id}`} className="details-btn">
                            View Details
                        </Link>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default PropertyCard;
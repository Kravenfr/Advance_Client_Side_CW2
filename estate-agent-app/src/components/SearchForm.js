import React, { useState } from 'react';
import { DropdownList, NumberPicker } from 'react-widgets';
import "react-widgets/styles.css";

const SearchForm = ({ onSearch }) => {
    /* i'm initializing states for all search criteria mentioned in the brief */
    const [type, setType] = useState('any');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000); // set to a high enough max for Sri Lanka
    const [minBedrooms, setMinBedrooms] = useState(0);
    const [maxBedrooms, setMaxBedrooms] = useState(10);
    const [postcode, setPostcode] = useState('');
    const [dateAdded, setDateAdded] = useState(null); // start with null for a clean search

    const handleSearchClick = (e) => {
        e.preventDefault();
        /* VIVA: only sending the date if it's actually valid to stop crashes */
        const finalDate = dateAdded instanceof Date ? dateAdded : null;
        onSearch({ type, minPrice, maxPrice, minBedrooms, maxBedrooms, postcode, dateAdded: finalDate });
    };

    return (
        <div className="search-form-container">
            <form onSubmit={handleSearchClick} className="property-search-form">

                <div className="filter-group">
                    <label>Property Type</label>
                    <DropdownList
                        data={['any', 'House', 'Flat']}
                        value={type}
                        onChange={val => setType(val)}
                    />
                </div>

                <div className="filter-group">
                    <label>Price Range (Rs.)</label>
                    <div className="picker-row">
                        <NumberPicker value={minPrice} onChange={val => setMinPrice(val)} placeholder="Min" />
                        <NumberPicker value={maxPrice} onChange={val => setMaxPrice(val)} placeholder="Max" />
                    </div>
                </div>

                <div className="filter-group">
                    <label>Bedrooms</label>
                    <div className="picker-row">
                        <NumberPicker value={minBedrooms} onChange={val => setMinBedrooms(val)} />
                        <NumberPicker value={maxBedrooms} onChange={val => setMaxBedrooms(val)} />
                    </div>
                </div>

                <div className="filter-group">
                    <label>Postcode Area</label>
                    <input
                        type="text"
                        className="rw-input custom-text-input"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="e.g. Colombo 03"
                    />
                </div>

                <div className="filter-group">
                    <label>Added After</label>
                    <input
                        type="date"
                        className="rw-input custom-text-input"
                        /* safely converting the date object to string for the input */
                        value={dateAdded ? dateAdded.toISOString().split('T')[0] : ''}
                        onChange={e => setDateAdded(e.target.value ? new Date(e.target.value) : null)}
                    />
                </div>

                <button type="submit" className="search-submit-btn">Search Properties</button>
            </form>
        </div>
    );
};

export default SearchForm;
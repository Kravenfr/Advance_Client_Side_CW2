import React, { useState } from 'react';
// Step 7: Importing React Widgets to satisfy the 'enhanced widgets' requirement
import { DropdownList, NumberPicker, DatePicker } from 'react-widgets';
import "react-widgets/styles.css";

const SearchForm = ({ onSearch }) => {
    // We initialize states for all 5 search criteria mentioned in the brief
    const [type, setType] = useState('any');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000000);
    const [minBedrooms, setMinBedrooms] = useState(0);
    const [maxBedrooms, setMaxBedrooms] = useState(10);
    const [postcode, setPostcode] = useState('');
    const [dateAdded, setDateAdded] = useState(new Date(2022, 0, 1));

    const handleSearchClick = (e) => {
        e.preventDefault();
        // This sends the data "up" to the SearchPage (Step 8)
        onSearch({ type, minPrice, maxPrice, minBedrooms, maxBedrooms, postcode, dateAdded });
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
                    <label>Price Range (£)</label>
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
                        placeholder="e.g. BR5"
                    />
                </div>

                <div className="filter-group">
                    <label>Added After</label>
                    <DatePicker value={dateAdded} onChange={val => setDateAdded(val)} />
                </div>

                <button type="submit" className="search-submit-btn">Search Properties</button>
            </form>
        </div>
    );
};

export default SearchForm;
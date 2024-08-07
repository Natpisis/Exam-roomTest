import React from 'react';
import Select from 'react-select';
import './Search.css';

const Search = () => {
    const cars = [
        { value: 'Ford', label: 'Ford' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Audi', label: 'Audi' }
    ];

    

    return (
        <div className="body-form">
            <div className="container-form">
                <label htmlFor="type">ชื่อวิชา:</label>
                <Select options={cars}  />
                
            </div>
        </div>
    );
}

export default Search;

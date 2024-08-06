import React from 'react';
import Select from 'react-select';
import './Search.css';

const Search = () => {
    const cars = [
        { value: 'Ford', label: 'Ford' },
        { value: 'BMW', label: 'BMW' },
        { value: 'Audi', label: 'Audi' }
    ];

    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: 300, // กำหนดความกว้างที่ต้องการ
        }),
    };

    return (
        <div className="body-form">
            <div className="container-form">
                <label htmlFor="type">ชื่อวิชา:</label>
                <Select options={cars} styles={customStyles} />
            </div>
        </div>
    );
}

export default Search;

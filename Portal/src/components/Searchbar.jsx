import React from 'react';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md p-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-1 border-none outline-none"
            />
            <button type="submit" className="ml-2 bg-blue-500 text-white rounded-md px-4 py-1">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
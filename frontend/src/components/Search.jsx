import React from 'react'

const Search = ({ setSearch }) => {
    return (
        <form action="" onSubmit={e => e.preventDefault()}>
            <label style={{ display: 'none' }} htmlFor="search">Search Notes</label>
            <input
                className='search'
                id='search'
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search..."} />
        </form>
    )
}

export default Search
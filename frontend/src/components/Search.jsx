import React from 'react'

const Search = ({ setSearch, zIndex }) => {
    return (
        <form action="" onSubmit={e => e.preventDefault()}>
            <label style={{ display: 'none' }} htmlFor="search">Search Notes</label>
            <input
                className='search'
                id='search'
                type="search"
                style={{ zIndex: zIndex }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={"Search..."} />
        </form>
    )
}

export default Search
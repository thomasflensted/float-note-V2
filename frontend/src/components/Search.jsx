import React from 'react'

const Search = () => {
    return (
        <form action="" onSubmit={e => e.preventDefault()}>
            <label style={{ display: 'none' }} htmlFor="search">Search Notes</label>
            <input
                className='search'
                id='search'
                type="search"
                placeholder={"Search..."} />
        </form>
    )
}

export default Search
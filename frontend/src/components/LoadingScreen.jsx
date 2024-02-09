import React from 'react'
import { ring } from 'ldrs';
ring.register()

const LoadingScreen = () => {
    return (
        <div className='note loading-note' style={{ width: "300px" }}>
            <div className="note-top loading-note-top">
                <h2 className='note-title'>Loading...</h2>
            </div>
            <div className="note-text-container loading-note-text-container">
                <l-ring size="30" stroke="4" speed="2" color="black"></l-ring>
                <p className='note-text'>Your notes are loading...</p>
            </div>
        </div >
    )
}

export default LoadingScreen
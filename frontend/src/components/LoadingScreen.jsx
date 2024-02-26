import { ring } from 'ldrs';
ring.register()

const LoadingScreen = () => {
    return (
        <div className='note center-note loading-note'>
            <div className="center-note-top green">
                <h2 className='loading-note-title'>Loading...</h2>
            </div>
            <div className="loading-note-content">
                <l-ring size="30" stroke="4" speed="2" color="black"></l-ring>
                <p className='note-text'>Your notes are loading...</p>
            </div>
        </div >
    )
}

export default LoadingScreen
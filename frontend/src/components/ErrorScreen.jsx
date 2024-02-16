const ErrorScreen = ({ error }) => {
    return (
        <div className='note loading-error' style={{ color: "#c0392b" }}>
            <h3>{error}</h3>
            <p>Please reload the page or come back later.</p>
        </div >
    )
}

export default ErrorScreen
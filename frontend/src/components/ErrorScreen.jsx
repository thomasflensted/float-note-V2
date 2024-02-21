const ErrorScreen = ({ error }) => {
    return (
        <div className='note load-error'>
            <h3 className="load-error-heading">{error}</h3>
            <p>Please reload the page or come back later.</p>
        </div >
    )
}

export default ErrorScreen
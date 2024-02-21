export const DialogHeadingForm = ({ text, setHeading }) => {
    return (
        <div>
            <label className='form-label' htmlFor="heading">Heading:</label>
            <input
                onChange={(e) => setHeading(e.target.value)}
                defaultValue={text}
                placeholder='Type heading or leave blank...'
                className='form-input auto-input'
                id="heading" />
        </div>
    )
}

export default DialogHeadingForm
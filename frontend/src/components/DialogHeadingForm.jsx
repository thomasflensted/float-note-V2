export const DialogHeadingForm = ({ text, setHeading }) => {
    return (
        <form action="" onSubmit={(e) => e.preventDefault()}>
            <label className='new-note-label' htmlFor="heading">Heading:</label>
            <input
                defaultValue={text}
                onChange={(e) => setHeading(e.target.value)}
                className='new-note-input' type="text" id="heading"
                placeholder='Type heading or leave blank...' />
        </form>
    )
}

export default DialogHeadingForm
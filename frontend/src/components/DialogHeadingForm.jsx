import React from 'react'

const DialogHeadingForm = () => {
    return (
        <form action="">
            <label className='new-note-label' htmlFor="heading">Heading:</label>
            <input
                className='new-note-input' type="text" id="heading"
                placeholder='Type heading or leave blank...' />
        </form>
    )
}

export default DialogHeadingForm
import React from 'react'

const DialogTextForm = () => {
    return (
        <form action="" className='text-area-form'>
            <label className='new-note-label' htmlFor="text">Text:</label>
            <textarea
                type='text' id='text' rows={4} autoFocus
                style={{ maxWidth: window.innerWidth - 100, maxHeight: "350px" }}
                className='new-note-input'></textarea>
        </form>
    )
}

export default DialogTextForm
import React from 'react'

const DialogTextForm = ({ text, setText }) => {
    return (
        <form action="" className='text-area-form'>
            <label className='new-note-label' htmlFor="text">Text:</label>
            <textarea
                value={text}
                autoFocus
                onChange={(e) => setText(e.target.value)}
                type='text' id='text' rows={4}
                style={{ maxWidth: window.innerWidth - 100, maxHeight: "350px" }}
                className='new-note-input'></textarea>
        </form>
    )
}

export default DialogTextForm
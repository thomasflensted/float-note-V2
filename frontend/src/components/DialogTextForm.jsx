const DialogTextForm = ({ text, setText }) => {

    return (
        <div>
            <label className='form-label'>Text:</label>
            <textarea
                value={text}
                autoFocus
                type='text' id='text' rows={6}
                onChange={(e) => setText(e.target.value)}
                style={{ maxWidth: window.innerWidth - 100, maxHeight: "350px" }}
                className='form-input block-input new-note-textarea' />
        </div>

    )
}

export default DialogTextForm
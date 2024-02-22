import { useEffect } from "react"

const DialogTextForm = ({ text, setText }) => {

    useEffect(() => {
        const elem = document.getElementById("textarea");
        elem.setSelectionRange(text.length, text.length)
    }, [text])

    return (
        <div>
            <label className='form-label'>Text:</label>
            <textarea
                value={text}
                autoFocus
                type='text' id='textarea' rows={6}
                onChange={(e) => setText(e.target.value)}
                style={{ maxWidth: window.innerWidth - 100, maxHeight: "350px" }}
                className='form-input block-input new-note-textarea' />
        </div>

    )
}

export default DialogTextForm
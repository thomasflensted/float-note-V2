import { useEffect, useState } from "react"

const DialogTextForm = ({ text, setText }) => {

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        const textElement = document.getElementById("textarea");
        if (isFirstRender) textElement.setSelectionRange(text.length, text.length);
        setIsFirstRender(false);
    }, [text, isFirstRender])

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
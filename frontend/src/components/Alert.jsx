import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { useNotesContext } from '../hooks/useNotesContext';

const Alert = ({ text, handleDelete }) => {

    const { notes } = useNotesContext();

    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="overlay" style={{ zIndex: notes.length + 2 }} />
            <AlertDialog.Content className="alert" style={{ zIndex: notes.length + 3 }}>
                <h3>Are Your Sure?</h3>
                <p className='note-text'>{text.textContent}</p>
                <div className='buttons'>
                    <AlertDialog.Cancel asChild>
                        <button className="btn btn-standard">Cancel</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button onClick={handleDelete} className="btn btn-delete">{text.buttonText}</button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Portal>
    )
}

export default Alert

// React imports
import React from 'react'

// Components
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CrossCircledIcon } from '@radix-ui/react-icons';

const ColorSelect = ({ color, setColor }) => {
    return (
        <>
            <label className='new-note-label'>Color:</label>
            <ToggleGroup.Root type="single" className="ToggleGroup" defaultValue={color}>
                <ToggleGroup.Item
                    onClick={() => setColor('#FFFFFF')} value='#FFFFFF' style={{ backgroundColor: "#FFFFFF" }} className="ToggleGroupItem">
                    <CrossCircledIcon className='cross' />
                </ToggleGroup.Item>
                <ToggleGroup.Item onClick={() => setColor('#FAEDCB')} value='#FAEDCB' style={{ backgroundColor: "#FAEDCB" }} className="ToggleGroupItem" />
                <ToggleGroup.Item onClick={() => setColor('#C9E4DE')} value='#C9E4DE' style={{ backgroundColor: "#C9E4DE" }} className="ToggleGroupItem" />
                <ToggleGroup.Item onClick={() => setColor('#C6DEF1')} value='#C6DEF1' style={{ backgroundColor: "#C6DEF1" }} className="ToggleGroupItem" />
                <ToggleGroup.Item onClick={() => setColor('#FFD2D2')} value='#FFD2D2' style={{ backgroundColor: "#FFD2D2" }} className="ToggleGroupItem" />
                <ToggleGroup.Item onClick={() => setColor('#ECF0F1')} value='#ECF0F1' style={{ backgroundColor: "#ECF0F1" }} className="ToggleGroupItem" />
            </ToggleGroup.Root>
        </>
    )
}

export default ColorSelect
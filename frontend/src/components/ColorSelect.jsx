import React from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CrossCircledIcon } from '@radix-ui/react-icons';

const ColorSelect = () => {
    return (
        <>
            <label className='new-note-label'>Color:</label>
            <ToggleGroup.Root type="single" className="ToggleGroup" defaultValue='white'>
                <ToggleGroup.Item
                    value='white' style={{ backgroundColor: "#FFFFFF" }} className="ToggleGroupItem">
                    <CrossCircledIcon className='cross' />
                </ToggleGroup.Item>
                <ToggleGroup.Item value='yellow' style={{ backgroundColor: "#FAEDCB" }} className="ToggleGroupItem" />
                <ToggleGroup.Item value='green' style={{ backgroundColor: "#C9E4DE" }} className="ToggleGroupItem" />
                <ToggleGroup.Item value='blue' style={{ backgroundColor: "#C6DEF1" }} className="ToggleGroupItem" />
                <ToggleGroup.Item value='red' style={{ backgroundColor: "#FFD2D2" }} className="ToggleGroupItem" />
                <ToggleGroup.Item value='gray' style={{ backgroundColor: "#ECF0F1" }} className="ToggleGroupItem" />
            </ToggleGroup.Root>
        </>
    )
}

export default ColorSelect
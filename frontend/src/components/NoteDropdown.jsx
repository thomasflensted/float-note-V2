import React, { forwardRef } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const NoteDropdown = forwardRef((props, ref) => {
    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5} >
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Item className="DropdownMenuItem">Bring Forward</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">Bring To Front</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item className="DropdownMenuItem">Send Backward</DropdownMenu.Item>
                <DropdownMenu.Item className="DropdownMenuItem">Send To Back</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item className="DropdownMenuItem">Duplicate Note</DropdownMenu.Item>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item
                    className="DropdownMenuItem"
                    style={{ color: "red" }}>Delete Note</DropdownMenu.Item>
            </DropdownMenu.Content >
        </DropdownMenu.Portal>
    )
})

export default NoteDropdown
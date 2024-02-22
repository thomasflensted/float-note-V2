import { v4 as uuid } from 'uuid';

export const aboutText = [
    {
        heading: "Welcome to Float Note",
        text: "Think of this space as your personal digital bulletin board, where you can gather as many notes as you like.",
    },
    {
        heading: "Organization & Customization",
        text: "Your notes are entirely draggable, and you can adjust their size by dragging any corner or side. In the top right corner, you'll find options to customize the text, heading, and color of your note. On the top left, you can delete it, duplicate it, or reorder its stacking relative to other notes.",
    },
    {
        heading: "Search",
        text: "In the bottom of the screen, there is a search bar that highlights any note that matches your search query.",
    },
    {
        heading: "Sign up",
        text: "You can use the site without signing up, but in that case, your notes will only be available to you on the device and browser you're currently using. If you sign up, you can access your notes from any device, anywhere."
    }
]

export const newUserNotes =
    [
        {
            "_id": uuid(),
            "heading": aboutText[0].heading,
            "text": aboutText[0].text,
            "size": [
                "250px",
                "auto"
            ],
            "position": [
                100,
                50
            ],
            "color": "#FAEDCB",
            "zIndex": 4,
        },
        {
            "_id": uuid(),
            "heading": aboutText[1].heading,
            "text": aboutText[1].text,
            "size": [
                "290px",
                "auto"
            ],
            "position": [
                475,
                175
            ],
            "color": "#C9E4DE",
            "zIndex": 3,
        },
        {
            "_id": uuid(),
            "heading": aboutText[2].heading,
            "text": aboutText[2].text,
            "size": [
                "225px",
                "auto"
            ],
            "position": [
                950,
                70
            ],
            "color": "#C6DEF1",
            "zIndex": 2,
        },
        {
            "_id": uuid(),
            "heading": aboutText[3].heading,
            "text": aboutText[3].text,
            "size": [
                "500px",
                "auto"
            ],
            "position": [
                650,
                450
            ],
            "color": "#FFD2D2",
            "zIndex": 1,
        },
    ]

export const noteDeleteText = {
    buttonText: 'Yes, delete note',
    textContent: 'This action cannot be undone. All contents of this note will be deleted.'
}

export const userDeleteText = {
    buttonText: 'Yes, delete account',
    textContent: 'This action cannot be undone. Your account and all of your notes will be deleted.'
}
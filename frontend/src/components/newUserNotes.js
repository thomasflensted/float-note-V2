import { v4 as uuid } from 'uuid';

export const text = [
    "Welcome to your personal digital bulletin board! Think of this space as exclusively yours, where you can gather as many notes as you like. Feel free to organize, stack, and style them however you prefer. Your notes are entirely draggable, and you can adjust their size by dragging any corner or side.",

    "In the top right corner, you'll find options to customize the text, heading, and color of your note. On the top left, you can delete it, duplicate it, or reorder it among your other notes.",

    "In the bottom of the screen, there is a search bar you can use to find a specific note if you have many.",

    "You can use the site without signing up, but in that case, your notes will only be available to you on the device and browser you're currently using. If you sign up, you can access your notes from any device, anywhere. If you want to see these tips again, just click About in the top right corner. Enjoy!"
]

export const newUserNotes =
    [
        {
            "_id": uuid(),
            "heading": "Welcome to Float Note",
            "text": text[0],
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
            "heading": "Customization",
            "text": text[1],
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
            "heading": "Search",
            "text": text[2],
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
            "heading": "Sign up",
            "text": text[3],
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
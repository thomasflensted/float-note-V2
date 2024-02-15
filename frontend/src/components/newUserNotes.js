import { v4 as uuid } from 'uuid';

const text = "Welcome to your personal digital bulletin board!\n\nThink of this space as exclusively yours, where you can gather as many notes as you like. Feel free to organize, stack, and style them however you prefer. This note is entirely draggable - go ahead, give it a try! You can also adjust its size by dragging any of its corners or sides.\n\nIn the top right corner, you'll find options to customize the text, heading, and color of your note. On the top left, you can delete it, duplicate it, or reorder it among your other notes. Experiment with duplicating this note and rearranging your collection to see how it works.\n\nIf you're using the site without signing up, your notes will be saved locally on the device and browser you're using. However, if you decide to log in, your notes will be accessible from any device or laptop, giving you seamless access wherever you go.\n\nEnjoy!"

export const newUserNotes = [
    {
        "_id": uuid(),
        "heading": "Welcome to Float Note",
        "text": text,
        "size": [
            "500px",
            "auto"
        ],
        "position": [
            550,
            50
        ],
        "color": "#FAEDCB",
        "zIndex": 1,
    },
]
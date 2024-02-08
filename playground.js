const startArray = [
    { name: "thomas", zIndex: 1 },
    { name: "anne", zIndex: 2 },
    { name: "ida", zIndex: 3 },
    { name: "andrew", zIndex: 4 },
    { name: "oliver", zIndex: 5 },
    { name: "julie", zIndex: 6 },
    { name: "pernille", zIndex: 7 },
    { name: "niels", zIndex: 8 },
    { name: "christina", zIndex: 9 },
    { name: "signe", zIndex: 10 },
    { name: "alexander", zIndex: 11 },
    { name: "sina", zIndex: 12 },
]

const moveToFront = (arr) => {
    const initialPerson = arr.find(person => person.name === "anne");
    const initialZValue = initialPerson.zIndex;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].zIndex > initialZValue) {
            arr[i].zIndex -= 1;
        }
    }
    initialPerson.zIndex = arr.length;
    console.log(arr.sort((a, b) => a.zIndex - b.zIndex))
}

const moveToBack = (arr) => {
    const initialPerson = arr.find(person => person.name === "thomas");
    const initialZValue = initialPerson.zIndex;
    if (initialZValue === 1)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].zIndex < initialZValue) {
                arr[i].zIndex += 1;
            }
        }
    initialPerson.zIndex = 1;
    console.log(arr.sort((a, b) => a.zIndex - b.zIndex));
}

moveToBack(startArray);
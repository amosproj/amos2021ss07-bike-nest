const image_nest = require("../assets/bike_nest.png")

function getColor(capacity) {
    let color = "";
    if (capacity < 1) { color = "#CD5C5C" } else
        if (capacity < 4) { color = "#EA8B60" } else
            if (capacity < 7) { color = "#FFD700" } else
                color = "#8FBC8F"
    return color;
}

export const markers = [
    {
        coordinate: {
            latitude: 49.46,
            longitude: 11.07,
        },
        title: "Bike nest 1",
        description: "This is Bikenest 1",
        capacity: 12,
        image: image_nest,
        color: getColor(12),
    },
    {
        coordinate: {
            latitude: 49.454,
            longitude: 11.08,
        },
        title: "Bike nest 4",
        description: "This is Bikenest 4",
        capacity: 3,
        image: image_nest,
        color: getColor(3),
    },
    {
        coordinate: {
            latitude: 49.45,
            longitude: 11.09,
        },
        title: "Bike nest 3",
        description: "This is Bikenest 3",
        capacity: 6,
        image: image_nest,
        color: getColor(6),
    },
    {
        coordinate: {
            latitude: 49.44,
            longitude: 11.09,
        },
        title: "Bike nest 4",
        description: "This is Bikenest 2",
        capacity: 17,
        image: image_nest,
        color: getColor(17),
    },
]
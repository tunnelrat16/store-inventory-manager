const input = document.querySelector("#input")
const report = document.querySelector("#report")
const reportOutput = document.querySelector(".report")

let inventory = [{
    item_name: "+5 Dexterity Vest",
    sell_in: 10,
    quality: 20,
    date_added: 0,
    category: "none",
}, {
    item_name: "Aged Brie",
    sell_in: 2,
    quality: 20,
    date_added: 0,
    category: "Aged Brie",
}, {
    item_name: "Elixir of the Mongoose",
    sell_in: 5,
    quality: 0,
    date_added: 0,
    category: "none",
}, {
    item_name: "Sulfuras, Hand of Ragnaros",
    sell_in: 0,
    quality: 80,
    date_added: 0,
    category: "Sulfuras",
}, {
    item_name: "Backstage passes to a TAFKAL80ETC concert",
    sell_in: 15,
    quality: 20,
    date_added: 0,
    category: "Backstage",
}, {
    item_name: "Conjured Mana Cake",
    sell_in: 3,
    quality: 6,
    date_added: 0,
    category: "Conjured",
}, {
    item_name: "Grabthars Hammer",
    sell_in: 10,
    quality: 20,
    date_added: 0,
    category: "none",
}, {
    item_name: "Snake Pliskin's Sulfuras Boots",
    sell_in: 0,
    quality: 80,
    date_added: 0,
    category: "Sulfuras",
}]

console.log(inventory)

input.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const item = {
        item_name: formData.get("item"),
        sell_in: +formData.get("sell_in"),
        quality: +formData.get("quality"),
        date_added: 0,
        category: "none",
    }
    setCategory(item)
    qualitySet(item)
    inventory - [...inventory, item]
    console.log(inventory)
    return inventory
})

function setCategory(item) {
    if (item.item_name.includes("Aged Brie")) {
        item.category = "Aged Brie"
    } else if (item.item_name.includes("Sulfuras")) {
        item.category = "Sulfuras"
    } else if (item.item_name.includes("Backstage")) {
        item.category = "Backstage"
    } else if (item.item_name.includes("Conjured")) {
        item.category = "Conjured"
    }
    return item
}

function qualitySet(item) {
    if (item.category === "Sulfuras") {
        item.quality = 80
    } else if (item.quality >= 50) {
        item.quality = 50
    } else if (item.quality < +0) {
        item.quality = 0
    }
    return item
}

report.addEventListener("submit", (event) => {
    event.preventDefault()
    const details = document.createElement("div")
    details.classList = "details"
    details.innerHTML = `
        <h3>Item</p>
        <p>Sell In</p>
        <p>Quality</p>
    `
    reportOutput.replaceChildren(details)
    const formData = new FormData(event.target)
    const reportDate = `${formData.get("report_date")}`
    let items = JSON.parse(JSON.stringify(inventory))
    items.forEach(item => {
        degradeItem(item, reportDate)
        if (reportDate >= 0) {
            reportOutput.append(createListing(item))
        }
    })
})

function degradeItem(item, reportDate) {
    const mustSellBy = item.sell_in
    switch (item.category) {
        case "Sulfuras":
            break;
        case "Aged Brie":
            item.sell_in -= reportDate
            item.quality += reportDate
            break;
        case "Conjured":
            item.sell_in -= reportDate
            item.quality -= (reportDate * 2)
            break;
        case "Backstage":
            item.sell_in -= reportDate
            if (item.sell_in > 10) {
                item.quality += reportDate
            } else if (item.sell_in <= 10 && item, _sell_in > 5) {
                if (mustSellBy > 10) {
                    item.quality += ((mustSellBy - 9) + (2 * (reportDate - (mustSellBy - 10))))
                } else {
                    item.quality += (reportDate * 2)
                }
            } else if (item.sell_in <= 5 && item, _sell_in > 0) {
                if (mustSellBy > 10) {
                    item.quality += ((mustSellBy - 10) - 3 + (3 * (reportDate - (mustSellBy - 10))))
                } else if (mustSellBy > 5) {
                    item.quality += ((mustSellBy + 1) + (3 * (reportDate - (mustSellBy - 5))))
                } else {
                    item.quality += (reportDate * 3)
                }
            } else {
                item.quality = 0
            }
            break;
        default:
            item.sell_in -= reportDate
            if (item.sell_in >= 0) {
                item.quality -= reportDate
            } else {
                item.quality -= (mustSellBy + (2 * (reportDate - mustSellBy)))
            }
    }
    qualityRules(item)
    return (item)
}

function qualityRules(item) {
    if (item.category === "Sulfuras") {
        item.quality = 80
    } else if (item.quality >= 50) {
        item.quality = 50
    } else if (item.quality <= 0) {
        item.quality = 0
    }
    return item
}

function createListing(item) {
    const list = document.createElement("div")
    list.classList = "list"
    list.innerHTML = `
        <p>${item.item_name}</p>
        <p>${item.sell_in}</p>
        <p>${item.quality}</p>
    `
    return list
}
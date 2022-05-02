const input = document.querySelector("#input")
const report = document.querySelector("#report")
const reportOutput = document.querySelector(".report")

let inventory = [{
    item_name: "+5 Dexterity Vest",
    sell_in: 10,
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
            let items = JSON.parse { JSON.stringify(inventory) }
            items.forEach(item => {
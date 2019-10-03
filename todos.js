const SeleniumInfra = require("./seleniumInfra")
let SI = new SeleniumInfra()

class TodosPage {
    constructor(URL) {
        SI.getURL(URL)
    }

    async insertAndDelete(todoText) {
        await SI.write(todoText, "id", "todo-input")  // insert input
        await SI.clickElement("id", "addToDo")  // click add button
        if (await SI.isElementExists("xpath", "//div[@id='todos']/child::div[1]")) { // does new div exist?
            console.log("found a new div")
            // text-in-div same as text-input:
            if (await SI.getTextFromElement("xpath", `//div[@id="todos"]/child::div[1]/span[1]`) == todoText) {
                console.log("New div has the same text")
            } else {
                console.log("Error: New div does not has the same text")
            }
        } else {
            console.log("Error: Can’t find a new div")
        }
        await SI.clickElement("xpath", "//i[@class='fas fa-trash']")  // click delete button 
        if (await SI.isElementExists("xpath", "//div[@id='todos']/child::div[1]")) { // is new div deleted?
            console.log("The div was not deleted")
        } else {
            console.log("The div was deleted") // false is true!
        }
    }

    async insertAndComplete(todoText) {
        await SI.write(todoText, "id", "todo-input")  // insert input
        await SI.clickElement("id", "addToDo")   // click add button
        if (await SI.isElementExists("xpath", "//div[@id='todos']/child::div[1]")) {  // does new div exist?
            console.log("found a new div")
        } else {
            console.log("Error: Can’t find a new div")
        }
        await SI.clickElement("xpath", "//i[@class='fas fa-check-circle']")  // click check button
        if (await SI.isElementExists("className", "todo complete")) {   // did new elements' class changed to complete?
            console.log("the new div was checked")
        } else {
            console.log("Error: the new div was NOT checked")
        }
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        await SI.write(todoText1, "id", "todo-input")  // insert input1
        await SI.clickElement("id", "addToDo")   // click add button
        if (await SI.isElementExists("xpath", "//div[@id='todos']/child::div[1]")) {  // does new-div[1] exist?
            console.log("found a new div")
        } else {
            console.log("Error: Can’t find a new div")
        }
        await SI.write(todoText2, "id", "todo-input")  // insert input2
        await SI.clickElement("id", "addToDo")   // click add button
        if (await SI.isElementExists("xpath", "//div[@id='todos']/child::div[2]")) {  // does new-div[2] exist?
            console.log("found a new div")
        } else {
            console.log("Error: Can’t find a new div")
        }
        // click delete button on input1:
        await SI.clickElement("xpath", "//div[@id='todos']/child::div[1]//i[@class='fas fa-trash']")
        // check if input1 element was deleted:
        if (await SI.isElementExists("xpath", `//span[text()='${todoText1}']`)) {
            console.log("Error: the first div was NOT deleted")
        } else {
            console.log("the first div was deleted") // false is true!
        }
    }
}

module.exports = TodosPage




const library = [] //To hold our books
const book_shelf = document.querySelector(".Books")  //Div which will display our books
const pop_up_form = document.querySelector(".Book_form")  //Form which user will fill out with book information
const form = document.querySelector(".form")  //Reference to form element
const inputs = document.querySelectorAll("input")  //Nodelist of form input fields
const add_btn = document.querySelector(".Add_Btn");  
const submit_btn = document.querySelector(".Submit")
const cancel_btn = document.querySelector(".Cancel")

/*-----------------------------------Quick Test------------------------------------------------*/
let idx = 0;
const newBook1 = new Book("The Hunger Games", "Suzanne Collins", "300", true)
library.push(newBook1)
const newBook2 = new Book("Hello", "Pop Smoke", "420", true)
library.push(newBook2)
const newBook3 = new Book("Fair Trade", "Drake", "100", true)
library.push(newBook3)
const newBook4 = new Book("Naruto Shippuden", "God", "6000", true)
library.push(newBook4)
const newBook5 = new Book("Super", "Cordae", "800", true)
library.push(newBook5)

for (let i = 0; i < library.length; i++) {
    console.log(library[i].title)
}
for (let i = 0; i < library.length; i++) {
    displayBook(library[i])
}
/*-----------------------------------------------------------------------------------*/

//Book object
function Book(title, author, numPages, hasRead){
    this.title = title
    this.author = author
    this.numPages = numPages + " pages"
    this.hasRead = hasRead
} 

add_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "block"  //Brings up our form to input book information
});
cancel_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "none"  //Hides form
})

form.addEventListener("submit", (e)=>{
    //Getting user input
    const errorMessageToBeCleared = document.querySelector(".active")
    if(errorMessageToBeCleared !== null){
        form.removeChild(errorMessageToBeCleared)
    }
    let Title_Input = document.querySelector('.Title_Input');
    let title = Title_Input.value
    let Author_Input = document.querySelector(".Author_Input");
    let author = Author_Input.value
    let Page_Num_Input = document.querySelector(".Page_Num_Input");
    let pagesRead = Page_Num_Input.value
    let checkBoxField = document.querySelector(".Has_Read");
    
    const formFields = {
        Title_Input: ['A book title is required', 'Book title length must be greater than 1 character'],
        Author_Input: ['Author name is required', 'Author\'s name length must be greater than 1 character'],
        Page_Num_Input: ['Number of book pages is required', 'Number of pages cannot be less than 1', 'Number of pages cannot be greater than 999,999','Only numbers 0-9 are allowed']
    }   
    const errorMessage = checkFormValidity(formFields)
    if(errorMessage.textContent !== ""){
        e.preventDefault();  //Prevents form from sending data to backend by default
        const form_options = document.querySelector(".Form_Options")
        form.insertBefore(errorMessage, form_options)
        console.log("Try again")
    }else{
        console.log("Success!")
        const newBook = new Book(title, author, pagesRead, checkBoxField.checked)
        library.push(newBook)
        displayBook(newBook)
        
        pop_up_form.style.display = "none"  //Hides pop up form
        
        form.reset()  //Clears the form
        e.preventDefault();  //Prevents form from sending data to backend by default
    }
})

//This function will create and display our book on the page
function displayBook(newBook){
  //  newBook.printInfo()
    let book = createNewElement("div", "book")
    book.setAttribute("data-state", library.length-1)  //Give book an index corrwesponding to array of Book objects
    book.style.display = "block"
    let book_content = createNewElement("div", "Book_Info")  //To hold book information
    book.appendChild(book_content)

    let book_title = createNewElement("p", "Book_Title", newBook.title)
    let book_author = createNewElement("p", "Book_author", newBook.author)
    let book_pages = createNewElement("p", "Book_Pages", newBook.numPages)
    book_content.appendChild(book_title)
    book_content.appendChild(book_author)
    book_content.appendChild(book_pages)
    let actions = createNewElement("div", "Actions")
    let read_btn = createNewElement("button", "Read", "Read?")
    let remove_btn = createNewElement("button", "Remove", "Remove")

    read_btn.addEventListener("click", ()=>{
        if(read_btn.classList.toggle("isRead") == true){
            read_btn.textContent = "Read"
        }
        else{
            read_btn.textContent = "Not read"
        }
    })
    remove_btn.addEventListener("click", ()=>{
        deleteBook(book)
    })

    //Coloring Read? button based on the form's checkbox
    if(newBook.hasRead === true){
        read_btn.textContent = "Read"
        read_btn.classList.toggle("isRead")
    }
    else{
        read_btn.textContent = "Not read"
    }

    book.appendChild(actions)
    actions.appendChild(read_btn)
    actions.appendChild(remove_btn)

    book_shelf.insertBefore(book, book_shelf.firstChild)
}

/*Generic function that will create a DOM element, assign it a class and text if need be*/
function createNewElement(elementName, elementClass, elementText){
    let element = document.createElement(elementName);
    element.classList.add(elementClass)
    element.textContent = elementText
    return element
}

function deleteBook(book)
{
    let book_index = book.getAttribute("data-state");
    library.splice(book_index, 1) //Remove book from array index that corresponds to book index
    book_shelf.removeChild(book)
    const bookNodeList = document.querySelectorAll(".book")
    let j = 0;
    for (let i = bookNodeList.length-2; i > -1; i--) {
       bookNodeList[i].setAttribute("data-state", j)  //Give books new index to account for new array size
       j++
    }
}

const checkFormValidity = (formFieldObject)=>{
    const errorMessage = createNewElement('span', 'error', '')
    for (const key in formFieldObject) {
        if (Object.hasOwnProperty.call(formFieldObject, key)) {
            const formField = document.querySelector(`.${key}`)
            const formFieldErrorMsgOptions = formFieldObject[key];
            if(formField.validity.valid){
                errorMessage.textContent = ''
                errorMessage.classList = 'error'
            }else{
                errorMessage.textContent = createErrorMsg(formField, formFieldErrorMsgOptions)
                errorMessage.classList.add('active')
                console.log("THE ERROR: " + errorMessage.textContent)
                return errorMessage;
            }
        }
    }
    return errorMessage
}

const createErrorMsg = (formField, errorMsgOptions)=>{
    if(formField.validity.valueMissing){
        return errorMsgOptions[0]
    }else if(formField.validity.tooShort){
        return errorMsgOptions[1]
    }else if(formField.validity.rangeUnderflow){
        return errorMsgOptions[1]
    }else if(formField.validity.rangeOverflow){
        return errorMsgOptions[2]
    }
}
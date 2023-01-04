const library = [] //To hold our books
const book_shelf = document.querySelector(".Books")  //Div which will display our books
const pop_up_form = document.querySelector(".Book_form")  //Form which user will fill out with book information
const form = document.querySelector(".form")  //Reference to form element
const inputs = document.querySelectorAll("input")  //Nodelist of form input fields
const add_btn = document.querySelector(".Add_Btn");  
const submit_btn = document.querySelector(".Submit")
const cancel_btn = document.querySelector(".Cancel")

//Book object
function Book(title, author, numPages, hasRead){
    this.title = title
    this.author = author
    this.numPages = numPages + " pages"
    this.hasRead = hasRead
    this.printInfo = function(){
        console.log(this.title + ", " + this.author + ", " + this.numPages + " pages, " + this.hasRead)
    }
} 

add_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "block"  //Brings up our form to input book information
});
cancel_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "none"  //Hides form
})

submit_btn.addEventListener("click", (e)=>{
    let title = document.querySelector('.Title_Input').value;
    let author = document.querySelector(".Author_Input").value;
    let pagesRead = document.querySelector(".Page_Num_Input").value;
    let checkBox = document.querySelector(".Has_Read");
    const newBook = new Book(title, author, pagesRead, checkBox.checked)
    library.push(newBook)
    displayBook(newBook)
    
    pop_up_form.style.display = "none"
    
    form.reset()  //Clears the form
    e.preventDefault();  //Prevents form from sending data to backend by default
})

//This function will create and display our book on the page
function displayBook(newBook){
    newBook.printInfo()
    let book = createNewElement("div", "book")
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
        read_btn.classList.toggle("isRead")
    })

    if(newBook.hasRead === true){
        read_btn.classList.toggle("isRead")
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

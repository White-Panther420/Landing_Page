const library = [] //To hold our books
const book_info = [] //Stores information for a single book to be passed as parameters into Book object
const book_shelf = document.querySelector(".Books")  //Div which will display our books
const book = document.querySelector(".book") 
const pop_up_form = document.querySelector(".Book_form")  //Form which user will fill out with book information
const form = document.querySelector(".form")  //Reference to form element
const inputs = document.querySelectorAll("input")  //Nodelist of form input fields
const add_btn = document.querySelector(".Add_Btn");  
const submit_btn = document.querySelector(".Submit")
const cancel_btn = document.querySelector(".Cancel")

function Book(title, author, numPages, hasRead){
    this.title = title
    this.author = author
    this.numPages = numPages
    if(hasRead.checked === true){
        this.hasRead = "Has read book";
    }else{
        this.hasRead = "Has NOT read book"
    }
    this.printInfo = function(){
        console.log(this.title + ", " + this.author + ", " + this.numPages + " pages, " + this.hasRead)
    }
} 

add_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "block"  //Brings up our form to input book information
    //book_shelf.insertBefore(book, book_shelf.firstChild)
});
cancel_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "none"
})
submit_btn.addEventListener("click", (e)=>{
    inputs.forEach(input => {
        book_info.push(input.value)
    });
    const newBook = new Book(book_info[0], book_info[1], book_info[2], book_info[3])
    library.push(newBook)
    addBook()
    pop_up_form.style.display = "none"
    form.reset()  //Clears the form
    e.preventDefault();  //Prevents form from sending data to backend by default
})

function addBook(){
    for(let i=0; i<library.length; i++)
    {
        book.style.display = "block";
        book_shelf.insertBefore(book, book_shelf.firstChild)
    }
    while(book_info.length){
        book_info.pop()
    }
}

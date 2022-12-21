const library = {} //To hold our books
const pop_up_form = document.querySelector(".Book_form")
function Book(title, author, numPages, hasRead){
    this.title = title
    this.author = author
    this.numPages = numPages
    if(hasRead === true){
        this.hasRead = "Has read book";
    }else{
        this.hasRead = "Has NOT read book"
    }
    this.printInfo = function(){
        console.log(this.title + ", " + this.author + ", " + this.numPages + " pages, " + this.hasRead)
    }
} 

const add_btn = document.querySelector(".Add_Btn");
add_btn.addEventListener("click", ()=>{
    pop_up_form.style.display = "block"
    const BookObj = new Book()
});
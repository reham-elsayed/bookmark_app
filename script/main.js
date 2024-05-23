const bookMarkName = document.getElementById('siteName');
const bookMarkUrl = document.getElementById('siteUrl');
const bttnsub = document.getElementById('subbtn');
const updateInForm = document.getElementById('uppbtn');
const newrow = document.getElementById('newrow');
const btndelete = document.querySelectorAll('btndelete');
const visit = document.getElementById('visit');
const updateInSite = document.getElementById('upponsite');
const searchBook = document.getElementById('siteSearch');
const notable = document.getElementById("notable");
const table = document.getElementById("table");
var bookMarlList = [];

if (localStorage.getItem('bookmark') !== null){
    bookMarlList = JSON.parse(localStorage.getItem('bookmark'));
    displayBookmark(bookMarlList);
    console.log(Array.isArray(bookMarlList));
}
else{
    bookMarlList = [];
}


//validation
function validateForm(element){
    var regex ={
        siteName : /^.{3,}$/,
        siteUrl: /(http(s)?:\/\/.)?[-a-zA-Z0-9@:%._\+~#=]\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    }
    if (regex[element.id].test(element.value)){
        console.log("match"); 
        if (element ===  bookMarkName){
            bookMarkName.classList.add("is-valid");
       bookMarkName.classList.remove("is-invalid");
        }
       else if(element === bookMarkUrl){
        bookMarkUrl.classList.remove("is-invalid");
        bookMarkUrl.classList.add("is-valid");
       }
      

       return true;
    }
    else{
        if (element ===  bookMarkName){
            bookMarkName.classList.add("is-invalid");
        }
        
        else if(element === bookMarkUrl){
            console.log("not match");
            bookMarkUrl.classList.add("is-invalid");
        }
        
       // window.alert("not match");
       return false;
    }
}

//add bookmark
function addBookMark(){
    if( bookMarkName.value === "" ||  bookMarkUrl.value === ""){
       // window.alert("please enter name and url");
        Swal.fire({
            title: "empty input",
            text: "please enter name and url",
            icon: "question"
          });
    }
    else if (!validateForm(bookMarkName) && !validateForm(bookMarkUrl)){
       // window.alert("please enter valid name and url");
       Swal.fire({
        title: "invalid input",
        text: "please enter VALID name and url",
        icon: "question"
      });
    }
   
   else if(!validateForm(bookMarkName)){
   // window.alert("not valid name");
    Swal.fire({
        title: "NOT VALID NAME",
        text: "please enter VALID NAME",
        icon: "question"
      });
   }
   else if(!validateForm(bookMarkUrl)){
   // window.alert("not valid url");
   Swal.fire({
    title: "NOT VALID URL",
    text: "please enter VALID URL",
    icon: "question"
  });
   }
   else{
    var bookMarks ={
        bookmarkName: bookMarkName.value,
        bookmarkSite: bookMarkUrl.value
    }
    bookMarlList.push(bookMarks);
localStorage.setItem('bookmark', JSON.stringify(bookMarlList));
displayBookmark(bookMarlList);
clear();
   }
bookMarkName.classList.remove("is-valid");
bookMarkName.classList.remove("is-invalid");
bookMarkUrl.classList.remove("is-valid");
bookMarkUrl.classList.remove("is-invalid");
}



//display bookmark
function displayBookmark(book){
    console.log(book.length);
    var card ='';
    if (book.length === 0){
        notable.classList.replace("d-none","d-block")
    table.classList.replace("d-block", "d-none");
card += `<h2 class="d-block"> No bookmarks </h2>`
notable.innerHTML= card
    }
    else{
        table.classList.replace("d-none", "d-block");
        notable.classList.replace("d-block", "d-none");
    
        for (let i = 0; i< book.length; i++){
            card += `<tr>
            <th scope="row"><p> ${i + 1}</p></th>
            <td> ${book[i].bookmarkName}</td>
            <td><button class="btn btn-outline-dark" onclick="navigate(${i})"><i class="fa fa-eye pe-2"></i>visit site</button></td>
            <td> <button class="btn btn-danger btndelete" id="btndelete-${i}" onclick="deleteBook(${i})"><i class="fa fa-trash"></i> Delete</button>
            </td>
            <td><button class="btn btn-primary" id="uppbtn" onclick="updateDisplay(${i})">
                update
               </button></td>
            </tr>`
            }
            newrow.innerHTML= card;
    }
console.log(card);
}

var globalIndex;
function updateDisplay(n){
    globalIndex = n;
    bookMarkName.value = bookMarlList[n].bookmarkName;
    bookMarkUrl.value = bookMarlList[n].bookmarkSite;
    updateInSite.classList.replace("d-none", "d-block");
    bttnsub.classList.add("d-none");
}

function update(){
    if( bookMarkName.value === "" ||  bookMarkUrl.value === ""){
        // window.alert("please enter name and url");
         Swal.fire({
             title: "empty input",
             text: "please enter name and url",
             icon: "question"
           });
     }
     else if (!validateForm(bookMarkName) && !validateForm(bookMarkUrl)){
        // window.alert("please enter valid name and url");
        Swal.fire({
         title: "invalid input",
         text: "please enter VALID name and url",
         icon: "question"
       });
     }
    
    else if(!validateForm(bookMarkName)){
    // window.alert("not valid name");
     Swal.fire({
         title: "NOT VALID NAME",
         text: "please enter VALID NAME",
         icon: "question"
       });
    }
    else if(!validateForm(bookMarkUrl)){
    // window.alert("not valid url");
    Swal.fire({
     title: "NOT VALID URL",
     text: "please enter VALID URL",
     icon: "question"
   });}
   else{
    var newbook ={
        bookmarkName: bookMarkName.value,
        bookmarkSite: bookMarkUrl.value
    }
    bookMarlList.splice(globalIndex, 1, newbook);
   
    localStorage.setItem('bookmark', JSON.stringify(bookMarlList));
    displayBookmark(bookMarlList);
    clear();
    updateInSite.classList.replace("d-block", "d-none");
    bttnsub.classList.remove("d-none");
   }
   bookMarkName.classList.remove("is-valid");
bookMarkName.classList.remove("is-invalid");
bookMarkUrl.classList.remove("is-valid");
bookMarkUrl.classList.remove("is-invalid");
}

function clear(){
    bookMarkName.value = null;
    bookMarkUrl.value = null;
}
var newSearchList=[];
function search(element){
    var newSearch= [];
    console.log(typeof(element.value));
   
    for (let i = 0; i < bookMarlList.length; i++){


        if((element.value).toLowerCase().includes(bookMarlList[i].bookmarkName) || (element.value).toLowerCase().includes(bookMarlList[i].bookmarkSite)){
            console.log("match");
            newSearch.push(bookMarlList[i]);
            displayBookmark(newSearch);
            newSearchList = newSearch;

        }  
    }
    displayBookmark(newSearch);
    clear();
}
function displayAll(){
    console.log("searh list is ", newSearchList);
    if (localStorage.getItem('bookmark') !== null){
        console.log("display all")
        bookMarlList = JSON.parse(localStorage.getItem('bookmark'));
        displayBookmark(bookMarlList);
        console.log(Array.isArray(bookMarlList));
    }
    else{
        bookMarlList = [];
    }  
}

function deleteBook(i){
    console.log(i);
    bookMarlList.splice(i, 1);
    localStorage.setItem('bookmark', JSON.stringify(bookMarlList));
    // Optionally, update the UI to reflect the change
    displayBookmark(bookMarlList);
}

function navigate(urlIndex){
    console.log("navigate");
    console.log(urlIndex);
var url ="https://" + bookMarlList[urlIndex].bookmarkSite;
window.open(url, '_blank');
}


//visit.addEventListener('click', navigate)
bttnsub.addEventListener('click', addBookMark);
console.log(btndelete);
//  btndelete.forEach((btn) =>{btn.addEventListener('click', function(){
//     console.log("clicked");
//     const index = parseInt(this.id.split('-')[1]);
//    console.log("index");
//     deleteBook(index)});})


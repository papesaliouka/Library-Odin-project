const tableau = document.querySelector('.tableau');
const addBookBtn = document.getElementById('add-new-book');
const titleInput = document.getElementById('title');
const pagesInput = document.getElementById('pages');
const authorInput = document.getElementById('author');
const readInput = document.getElementById('read');
const formContainer = document.querySelector('.overlay');
const exitBtn = document.getElementById('exit');
const form = document.getElementById('form');
const remove = document.querySelectorAll('.remove');

let myLibrary= [];

function Book( title, author, pages, read) {
  // the constructor...
  if (read === 'true'){
    this.read = read;
  }else{
    this.read = !read
  }
  this.title =title;
  this.author = author;
  this.pages = pages;
  this.info=function(){
    return `${title} by ${author}, ${pages} pages ${ read ? 'read' : 'not read yet'} `
  }
}

function addBookToLibrary(book){
  if(!book.title|| !book.author || !book.pages || !book.read){
    return alert('please fill all the fields')
  }
  return myLibrary.push(book)
};

function displayBook(){
  if(localStorage.getItem('library')){
    myLibrary = JSON.parse(localStorage.getItem('library'));
  }else{
    let myLibrary = [
      {
        title: 'Titanic',
        author: 'zozor',
        pages: 100,
        read: true
      }
    ];
    localStorage.setItem('library', JSON.stringify(myLibrary));
  }
  tableau.textContent='';
  myLibrary.forEach(book=> createBook(book))
}


function createBook(book){
  let ul = document.createElement('ul');
  let i = document.createElement('i');
  let btn = document.createElement('button');
  btn.textContent= 'read';
  btn.setAttribute('onclick', `toggleRead('${book.title}')`)
  i.textContent='X';
  i.setAttribute('title', 'Delete Book');
  i.setAttribute('onclick', `deleteBook('${book.title}')`)
  ul.appendChild(i);
  for (let i=0; i<4; i++){
    let li = document.createElement('li');
    ul.appendChild(li);
  }
  ul.children[1].textContent= `${book.title}`;
  ul.children[2].textContent = `${book.author}`;
  ul.children[3].textContent= `${book.pages} Pages`;
  ul.children[4].textContent = book.read ? 'read' : 'not read';
  ul.append(btn);
  tableau.appendChild(ul);
}

function handleData(e){
  e.preventDefault();
  let newBook= new Book(titleInput.value,authorInput.value,Number(pagesInput.value), readInput.value);
  addBookToLibrary(newBook);
  localStorage.setItem('library', JSON.stringify(myLibrary));
  displayBook();
  form.reset();
  titleInput.focus();
}

function deleteBook(item){
  console.log('here')
  myLibrary.forEach((itm,i) => {
    if(itm.title ==item){
      myLibrary.splice(i, 1)
    }
  })
  localStorage.setItem('library', JSON.stringify(myLibrary));
  displayBook();
}

function toggleRead(item){
  myLibrary.map((itm,i)=>{
    if(itm.title===item){
     itm.read = !itm.read;
     myLibrary.splice(i,1, itm);
    }
  })
  localStorage.setItem('library', JSON.stringify(myLibrary));
  displayBook();
}

// Even listeners
form.addEventListener('submit', handleData);
addBookBtn.addEventListener('click', () => formContainer.hidden= false);
exitBtn.addEventListener('click', ()=>  formContainer.hidden = true);
remove.forEach(icon => icon.addEventListener('click', ()=> console.log('here')));

// on load
displayBook();


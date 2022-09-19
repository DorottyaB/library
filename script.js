class Book {
  constructor(title = 'Unknown', author = 'Unknown', pages = '0', isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    this.books.push(newBook);
  }

  removeBook(title) {
    this.books = this.books.filter(book => book.title !== title);
  }

  getBook(title) {
    return this.books.find(book => book.title === title);
  }
}

const library = new Library();

const addBookBtn = document.querySelector('.add-book-btn');
const formContainer = document.querySelector('.form-container');
const addBookForm = document.querySelector('.add-book-form');
const cancelBtn = document.querySelector('.cancel-btn');
const booksContainer = document.querySelector('.books-container');
const startMsg = document.querySelector('.get-started');

document.body.onload = function () {
  if (localStorage.getItem('myBooks')) {
    library.books = JSON.parse(localStorage.getItem('myBooks'));
    updateBooksContainer();
  } else {
    startMsg.classList.remove('hidden');
  }
};

const openAddBookForm = () => {
  startMsg.classList.add('hidden');
  addBookForm.reset();
  formContainer.classList.remove('hidden');
};

const closeAddBookForm = () => {
  formContainer.classList.add('hidden');
  addBookBtn.classList.remove('hidden');
};

const updateBooksContainer = () => {
  resetBooksContainer();
  if (library.books.length === 0) {
    startMsg.classList.remove('hidden');
  } else {
    startMsg.classList.add('hidden');
    for (let book of library.books) {
      createBookRow(book);
    }
  }
};

const resetBooksContainer = () => {
  booksContainer.innerHTML = '';
};

const createBookRow = book => {
  const bookRow = document.createElement('div');
  const title = document.createElement('h3');
  const author = document.createElement('h4');
  const pages = document.createElement('p');
  const buttonGroup = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');

  bookRow.classList.add('book-row');
  buttonGroup.classList.add('button-group');
  readBtn.classList.add('btn');
  removeBtn.classList.add('btn');
  removeBtn.classList.add('btn-remove');

  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = book.title;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = 'Remove';

  if (book.isRead) {
    readBtn.textContent = 'Read';
    readBtn.classList.add('btn-read');
  } else {
    readBtn.textContent = 'Not read';
    readBtn.classList.add('btn-not-read');
  }

  bookRow.appendChild(title);
  bookRow.appendChild(author);
  bookRow.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookRow.appendChild(buttonGroup);
  booksContainer.appendChild(bookRow);
};

const getBookFromInput = () => {
  const author = document.querySelector('#author').value;
  const title = document.querySelector('#title').value;
  const pages = document.querySelector('#pages').value;
  const isRead = document.querySelector('#isRead').checked;
  return new Book(title, author, pages, isRead);
};

const addBook = e => {
  e.preventDefault();
  const newBook = getBookFromInput();
  library.addBook(newBook);
  localStorage.setItem('myBooks', JSON.stringify(library.books));
  updateBooksContainer();
  closeAddBookForm();
};

const removeBook = e => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML;
  library.removeBook(title);
  localStorage.setItem('myBooks', JSON.stringify(library.books));
  updateBooksContainer();
};

const toggleRead = e => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML;
  const book = library.getBook(title);
  book.isRead = !book.isRead;
  localStorage.setItem('myBooks', JSON.stringify(library.books));
  updateBooksContainer();
};

addBookBtn.onclick = openAddBookForm;
addBookForm.onsubmit = addBook;
cancelBtn.onclick = closeAddBookForm;

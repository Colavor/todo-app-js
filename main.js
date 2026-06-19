const library = {
  books: [],

  addBook(title, author, year, isRead = false) {
    const book = new Book(title, author, year, isRead);

    this.books.push(book);
  },

  removeBook(title) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        let current = this.books[i];
        this.books.splice(i, 1);
        return `Книга ${current.title} удалена`;
      }
    }
    return `Книга не найдена`;
  },

  showBooks() {
    const allBooks = [];
    for (let keys of this.books) {
      allBooks.push(`${keys.title} - ${keys.author}`);
    }
    if (allBooks.length > 0) {
      return `${allBooks.join(", ")} : Количество книг ${allBooks.length}`;
    } else {
      return "Книги еще не добавлены";
    }
  },

  markAsRead(title) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        this.books[i].isRead = true;
        return `Книга '${this.books[i].title}' прочитана`;
      }
    }
    return `Книга не найдена`;
  },

  findBook(title) {
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        return this.books[i];
      }
    }
    return `Книга не найдена`;
  },

  get readBooksCount() {
    let count = 0;
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isRead === true) {
        count++;
      }
    }
    return `Прочитано ${count} книг`;
  },

  get totalBooks() {
    return `Всего книг: ${this.books.length}`;
  },
};

function Book(title, author, year, isRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.isRead = isRead;
}

library.addBook("Грокаем алгоритмы", "Адитья Бхаргава", 2021);
library.addBook("Чистый код", "Роберт Мартин", 2008);

library.showBooks();

library.markAsRead("Грокаем алгоритмы");

console.log(library.readBooksCount);

library.removeBook("Чистый код");

library.showBooks();

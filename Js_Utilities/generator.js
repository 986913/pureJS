// https://dev.to/lydiahallie/javascript-visualized-generators-and-iterators-e36

/**
  Imagine we have a list of book clubs! 📚 
  To keep this example short and not one huge block of code, each book club just has one member. 
  A member is currently reading several books, which is represented in the books array!

  Now, we're looking for a book with the id ey812. 
  In order to find that, we could potentially just use a nested for-loop or a forEach helper, 
  but that means that we'd still be iterating through the data even after finding the team member we were looking for!

  The awesome thing about generators, is that it doesn't keep on running unless we tell it to. 
  This means that we can evaluate each returned item, and if it's the item we're looking for, 
  we simply don't call next! Let's see what that would look like.
 */
const bookClubs = [
  {
    name: 'The cool club',
    clubMembers: [
      {
        name: 'John Doe',
        books: [
          { id: 'hs891', title: 'book1' },
          { id: 'ey812', title: 'book2' },
        ],
      },
    ],
  },
  {
    name: 'The better club',
    clubMembers: [
      {
        name: 'John Doe',
        books: [
          { id: 'u6891', title: 'book3' },
          { id: 'p4812', title: 'book4' },
        ],
      },
    ],
  },
];

/***************************** Generator usage example ***********************s*************/
function* iterateBooks(books) {
  for (let i = 0; i < books.length; i++) {
    yield books[i];
  }
}
function* iterateMembers(members) {
  for (let i = 0; i < members.length; i++) {
    yield* iterateBooks(members[i].books);
  }
}
function* iterateBookClubs(bookClubs) {
  for (let i = 0; i < bookClubs.length; i++) {
    yield* iterateMembers(bookClubs[i].clubMembers);
  }
}
//手动一个个的call .next():
const it = iterateBookClubs(bookClubs);
it.next(); // { value: {id: 'hs891', title: 'book1'}, done: false }
it.next(); // { value: {id: 'ey812', title: 'book2'}, done: false }

/***************************** Generator usage example - 升级版(不要用手动call .next了而已) ***********************s*************/
function findBook(id) {
  const generatorsObj = iterateBookClubs(bookClubs);
  let result = generatorsObj.next();

  while (!result.done) {
    if (result.value.id === id) return result.value;
    else result = generatorsObj.next();
  }
}
findBook('ey812'); // {id: 'ey812', title: 'book2'}

// Write your JavaScript here.
(() => {
  const inputbox = document.getElementById('inputbox');
  const submitbtn = document.getElementById('submit_btn');
  const listcontainer = document.getElementById('list');

  const createLi = (value) => {
    let li = document.createElement('li');
    let span = document.createElement('span');
    let button = document.createElement('button');

    span.innerText = value;
    button.innerText = 'Delete';
    li.append(span);
    li.append(button);

    return li;
  };

  const addTodo = () => {
    const value = inputbox.value;

    if (!value) {
      alert('pls enter something');
      return;
    }

    const li = createLi(value);
    listcontainer.append(li);
    inputbox.value = ''; // pay attention here, use value instead of innerText etc.
  };

  const delTodo = (li) => li.parentNode.removeChild(li); // container.removeChild(child) --> remove specific child from container

  submitbtn.addEventListener('click', addTodo);
  // event delegation here:
  listcontainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      delTodo(e.target.parentNode);
    }
  });
})();

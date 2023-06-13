(() => {
  const form = document.querySelector(".form");
  const input = form.querySelector(".form-input");
  const ul = document.querySelector(".toDoList");
  let toDoListArray = getToDoListArray();

  form.addEventListener('submit', e => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value;
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    input.value = '';
  });

  ul.addEventListener('click', e => {
    let id = e.target.getAttribute('data-id')
    if (!id) return
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });

  function addItemToDOM(itemId, toDoItem) {
    const li = document.createElement('li')
    li.setAttribute("data-id", itemId);
    li.innerText = toDoItem
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem });
    if (localStorage.getItem('Taskito-user')) {
      let userdetails = JSON.parse(localStorage.getItem('Taskito-user'))
      userdetails = {...userdetails, "myTodo":JSON.stringify(toDoListArray)}
      localStorage.setItem('Taskito-user',JSON.stringify(userdetails))
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "myTodo": JSON.stringify(toDoListArray)
        }),
      };
      fetch("http://localhost:1200/users/update", options).then(res => {return res.json()}).then(data => {
        console.log(data)
      })
    }else{
      localStorage.setItem('Taskito-guest', JSON.stringify(toDoListArray))
    }
  }

  function removeItemFromDOM(id) {
    var li = document.querySelector('[data-id="' + id + '"]');
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    if (localStorage.getItem('Taskito-user')) {
      let userdetails = JSON.parse(localStorage.getItem('Taskito-user'))
      userdetails = {...userdetails, "myTodo":JSON.stringify(toDoListArray)}
      localStorage.setItem('Taskito-user',JSON.stringify(userdetails))
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "email": email,
          "myTodo": JSON.stringify(toDoListArray)
        }),
      };
      fetch("http://localhost:1200/users/update", options).then(res => {return res.json()}).then(data => {
        console.log(data)
      })
    }else{
      localStorage.setItem('Taskito-guest', JSON.stringify(toDoListArray))
    }
  }

  function getToDoListArray() {
    if (localStorage.getItem('Taskito-user')) {
      let tempArr = JSON.parse(JSON.parse(localStorage.getItem('Taskito-user'))["myTodo"])
      for (let i = 0; i < tempArr.length; i++) {
        addItemToDOM(tempArr[i]["itemId"], tempArr[i]["toDoItem"])
      }
      return tempArr
    } else if (localStorage.getItem('Taskito-guest')) {
      let tempArr = JSON.parse(localStorage.getItem('Taskito-guest'))
      for (let i = 0; i < tempArr.length; i++) {
        addItemToDOM(tempArr[i]["itemId"], tempArr[i]["toDoItem"])
      }
      return tempArr
    } else {
      return []
    }
  }

})();
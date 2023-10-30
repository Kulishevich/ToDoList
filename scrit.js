//добро пожаловать в самый "не чистый код"
let addButton = document.getElementById('add_button')
let list = document.getElementById('list')
let addInput = document.getElementById('add_input')
let emptyList = document.querySelector('.empty_list')

let tasks = [];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function(task){
    let div = document.createElement('div')
    div.classList = 'new_task';
    //добавляем элемент
    let span = document.createElement('span')
    div.id = task.id
    if(task.done){
        span.classList.add('done')
    }
    span.textContent = task.text;
    div.appendChild(span)
    //создаём контейнер для "удаления" и "отметки о выполнении"
    let container = document.createElement('div')
    //кнопка "ок"
    let button1 = document.createElement('button')
    button1.style = 'padding: 2px;margin-right: 5px';
    let img1 = document.createElement('img')
    img1.src = 'done.png';
    img1.style = 'width: 20px';
    button1.appendChild(img1)
    container.appendChild(button1)
    //кнопка "удалить"
    let button2 = document.createElement('button')
    button2.style = 'padding: 2px'; 
    let img2 = document.createElement('img')
    img2.src = 'remove.png'
    img2.style = 'width: 20px';
    button2.appendChild(img2)
    container.appendChild(button2)

    div.appendChild(container)

    list.appendChild(div)
    //прослушка DONE
    button1.addEventListener('click', function(){
        let id = div.id;
        let task = tasks.find((task) => task.id == id);
        task.done = !task.done

        span.classList.toggle('done');
        saveToLocalStorage();
    }) 
    //прослушка на удаление
    button2.addEventListener('click', function(){
        div.remove()
        let id = div.id;
        let index = tasks.findIndex((task) => task.id == id);
        //Сохранение данных. Изменение массива после функции Удаления
        tasks.splice(index, 1)
        console.log(tasks)
        checkEmptyList()
        saveToLocalStorage();
    })

    addInput.value = '';
    addInput.focus()
    checkEmptyList();
    saveToLocalStorage();
})

checkEmptyList()

addButton.addEventListener('click', function(){
    if(addInput.value == ''){
        alert('Поле ввода пусто!')
        return 0;
    }
    let div = document.createElement('div')
    div.classList = 'new_task';
    //добавляем элемент
    let span = document.createElement('span')
    //записываем данные в элемент массива newTask
    let newTask = {
        id: Date.now(),
        text: addInput.value,
        done: false,
    }
    tasks.push(newTask)
    div.id = newTask.id

    if(newTask.done){
        span.classList.add('done')
    }

    span.textContent = newTask.text;
    div.appendChild(span)
    //создаём контейнер для "удаления" и "отметки о выполнении"
    let container = document.createElement('div')
    //кнопка "ок"
    let button1 = document.createElement('button')
    button1.style = 'padding: 2px;margin-right: 5px';
    let img1 = document.createElement('img')
    img1.src = 'done.png';
    img1.style = 'width: 20px';
    button1.appendChild(img1)
    container.appendChild(button1)
    //кнопка "удалить"
    let button2 = document.createElement('button')
    button2.style = 'padding: 2px'; 
    let img2 = document.createElement('img')
    img2.src = 'remove.png'
    img2.style = 'width: 20px';
    button2.appendChild(img2)
    container.appendChild(button2)

    div.appendChild(container)

    list.appendChild(div)
    //прослушка DONE
    button1.addEventListener('click', function(){
        let id = div.id;
        let task = tasks.find((task) => task.id == id);
        task.done = !task.done

        span.classList.toggle('done');
        saveToLocalStorage();
    }) 
    //прослушка на удаление
    button2.addEventListener('click', function(){
        div.remove()
        let id = div.id;
        let index = tasks.findIndex((task) => task.id == id);
        //Сохранение данных. Изменение массива после функции Удаления
        tasks.splice(index, 1)
        console.log(tasks)
        checkEmptyList()
        saveToLocalStorage();
    })

    addInput.value = '';
    addInput.focus()
    checkEmptyList();
    saveToLocalStorage();
})

function checkEmptyList() {
    if (tasks.length !== 0){
        emptyList.classList.add('none')
    } else {
        emptyList.classList.remove('none')
    }
}  

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

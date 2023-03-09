let inp = document.getElementById("inp")
let btn = document.getElementById("btn")
let div = document.getElementById("div")

function getData(){
    fetch('https://crudapp-pwlck5pebq-el.a.run.app/api/todos')
    .then(res=> res.json())
    .then(data=> data.todos.forEach(e=>{
        div.innerHTML += `
        <p 
        class=${e.completed && 'compeleted'}
        >${e.title} 
        <span onclick="deleteTodo('${e._id}')">|SIL|</span>
        <span onclick="updateTodo('${e}')">Update|</span>
        </p>`
    }))
}

getData()

function postTodo(){
    fetch("https://crudapp-pwlck5pebq-el.a.run.app/api/todos",
    {
        method:"POST",
        headers: { 'Content-Type': "application/json" },
        body:JSON.stringify({
            title:inp.value,
            completed:false
        })
    })
    .then(res=> {
        if (res.status === 201) {
            div.innerHTML='';
            getData()
        }
    })
    .catch(err=> console.log('Imran code yazdi'+err))
}

function deleteTodo(id){
    fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${id}`,{
        method:"DELETE"}
    )
    .then(res=> {
        if (res.status === 200) {
            div.innerHTML = '';
            getData()
        }
    })
}

function updateTodo(e){
    console.log(e);
    //fetch('https://crudapp-pwlck5pebq-el.a.run.app/api/todos/todoID')
}




btn.addEventListener('click',postTodo)
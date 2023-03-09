let inp = document.getElementById("inp")
let btn = document.getElementById("btn")
let div = document.getElementById("div")

function getData(){
    fetch('https://crudapp-pwlck5pebq-el.a.run.app/api/todos')
    .then(res=> res.json())
    .then(data=> data.todos.forEach(e=>{
        div.innerHTML += `
        <p 
        style='${e.completed && 'text-decoration: line-through'}'
        >${e.title} 
        <span onclick='deleteTodo('${e._id}')'>|SIL|</span>
        <span onclick='updateTodo(${JSON.stringify(e)})'>Update|</span>
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

function updateTodo(value){
    fetch(`https://crudapp-pwlck5pebq-el.a.run.app/api/todos/${value._id}`,{
        method:"PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ ...value, completed: value.completed==false?true:false})
    }).then(e=> {
        if (e.status === 200) {
            div.innerHTML = '';
            getData()
        }
    })
}




btn.addEventListener('click',postTodo)
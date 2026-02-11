let taskData = {}

const ToDo = document.querySelector('#ToDo');
const process = document.querySelector('#process');
const finished = document.querySelector('#done');
let dragElement = null;
const tasks = document.querySelectorAll('.task');
const columns = [ToDo, process, finished]

function addTask(title, desc, column){
     const div = document.createElement("div")

    div.classList.add("task");
    div.setAttribute("draggable", "true")

    div.innerHTML = `
    <h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div)
  div.addEventListener("drag", () => {
        dragElement = div;
    })
const deleteBtn = div.querySelector("button");
deleteBtn.addEventListener("click", () =>{
div.remove();
updateTaskCount();
})
    return div;

}

function updateTaskCount(){
  columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right")

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText

            }
        })
        localStorage.setItem("tasks", JSON.stringify(taskData))
        count.innerText = tasks.length
    })
}

if(localStorage.getItem("tasks")){
const data = JSON.parse(localStorage.getItem("tasks"))


for(const col in data){
    const column = document.querySelector(`#${col}`);
    data[col].forEach(task =>{
addTask(task.title,task.desc,column)
    })

     const tasks = column.querySelectorAll(".task");
        const count = column.querySelector(".right")
        count.innerText=tasks.length;
}
}

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task
    })
})


function dragAndDrop(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    column.addEventListener("drop", (e) => {
        e.preventDefault();

        column.appendChild(dragElement)
        column.classList.remove("hover-over");
updateTaskCount();

       
    })
}
dragAndDrop(ToDo);
dragAndDrop(process);
dragAndDrop(finished);

const toggleButton = document.querySelector("#toggle");
const modal = document.querySelector(".modal")
const modalBg = document.querySelector(".modal .bg");
const addBtton = document.querySelector("#add-new-task")


toggleButton.addEventListener("click", () => {
    modal.classList.toggle("active")
})
modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})

addBtton.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title").value;
    const taskDesc = document.querySelector("#task-desc").value;
   addTask(taskTitle, taskDesc, ToDo)
    updateTaskCount();
    modal.classList.remove("active")

    document.querySelector("#task-title").value= "";
    document.querySelector("#task-desc").value= "";
})
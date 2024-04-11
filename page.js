
//timer for Schedule
let hr = 0,
  min = 0,
  sec = 0,
  click = 0;
var timer;
var startbtn = document.querySelector(".start");
const time = document.querySelector(".time");
const clicked = () => {
  click++;
  if (click % 2 == 0) {
    startbtn.textContent = "Start";
    clearInterval(timer);
    return;
  }
  startbtn.textContent = "Stop";
  start();
};
const start = () => {
  timer = setInterval(starttimer, 1000);
};
const starttimer = () => {
  sec++;
  if (sec == 60) {
    sec = 0;
    min++;
    if (min == 60) {
      min = 0;
      hr++;
    }
  }
  display();
};
const resettimer = () => {
  (hr = 0), (min = 0), (sec = 0);
  clearInterval(timer);
  click=0;
  startbtn.textContent="Start";
  display();
};
const display = () => {
  time.textContent = `${round(hr)}:${round(min)}:${round(sec)}`;
};
const round = (val) => (val >= 10 ? val : "0" + val);
startbtn.addEventListener("click", clicked);
document.querySelector(".reset").addEventListener("click", resettimer);



let tasks = [];
let id=0;
//adding tasks in "tasks" object array ;
const addtask = () => {
    id++;
  const category = document.querySelector(".category");
  const subcategory = document.querySelector(".subcategory");
  const task = document.querySelector(".taskname");
  const duration = document.querySelector(".time").textContent;
  const taskTable = document.querySelector(".taskbody");
  tasks.push({"id":id,"category":category.value,"subcategory":subcategory.value,"task":task.value,"duration":duration});
  resettimer();
  list(tasks);
  category.value="";
  subcategory.value="";
  task.value="";
}
//updating variables
const updatecategory = document.querySelector(".updatecategory");
const updatesubcategory = document.querySelector(".updatesubcategory");
const updatetask = document.querySelector(".updatetaskname");
const updateduration=document.querySelector(".updateduration");
let updateid;
//Listing Tasks in table
const list=(arr)=>{
    const taskTable = document.querySelector(".taskbody");
    taskTable.textContent="";
    arr.map((item)=>{
        const row=document.createElement('tr');
        let data=document.createElement('td');
        data.textContent=item.category;
        row.appendChild(data);
        data=document.createElement('td');
        data.textContent=item.subcategory;
        row.appendChild(data);
        data=document.createElement('td');
        data.textContent=item.task;
        row.appendChild(data);
        data=document.createElement('td');
        data.textContent=item.duration;
        row.appendChild(data);
        const update=document.createElement('button');
        update.addEventListener("click",()=>{
          const schedule=document.querySelector(".schedule").style.display="none";
          const update=document.querySelector(".update").style.display="block";
  updatecategory.value=item.category;
  updatesubcategory.value=item.subcategory;
  updatetask.value=item.task;
  updateduration.value=item.duration;
  updateid=item.id;

        })
        update.textContent="Update";
        data=document.createElement('td');
        data.appendChild(update);
        
        row.appendChild(data);
        const del=document.createElement('button');
        del.addEventListener('click',()=>{
             taskTable.removeChild(row);
             let index=tasks.findIndex((task)=>task.id==item.id);
             tasks.splice(index,1);
        })
        del.textContent="Delete";
        data=document.createElement('td');
        data.appendChild(del);
        row.appendChild(data);
        taskTable.appendChild(row);
      })
}





// Filter
const filcat=document.querySelector(".filterbycategory");
const fildur=document.querySelector(".filterbyduration");
const catchange=()=>{
    let category=filcat.value;

    if(category!=""){
        let newarray=[];
        newarray=tasks.filter((task)=>task.category===category);
        list(newarray)
    }
    else list(tasks);
}
const asc=(task1,task2)=>{
    let a=task1.duration.split(":");
    let b=task2.duration.split(":");
    let times=[3600,60,1];
    let atime=0,btime=0;
    for(let i=0;i<3;i++){
        atime+=Number(a[i])*times[i];
        btime+=Number(b[i])*times[i];
    }
    
    return atime>btime?1:-1;
}
const desc=(task1,task2)=>{
    let a=task1.duration.split(":");
    let b=task2.duration.split(":");
    let times=[3600,60,1];
    let atime=0,btime=0;
    for(let i=0;i<3;i++){
        atime+=a[i]*times[i];
        btime+=b[i]*times[i];
    }
    
    return atime<btime?1:-1;
}
const durchange=()=>{
    let sortby=fildur.value;
    if(sortby!=""){
        let arr=tasks.slice();
        if(sortby=='asc') arr.sort(asc);
        else arr.sort(desc);
        list(arr);
    }
    else list(tasks);
}



//update
const update=()=>{
   let index=tasks.findIndex((task)=>task.id==updateid);
   tasks[index]={"id":id,"category":updatecategory.value,"subcategory":updatesubcategory.value,"task":updatetask.value,"duration":updateduration.value};
  list(tasks);
  }
const cancelupdate=()=>{
  const schedule=document.querySelector(".schedule").style.display="block";
  const update=document.querySelector(".update").style.display="none";
}

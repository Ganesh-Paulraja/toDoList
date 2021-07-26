
var  inputBox = document.getElementById("inputBox");
var addButton = document.getElementById("addButton");
var task = document.getElementById("task"); 


inputBox.focus();

var setArray = [ ]

addButton.addEventListener("click",addTask);
inputBox.addEventListener("keyup",enter);

function addTask(){
 var uniqueValue = unique();
  var  inputValue = inputBox.value;
 if(inputValue.trim().length === 0){
     return alert("Please enter some value...");
 }

 var taskObj = {
     value: inputValue,
     isCut: false,
     id: "task-"+ uniqueValue 
 }

 setArray.push(taskObj);
 setTask();
 createEle(taskObj.value,taskObj.isCut,taskObj.id);
 inputBox.value = " ";
}

function createEle(inputValue,isCut,id){
    var newElement = document.createElement("div");
    newElement.setAttribute("id",id);
if(isCut)
    newElement.setAttribute("class","do cut");

else
    newElement.setAttribute("class","do");

    var inner = document.createTextNode(inputValue);
    newElement.append(inner);
    task.append(newElement);
    newElement.addEventListener("click",taskClick);
    newElement.addEventListener("dblclick",taskRemove);
    
}

function enter(e){
    if(e.keyCode === 13){
        addTask()
    }
}

function taskClick(){
    this.classList.toggle("cut");
      for(index in setArray){
          if (this.id === setArray[index].id){
              setArray[index].isCut = !setArray[index].isCut;
          }
      }
    setTask();
    }
function taskRemove(){
    this.remove();

for(index in setArray){
    if(this.id === setArray[index].id){
        setArray.splice(index, 1);
    }
    setTask();
}
}

function setTask(){
    localStorage.setItem("gold",JSON.stringify(setArray));
}  

function getTask(){
    var getArray = localStorage.getItem("gold");
    if(!getArray){
        return;
    }
    getArray = JSON.parse(getArray);
    for(index in getArray){
   createEle(getArray[index].value,getArray[index].isCut,getArray[index].id);
   setArray.push(getArray[index]);
}
}
getTask();

function unique(){
    var time = new Date();
    return time.getFullYear()+"."+time.getMonth() + "." + time.getDate() + "." + time.getHours() + "." +time.getMinutes() + "." + time.getSeconds() + "." + time.getMilliseconds() + "."+Math.random();
}

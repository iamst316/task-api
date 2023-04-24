const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());
//------------------------------
let id = 0;
let taskList = {
    tasks:[]
};
//-----------TASK 1 & 6 combined--------------------

app.post("/v1/tasks",(req,res)=>{
    const multTask = req.body;

    if(multTask.tasks==undefined){
        id++;
        let status;
        if(multTask.is_completed==undefined||multTask.is_completed==false){
            status = false;
        }
        else{
            status = true;
        }
        taskList.tasks = [
            ...taskList.tasks,
            {
                id:id,
                title : multTask.title,
                is_completed: status
            }
        ]
        // console.log(taskList);
        res.status(201).send({
            id: id
        });
    }
    else{
        let tasks = []
        for(let i of multTask.tasks){
            id++;
            let status;
            if(i.is_completed==undefined||i.is_completed==false){
                status = false;
            }
            else{
                status = true;
            }
            taskList.tasks = [
                ...taskList.tasks,
                {
                    id:id,
                    title : i.title,
                    is_completed: status
                }
            ]
            tasks= [
                ...tasks,
                {
                    id:id
                }
            ]
            // console.log(taskList);
            
        }
        res.status(201).send({
            tasks
        });
    }
    // console.log(task.title);
    
})


//-------------TASK 2--------------------
app.get("/v1/tasks",(req,res)=>{
    id++;
    const task = req.body;
    
    res.status(200).send(taskList);
})
//--------------TASK 3-------------------

app.get("/v1/tasks/:id",(req,res)=>{
    let num = req.params.id;
    let isFound = false;
    // console.log(num.id);
    for(let i of taskList.tasks){
        if(i.id==num){
            isFound = true;
            res.status(200).send(i)
        }
    }
    if(isFound==false){
        res.status(404).send({ 
            error: "There is no task at that id"
        })

    }
    // res.send()
    
})
//-------------------TASK 4-----------------------------
app.delete("/v1/tasks/:id",(req,res)=>{
    let num = req.params.id;
    // let isFound = false;
    // console.log(num.id);
    for(let i of taskList.tasks){
        if(i.id==num){
            // isFound = true;
            taskList.tasks.splice(taskList.tasks.indexOf(i),1);
        }
    }
    
    res.send(204);
    // console.log(taskList)
})
//-------------------TASK 5-------------------------------
app.put("/v1/tasks/:id",(req,res)=>{
    let num = req.params.id;

    let edit = req.body;
    let isFound = false;
    // console.log(num.id);
    for(let i of taskList.tasks){
        if(i.id==num){
            isFound = true;
            i.title = edit.title;
            i.is_completed = edit.is_completed
            res.status(204).send()
        }
    }
    if(isFound==false){
        res.status(404).send({ 
            error: "There is no task at that id"
        })

    }
})
//---------------------------------------------------
app.delete('/v1/tasks',(req,res)=>{
    let delList = req.body.tasks;
    for(let i=0;i<delList.length;i++){
        for(let j of taskList.tasks){
            if(delList[i].id==j.id){
                taskList.tasks.splice(taskList.tasks.indexOf(j),1);
            }
        }
    }

    res.status(204).send();
})

//-----------------------------------

app.listen(PORT,()=>{
    console.log(`Server RUNNING @ ${PORT}`)
})
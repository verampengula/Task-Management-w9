// First thing is to add function to database, initialise it//
firebase.initializeApp({
    apiKey: "AIzaSyAtl7dF_Fze1bh77NrdTU0WdTGKsbAO7Nc",
    authDomain: "plp-web1-5a11b.firebaseapp.com",
    projectId: "plp-web1-5a11b",
    storageBucket: "plp-web1-5a11b.appspot.com",
    messagingSenderId: "846275524651",
    appId: "1:846275524651:web:64991dd0e88353076fd26e"
});
 
const db = firebase.firestore();
// we need to capture the task added to the database: //
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();  //removes unncessary space at the end of string values //
    if(task !== ""){    // prevents empty variable sin the database
db.collection("tasks").add({
    task: task,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
});
taskInput.value = "";
console.log("Task has been added!");
    }
}

function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>     
    <button onclick= "deleteTask('${doc.id}')"> Delete</button>
 `;
 taskList.appendChild(taskItem);
}

db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === "added"){
            renderTasks(change.doc);
        }
    });
});

function deleteTask(id){
    db.collection("tasks").doc(id).delete();
}
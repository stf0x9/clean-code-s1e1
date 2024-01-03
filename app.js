var taskInput = document.querySelector(".add-task__input");
var addButton = document.querySelector(".add-task__btn");

var postponedList = document.querySelector(".postponed__list");
var completedList = document.querySelector(".completed__list");

var createNewTaskElement = function (taskString) {

    var listItem = document.createElement("li");
    listItem.classList.add('list__item')

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add('input', 'input_checkbox')

    var label = document.createElement("label");
    label.innerText = taskString;
    label.className = 'task__label';

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add('edit__input', 'input_text', 'input')

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add('edit', 'btn', 'btn_edit')

    var deleteButton = document.createElement("button");
    deleteButton.classList.add('delete', 'btn', 'btn_delete');

    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.classList.add('delete__img')
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function () {
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);

    postponedList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

var editTask = function () {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem = this.parentNode;

    var editInput = listItem.querySelector('input[type=text]');
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".edit");
    var containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }
    listItem.classList.toggle("editMode");
};

var deleteTask = function () {
    console.log("Delete Task...");

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

var taskCompleted = function () {
    console.log("Complete Task...");

    var listItem = this.parentNode;
    completedList.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function () {
    console.log("Incomplete Task...");
    var listItem = this.parentNode;
    postponedList.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function () {
    console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < postponedList.children.length; i++) {
    bindTaskEvents(postponedList.children[i], taskCompleted);
}

for (var i = 0; i < completedList.children.length; i++) {
    bindTaskEvents(completedList.children[i], taskIncomplete);
}
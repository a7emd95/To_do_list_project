document.addEventListener("DOMContentLoaded", function (event) {

    //select component  
    var clear = document.querySelector(".clear");
    var dateElement = document.getElementById("date");
    var list = document.getElementById("list");
    var userInput = document.getElementById("input")
  //global vraiable to item list and id do item
    var LIST = [];
    var ID = 0;

    //css classes to use  in run time to add and remove
    var check = "fa-check-circle";
    var unCheck = "fa-circle";
    var lineThrough = "lineThrough"

 //add item to list 
 function addToList(toDo , id , done , trash) {
    if (trash) { return; }

    var isDONE = (done) ? check : unCheck;
    var Line = (done) ? lineThrough : "";

    //template string (litrial)
    //` ` grave accent  de foe delete co for complete
    var itemElement = `<li class="item"> 
   <i class="far ${isDONE} co" job="complete" id="${id}" ></i>
   <p class="text ${Line}"> ${toDo} </p>
   <i class="fas fa-trash de" job="delete" id="${id}"> </i>`

    var position = "beforeend"

    list.insertAdjacentHTML(position, itemElement)
}

    // take input form user 
    document.addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            
            var todo = userInput.value;

            if (todo) {

                 addToList(todo, ID, false, false);
                LIST.push(
                    {
                        "name": todo,
                        "id": ID,
                        "done": false,
                        "trash": false

                    }
                );
            };
            console.log(LIST);
            userInput.value = " ";
            localStorage.setItem("todo" , JSON.stringify(LIST)); //update local storge
            ID++;             

        }

    });

    // to update interface if user click on check btn or delete btn
    function completeToDo(element) {
        //complete section
        element.classList.toggle(check);
        element.classList.toggle(unCheck);
        element.parentNode.querySelector(".text").classList.toggle(lineThrough);

        LIST[element.id].done = LIST[element.id].done ? false : true;
    }

    function removeElement(element) {
        element.parentNode.parentNode.removeChild(element.parentNode);
        LIST[element.id].trash = true;       

    }

    //element create in run time so we use parent to select it by event.targer 
    list.addEventListener("click", function (event) {
        var element = event.target;
        var elementJob = event.target.attributes.job.value;

        if (elementJob == "complete") {
            completeToDo(element)
        } else if (elementJob == "delete") {
            removeElement(element)
        }
        //update local storge
        localStorage.setItem("todo", JSON.stringify(LIST))

    });


    function loadData(dList) {
        dList.forEach(function (item) {
            addToList(item.name, item.id, item.done, item.trash);
        });
    }

    var dataList = localStorage.getItem("todo"); //get from localstorge if refresh page or close it 

    if (dataList) {
        LIST = JSON.parse(dataList);
        loadData(LIST);
        ID = LIST.length

    } else {

        LIST = [];
        ID = 0;
    }
    //clear local storge and list in user face  when click on clear btn 
    clear.addEventListener("click", function () {

        localStorage.clear();
        location.reload();
    });

    //show date 
    var options = { weekday: "long", month: 'short', day: 'numeric' };
    today = new Date();
    dateElement.innerHTML = today.toLocaleTimeString('en-us', options);

})
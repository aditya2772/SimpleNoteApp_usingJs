showNotes();

//user adding a note adding to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById('addTxt');
    let noteTitle = document.getElementById('noteTitle');
    
    let notes = localStorage.getItem('notes');
    


    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: noteTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    noteTitle.value = "";
    
    showNotes();
});




//function to show notes  
function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let content = "";
   
    notesObj.forEach(function (element, index) {
      
        content += ` 
        
                <div class="card noteCard my-2 mx-2"  style="width: 18rem; " >
                     <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <h6> ${element.title}</h6>
                    <p class="card-text"> ${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete note</button>
                    </div>
                </div> `;
    });



    let notesElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElement.innerHTML = content;
    } else {
        notesElement.innerHTML = `there is no any notes. please add your notes using above section`;
    }

}

// function to delete a note
function deleteNote(index) {

    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}

// search existing notes
let search = document.getElementById('searchTxt');

search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByClassName("card-text")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        } else {
            element.style.display = "none";
        }
    })

})


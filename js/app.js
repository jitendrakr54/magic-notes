console.log("Welcome to Magic Notes");
document.onload = showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    if(addTxt.value) {
        let notes = localStorage.getItem('notes');
        let notesObj = [];
        if (notes) {
            notesObj = JSON.parse(notes);
        }
        notesObj.push(addTxt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        addTxt.value = "";
        // console.log(notesObj);
        showNotes();
    } else {
        alert("Please write something for a note!");
    }
});

// function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj = [];
    if (notes) {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card row" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Note ${index+1} </h5>
                    <p class="card-text">${element}</p>
                    <a id=${index} onclick=deleteNote(this.id) class="btn btn-primary">Delete Note</a>
                    </div>
                </div>
            `;
    });
    let noteElm = document.getElementById('notes');
    if(notesObj.length) {
        noteElm.innerHTML = html;
    } else {
        noteElm.innerHTML = "Nothing to show, Please add a note!";
    }
}

// function to delete a note
function deleteNote(index) {
    // console.log("Deleting note ", index);
    let notes = localStorage.getItem('notes');
    let notesObj = [];
    if(notes) {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Search notes
let search = document.getElementById('searchText');
search.addEventListener('input', function() {
    let searchText = search.value;
    // console.log(searchText);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let txt = element.getElementsByTagName('p')[0].innerText;
        if(txt.includes(searchText)) {
            element.style.display = "block";
            // console.log(txt);
        } else {
            element.style.display = "none";
        }
    });
});

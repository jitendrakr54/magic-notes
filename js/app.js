console.log("Welcome to Magic Notes");
document.onload = showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    if(addTxt.value) {
        let notes = localStorage.getItem('notes');
        let notesArr = [];
        if (notes) {
            notesArr = JSON.parse(notes);
        }
        let notesObj = {
            title: addTitle.value,
            text: addTxt.value
        }
        notesArr.push(notesObj);
        localStorage.setItem('notes', JSON.stringify(notesArr));
        addTxt.value = "";
        addTitle.value = "";
        // console.log(notesArr);
        showNotes();
    } else {
        alert("Please write something for a note!");
    }
});

// function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesArr = [];
    if (notes) {
        notesArr = JSON.parse(notes);
    }
    let html = "";
    notesArr.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card row" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${element.title} </h5>
                    <p class="card-text">${element.text}</p>
                    <a id=${index} onclick=deleteNote(this.id) class="btn btn-primary">Delete Note</a>
                    </div>
                </div>
            `;
    });
    let noteElm = document.getElementById('notes');
    if(notesArr.length) {
        noteElm.innerHTML = html;
    } else {
        noteElm.innerHTML = "Nothing to show, Please add a note!";
    }
}

// function to delete a note
function deleteNote(index) {
    // console.log("Deleting note ", index);
    let notes = localStorage.getItem('notes');
    let notesArr = [];
    if(notes) {
        notesArr = JSON.parse(notes);
    }
    notesArr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArr));
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

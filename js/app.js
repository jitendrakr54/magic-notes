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
        console.log(notesObj);
        showNotes();
    }
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    let notesObj = [];
    if (notes) {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="card row my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">Note ${index+1} </h5>
                    <p class="card-text">${element}</p>
                    <a href="#" class="btn btn-primary">Delete Note</a>
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
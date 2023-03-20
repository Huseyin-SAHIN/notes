const addButton = document.querySelector("#add");
const notes = document.querySelector("#notes");
const storedNotes = JSON.parse(localStorage.getItem("notes"));

addButton.addEventListener("click", () => createNewNote());

if (storedNotes) {
    storedNotes.forEach((note) => {
        createNewNote(note);
    })
}

function createNewNote(noteContent = "") {

    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `<div class="note-body">
                        <div class="tools">
                            <img src="fastener.png" alt="">
                            <button class="edit">
                                <i class="fa-solid fa-pencil"></i>
                            </button>
                            <button class="delete">
                                <i class="fa-solid fa-eraser"></i>
                            </button>
                        </div>
                        <div class="main hidden">${noteContent}</div>
                        <textarea></textarea>
                    </div>
    `;

    notes.insertAdjacentElement("beforeend", note);

    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    editButton.addEventListener("click", () => {
        toggleNoteEditMode(main, textArea);
        textArea.focus();
    });

    saveNoteOnBlur(note, main, textArea);

    deleteButton.addEventListener("click", () => {
        deleteNote(note, main);
    });


    if (main.innerHTML === "") {
        textArea.focus();
    } else {
        textArea.value = main.innerHTML
        toggleNoteEditMode(main, textArea);
    }
}

function toggleNoteEditMode(main, textArea) {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
}

function saveNoteOnBlur(note, main, textArea) {
    textArea.addEventListener("blur", () => {
        toggleNoteEditMode(main, textArea);
        main.innerHTML = textArea.value.replace(/\n/g, "<br>")
        updateLocalStorage();
        if (main.textContent === "") {
            deleteNote(note, main);
        };
    });
};

function deleteNote(note, main) {
    note.classList.add("delete");
    addButton.disabled = true;
    addButton.style.opacity = "0.8";
    main.style.width = window.getComputedStyle(main).width;
    setTimeout(() => {
        note.remove();
        updateLocalStorage();
        addButton.disabled = false;
        addButton.style.opacity = "1";
    }, 500);
}

function updateLocalStorage() {
    const notesText = document.querySelectorAll(".main")
    const notesArray = [];
    notesText.forEach((note) => {
        notesArray.push(note.innerHTML);
    });

    localStorage.setItem("notes", JSON.stringify(notesArray));
}
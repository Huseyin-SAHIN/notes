const addButton = document.querySelector("#add");
const notes = document.querySelector("#notes");

addButton.addEventListener("click", () => addNewNote());


function addNewNote() {

    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
            <div class="tools">
                <img src="fastener.png" alt="">
                <button class="edit">
                    <i class="fa-solid fa-pencil"></i>
                </button>
                <button class="delete">
                    <i class="fa-solid fa-eraser"></i>
                </button>
            </div>
            <div class="main hidden">as</div>
            <textarea></textarea>
    `;
    deleteFunction(note);
    editFunction(note)

    notes.appendChild(note);
    const textArea = note.querySelector("textarea");
    textArea.focus()
}

function deleteFunction(e) {
    const deleteButton = e.querySelector(".delete");
    deleteButton.addEventListener("click", () => e.remove());
}

function editFunction(e) {

    const editButton = e.querySelector(".edit");
    const main = e.querySelector(".main");
    const textArea = e.querySelector("textarea");

    editButton.addEventListener("click", () => {
        main.classList.toggle("hidden")
        textArea.classList.toggle("hidden")
        textArea.focus();

        main.innerHTML = textArea.value
    })
}
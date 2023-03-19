const addButton = document.querySelector("#add");
const notes = document.querySelector("#notes");

addButton.addEventListener("click", () => addNewNote());

function addNewNote() {

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
                        <div class="main hidden"></div>
                        <textarea></textarea>
                    </div>
    `;

    notes.insertAdjacentElement("beforeend", note)

    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    editButton.addEventListener("click", () => editFunction(main, textArea));
    textAreaBlur(note, main, textArea)
    deleteButton.addEventListener("click", () => {
        deleteFunction(note, main);
    });

}

function editFunction(main, textArea) {
    main.classList.toggle("hidden")
    textArea.classList.toggle("hidden")
    textArea.focus();
}

function textAreaBlur(note, main, textArea) {

    textArea.focus();
    textArea.addEventListener("blur", () => {
        editFunction(main, textArea)
        main.innerHTML = textArea.value.replace(/\n/g, "<br>")
        if (main.textContent === "") {
            deleteFunction(note, main)
        }
    })
}

function deleteFunction(note, main) {
    note.classList.add("delete")
    addButton.disabled = true;
    addButton.style.opacity = "0.8";
    main.style.width = window.getComputedStyle(main).width;
    setTimeout(() => {
        note.remove();
        addButton.disabled = false;
        addButton.style.opacity = "1";
    }, 500);
}
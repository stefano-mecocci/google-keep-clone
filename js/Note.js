export class Note {
    title = "";
    text = "";

    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    build() {
        let note = document.createElement("div");
        note.classList.add("note");

        let title = document.createElement("h3");
        title.classList.add("note__title");
        title.textContent = this.title;

        let text = document.createElement("p");
        text.classList.add("note__text");
        text.textContent = this.text;

        note.appendChild(title);
        note.appendChild(text);

        return note;
    }
}
showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

/*
- Вам необхідно написати додаток `Todo list`. У списку нотаток повинні бути методи
 для додавання нового запису, видалення, редагування та отримання повної інформації
 про нотатку за ідентифікатором, а так само отримання списку всіх нотаток.
 Крім цього, у користувача має бути можливість позначити нотаток, як виконаний,
 і отримання інформації про те, скільки всього нотаток у списку
 і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.
- Кожний нотаток має назву, зміст, дату створення і редагування та статус.
 Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при редагуванні.
- Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка
 за ім'ям або змістом.
- Також окремо необхідно розширити список можливістю сортування нотаток
 за статусом або часом створення.
 */

interface NoteData {
    id: number;
    title: string;
    content: string;
    creationDate: Date;
    lastEditedDate: Date;
    status: 'todo' | 'done';
}

class Note {
    private data: NoteData;

    constructor(title: string, content: string) {
        this.data = {
            id: 0,
            title,
            content,
            creationDate: new Date(),
            lastEditedDate: new Date(),
            status: 'todo'
        };
    }

    public getId(): number {
        return this.data.id;
    }

    public setId(id: number): void {
        this.data.id = id;
    }

    public getTitle(): string {
        return this.data.title;
    }

    public setTitle(title: string): void {
        this.data.title = title;
    }

    public getContent(): string {
        return this.data.content;
    }

    public setContent(content: string): void {
        this.data.content = content;
    }

    public getCreationDate(): Date {
        return this.data.creationDate;
    }

    public getLastEditedDate(): Date {
        return this.data.lastEditedDate;
    }

    public getStatus(): 'todo' | 'done' {
        return this.data.status;
    }

    public setStatus(status: 'todo' | 'done'): void {
        this.data.status = status;
    }
}

class TodoList {
    private notes: Note[];
    private idCounter: number;

    constructor() {
        this.notes = [];
        this.idCounter = 1;
    }

    public addNote(title: string, content: string): void {
        const note = new Note(title, content);
        note.setId(this.idCounter++);
        this.notes.push(note);
    }

    public deleteNoteById(id: number): void {
        this.notes = this.notes.filter(note => note.getId() !== id);
    }

    public getNoteById(id: number): Note | undefined {
        return this.notes.find(note => note.getId() === id);
    }

    public getAllNotes(): Note[] {
        return [...this.notes];
    }

    public markNoteAsDone(id: number): void {
        const note = this.getNoteById(id);
        if (note) {
            note.setStatus('done');
        }
    }

    public getPendingNoteCount(): number {
        return this.notes.filter(note => note.getStatus() === 'todo').length;
    }
}

const todoList = new TodoList();

todoList.addNote('Приклад 1', 'Це перший приклад нотатки.');
todoList.addNote('Приклад 2', 'Це другий приклад нотатки.');

console.log('Усі нотатки:');
console.log(todoList.getAllNotes());

console.log('Кількість невиконаних нотаток:', todoList.getPendingNoteCount());

todoList.markNoteAsDone(1);
console.log('Кількість невиконаних нотаток після позначення однієї як виконаної:', todoList.getPendingNoteCount());

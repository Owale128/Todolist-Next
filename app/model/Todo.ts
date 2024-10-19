export class Todo {
    _id: string;
    done: boolean;
    constructor(public text: string) {
         this._id = Date.now().toString()
         this.done = false
    }
}
import { emptie } from "../main";
import { postData, getData } from "./helpers";
import { reload_todo } from "./ui";

let form = document.forms.task

form.onsubmit = (e) => {
    e.preventDefault();

    let task = {}

    let fm = new FormData(form)

    fm.forEach((val, key) => {
        task[key] = val
    })

    postData('/tasks', task)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                getData('/tasks')
                    .then(res => reload_todo(res.data, emptie))
            }
        })
}
import { backdrop, empties, modal } from "../main";
import { getData, postData } from "./http";
import { reload_tasks } from "./ui";

let form = document.querySelector('form')

form.onsubmit = (e) => {
    e.preventDefault();
    
    let task = {}

    let fm = new FormData(form)

    fm.forEach((val, key) => {
        task[key] = val
    })

    backdrop.classList.remove('show')
    modal.classList.remove('show')

    postData('/tasks', task)
        .then(res => {
            if(res.status === 200 || res.status === 201) {
                getData('/tasks')
                    .then(res => reload_tasks(res.data, empties))
            }
        })
    
    
}
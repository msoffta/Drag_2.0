import { deleteData, patchData } from "./helpers"
import { bucket } from "../main"

export function dragStart() {
    this.id = "marked"
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
}

export function dragEnd() {
    this.removeAttribute('id')
    this.className = 'fill'
}

export function dragOver(event) {
    event.preventDefault()
}

export function dragEnter(event) {
    event.preventDefault()
    this.className += ' hovered'
}


export function dragLeave() {
    this.className = 'empty'
}
export function dragLeve() {
    this.className = 'img_bucket'
}
export function dragDrop() {
    let marked_div = document.getElementById('marked')
    let id = marked_div.dataset.id
    this.className = 'empty'
    this.append(marked_div)

    patchData('/tasks/' + id, {
        status: this.dataset.status
    })
        .then(res => console.log(res))
}

bucket.ondragover = (e) => {
    e.preventDefault();
};


bucket.ondrop = () => {
    let div = document.querySelector('#marked')
    let task_id = div.dataset.id
    console.log(task_id);
    deleteData('/tasks/' + task_id)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                alert(  'delete success' + `  ID: ${task_id}`)
            }
        })
    div.remove()
};


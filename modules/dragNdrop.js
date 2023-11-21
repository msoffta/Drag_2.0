import { patchData } from "./http"

export function dragStart() {
    this.id = "marked"
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
    document.querySelector(".delete__wrapper").classList.add("show");
}

export function dragEnd() {
    this.removeAttribute('id')
    this.className = 'fill'


    let delete_div = document.querySelector(".delete__wrapper .button");
    if (!delete_div.classList.contains("delete")) {
        delete_div.parentElement.classList.remove("show");
    }
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

export function dragDrop(params) {
    let marked_div = document.getElementById('marked')
    this.className = 'empty'
    this.append(marked_div)

    patchData('/tasks/' + marked_div.getAttribute('data-id'), {
        status: this.getAttribute('data-status')
    })
}

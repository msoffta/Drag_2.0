import { dragEnd, dragStart } from "./dragNdrop"
export function reload_todo(arr, places) {
    places.forEach(el => el.innerHTML = "")

    for (let item of arr) {
        let div = document.createElement('div')
        let b = document.createElement('b')
        let p = document.createElement('p')


        div.classList.add('fill')
        div.setAttribute('draggable', true)
        div.setAttribute('data-id', item.id)


        b.innerHTML = item.title
        p.innerHTML = item.description

        div.append(b, p)
        places[item.status].append(div)



        div.ondragstart = dragStart
        div.ondragend = dragEnd

    }
}
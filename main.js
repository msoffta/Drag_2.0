import { dragDrop, dragEnter, dragLeave, dragOver } from "./modules/dragNdrop";
import { deleteData, getData } from "./modules/http";
import { reload_tasks } from "./modules/ui";
export const empties = document.querySelectorAll(".empty");

getData("/tasks").then((res) => reload_tasks(res.data, empties));

for (let empty of empties) {
    empty.ondragover = dragOver;
    empty.ondragenter = dragEnter;
    empty.ondragleave = dragLeave;
    empty.ondrop = dragDrop;
}

document.querySelectorAll(".button").forEach((button) => {
    button.ondragover = (e) => e.preventDefault();

    button.ondrop = (e) => {
        console.log(e);
        if (!button.classList.contains("delete")) {

            let marked_div = document.getElementById("marked");
            let id = marked_div.getAttribute("data-id");
            deleteData("/tasks/" + id);
            marked_div.remove();

            button.classList.add("delete");
            setTimeout(() => button.classList.remove("delete"), 3200);
            setTimeout(() => button.parentElement.classList.remove("show"), 3201);
        }
    };
});

export let backdrop = document.querySelector(".backdrop");
export let modal = document.querySelector(".modal");
export let add = document.querySelector(".add");

add.onclick = () => {
    backdrop.classList.add("show");
    modal.classList.add("show");
};

backdrop.onclick = () => {
    backdrop.classList.remove("show");
    modal.classList.remove("show");
};

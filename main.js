import { getData } from "./module/helpers";
import { dragDrop, dragEnter, dragLeave, dragOver } from "./module/dragNdrop";
import { reload_todo } from "./module/ui";

let close_aside = document.querySelector(".img");
let aside = document.querySelector(".sec1");
export let bucket = document.querySelector(".bucket");
export const emptie = document.querySelectorAll(".empty");

let search = document.querySelector("#search");
let backdrop = document.querySelector(".backdrop");
let wrapper = backdrop.querySelectorAll(".container");
// search.onfocus = () => {
//     backdrop.classList.add('show');
// }

// console.log([search]);

search.oninput = (e) => {
    let val = e.target.value;
    let allTasks = document.querySelectorAll(".fill");

    console.log(val);
    allTasks.forEach((task) => {
        let title = task.querySelector("b").innerText;
        if (val.length === 0) {
            task.removeAttribute("style");
            return; 
        }

        if (title.includes(val)) {
            task.style.background = "red";
            let { x, y } = task.getBoundingClientRect();
            window.scroll({
                top: y,
                left: x,
                behavior: "smooth",
            });
        } else {
            task.removeAttribute("style");
        }
    });
};

// search.onblur = () => {
//     backdrop.classList.remove('show');
// }

close_aside.onclick = () => {
    close_aside.setAttribute = "/img/Frame.png";
    aside.classList.toggle("click2");
    aside.style.transition = "1s cubic-bezier(0.445, 0.05, 0.55, 0.95)";
    setTimeout(() => {
        close_aside.classList.toggle("click");
    }, 600);
};
let btn = document.querySelector(".btn");
let exet2 = document.querySelector(".modal_img");
let modal = document.querySelector(".modal");
btn.onclick = () => {
    modal.classList.add("show_modal", "fade");
};
exet2.onclick = () => {
    modal.classList.remove("show_modal", "fade");
};

getData("/tasks").then((res) => reload_todo(res.data, emptie));

for (let empty of emptie) {
    empty.ondragover = dragOver;
    empty.ondragenter = dragEnter;
    empty.ondragleave = dragLeave;
    empty.ondrop = dragDrop;
}

const main = document.querySelector("main");
const arr = [];//arr[y][x]

class GraphNode{
    element: HTMLDivElement;
    x: number;
    y: number;
    conexions: Array<any>;

    constructor(element : HTMLDivElement, x: number, y: number){
        this.element = element;
        this.x = x;
        this.y = y;
        this.conexions = [[],[]];//weight, node
    }
}

//adjust width to fit perfectly
main.style.width = (main.offsetWidth-main.offsetWidth%16).toString() + "px";

for (let i = 0; i < main.offsetHeight/16; i++) {
    const divRow = document.createElement("div");    
    divRow.style.display = "flex";
    const row = [];
    for (let j = 0; j < main.offsetWidth/16; j++) {
        const div = document.createElement("div");    
        div.classList.add("square");
        div.classList;
        div.onclick = () =>{
            div.classList.toggle("selected");
        }

        divRow.appendChild(div);
        row.push(new GraphNode(div,j,i));
    }
    arr.push(row);
    main.appendChild(divRow);
}

//TODO set conexions for arr
console.log(arr[0][0].conexions[0].push(12))
console.log(arr[0][0])




const main = document.querySelector("main");
const start = document.getElementById("start");
const arr = [];//arr[y][x]
const STATES = ["empty", "selected", "wall"]
class GraphNode{
    element: HTMLDivElement;
    x: number;
    y: number;
    state: string;
    connections = [];
    Gcost = 0;
    Hcost = 0;
    
    
    constructor(element : HTMLDivElement, x: number, y: number){
        this.element = element;
        this.x = x;
        this.y = y;
        this.state = STATES[0];
    }
}

class Connection{
    element1:HTMLDivElement;
    element2:HTMLDivElement;
    constructor(element1 : HTMLDivElement, element2: HTMLDivElement){
        this.element1 = element1;
        this.element2 = element2;
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
        const node = new GraphNode(div,j,i);
        div.onclick = () =>{
            div.classList.toggle(STATES[1]);
            if(node.state == STATES[0]){
                node.state = STATES[1];
            } else if(node.state == STATES[1]){
                node.state = STATES[0];
            }
        }

        divRow.appendChild(div);
        row.push(node);
    }
    arr.push(row);
    main.appendChild(divRow);
}
//set connections
for (let i = 0; i < main.offsetHeight/16; i++) {
    //TODO check if node is wall before creating connection
    for (let j = 0; j < main.offsetWidth/16; j++) {
        if(j < main.offsetWidth/16 - 1){//right connection
            const connection = new Connection(arr[i][j], arr[i][j + 1]);

            arr[i][j].connections.push(connection);
            arr[i][j + 1].connections.push(connection);
            if(i < main.offsetHeight/16 - 1){//right diagonal
                const diagonal = new Connection(arr[i][j], arr[i + 1][j + 1]);

                arr[i][j].connections.push(diagonal);
                arr[i + 1][j + 1].connections.push(diagonal);
            }
        }
        if(i < main.offsetHeight/16 - 1){//down connection
            const connection = new Connection(arr[i][j], arr[i + 1][j]);

            arr[i][j].connections.push(connection);
            arr[i + 1][j].connections.push(connection);
            if(j > 0){//left diagonal
                const diagonal = new Connection(arr[i][j], arr[i + 1][j - 1]);

                arr[i][j].connections.push(diagonal);
                arr[i + 1][j - 1].connections.push(diagonal);
            }
        }
    }
}

start.onclick = () =>{
    let selected = [];
    for (let i = 0; i < main.offsetHeight/16; i++) {
        for (let j = 0; j < main.offsetWidth/16; j++) {
            if(arr[i][j].state == STATES[1]){
                selected.push(arr[i][j])
            }
        }
    }
    console.log(selected);

    let current = selected[0]
    let exploredNodes = [];
    let fount = false;
    while(!fount){
        for (const connection of current.connections) {
            const node = connection.element1 == current ? connection.element2 : connection.element1 
            const startXDistance = Math.abs(node.x - selected[0].x);
            const startYDistance = Math.abs(node.y - selected[0].y);
            const diference = startXDistance - startYDistance;
            if(diference > 0){
                node.Gcost = 10 * diference + 14 * startYDistance;
            }else{
                node.Gcost = (10 * diference * -1) + 14 * startXDistance;
            }
    
            const endXDistance = Math.abs(node.x - selected[1].x);
            const endYDistance = Math.abs(node.y - selected[1].y);
            const endDiference = endXDistance - endYDistance;
            if(endDiference > 0){
                node.Hcost = 10 * endDiference + 14 * endYDistance;
            }else{
                node.Hcost = (10 * endDiference * -1) + 14 * endXDistance;
            }
            node.element.style.backgroundColor = "cyan";
            exploredNodes.push(node);
            console.log(node);
            
        }

        fount = true;
    }
    
    
}




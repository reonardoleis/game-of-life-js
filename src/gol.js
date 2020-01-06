//Author: Leonardo Reis da Silva
//github.com/reonardoleis

var canvas = document.getElementById('canvas');
canvas.width = 850
canvas.height = 850
const first_grid_prob = 50;
const ctx = canvas.getContext('2d');
var cell_size_x = 5;
var cell_size_y = (cell_size_x * window.innerWidth) / window.innerHeight;
const array_size = canvas.width / cell_size_x;
var current_grid = [];


function loop() {
    cell_size_y = (cell_size_x * window.innerWidth) / window.innerHeight;
    drawArray(current_grid);
    current_grid = generateNext(current_grid);
    requestAnimationFrame(loop);
}



function firstGrid() {
    for (let i = 0; i < array_size; i++) {
        current_grid.push([]);
        for (let j = 0; j < array_size; j++) {
            if ((Math.random() * 100) <= first_grid_prob) {
                current_grid[i].push(1);
            } else {
                current_grid[i].push(0);
            }
        }
    }
}

function emptyGrid() {
    let grid = [];
    for (let i = 0; i < array_size; i++) {
        grid.push([]);
        for (let j = 0; j < array_size; j++) {
            grid[i].push(0);
        }
    }
    return grid;
}

function drawArray(array) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    for (let i = 0; i < array_size; i++) {


        for (let j = 0; j < array_size; j++) {

            if (array[i][j]) {
                ctx.fillRect(cell_size_x * i, cell_size_y * j, cell_size_x, cell_size_y);
            }

        }

    }
}

function generateNext(input) {
    let output = emptyGrid();
    let curr_alive = 0;
    let current = {};
    for (let i = 0; i < array_size; i++) {
        for (let j = 0; j < array_size; j++) {
            curr_alive = 0;
            current = {
                x: i,
                y: j,
                state: input[i][j]
            }
            //alive count
            for (let offset1 = -1; offset1 <= 1; offset1++) {

                for (let offset2 = -1; offset2 <= 1; offset2++) {
                    if (offset1 == 0 && offset2 == 0) {
                        continue;
                    }
                    temp1 = current.x + offset1;
                    temp2 = current.y + offset2;
                    try {
                        if (input[current.x + offset1][current.y + offset2]) {
                            curr_alive++;
                        }
                    } catch (e) {
                        if (current.x + offset1 > array_size - 1) {
                            temp1 = 0;
                        } else if (current.x + offset1 < 0) {
                            temp1 = input.length - 1;
                        }
                        if (current.y + offset2 > array_size - 1) {
                            temp2 = 0;
                        } else if (current.y + offset2 < 0) {
                            temp2 = input.length - 1;
                        }
                        if (input[temp1][temp2]) {
                            curr_alive++;
                        }
                    }
                }

            }


            //rules
            if (current.state && (curr_alive == 2 || curr_alive == 3)) {
                output[i][j] = 1;
            } else if (!current.state && curr_alive == 3) {
                output[i][j] = 1;
            } else {
                output[i][j] = 0;
            }
        }

    }



    return output;
}

firstGrid();
loop();
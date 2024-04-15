export function loadBoard() {
  const user_board = document.querySelector("#user_board");
  const cpu_board = document.querySelector("#cpu_board");

  for (let i = 0; i < 100; i++) {
    const square = document.createElement("button");
    square.classList.add("square");
    user_board.appendChild(square);
    cpu_board.appendChild(square);
  }

  for (let i = 0; i < 100; i++) {
    const square = document.createElement("button");
    square.classList.add("square");
    user_board.appendChild(square);
  }
}

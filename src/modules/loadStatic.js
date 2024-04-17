export function loadBoard() {
  const user_board = document.querySelector("#user_board");
  const user_board_overlay = document.querySelector("#user_board_overlay");
  const cpu_board = document.querySelector("#cpu_board");

  for (let i = 0; i < 100; i++) {
    const square = document.createElement("button");
    square.classList.add("square");
    square.id = `e_square_${i}`;
    cpu_board.appendChild(square);
  }

  for (let i = 0; i < 100; i++) {
    const square = document.createElement("button");
    square.classList.add(`square`);
    square.id = `u_square_${i}`;
    user_board.appendChild(square);
  }
}

export function switch_intro(callback) {
  const intro = document.querySelector("#intro");
  const main = document.querySelector("#main");
  const start_btn = document.querySelector("#start_btn");
  const input = document.querySelector("#name_input");

  start_btn.addEventListener("click", () => {
    const name = input.value.trim();

    // Check if the length of the name is within the desired range
    if (name.length < 3 || name.length > 12) {
      alert("Please enter a name between 3 and 12 characters.");
      return; // Stop the function execution if the name length is not valid
    }
    intro.classList.add("animation");
    setTimeout(() => {
      intro.classList.add("hidden");
      main.classList.remove("hidden");
    }, 500);

    if (typeof callback === "function") {
      callback(input.value); // Pass input value to the callback function
    }
  });

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      start_btn.click();
    }
  }

  document.addEventListener("keydown", handleKeyDown);
}

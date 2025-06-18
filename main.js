document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLCanvasElement} */
  let canvas = document.getElementById("canvas");
  /** @type {CanvasRenderingContext2D} */
  let context = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let p = particle.create(100, 0, 1, 0, 0.01);

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    p.update();
    context.beginPath();
    context.arc(p.position.getX(), p.position.getY(), 10, 0, Math.PI * 2, false);
    context.fill();

    requestAnimationFrame(update);
  }
});

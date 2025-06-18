document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  /** @type {CanvasRenderingContext2D} */
  const context = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const p = particle.create(100, 0, 1, 0, 0.01);

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

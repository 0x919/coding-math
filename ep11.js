document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  /** @type {CanvasRenderingContext2D} */
  const context = canvas.getContext("2d");
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const sun = particle.create(width / 2, height / 2, 0, 0);
  const sun2 = particle.create(width / 2 + 400, height / 2, 0, 0);
  const planet = particle.create(width / 2 + 200, height / 2, 1, -Math.PI / 2);

  sun.mass = 20000.0001;
  sun2.mass = 20000;

  update();

  function update() {
    context.clearRect(0, 0, width, height);

    planet.gravitateTo(sun);
    planet.gravitateTo(sun2);
    planet.update();

    context.beginPath();
    context.fillStyle = "#ffff00";
    context.arc(sun.position.getX(), sun.position.getY(), 20, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = "#ffff00";
    context.arc(sun2.position.getX(), sun2.position.getY(), 20, 0, Math.PI * 2, false);
    context.fill();

    context.beginPath();
    context.fillStyle = "#0000ff";
    context.arc(planet.position.getX(), planet.position.getY(), 4, 0, Math.PI * 2, false);
    context.fill();

    if (planet.position.getX() > width) {
      planet.position.setX(0);
    }
    if (planet.position.getX() < 0) {
      planet.position.setX(width);
    }
    if (planet.position.getY() > height) {
      planet.position.setY(0);
    }
    if (planet.position.getY() < 0) {
      planet.position.setY(height);
    }

    requestAnimationFrame(update);
  }
});

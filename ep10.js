document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLCanvasElement} */
  let canvas = document.getElementById("canvas");
  /** @type {CanvasRenderingContext2D} */
  let context = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let ship = particle.create(100, 100, 0, 0, 0);
  let thrust = vector.create(0, 0);
  let angle = 0,
    turningLeft = false,
    turningRight = false,
    thrusting = false;

  update();

  document.body.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "w":
        thrusting = true;
        break;
      case "a":
        turningLeft = true;
        break;
      case "d":
        turningRight = true;
        break;
      default:
        break;
    }
  });

  document.body.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "w":
        thrusting = false;
        break;
      case "a":
        turningLeft = false;
        break;
      case "d":
        turningRight = false;
        break;
      default:
        break;
    }
  });

  function update() {
    context.clearRect(0, 0, width, height);

    if (ship.velocity.getLength() > 0) {
      ship.velocity.setLength(ship.velocity.getLength() - 0.01);
    }

    if (turningLeft) {
      angle -= 0.05;
    }
    if (turningRight) {
      angle += 0.05;
    }
    thrust.setAngle(angle);
    if (thrusting) {
      thrust.setLength(0.1);
    } else {
      thrust.setLength(0);
    }

    ship.accelerate(thrust);
    ship.update();

    context.save();
    context.translate(ship.position.getX(), ship.position.getY());
    context.rotate(angle);

    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    if (thrusting) {
      context.moveTo(-10, 0);
      context.lineTo(-20, 0);
    }
    context.stroke();

    context.restore();

    if (ship.position.getX() > width) {
      ship.position.setX(0);
    }
    if (ship.position.getX() < 0) {
      ship.position.setX(width);
    }
    if (ship.position.getY() > height) {
      ship.position.setY(0);
    }
    if (ship.position.getY() < 0) {
      ship.position.setY(height);
    }

    requestAnimationFrame(update);
  }
});

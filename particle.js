var particle = {
  position: null,
  velocity: null,
  gravity: null,
  mass: 1,
  radius: 0,

  create: function (x, y, speed, direction, grav) {
    var obj = Object.create(this);
    obj.position = vector.create(x, y);
    obj.velocity = vector.create(0, 0);
    obj.velocity.setLength(speed);
    obj.velocity.setAngle(direction);
    obj.gravity = vector.create(0, grav || 0);
    return obj;
  },

  accelerate: function (accel) {
    this.velocity.addTo(accel);
  },

  update: function () {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  },

  angleTo: function (p2) {
    return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
  },

  distanceTo: function (p2) {
    const dx = p2.position.getX() - this.position.getX();
    const dy = p2.position.getY() - this.position.getY();

    return Math.sqrt(dx ** 2 + dy ** 2);
  },

  gravitateTo: function (p2) {
    const grav = vector.create(0, 0);
    const dist = this.distanceTo(p2);

    grav.setLength(p2.mass / dist ** 2);
    grav.setAngle(this.angleTo(p2));

    this.velocity.addTo(grav);
  },
};

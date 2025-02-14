class Pollito {
  constructor() {
    // aqui todas las propiedades del pollito

    // 1. crear el nodo y añadirlo a la caja de juego
    this.node = document.createElement("img") // creamos el nodo del pollito <img />
    this.node.src = "./images/flappy.png" // añadimos el src de la imagen
    gameBoxNode.append(this.node) // añadimos el nodo a la caja de juego

    // 2. configurar posicion y dimensiones iniciales
    this.x = 60; // posición en el eje horizontal
    this.y = 50; // posición en el eje vertical
    this.w = 40;
    this.h = 35;

    this.node.style.position = "absolute"; // para poder ubicarlo dentro de la caja de juego
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    // 3. añadir propiedades adicionales
    this.gravitySpeed = 2;
    this.jumpSpeed = 40;
  }

  // aqui todos los metodos del pollito
  gravityEffect() {
    if ((this.y + this.h) <= gameBoxNode.offsetHeight) {
      // prevenimos que el pollito baje más de el alto de la caja de juego
      this.y += this.gravitySpeed
      this.node.style.top = `${this.y}px`;
    }
  }

  jump() {
    if (this.y >= 0) {
      this.y -= this.jumpSpeed
      this.node.style.top = `${this.y}px`;
    }
  }

}
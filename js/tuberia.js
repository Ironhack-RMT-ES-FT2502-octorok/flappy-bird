class Tuberia {

  constructor(type, positionY) {

    // 1. crear el nodo y añadirlo a la caja de juego
    this.node = document.createElement("img");
    if (type === "arriba") {
      this.node.src = "./images/obstacle_top.png";
    } else if (type === "abajo") {
      this.node.src = "./images/obstacle_bottom.png";
    }
    gameBoxNode.append(this.node)

    // 2. configurar posicion y dimensiones iniciales
    this.x = gameBoxNode.offsetWidth; // posición en el eje horizontal
    this.y = positionY; // posición en el eje vertical
    this.w = 60;
    this.h = 250;

    this.node.style.position = "absolute"; // para poder ubicarlo dentro de la caja de juego
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    // 3. añadir propiedades adicionales
    this.movementSpeed = 2
    this.type = type // esto ayuda a que el enterno de juego sepa que tipo de objetos estoy creando.

  }

  automaticMovement() {
    this.x -= this.movementSpeed;
    this.node.style.left = `${this.x}px`
  }

}

// testing push
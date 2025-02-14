//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO

let pollitoObj = null; // variable global para poder acceder desde cualquier lugar. El pollito no existe aun porque el juego no ha iniciado

// let tuberiaObj = null;
let tuberiasArr = []; // el juego empieza sin tuberias, y más adelante las tuberias empezaran a aparecer.

let gameIntervalId = null;
let tuberiaSpawnIntervalId = null;


//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {

  // 1. ocultar pantalla inicial
  splashScreenNode.style.display = "none";

  // 2. mostrar pantalla de juego
  gameScreenNode.style.display = "flex";

  // 3. Añadir los elementos iniciales del juego
  pollitoObj = new Pollito()
  console.log(pollitoObj)
  // tuberiaObj = new Tuberia()

  // 4. iniciar intervalo principal del juego
  gameIntervalId = setInterval(() => {
    gameLoop()
  }, Math.round(1000/60)) // 60 fps

  // 5. Iniciaremos otros intervalo adicionales
  tuberiaSpawnIntervalId = setInterval(() => {
    tuberiaSpawn()
  }, 2000) // cada 2 seg, aparecerá una nueva tuberia

}

function gameLoop() {
  // funcion que se ejecuta 60 veces por segundo.
  //. todo lo que sea movimientos automaticos, checkeos de colisiones u otras acciones automatizadas deberia ir aqui.

  // gravityEffect
  pollitoObj.gravityEffect()
  // tuberiaObj.automaticMovement()

  tuberiasArr.forEach((eachTuberiaObj) => {
    eachTuberiaObj.automaticMovement()
  })

  tuberiaDespawn()
  checkColisionPollitoTuberias()

}

function tuberiaSpawn() {

  let randomPositionY = Math.floor( Math.random() * -200 ) // 0 y -200

  let tuberiaArribaObj = new Tuberia("arriba", randomPositionY)
  tuberiasArr.push(tuberiaArribaObj)

  let tuberiaAbajoObj = new Tuberia("abajo", randomPositionY + 350) 
  tuberiasArr.push(tuberiaAbajoObj)

  console.log(tuberiasArr.length)

  // ...

}

function tuberiaDespawn() {
  if (tuberiasArr.length > 0 && tuberiasArr[0].x < (0 - tuberiasArr[0].w)) {
    // 1. si el array tiene tuberias
    // 2. si la x de la primera tuberia ha salido de la caja de juego

    // Para remover objetos del juego SIEMPRE tenemos que considerar dos cosas:
    // 1. remover el Nodo
    tuberiasArr[0].node.remove()

    // 2. removerlo de JS (del array)
    tuberiasArr.shift()

  }
}

function checkColisionPollitoTuberias () {

  // pollitoObj
  tuberiasArr.forEach((eachTuberiaObj) => {

    if (
      eachTuberiaObj.x < pollitoObj.x + pollitoObj.w &&
      eachTuberiaObj.x + eachTuberiaObj.w > pollitoObj.x &&
      eachTuberiaObj.y < pollitoObj.y + pollitoObj.h &&
      eachTuberiaObj.y + eachTuberiaObj.h > pollitoObj.y
    ) {
      // Collision detected!
      gameOver()
    } 

  })

}

function gameOver() {
  console.log("game over")

  // 1. detener TODOS los intervalos de juego
  clearInterval(gameIntervalId)
  clearInterval(tuberiaSpawnIntervalId)

  // 2. ocultar la pantalla de juego
  gameScreenNode.style.display = "none";

  // 3. mostrar la pantalla final
  gameOverScreenNode.style.display = "flex";

}



//* EVENT LISTENERS
startBtnNode.addEventListener("click", () => {
  startGame()
})

gameBoxNode.addEventListener("click", (event) => {
  pollitoObj.jump()
})



/* Planificación

- Crear la clase del pollito (x, y, h, w, speedGravity, speedJump) ✅
- Agregar al pollito ✅
  - Movimiento automatico gravedad del pollito ✅
  - Movimiento de salto del pollito (addEventListener) ✅
- Agregar el fondo ✅
- Crear la clase de tuberias (x, y, h, w, speed) ✅
  - Movimiento automatico de las tuberias ✅
  - Las tuberias salen en alturas diferentes  ✅
  - Las tuberias salen en imagenes diferentes. ✅
- Agregar las tuberias (spawn) ✅
- Remover las tuberias cuando salen (despawn) ✅
- colisión del flappy contra las tuberias ✅
- colisión del flappy contra el piso o el techo (*) ✅
- Game over ✅


Bonus:
- Musica de fondo
- Sonidos
- Animación de aleta
- Score

*/


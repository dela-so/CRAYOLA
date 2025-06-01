let correctAnswer = 0;
let level = 1;
let mistakes = 0;

// 🎨 Dibujos diferentes por nivel
const levelObjects = {
  1: '⭐', // Nivel 1: estrellas
  2: '🍎', // Nivel 2: manzanas
  3: '🎈', // Nivel 3: globos
  4: '🐠', // Nivel 4: peces
  5: '🍩'  // Nivel 5: donas (nivel extra)
};

function newChallenge() {
  const objectContainer = document.getElementById('object-container');
  const optionsContainer = document.getElementById('options');
  const feedback = document.getElementById('feedback');

  objectContainer.innerHTML = '';
  optionsContainer.innerHTML = '';
  feedback.textContent = '';

  document.getElementById('level').textContent = `Nivel: ${level}`;

  // Control de niveles máximos
  let maxObjects = 5 + (level * 5); // cada nivel tiene más objetos

  correctAnswer = Math.floor(Math.random() * maxObjects) + 1;

  // Elegir el objeto del nivel actual
  const currentObject = levelObjects[level] || '✨'; // si no hay definido, usa ✨

  // Mostrar objetos
  for (let i = 0; i < correctAnswer; i++) {
    objectContainer.innerHTML += `${currentObject} `;
  }

  // Crear opciones
  let options = [
    correctAnswer,
    correctAnswer + 1,
    correctAnswer - 1
  ];

  // Evitar que haya opciones negativas
  options = options.filter(option => option > 0);

  // Mezclar opciones
  options = options.sort(() => Math.random() - 0.5);

  // Mostrar botones
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedNumber) {
  const feedback = document.getElementById('feedback');
  if (selectedNumber === correctAnswer) {
    feedback.textContent = '🎉 ¡Correcto! Subes de nivel.';
    feedback.style.color = 'green';
    mistakes = 0; // Reiniciar errores

    setTimeout(() => {
      level++;
      newChallenge();
    }, 1500);

  } else {
    mistakes++;
    feedback.textContent = `❌ Error ${mistakes}/3 ¡Intenta de nuevo!`;
    feedback.style.color = 'red';

    if (mistakes >= 3) {
      setTimeout(() => {
        feedback.textContent = '😢 ¡Demasiados errores! Reiniciando el juego...';
        feedback.style.color = 'orange';
        setTimeout(() => {
          level = 1;
          mistakes = 0;
          newChallenge();
        }, 2000);
      }, 1000);
    }
  }
}

window.onload = newChallenge;

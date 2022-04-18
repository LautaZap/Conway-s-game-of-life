// Array de objetos que guardan algunos patrones de conway, indicando nombre..
// tamaño minimo para que el patron funcione correctamente, y las coordenadas de las celdas vecinas para dibujar el patron

export const patterns = [
  {
    id: "1",
    name: "Dot",
    minRows: 1,
    minCols: 1,
    pattern: [[0, 0]],
  },

  {
    id: "2",
    name: "Blinker",
    minRows: 3,
    minCols: 3,
    pattern: [
      [-1, 0],
      [0, 0],
      [1, 0],
    ],
  },

  {
    id: "3",
    name: "Toad",
    minRows: 4,
    minCols: 4,
    pattern: [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, 1],
      [0, 1],
      [-1, 2],
    ],
  },

  {
    id: "4",
    name: "Beacon",
    minRows: 4,
    minCols: 4,
    pattern: [
      [0, 0],
      [-1, 0],
      [0, -1],
      [-1, -1],
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ],
  },

  {
    id: "5",
    name: "Pulsar",
    minRows: 15,
    minCols: 15,
    pattern: [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [3, 1],
      [4, 1],
      [2, 6],
      [3, 6],
      [4, 6],
      [6, 2],
      [6, 3],
      [6, 4],
      [2, -1],
      [3, -1],
      [4, -1],
      [2, -6],
      [3, -6],
      [4, -6],
      [1, -2],
      [1, -3],
      [1, -4],
      [6, -2],
      [6, -3],
      [6, -4],
      [-1, 2],
      [-1, 3],
      [-1, 4],
      [-1, -2],
      [-1, -3],
      [-1, -4],
      [-2, 1],
      [-3, 1],
      [-4, 1],
      [-2, -1],
      [-3, -1],
      [-4, -1],
      [-2, -6],
      [-3, -6],
      [-4, -6],
      [-2, 6],
      [-3, 6],
      [-4, 6],
      [-6, 2],
      [-6, 3],
      [-6, 4],
      [-6, -2],
      [-6, -3],
      [-6, -4],
    ],
  },

  {
    id: "6",
    name: "Pentadecathlon",
    minRows: 16,
    minCols: 9,
    pattern: [
      [0, 0],
      [2, 0],
      [1, 0],
      [-3, 0],
      [-4, 0],
      [-1, 0],
      [-2, -1],
      [-2, 1],
      [3, -1],
      [3, 1],
      [4, 0],
      [5, 0],
    ],
  },

  {
    id: "7",
    name: "Glider",
    minRows: 5,
    minCols: 5,
    pattern: [
      [1, 0],
      [1, 1],
      [0, 1],
      [0, -1],
      [-1, 1],
    ],
  },

  {
    id: "8",
    name: "Lightweight spaceship",
    minRows: 5,
    minCols: 7,
    pattern: [
      [2, -1],
      [2, 0],
      [2, 1],
      [2, 2],
      [1, 2],
      [1, -2],
      [0, 2],
      [-1, 1],
      [-1, -2],
    ],
  },

  {
    id: "9",
    name: "Middleweight spaceship",
    minRows: 7,
    minCols: 9,
    pattern: [
      [2, -1],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [1, -2],
      [1, 3],
      [0, 3],
      [-1, -2],
      [-1, 2],
      [-2, 0],
    ],
  },

  {
    id: "10",
    name: "Heavyweight spaceship",
    minRows: 7,
    minCols: 10,
    pattern: [
      [2, -1],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4],
      [1, -2],
      [1, 4],
      [0, 4],
      [-1, -2],
      [-1, 3],
      [-2, 0],
      [-2, 1],
    ],
  },

  {
    id: "11",
    name: "Block",
    minRows: 2,
    minCols: 2,
    pattern: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  },

  {
    id: "12",
    name: "Beehive",
    minRows: 3,
    minCols: 4,
    pattern: [
      [-1, 0],
      [0, -1],
      [1, 0],
      [1, 1],
      [-1, 1],
      [0, 2],
    ],
  },

  {
    id: "13",
    name: "Loaf",
    minRows: 4,
    minCols: 4,
    pattern: [
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 2],
      [1, 0],
      [1, 2],
      [2, 1],
    ],
  },

  {
    id: "14",
    name: "Boat",
    minRows: 3,
    minCols: 3,
    pattern: [
      [-1, 0],
      [-1, -1],
      [0, -1],
      [0, 1],
      [1, 0],
    ],
  },

  {
    id: "15",
    name: "Tub",
    minRows: 3,
    minCols: 3,
    pattern: [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ],
  },
];
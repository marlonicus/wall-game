const pallette = [
  0x540d6e, // Dark purple
  0xee4266, // Pink
  0xffd23f, // Yellow
  0x3bceac, // Teal
  0x0ead69 // Green

  // Reference: https://coolors.co/540d6e-ee4266-ffd23f-3bceac-0ead69
];

const colors = {
  bg: pallette[4],

  cursor: pallette[1],
  cursorBlock: pallette[3],

  boundaryTile: 0x000000,
  freeTile: pallette[4],
  wall: pallette[0],
  castle: 0xF7B32B,
  base: pallette[1],
};

export default {
  tileSize: 20,

  colors,

  buildableBlocks: [
    [[0, 0, 0],
     [0, 1, 0],
     [1, 1, 1]],

    [[0, 1, 0],
     [0, 1, 0],
     [0, 1, 1]],

    [[0, 0, 0],
     [1, 0, 1],
     [1, 1, 1]],

    [[1, 1, 0],
     [0, 1, 1],
     [0, 0, 0]],
  ],

  tiles: [
    {
      // 0
      name: 'transparent',
      isBuildable: true,
      isHidden: true,
    },
    {
      // 1
      name: "free-tile",
      isBuildable: true,
      color: colors["freeTile"]
    },
    {
      // 2
      name: "boundary",
      isCursorBlocker: true,
      color: colors["boundaryTile"]
    },
    {
      // 3
      name: "wall",
      color: colors["wall"]
    },
    {
      // 4
      name: "castle",
      color: colors["castle"]
    },
    {
      // 5
      name: "base",
      color: colors["base"]
    },
    {
      // 6
      name: "no-base",
      isHidden: true,
    },
  ]
}

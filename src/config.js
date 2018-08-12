const pallette = [
  0x540d6e, // Dark purple
  0xee4266, // Pink
  0xffd23f, // Yellow
  0x3bceac, // Teal
  0x0ead69 // Green

  // Reference: https://coolors.co/540d6e-ee4266-ffd23f-3bceac-0ead69
];

export default {
  tileSize: 20,
  colors: {
    bg: pallette[4],
    boundaryTile: 0x000000,
    freeTile: pallette[4],
    wall: pallette[0],
    cursor: pallette[1],
    castle: 0xF7B32B,
    base: pallette[1],
  }
}

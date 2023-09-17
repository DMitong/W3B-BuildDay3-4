// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract ColourBoard {

  struct Cell { 
    uint8 colour;
    bool isOccupied;
  }
  uint8 constant NUM_ROW = 5;
  uint8 constant NUM_COLUMN = 7; 


  mapping(uint8 => mapping(uint8 => Cell)) public cells;  

  function initializeColours() public {
    for (uint8 row = 0; row < NUM_ROW; row++) {
      for (uint8 column = 0; column < NUM_COLUMN; column++) {
        cells[row][column].colour = getColourForCell(row, column);  
        cells[row][column].isOccupied = true;
      }
    }
  }

  function getColour(uint8 row, uint8 column) public view returns (uint8) {
    require(row < NUM_ROW && column < NUM_COLUMN, "Invalid cell coordinates");
    require(cells[row][column].isOccupied, "Cell is not occupied");
    return cells[row][column].colour;
  }

  function getColourForCell(uint8 row, uint8 column) internal pure returns (uint8) {
    uint256 random = uint256(keccak256(abi.encodePacked(row, column))); 
    uint256 random256 = uint256(random);  

    return uint8(random256 % 4);
  }

}
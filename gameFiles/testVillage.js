const { Village, Building } = require("../index");
const { buildings, paths } = require("../data/test");
const testVillage = new Village();
buildings.forEach((building) => {
  const newBuilding = new Building(building);
  testVillage.addBuilding(newBuilding);
});
paths.forEach(([building1, building2]) => {
  testVillage.addRoad(building1, building2);
});

module.exports = { testVillage };

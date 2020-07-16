const { Village } = require("./index");
const { buildings, paths } = require("./data/test");
const testVillage = new Village();
buildings.forEach((building) => {
  testVillage.addBuilding(building);
});
paths.forEach(([building1, building2]) => {
  testVillage.addPath(building1, building2);
});

module.exports = { testVillage };

function Building(name) {
  this.name = name;
}
function Village() {
  this.buildings = [];
  this.paths = [];

  Village.prototype.addBuilding = function (building) {
    this.buildings.push(building);
  };
  Village.prototype.addPath = function (name1, name2) {
    const building1 = this.buildings.find(({ name }) => name === name1);
    const building2 = this.buildings.find(({ name }) => name === name2);
    const path = [building1, building2];

    this.paths.push(path);
  };
  Village.prototype.pathsFrom = function (locationName) {
    const location = this.buildings.find(({ name }) => name === locationName);
    const pathsIncludingLocation = this.paths.filter(
      ([building1, building2]) => {
        return location === building1 || location === building2;
      }
    );

    const buildingNamesFromLocation = pathsIncludingLocation.map(
      ([building1, building2]) => {
        if (building1.name === locationName) return building2.name;
        else return building1.name;
      }
    );
    return buildingNamesFromLocation;
  };
}

function Robot(village, location = "Post Office") {
  this.village = village;
  this.location = location;
  this.parcels = [];
}
module.exports = { Building, Village, Robot };
const { Building, Village, Robot } = require("./index");

describe("Building", () => {
  test("returns a new object with name prop", () => {
    const house = new Building("Jims House");
    expect(house.name).toBe("Jims House");
  });
});

describe("Village", () => {
  describe("props", () => {
    test("returns obj with buildings array", () => {
      const hobbiton = new Village();
      expect(hobbiton.buildings).toEqual([]);
    });
    test("returns with a paths prop that begins as an empty obj", () => {
      const hobbiton = new Village();
      expect(hobbiton.paths).toEqual([]);
    });
  });
  describe("Methods", () => {
    describe("addBuilding()", () => {
      test("is a method", () => {
        const hobbiton = new Village();
        expect(typeof hobbiton.addBuilding).toBe("function");
      });
      test("takes a Building and add it(refrence) to the Villages buildings array", () => {
        const bilboHouse = new Building("Bilbo's House");
        const hobbiton = new Village();
        hobbiton.addBuilding(bilboHouse);
        expect(hobbiton.buildings).toEqual([{ name: "Bilbo's House" }]);
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(frodoHouse);
        expect(hobbiton.buildings[1]).toBe(frodoHouse);
      });
    });
    describe("addPath()", () => {
      test("adds an array to the villagers paths array", () => {
        const hobbiton = new Village();
        const bilboHouse = new Building("Bilbo's House");
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(bilboHouse);
        hobbiton.addBuilding(frodoHouse);
        hobbiton.addPath("Bilbo's House", "Frodo's House");
        expect(Array.isArray(hobbiton.paths[0])).toBe(true);
      });
      test("the added array contains the correct buildings", () => {
        const hobbiton = new Village();
        const bilboHouse = new Building("Bilbo's House");
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(bilboHouse);
        hobbiton.addBuilding(frodoHouse);
        hobbiton.addPath("Bilbo's House", "Frodo's House");
        expect(hobbiton.paths[0]).toEqual([
          { name: "Bilbo's House" },
          { name: "Frodo's House" },
        ]);
        expect(hobbiton.paths[0][0]).toBe(bilboHouse);
        expect(hobbiton.paths[0][1]).toBe(frodoHouse);
      });
    });
    describe("pathsFrom()", () => {
      test("returns an array", () => {
        const hobbiton = new Village();
        const bilboHouse = new Building("Bilbo's House");
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(bilboHouse);
        hobbiton.addBuilding(frodoHouse);
        expect(Array.isArray(hobbiton.pathsFrom())).toBe(true);
      });
      test("returns strings of available destination names from given destination name", () => {
        const hobbiton = new Village();
        const bilboHouse = new Building("Bilbo's House");
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(bilboHouse);
        hobbiton.addBuilding(frodoHouse);
        hobbiton.addPath("Bilbo's House", "Frodo's House");
        expect(hobbiton.pathsFrom("Bilbo's House")).toEqual(["Frodo's House"]);
        const pippinHouse = new Building("Pippin's House");
        hobbiton.addBuilding(pippinHouse);
        hobbiton.addPath("Pippin's House", "Bilbo's House");
        expect(hobbiton.pathsFrom("Bilbo's House")).toEqual([
          "Frodo's House",
          "Pippin's House",
        ]);
      });
    });
  });
});
describe("Robot", () => {
  describe("Props", () => {
    test("has a village, which is passed to it", () => {
      const hobbiton = new Village();
      const mailBot = new Robot(hobbiton);
      expect(mailBot.village).toBe(hobbiton);
    });
    test("has a location, represents current locations name, Post Office by default but can be passed in", () => {
      const hobbiton = new Village();
      const mailBot = new Robot(hobbiton);
      expect(mailBot.location).toBe("Post Office");
      const mailBot2 = new Robot(hobbiton, "Bilbo's House");
      expect(mailBot2.location).toBe("Bilbo's House");
    });
    test("has a parcels, that is an array", () => {
      const mailBot = new Robot();
      expect(mailBot.parcels).toEqual([]);
    });
  });
  describe("methods", () => {
    describe("move()", () => {
      test("changes the robots current location to the new string", () => {
        const { testVillage } = require("./testVillage");
        const mailBot = new Robot(testVillage);
        expect(mailBot.location).toBe("Post Office");
        mailBot.move("Market");
        expect(mailBot.location).toBe("Market");
      });
      test("will not change the location if there is no path available from the current location", () => {
        const { testVillage } = require("./testVillage");
        const mailBot = new Robot(testVillage);
        expect(mailBot.location).toBe("Post Office");
        mailBot.move("Gretes House");
        expect(mailBot.location).toBe("Post Office");
        mailBot.move("Aadils House");
        expect(mailBot.location).toBe("Aadils House");
      });
      test("will call the console.log with a message saying the robot has moved", () => {
        const testFunc = jest.spyOn(console, "log");
        const { testVillage } = require("./testVillage");
        const mailBot = new Robot(testVillage);
        mailBot.move("Aadils House");
        expect(testFunc).toHaveBeenCalledWith(
          "MailBot moved from Post Office to Aadils House"
        );
        testFunc.mockRestore();
      });
      test("when called with an invalid destination will console.log message", () => {
        const testFunc = jest.spyOn(console, "log");
        const { testVillage } = require("./testVillage");
        const mailBot = new Robot(testVillage);
        mailBot.move("Cabin");
        expect(testFunc.mock.calls[0][0]).toBe(
          "MailBot cant move from Post Office to Cabin"
        );
        testFunc.mockRestore();
      });
    });
  });
});

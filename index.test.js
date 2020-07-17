const { Building, Village, Robot } = require("./index");

describe("Building", () => {
  test("returns a new object with name prop", () => {
    const house = new Building("Jims House");
    expect(house.name).toBe("Jims House");
  });
  test("buildings have a mailbox", () => {
    const house = new Building("Jims House");
    expect(house.mailbox).toEqual([]);
  });
});

describe("Village", () => {
  describe("props", () => {
    test("returns obj with buildings array", () => {
      const hobbiton = new Village();
      expect(hobbiton.buildings).toEqual([]);
    });
    test("returns with a roads prop that begins as an empty obj", () => {
      const hobbiton = new Village();
      expect(hobbiton.roads).toEqual([]);
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
        expect(hobbiton.buildings).toEqual([
          { name: "Bilbo's House", mailbox: [] },
        ]);
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(frodoHouse);
        expect(hobbiton.buildings[1]).toBe(frodoHouse);
      });
    });
    describe("addRoad()", () => {
      test("adds an array to the villagers paths array", () => {
        const hobbiton = new Village();
        const bilboHouse = new Building("Bilbo's House");
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(bilboHouse);
        hobbiton.addBuilding(frodoHouse);
        hobbiton.addRoad("Bilbo's House", "Frodo's House");
        expect(Array.isArray(hobbiton.roads[0])).toBe(true);
      });
      test("the added array contains the correct buildings", () => {
        const hobbiton = new Village();
        const bilboHouse = new Building("Bilbo's House");
        const frodoHouse = new Building("Frodo's House");
        hobbiton.addBuilding(bilboHouse);
        hobbiton.addBuilding(frodoHouse);
        hobbiton.addRoad("Bilbo's House", "Frodo's House");
        expect(hobbiton.roads[0]).toEqual([
          { name: "Bilbo's House", mailbox: [] },
          { name: "Frodo's House", mailbox: [] },
        ]);
        expect(hobbiton.roads[0][0]).toBe(bilboHouse);
        expect(hobbiton.roads[0][1]).toBe(frodoHouse);
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
        hobbiton.addRoad("Bilbo's House", "Frodo's House");
        expect(hobbiton.pathsFrom("Bilbo's House")).toEqual(["Frodo's House"]);
        const pippinHouse = new Building("Pippin's House");
        hobbiton.addBuilding(pippinHouse);
        hobbiton.addRoad("Pippin's House", "Bilbo's House");
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
        const { testVillage } = require("./gameFiles/testVillage.js");
        const mailBot = new Robot(testVillage);
        expect(mailBot.location).toBe("Post Office");
        mailBot.move("Market");
        expect(mailBot.location).toBe("Market");
      });
      test("will not change the location if there is no path available from the current location", () => {
        const { testVillage } = require("./gameFiles/testVillage.js");
        const mailBot = new Robot(testVillage);
        expect(mailBot.location).toBe("Post Office");
        mailBot.move("Gretes House");
        expect(mailBot.location).toBe("Post Office");
        mailBot.move("Aadils House");
        expect(mailBot.location).toBe("Aadils House");
      });
      test("will call the console.log with a message saying the robot has moved", () => {
        const testFunc = jest.spyOn(console, "log");
        const { testVillage } = require("./gameFiles/testVillage");
        const mailBot = new Robot(testVillage);
        mailBot.move("Aadils House");
        expect(testFunc).toHaveBeenCalledWith(
          "MailBot moved from Post Office to Aadils House"
        );
        testFunc.mockRestore();
      });
      test("when called with an invalid destination will console.log message", () => {
        const testFunc = jest.spyOn(console, "log");
        const { testVillage } = require("./gameFiles/testVillage");
        const mailBot = new Robot(testVillage);
        mailBot.move("Cabin");
        expect(testFunc.mock.calls[0][0]).toBe(
          "MailBot cant move from Post Office to Cabin"
        );
        testFunc.mockRestore();
      });
    });
    describe("pickUp()", () => {
      test("takes an object and add its to parcels array", () => {
        const hobbiton = new Village();
        const mailBot = new Robot(hobbiton);
        const parcel = { address: "Pippins House" };
        mailBot.pickUp(parcel);
        expect(mailBot.parcels).toEqual([{ address: "Pippins House" }]);
      });
      test("adds multiple parcels in a single invocation", () => {
        const hobbiton = new Village();
        const mailBot = new Robot(hobbiton);
        const parcel1 = { address: "Pippins House" };
        const parcel2 = { address: "Bilbos House" };
        mailBot.pickUp(parcel1, parcel2);
        expect(mailBot.parcels).toEqual([
          { address: "Pippins House" },
          { address: "Bilbos House" },
        ]);
      });
    });
    describe("deliver()", () => {
      test("if the robot has a parcel addressed to the current location will remove the parcel from its parcels", () => {
        const hobbiton = new Village();
        const postOffice = new Building("Post Office");
        hobbiton.addBuilding(postOffice);
        const mailBot = new Robot(hobbiton);
        const parcel = { address: "Post Office" };
        mailBot.pickUp(parcel);
        mailBot.deliver();
        expect(mailBot.parcels).toEqual([]);
        expect(postOffice.mailbox[0]).toBe(parcel);
      });
      test("will only remove the parcel from the current location", () => {
        const hobbiton = new Village();
        const postOffice = new Building("Post Office");
        hobbiton.addBuilding(postOffice);
        const mailBot = new Robot(hobbiton);
        const parcel = { address: "Post Office" };
        const parcel2 = { address: "Aadils House" };
        mailBot.pickUp(parcel, parcel2);
        mailBot.deliver();
        expect(mailBot.parcels).toEqual([{ address: "Aadils House" }]);
      });
      test("will console log how many parcels have been delivered at the current location", () => {
        const testFunc = jest.spyOn(console, "log");
        const hobbiton = new Village();
        const postOffice = new Building("Post Office");
        hobbiton.addBuilding(postOffice);
        const mailBot = new Robot(hobbiton);
        const parcel = { address: "Post Office" };
        const parcel2 = { address: "Aadils House" };
        mailBot.pickUp(parcel, parcel2);
        mailBot.deliver();
        expect(testFunc).toHaveBeenCalledWith(
          "MailBot delivered 1 parcel at Post Office"
        );
        mailBot.deliver();
        expect(testFunc).toHaveBeenCalledWith(
          "MailBot delivered 0 parcel at Post Office"
        );
        testFunc.mockRestore();
      });
    });
  });
});

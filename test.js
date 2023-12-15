const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { RoomsModel } = require('./database')

const app = require("./index");
const { room, differentRoom } = require("./constants");

const roomsKeys = Object.keys(room);

chai.use(chaiHttp);
const expect = chai.expect;

  describe("Post", () => {
    it("Should create a new room", async () => {
      new RoomsModel(room)
      console.log(await RoomsModel.find());
  
      const res = await chai
        .request(app)
        .post("/room")
        .send(room);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, roomsKeys)).to.deep.equal(room);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/room")
        .send(room)
  
      createdRoom = response.body;
    });
  
    it("Should get all rooms", async () => {
      const res = await chai
        .request(app)
        .get("/room");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(room => room._id === createdRoom._id)).to.be.false; // for crash
    });
  
    it("Should get one room by id", async () => {
      const res = await chai
        .request(app)
        .get(`/room/${createdRoom._id}`);
  
      expect(res.body).to.deep.equal(createdRoom);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/room")
        .send(room)
  
        createdRoom = response.body;
    });
  
    it("Should update(put) room by id", async () => {
      const res = await chai
        .request(app)
        .put(`/room/${createdRoom._id}`)
        .send(differentRoom);
  
      expect(res.body).to.deep.equal({ ...createdRoom, ...differentRoom });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/room")
        .send(room)
  
        createdRoom = response.body;
    });
  
    it("Should delete room by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/room/${createdRoom._id}`);
  
      expect(res.body).to.deep.equal(createdRoom);
    });
  })
//testtt

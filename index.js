const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { RoomsModel } = require('./database')

app.use(bodyParser.json());

app.post("/room", async (req, res) => {
    try {
      const room = new RoomsModel(req.body);
      await room.save();
      res.status(201).send(room);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/room", async (req, res) => {
    try {
      const rooms = await RoomsModel.find();
      res.send(rooms);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/room/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const room = await RoomsModel.findById(id);
      if (!room) {
        return res.status(404).send("Room not found");
      }
      res.send(room);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/room/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const room = await RoomsModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!room) {
        return res.status(404).send("Room not found");
      }
      res.send(room);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/room/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const room = await RoomsModel.findByIdAndDelete(id);
      if (!room) {
        return res.status(404).send("Room not found");
      }
      res.send(room);
    } catch (error) {
      res.status(500).send(error);
    }
});
  
app.listen(3070, () => {
    console.log('Starting the server on port 3070');
});

module.exports = app;

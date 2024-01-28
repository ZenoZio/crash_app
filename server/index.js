require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("an error occurred while fetching note");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching note ...." });
  }
});

//Get note by id
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error("an error occurred while fetching note");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching note ...." });
  }
});

//Creaate A note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;

    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("an error occurred while creating a note");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating a note ...." });
  }
});

//Update A note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;

    const data = await Notes.findByIdAndUpdate(noteId, { title, description });
    if (!data) {
      throw new Error("an error occurred while updating a note");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating a note ...." });
  }
});


//Delete A note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error("an error occurred while updating a note");
    }

    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating a note ...." });
  }
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

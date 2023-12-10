const express = require("express");
const Router = express.Router();
const fetch = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
Router.get("/fetchallnotes", fetch, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    return res.json(notes);
  } catch (error) {
    res.status(404).send("Internal server error occured");
  }
});
Router.post(
  "/addnote",
  fetch,
  [
    body("title").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { title, description, tag } = req.body;
      const notes = new Notes({ title, description, tag, user: req.user.id });
      const savednote = await notes.save();
      return res.json(savednote);
    } catch (error) {
      res.status(404).send("Internal server error occured");
    }
  }
);
Router.post(
    "/updatenote/:id",
    fetch,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let { title, description, tag } = req.body;
        const newnote={}
        if(title){newnote.title=title};
        if(description){newnote.description=description};
        if(tag){newnote.tag=tag};
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found");}
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}
        note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
        return res.json(note);
      } catch (error) {
        res.status(404).send("Internal server error occured");
      }
    }
  );
  Router.post(
    "/deletenote/:id",
    fetch,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let note=await Notes.findById(req.params.id);
        if(!note){return res.status(404).send("Not found");}
        if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed");}
        note=await Notes.findByIdAndDelete(req.params.id);
        return res.json(note);
      } catch (error) {
        res.status(404).send("Internal server error occured");
      }
    }
  );
module.exports = Router;

const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

//@desc Get notes for a ticket
//route GET /api/tickets/:ticketId/notes
//@access Private

const getNotes = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not the right user");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

//@desc Create a note for a ticket
//route POST /api/tickets/:ticketId/notes
//@access Private

const addNote = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not the right user");
  }

  const notes = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
  });

  res.status(200).json(notes);
});

module.exports = {
  getNotes,
  addNote
};

import createError from "../functions/createError.js";
import User from "../models/users.model.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const user = await User.find().select("-updatedAt").select("-createdAt");

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    if (!req.isGert)
      return next(createError(404, "alleen Gert mag gebruikers verwijderen"));
    const deleteUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).send(`gebruiker ${deleteUser} verwijderd`);
  } catch (err) {}
};

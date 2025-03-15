const express = require("express");
const router = express.Router();
const VolunteersController = require("../controllers/volunteersController");
const upload = require("../middleware/upload"); // Multer middleware for handling uploads

// Create a new volunteer with file uploads (for aadhar and passport_photo)
router.post("/create", 
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "passport_photo", maxCount: 1 }
  ]),
  VolunteersController.createVolunteer
);

// Get all volunteers
router.get("/getvolunteers", VolunteersController.getAllVolunteers);

// Get a volunteer by ID
router.get("/getvolunteers/:id", VolunteersController.getVolunteerById);

// Update a volunteer with file uploads (for aadhar and passport_photo)
router.put("/updatevolunteer/:id", 
  upload.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "passport_photo", maxCount: 1 }
  ]),
  VolunteersController.updateVolunteer
);

// Delete a volunteer by ID
router.delete("/deletevolunteer/:id", VolunteersController.deleteVolunteer);

module.exports = router;
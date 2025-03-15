const VolunteersService = require("../services/volunteersService");

class VolunteersController {
  // Create a new volunteer
  static async createVolunteer(req, res) {
    try {
      // Extract file names if files are uploaded via Multer
      const aadhar = req.files && req.files.aadhar ? req.files.aadhar[0].filename : null;
      const passport_photo = req.files && req.files.passport_photo ? req.files.passport_photo[0].filename : null;

      // Extract form data from request body
      const {
        fullname,
        dob,
        gender,
        mobilenumber,
        email,
        address,
        house_no_street,
        city,
        state,
        pincode,
        emergency_name,
        emergency_relationship,
        emergency_mobile,
        consent,
      } = req.body;

      // Validate required text fields
      if (
        !fullname ||
        !dob ||
        !mobilenumber ||
        !email ||
        !address ||
        !emergency_name ||
        !emergency_relationship ||
        !emergency_mobile
      ) {
        return res.status(400).json({ error: "Required fields are missing." });
      }

      // Check required file fields and consent
      if (!aadhar) {
        return res.status(400).json({ error: "Aadhar is required." });
      }
      if (!passport_photo) {
        return res.status(400).json({ error: "Passport photo is required." });
      }
      if (consent === undefined) {
        return res.status(400).json({ error: "Consent is required." });
      }

      // Create volunteer using the service
      const volunteerId = await VolunteersService.createVolunteer({
        fullname,
        dob,
        gender,
        mobilenumber,
        email,
        address,
        house_no_street,
        city,
        state,
        pincode,
        emergency_name,
        emergency_relationship,
        emergency_mobile,
        consent,
        aadhar,
        passport_photo,
      });

      res.status(201).json({ message: "Volunteer created successfully", volunteerId });
    } catch (error) {
      console.error("Error in VolunteersController.createVolunteer:", error.message);
      res.status(500).json({ error: "Failed to create volunteer." });
    }
  }

  // Get all volunteers
  static async getAllVolunteers(req, res) {
    try {
      const volunteers = await VolunteersService.getAllVolunteers();
      res.status(200).json(volunteers);
    } catch (error) {
      console.error("Error in VolunteersController.getAllVolunteers:", error.message);
      res.status(500).json({ error: "Failed to fetch volunteers." });
    }
  }

  // Get a volunteer by ID
  static async getVolunteerById(req, res) {
    try {
      const volunteerId = req.params.id;
      const volunteer = await VolunteersService.getVolunteerById(volunteerId);

      if (volunteer) {
        res.status(200).json(volunteer);
      } else {
        res.status(404).json({ error: "Volunteer not found." });
      }
    } catch (error) {
      console.error("Error in VolunteersController.getVolunteerById:", error.message);
      res.status(500).json({ error: "Failed to fetch volunteer." });
    }
  }

  // Update a volunteer by ID
  static async updateVolunteer(req, res) {
    try {
      const volunteerId = req.params.id;
      
      // Extract file names if files are uploaded, or fallback to value in body
      const aadhar =
        (req.files && req.files.aadhar ? req.files.aadhar[0].filename : null) ||
        req.body.aadhar;
      const passport_photo =
        (req.files && req.files.passport_photo ? req.files.passport_photo[0].filename : null) ||
        req.body.passport_photo;

      // Extract form data from request body
      const {
        fullname,
        dob,
        gender,
        mobilenumber,
        email,
        address,
        house_no_street,
        city,
        state,
        pincode,
        emergency_name,
        emergency_relationship,
        emergency_mobile,
        consent,
      } = req.body;

      // Validate required text fields
      if (
        !fullname ||
        !dob ||
        !mobilenumber ||
        !email ||
        !address ||
        !emergency_name ||
        !emergency_relationship ||
        !emergency_mobile
      ) {
        return res.status(400).json({ error: "Required fields are missing." });
      }

      // Validate required file fields and consent
      if (!aadhar) {
        return res.status(400).json({ error: "Aadhar is required." });
      }
      if (!passport_photo) {
        return res.status(400).json({ error: "Passport photo is required." });
      }
      if (consent === undefined) {
        return res.status(400).json({ error: "Consent is required." });
      }

      const updateData = {
        fullname,
        dob,
        gender,
        mobilenumber,
        email,
        address,
        house_no_street,
        city,
        state,
        pincode,
        emergency_name,
        emergency_relationship,
        emergency_mobile,
        consent,
        aadhar,
        passport_photo,
      };

      const affectedRows = await VolunteersService.updateVolunteer(volunteerId, updateData);

      if (affectedRows) {
        res.status(200).json({ message: "Volunteer updated successfully", affectedRows });
      } else {
        res.status(404).json({ error: "Volunteer not found." });
      }
    } catch (error) {
      console.error("Error in VolunteersController.updateVolunteer:", error.message);
      res.status(500).json({ error: "Failed to update volunteer." });
    }
  }

  // Delete a volunteer by ID
  static async deleteVolunteer(req, res) {
    try {
      const volunteerId = req.params.id;
      const affectedRows = await VolunteersService.deleteVolunteer(volunteerId);

      if (affectedRows) {
        res.status(200).json({ message: "Volunteer deleted successfully." });
      } else {
        res.status(404).json({ error: "Volunteer not found." });
      }
    } catch (error) {
      console.error("Error in VolunteersController.deleteVolunteer:", error.message);
      res.status(500).json({ error: "Failed to delete volunteer." });
    }
  }
}

module.exports = VolunteersController;
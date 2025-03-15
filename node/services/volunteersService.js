const Volunteer = require("../models/Volunteer");

class VolunteersService {
  static async createVolunteer(volunteerData) {
    try {
      return await Volunteer.createVolunteer(volunteerData);
    } catch (error) {
      console.error("Error in VolunteersService.createVolunteer:", error.message);
      throw error;
    }
  }

  static async getAllVolunteers() {
    try {
      return await Volunteer.getAllVolunteers();
    } catch (error) {
      console.error("Error in VolunteersService.getAllVolunteers:", error.message);
      throw error;
    }
  }

  static async getVolunteerById(id) {
    try {
      return await Volunteer.getVolunteerById(id);
    } catch (error) {
      console.error("Error in VolunteersService.getVolunteerById:", error.message);
      throw error;
    }
  }

  static async updateVolunteer(id, volunteerData) {
    try {
      return await Volunteer.updateVolunteer(id, volunteerData);
    } catch (error) {
      console.error("Error in VolunteersService.updateVolunteer:", error.message);
      throw error;
    }
  }

  static async deleteVolunteer(id) {
    try {
      return await Volunteer.deleteVolunteer(id);
    } catch (error) {
      console.error("Error in VolunteersService.deleteVolunteer:", error.message);
      throw error;
    }
  }
}

module.exports = VolunteersService;
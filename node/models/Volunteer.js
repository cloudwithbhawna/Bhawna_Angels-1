const db = require("../config/db");

class Volunteer {
  // Create a new volunteer (aadhar, passport_photo, and consent are required)
  static async createVolunteer({
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
  }) {
    // Validate required fields
    if (!aadhar) {
      throw new Error("Aadhar is required");
    }
    if (!passport_photo) {
      throw new Error("Passport photo is required");
    }
    if (consent === undefined) {
      throw new Error("Consent is required");
    }

    try {
      const [result] = await db.execute(
        `INSERT INTO volunteers 
         (fullname, dob, gender, mobilenumber, email, address, house_no_street, city, state, pincode, emergency_name, emergency_relationship, emergency_mobile, consent, aadhar, passport_photo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          fullname,
          dob,
          gender || "Female",
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
        ]
      );
      console.log("Volunteer created with ID:", result.insertId);
      return result.insertId;
    } catch (error) {
      console.error("Error creating volunteer:", error);
      throw error;
    }
  }

  // Get all volunteers
  static async getAllVolunteers() {
    try {
      const [rows] = await db.execute("SELECT * FROM volunteers");
      return rows;
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      throw error;
    }
  }

  // Get a volunteer by ID
  static async getVolunteerById(id) {
    try {
      const [rows] = await db.execute("SELECT * FROM volunteers WHERE id = ?", [
        id,
      ]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error("Error fetching volunteer by ID:", error);
      throw error;
    }
  }

  // Update a volunteer (aadhar, passport_photo, and consent are required)
  static async updateVolunteer(
    id,
    {
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
    }
  ) {
    if (!aadhar) {
      throw new Error("Aadhar is required");
    }
    if (!passport_photo) {
      throw new Error("Passport photo is required");
    }
    if (consent === undefined) {
      throw new Error("Consent is required");
    }

    try {
      const [result] = await db.execute(
        `UPDATE volunteers SET
          fullname = ?,
          dob = ?,
          gender = ?,
          mobilenumber = ?,
          email = ?,
          address = ?,
          house_no_street = ?,
          city = ?,
          state = ?,
          pincode = ?,
          emergency_name = ?,
          emergency_relationship = ?,
          emergency_mobile = ?,
          consent = ?,
          aadhar = ?,
          passport_photo = ?
         WHERE id = ?`,
        [
          fullname,
          dob,
          gender || "Female",
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
          id,
        ]
      );
      console.log("Volunteer updated. Rows affected:", result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating volunteer:", error);
      throw error;
    }
  }

  // Delete a volunteer
  static async deleteVolunteer(id) {
    try {
      const [result] = await db.execute("DELETE FROM volunteers WHERE id = ?", [
        id,
      ]);
      console.log("Volunteer deleted. Rows affected:", result.affectedRows);
      return result.affectedRows;
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      throw error;
    }
  }
}

module.exports = Volunteer;
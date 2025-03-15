import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Hook for navigation
  // Static content
  const content = {
    objectives: [
      "24/7 Safety & Support – We provide round-the-clock assistance to women in distress, ensuring immediate action and legal intervention.",
      "Instant Complaint System – Women can report threats or harassment instantly, and we take swift action with the help of the police and legal authorities.",
      "Empowering Women – Volunteers play a vital role in spreading awareness, assisting victims, and strengthening our mission of a safer India for women.",
      "Legal and Emotional Support – Our trust connects women with legal advisors and counselors to ensure justice and mental well-being.",
      "Be a Changemaker – As a volunteer, you contribute to real change, making society safer and more secure for all women.",
      "Recognition & Growth – Volunteers receive acknowledgment for their efforts, along with opportunities for leadership and advocacy training.",
      "Community of Strong Women – Join a network of like-minded individuals dedicated to standing up for women’s rights and safety.",
      "Your voice matters! Be a volunteer and make a difference.",
    ],
    how_we_work: [
      "Collaboration with Authorities – We work closely with legal authorities and police stations to ensure swift intervention and justice.",
      "Legal and Counseling Support – Our trust connects victims with legal experts and counselors to provide guidance and emotional support.",
      "Safety Assurance – We continuously monitor cases until the woman is safe and justice is served.",
      "Awareness and Training – We conduct self-defense training, legal awareness sessions, and safety workshops to empower women.",
      "Volunteer Network – Our dedicated volunteers work across India to provide on-ground support and assist in emergencies.",
      "Technology-Driven Safety – We leverage digital tools for quick response, complaint tracking, and communication with authorities.",
    ],
    responsibilities: [
      "Spreading Awareness – Educate women about their rights, safety measures, and how to report incidents.",
      "Assisting in Emergency Cases – Help victims by coordinating with legal authorities and ensuring timely action.",
      "Complaint Handling & Support – Guide women in filing complaints and provide emotional and moral support.",
      "Legal & Counseling Assistance – Connect victims with legal advisors and counselors for proper guidance.",
      "Conducting Safety Workshops – Organize self-defense training and awareness programs in schools, colleges, and communities.",
      "Building a Strong Network – Work with law enforcement, NGOs, and local authorities to strengthen women’s safety initiatives.",
      "24/7 Support & Monitoring – Stay active in tracking cases and ensuring justice is delivered.",
      "Social Media & Outreach – Use social platforms to spread awareness, share success stories, and encourage more women to seek help.",
      "On-Ground Support – Be a part of rescue missions, provide temporary shelter support, and help in rehabilitation efforts.",
      "Advocacy & Fundraising – Help raise funds, gather community support, and advocate for stronger women’s safety policies.",
    ],
    why_volunteer: [
      "Exclusive Lifetime Access to Women’s Defense Software – Free access to advanced self-defense and safety tools designed for emergencies.",
      "Financial Support for On-Ground Missions – Travel, food, and other necessary expenses will be covered by our trust when assigned to a case.",
      "Legal & Self-Defense Training – Free workshops on legal rights, self-defense techniques, and crisis intervention.",
      "Recognition & Certification – Volunteers will receive official certificates and public recognition for their contributions.",
      "Priority Safety Assistance – Immediate support from our trust in case of personal safety concerns.",
      "Leadership & Career Growth – Gain experience in social work, women’s rights, and advocacy, boosting your leadership skills.",
      "Networking & Community Building – Connect with activists, legal experts, and professionals supporting women’s safety.",
      "Exclusive Rewards & Perks – Enjoy discounts on safety products, self-defense gear, and trust-organized events.",
      "Mental Health & Counseling Support – Free access to counseling services and mental well-being resources.",
      "Early Access to Future Benefits & Policies – Any new policy, benefit, or support introduced by our trust in the future will be available only to volunteers.",
      "Health & Insurance Benefits (Planned for Future) – Volunteers may receive medical or insurance-related assistance as part of future initiatives.",
      "Scholarship & Education Support (Upcoming) – Special programs may be launched to support the education of volunteers or their families.",
      "Employment & Business Opportunities – Volunteers will be prioritized for jobs, training, or business collaborations introduced by our trust.",
      "Higher Volunteer Ranks & Leadership Roles – Dedicated volunteers will have opportunities for promotion into leadership and management roles within the trust.",
      "Be a part of our mission today and secure lifetime benefits as we grow together!",
    ],
  };

  // Extract slogans from the last item of objectives and why_volunteer arrays
  const objectiveSlogan = content.objectives[content.objectives.length - 1];
  const volunteerSlogan =
    content.why_volunteer[content.why_volunteer.length - 1];

  // Filter out the slogans from the numbered lists
  const filteredObjectives = content.objectives.slice(0, -1);
  const filteredWhyVolunteer = content.why_volunteer.slice(0, -1);

  // Function to format text with bold numbered points
  const formatWithNumbers = (list) => {
    return list.map((item, index) => {
      // Split the first phrase (before '–') and the remaining text
      const parts = item.split(" – ");
      return (
        <div key={index} className="mb-2">
          <b>
            {index + 1}. {parts[0]}
          </b>
          {parts[1] ? ` – ${parts[1]}` : ""}
        </div>
      );
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Objectives Section */}
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center mb-4">Our Objectives</h2>
            {formatWithNumbers(filteredObjectives)}
            {/* Centered Slogan */}
            <p className="text-center fw-bold mt-3">{objectiveSlogan}</p>
          </section>
        </div>
        {/* How We Work Section */}
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center mb-4">How We Work</h2>
            {formatWithNumbers(content.how_we_work)}
          </section>
        </div>
        {/* Responsibilities Section */}
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center mb-4">
              Responsibilities of Volunteers
            </h2>
            {formatWithNumbers(content.responsibilities)}
          </section>
        </div>
        {/* Why Become a Volunteer Section */}
        <div className="col-md-6 mb-4">
          <section className="p-3 border rounded bg-light">
            <h2 className="text-primary text-center mb-4">
              Why Become a Volunteer?
            </h2>
            {formatWithNumbers(filteredWhyVolunteer)}
            {/* Centered Slogan */}
            <p className="text-center fw-bold mt-3">{volunteerSlogan}</p>
          </section>
        </div>
      </div>

      {/* Join as Volunteer Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/register")}
        >
          Join as Volunteer
        </button>
      </div>
    </div>
  );
};

export default HomePage;
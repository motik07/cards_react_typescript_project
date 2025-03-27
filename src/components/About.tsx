import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
    const { theme } = useTheme();
  return (
    <div className="custom-bg col-12">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center text-shadow">
            <motion.img
              src="/public/Cardy_Pandy_Big_Icon.png"
              alt="CardyPandi Icon"
              className="mb-4"
              style={{ width: "200px" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <h1 className="display-4 mb-4 text-white text-shadow headline-font-width">
              🐼 About 
              <span className="headline-first-char-style-font"> CardyPandi </span> 
              Where Business Meets Wild Creativity!
            </h1>
          </div>

          <div className="col-12 col-lg-10 text-center">
            <p className="fs-3 mb-5 text-white diary-santa-font text-shadow">
              In a world filled with forgettable business cards,
              <strong className="headline-first-char-style-font"> CardyPandi </strong>
              brings a fresh, creative twist to networking. We believe that a
              business card should be more than just contact details—it should
              tell a story, create a connection, and most importantly, be
              <strong> unforgettable</strong>.
            </p>
            <h2 className="disply-4 mb-4 headline-font-width text-white text-shadow">
              🐼 What is <strong className="headline-first-char-style-font">CardyPandi</strong>?
            </h2>
            <p className="fs-3 mb-5 text-white diary-santa-font text-shadow">
              CardyPandi is a 
              <strong className="headline-first-char-style-font"> Business Card Showcase Platform </strong> 
              where professionals and businesses can publish their unique,
              animal-themed business cards. Whether you're a wise
              <strong> owl lawyer</strong>, a creative <strong> parrot designer</strong>
              , or a calm and collected <strong> panda therapist</strong>, your
              business deserves a card that truly represents your brand personality.
            </p>
            <h2 className="disply-4 mb-4 headline-font-width text-white text-shadow">
              <i className="fa-solid fa-clipboard-question text-light"></i> Why Choose <strong className="headline-first-char-style-font">CardyPandi</strong>?
            </h2>
           <ul className="mb-5 text-start fs-3 mb-5 text-shadow">
              <li className="diary-santa-font text-light list-group-item custom-list-item">
              <i className="fa-regular fa-hand-point-right"></i>
                <strong className="headline-first-char-style-font"> Discover and Connect - </strong>
                 Browse and explore professionals across different industries
              </li>
              <li className="diary-santa-font text-light list-group-item custom-list-item">
                <i className="fa-regular fa-hand-point-right"></i>
                <strong className="headline-first-char-style-font"> Create Your Profile - </strong>
                 Set up your business profile with your details
              </li>
              <li className="diary-santa-font text-light list-group-item custom-list-item">
                <i className="fa-regular fa-hand-point-right"></i>
                <strong className="headline-first-char-style-font"> Get Discovered - </strong>
                 Appear in our searchable directory
              </li>
              <li className="diary-santa-font text-light list-group-item custom-list-item">
                <i className="fa-regular fa-hand-point-right"></i>
                <strong className="headline-first-char-style-font"> Share & Network - </strong>
                 Leave a lasting impression
              </li>
            </ul>

            <h2 className="h2 mb-4 text-white text-shadow headline-font-width"><i className="fa-solid fa-hashtag text-light"></i> How It Works?</h2> 
            <div className="mb-5">
                <ul className="list-group text-start">
                  <li className="list-group-item border-0 bg-transparent text-light">
                <i className="fa-solid fa-rocket text-light"></i>
                    <strong> Create Your Profile</strong> – Sign up and add your business details
                  </li>
                  <li className="list-group-item border-0 bg-transparent text-light">
                <i className="fa-solid fa-rocket text-light"></i>
                    <strong> Get Discovered</strong> – Appear in our searchable directory
                  </li>
                  <li className="list-group-item border-0 bg-transparent text-light">
                <i className="fa-solid fa-rocket text-light"></i>
                    <strong> Share & Network</strong> – Showcase your unique identity
                  </li>
                </ul>
            </div>

            <div className="text-center mb-5">
              <h4 className="alert-heading diary-santa-font">Ready to unleash your business card's true potential?</h4>
              <p className="mb-0 diary-santa-font">Join the wildest networking platform today! 🐼</p>
            </div>

            <button className={`m-3 w-30 text-shadow box-shadow ${theme === "dark" ? "btn btn-light" : "btn btn-dark"}`} onClick={() => window.location.href = '/'}>
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
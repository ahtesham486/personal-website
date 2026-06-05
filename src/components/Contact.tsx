import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { siteConfig } from "../data/siteConfig";
import "./styles/Contact.css";

const Contact = () => {
  const waUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(
    "Hi Ahtasham, I want to discuss a project."
  )}`;

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${siteConfig.email}`} data-cursor="disable">
                {siteConfig.email}
              </a>
            </p>
            <h4>WhatsApp</h4>
            <p>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                Products &amp; quotes
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <FaWhatsapp />
            </a>
            <a
              href="#booking"
              data-cursor="disable"
              className="contact-social"
            >
              Book Meeting <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{siteConfig.name}</span>
            </h2>
            <h5>
              <MdCopyright /> {siteConfig.year}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

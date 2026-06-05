import { useEffect, useRef } from "react";
import { siteConfig } from "../data/siteConfig";
import "./styles/Booking.css";

const Booking = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const embedUrl = `${siteConfig.googleBookingEmbedUrl}?gv=true`;
    if (frameRef.current) frameRef.current.src = embedUrl;
  }, []);

  return (
    <div className="booking-section section-container" id="booking">
      <div className="booking-container">
        <h2>
          Book a Free <span>15-Min Call</span>
        </h2>
        <p className="booking-desc">
          Pick your date and time below. You will receive a Google Meet link and confirmation email automatically.
        </p>
        <a
          href={siteConfig.googleBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="booking-open-link"
          data-cursor="disable"
        >
          Open calendar in new tab
        </a>
        <div className="booking-frame-wrap">
          <iframe
            ref={frameRef}
            className="booking-frame"
            title="Book a free 15-minute consultation with Ahtasham Aslam"
            allow="fullscreen; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;

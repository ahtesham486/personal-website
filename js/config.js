/**
 * Portfolio settings — apna Google Calendar booking link yahan lagayein.
 *
 * Setup (5 min):
 * 1. https://calendar.google.com → Create → Appointment schedule
 * 2. Title: "Free 15-Min Consultation"
 * 3. Duration: 15 minutes
 * 4. Location: Google Meet (video call)
 * 5. Copy "Booking page" link → paste below in googleBookingUrl
 */
window.PORTFOLIO_CONFIG = {
  /** Share / "open in new tab" link (short link is fine) */
  googleBookingUrl: 'https://calendar.app.google/SY15mssjkE73fTrZ8',
  /**
   * Full calendar.google.com URL for the iframe embed.
   * Short calendar.app.google links break embedded calendar on Safari (Mac) due to redirect headers.
   * Get this from your booking page URL after opening the short link once in the browser.
   */
  googleBookingEmbedUrl:
    'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0jv5O153QtkxfOqfALJSwH_AhoxKt3jWyaolR9Hwek0ZfK1C9jKQAhBIH1qcmPH27c6MWHa8tl',

  contactEmail: 'ahteshamaslam0486@gmail.com',

  /** Product / quote inquiries only (meetings use Google Calendar above) */
  whatsappNumber: '923040880677',
};

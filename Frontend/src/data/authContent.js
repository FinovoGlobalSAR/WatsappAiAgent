export const brand = {
  name: "Finovo",
  navLinks: ["Cars", "Trips", "Experiences"],
};
import loginBanner from "../assets/loginBanner.png";
import signupBanner from "../assets/signupBanner.png";

export const loginContent = {
  backgroundImage: loginBanner,
  imageAlt: "Woman looking out of a car window at sunset along the coast",
  headline: [
    { text: "Travel ", highlight: false },
    { text: "beyond the", highlight: true },
  ],
  headlineSecondLine: { text: "ordinary.", highlight: false },
  description: "From city drives to weekend escapes, Finovo gets you there.",
  features: [
    {
      icon: "car",
      title: "Explore More",
      subtitle: "Top destinations, curated for you",
    },
    {
      icon: "zap",
      title: "Exclusive Deals",
      subtitle: "Great rides. Greater journeys.",
    },
    {
      icon: "headphones",
      title: "A Smoother You",
      subtitle: "Reliable, safe and always on the move",
    },
  ],
  quote: ["Good Rides", "Brighter Days"],
};

export const signupContent = {
  backgroundImage: signupBanner,
  imageAlt: "Car driving down a coastal road at sunset",
  headline: [{ text: "Every ride you need,", highlight: false }],
  headlineSecondLine: { text: "ready to go.", highlight: true },
  description:
    "Book cars easily for daily travel, business trips, and weekend getaways — all in one place.",
  features: [
    {
      icon: "car",
      title: "Wide Selection",
      subtitle: "Cars for every need",
    },
    {
      icon: "zap",
      title: "Easy Booking",
      subtitle: "Fast & hassle-free",
    },
    {
      icon: "headphones",
      title: "24/7 Support",
      subtitle: "Help whenever you need",
    },
  ],
  quote: ["Drive", "More Possibilities"],
};

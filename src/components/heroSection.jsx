import { useState } from "react";
import herosvg from "../assets/herosection.svg";


const HeroSection = () => {
  const slides = [herosvg, herosvg, herosvg, herosvg, herosvg];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="w-full h-[300px] sm:h-[400px] relative">
        <img
          src={slides[currentIndex]}
          alt="Hero Slide"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />
      </div>

      {/* Dots Box - Responsive positioning and sizing */}
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-lg px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 flex items-center space-x-2 sm:space-x-3 shadow-md">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-[#74BD43]" 
                : "bg-gray-300 hover:bg-gray-400"
            } ${
              // Responsive dot sizes
              "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
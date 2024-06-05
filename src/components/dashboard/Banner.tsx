import React, { useEffect } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Banner = () => {
  useEffect(() => {
    const items = document.querySelectorAll('[data-carousel-item]');
    let currentIndex = 0;

    const showItem = (index) => {
      items.forEach((item, idx) => {
        item.classList.toggle('hidden', idx !== index);
      });
    };

    const nextItem = () => {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    };

    const prevItem = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    };

    // Show the first item initially
    showItem(currentIndex);

    const interval = setInterval(nextItem, 5000);

    document.querySelector('[data-carousel-next]').addEventListener('click', nextItem);
    document.querySelector('[data-carousel-prev]').addEventListener('click', prevItem);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      <div className="relative h-24 overflow-hidden md:h-52 lg:h-96">
        {/* Item 1 */}
        <div className="duration-700 ease-in-out" data-carousel-item>
          <img src="/assets/dashboard/banner1.jpg" className="absolute block w-full h-full object-cover" alt="Banner 1" />
        </div>
        {/* Item 2 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="/assets/dashboard/banner2.jpg" className="absolute block w-full h-full object-cover" alt="Banner 2" />
        </div>
        {/* Item 3 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <img src="/assets/dashboard/banner3.jpg" className="absolute block w-full h-full object-cover" alt="Banner 3" />
        </div>
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        <button type="button" className="w-3 h-3 rounded-full bg-gray-500" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-gray-500" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-gray-500" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
      </div>
      {/* Slider controls */}
      <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/50 group-hover:bg-white/70 dark:bg-gray-800/50 dark:group-hover:bg-gray-800/70 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <FaChevronLeft className="text-gray-700 dark:text-gray-200" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/50 group-hover:bg-white/70 dark:bg-gray-800/50 dark:group-hover:bg-gray-800/70 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <FaChevronRight className="text-gray-700 dark:text-gray-200" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default Banner;

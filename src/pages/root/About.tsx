import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


const About = () => {
  return (
    <div>
      <div className="relative">
        <img src="/assets/about/about-hero.png" className="w-full h-auto" />
        <div className="absolute top-[15%] md:top-[25%] left-[8%] md:left-[12%] flex flex-col items-start gap-4 md:gap-7 w-[50%] md:w-[45%] lg:w-1/3">
          <h3 className="font-semibold text-xs md:text-lg lg:text-xl">
            ABOUT COMPANY
          </h3>
          <h2 className="text-xl md:text-3xl lg:text-6xl font-bold">
            ABOUT US
          </h2>
          <h4 className="text-gray-600 text-xs md:text-lg lg:text-xl">
            We know how large objects will act, but things on a small scale
          </h4>
          <button className="text-xs sm:text-base lg:text-lg bg-[#63a5ea] rounded-lg text-white py-2 md:py-4 px-4 md:px-8 font-bold">
            Get Quote Now
          </button>
        </div>
      </div>

      <div className="w-full px-16 md:px-24 lg:px-40 py-16 flex flex-col max-md:text-center">
        <h3 className="text-red-500 text-xs md:text-lg mb-5 font-semibold">
          Problems trying
        </h3>
        <div className="flex flex-col md:flex-row gap-5 md:gap-16">
          <h4 className="font-bold text-md md:text-xl md:w-1/2 lg:w-[45%] xl:w-[35%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, labore.
          </h4>
          <h5 className="text-md md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
            impedit voluptates fugiat.
          </h5>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-16 justify-center items-center md:pt-8 pb-8 ">
        <div className="text-center">
          <h3 className="font-bold text-2xl md:text-4xl">15K</h3>
          <h4>Happy Customers</h4>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-2xl md:text-4xl">150K</h3>
          <h4>Monthly Visitors</h4>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-2xl md:text-4xl">15</h3>
          <h4>Countries Worldwide</h4>
        </div>
        <div className="text-center">
          <h3 className="font-bold text-2xl md:text-4xl">100+</h3>
          <h4>Top Partners</h4>
        </div>
      </div>

      <img
        src="/assets/about/about-intro.jpg"
        className="w-8/12 md:w-5/12 mx-auto my-16 h-auto rounded-lg"
      />

      <div className="flex flex-col justify-center items-center pb-12">
        <div className="text-center py-8 mb-12 w-2/3 md:w-1/3">
          <h3 className="font-bold text-2xl md:text-3xl mb-2">Meet Our Team</h3>
          <h5 className="text-gray-700">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            nisi?
          </h5>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/about/person/person1.jpg"
              className="w-60 h-auto rounded-lg shadow-2xl"
            />
            <h5 className="font-semibold text-xl">Username</h5>
            <h5 className="font-semibold text-gray-700">Proffesion</h5>
            <div className="flex gap-4">
              <FaFacebook className="text-[#63a5ea] text-2xl"/>
              <FaInstagram className="text-[#63a5ea] text-2xl"/>
              <FaTwitter className="text-[#63a5ea] text-2xl"/>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/about/person/person2.jpg"
              className="w-60 h-auto rounded-lg shadow-2xl"
            />
            <h5 className="font-semibold text-xl">Username</h5>
            <h5 className="font-semibold text-gray-700">Proffesion</h5>
            <div className="flex gap-4">
              <FaFacebook className="text-[#63a5ea] text-2xl"/>
              <FaInstagram className="text-[#63a5ea] text-2xl"/>
              <FaTwitter className="text-[#63a5ea] text-2xl"/>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/about/person/person3.jpg"
              className="w-60 h-auto rounded-lg shadow-2xl"
            />
            <h5 className="font-semibold text-xl">Username</h5>
            <h5 className="font-semibold text-gray-700">Proffesion</h5>
            <div className="flex gap-4">
              <FaFacebook className="text-[#63a5ea] text-2xl"/>
              <FaInstagram className="text-[#63a5ea] text-2xl"/>
              <FaTwitter className="text-[#63a5ea] text-2xl"/>
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex w-full">
        <div className="grow bg-[#63a5ea] text-white flex flex-col max-md:items-center max-md:text-center px-12 md:px-32 gap-5 md:gap-10 py-8 py-auto justify-center">
        <h3 className="font-semibold text-xs md:text-lg lg:text-xl">
            WORK WITH US
          </h3>
          <h2 className="text-xl md:text-3xl lg:text-6xl font-bold">
            NOW Let's Grow Yours
          </h2>
          <h4 className=" text-xs md:text-lg lg:text-xl">
            The gradual accumulation of information about atomic and small-scall behavior during the first quarter of the 20th
          </h4>
          <button className="text-xs sm:text-base lg:text-lg bg-[#63a5ea] rounded-lg text-white py-2 md:py-4 px-4 md:px-8 font-bold border-2 border-white w-1/2  lg:w-1/3">
            Get Quote Now
          </button>
        </div>
        <img src="/assets/about/about-invite.jpg" className="w-[30%] h-auto max-md:hidden"/>
      </div>


    </div>
  );
};

export default About;

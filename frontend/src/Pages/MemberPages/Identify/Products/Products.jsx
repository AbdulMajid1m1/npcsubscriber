import React, { useState } from "react";
import listrequst from "../../../../Images/listrequst.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Sample data for requests
  const requests = Array.from({ length: 20 }, (_, index) => ({
    id: index + 12345,
    name: `Request #${index + 12345}`,
  }));

  // Filter requests based on the search term
  const filteredRequests = requests.filter((request) =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
        <div className="flex items-center flex-wrap space-x-2 mb-6">
          {/* Standard Search Button */}
          <button className="relative flex items-center justify-center bg-purple-600 text-white py-2 px-5 shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-transform focus:outline-none trapezoid-left">
            <div
              className="absolute left-2 flex items-center justify-center bg-orange-500 rounded-full"
              style={{ width: "35px", height: "35px" }}
            >
              <i className="fas fa-search text-white"></i>
            </div>
            <span className="ml-10">Standard Search</span>
          </button>

          {/* AI Search Button */}
          <button className="bg-orange-300 text-white py-2 px-5 shadow-lg hover:bg-orange-400 transform hover:scale-105 transition-transform focus:outline-none trapezoid-right">
            <span>AI Search</span>
          </button>
        </div>

        <h2 className="text-xl font-sans font-semibold text-secondary mb-4">
          Products
        </h2>

        {/* Top Bar */}
        <div className="relative mb-6 flex justify-between items-center flex-wrap">
          <button className="flex items-center justify-center bg-primary2 font-sans text-white sm:px-10 px-3 py-2 rounded hover:bg-orange-700 focus:outline-none">
            <i className="fas fa-th-large mr-2"></i>
            Browse All Categories
          </button>

          {/* Search Input */}
          <div className="relative flex items-center border rounded shadow focus-within:ring focus-within:ring-blue-300 sm:w-80 ml-4">
            <input
              type="text"
              className="px-4 py-2 pr-10 rounded focus:outline-none w-full"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3">
              <i className="fas fa-search text-gray-500"></i>
            </div>
          </div>
        </div>

        <div className="mb-4 h-auto">
          <div className="bg-white p-6 shadow-md rounded-lg">
            {/* Swiper Slider */}
            <Swiper
              slidesPerView={2}
              spaceBetween={0}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                },
                768: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
              }}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper"
            >
              {filteredRequests.map((request) => (
                <SwiperSlide key={request.id}>
                  <div
                    // onClick={() => navigate(`/member/product-details`)}
                    className="flex flex-col items-center justify-center w-full h-60 transition-transform transform hover:scale-105"
                  >
                    <div className="w-32 h-32 mb-2 overflow-hidden rounded-full border border-[#71BAEF] shadow-lg">
                      <img
                        src={listrequst}
                        alt={request.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-center font-normal font-sans text-secondary">
                      {request.name}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Grid of Requests */}
        <div className="sm:py-5 py-3">
          <h2 className="text-secondary font-semibold sm:text-2xl text-lg font-sans">
            Search by Product Classifications
          </h2>
        </div>
        <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              onClick={() => navigate(`/member/product-details`)}
              className="flex flex-col items-center border border-[#71BAEF] rounded-lg p-4 shadow-xl hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={listrequst}
                alt={request.name}
                className="w-36 h-36 mb-4 object-contain"
              />
              <p className="text-center font-normal font-sans text-secondary">
                {request.name}
              </p>
              <button className="flex items-center justify-center bg-primary2 font-sans text-white sm:px-10 px-2 py-1 mt-2 rounded hover:bg-orange-700 focus:outline-none">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

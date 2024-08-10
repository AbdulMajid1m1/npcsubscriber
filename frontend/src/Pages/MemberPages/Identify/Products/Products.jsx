import React, { useState } from "react";
import listrequst from "../../../../Images/listrequst.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Products = () => {
  const [activeTab, setActiveTab] = useState('Standard Search');
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  
  const tabs = [
    { name: 'Standard Search', icon: '' },
    { name: 'AI Search', icon: '' },
  ];

  // Sample data for requests
  const requests = Array.from({ length: 20 }, (_, index) => ({
    id: index + 12345,
    itemcode: `Request #${index + 12345}`,
    companyname: `Company #${index + 12345}`,
  }));

  // Filter requests based on the search term
  const filteredRequests = requests.filter((request) =>
    request.itemcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.companyname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
        <div className="flex items-center flex-wrap space-x-2 mb-6">
          {/* Standard Search Button Tabs */}
          <div className="overflow-x-auto">
            <div className="flex justify-start items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center justify-center text-sm py-3 px-3 font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.name
                      ? 'bg-[#fdba74] text-secondary shadow-lg relative z-10'
                      : 'bg-[#D4E1F1] text-gray-600 hover:bg-gray-300'
                  }`}
                  style={{
                    clipPath: activeTab === tab.name
                      ? 'polygon(0% 0%, 90% 0%, 95% 100%, 5% 100%, 10% 10%)'
                      : 'polygon(10% 0%, 90% 0%, 95% 100%, 5% 100%)',
                    width: '150px',
                    height: activeTab === tab.name ? '50px' : '40px',
                    marginLeft: activeTab === tab.name ? '0px' : '-15px',
                  }}
                >
                  {tab.icon && <span className="mr-2">{tab.icon}</span>}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
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
              className="flex flex-col border border-[#D1D5DB] rounded-lg p-2 shadow-lg hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={listrequst}
                alt={request.companyname}
                className="w-36 h-36 mb-4 object-contain self-center"
              />
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="font-sans text-sm text-secondary">
                    {request.itemcode}
                  </p>
                  <p className="font-sans text-sm text-secondary">
                    {request.companyname}
                  </p>
                </div>
                <button className="font-sans text-xs bg-secondary text-white py-1 px-2 rounded-lg shadow-xl">
                  Add to Request
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

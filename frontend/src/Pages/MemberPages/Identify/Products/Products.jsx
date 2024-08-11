import React, { useState, useEffect } from "react";
import listrequst from "../../../../Images/listrequst.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import infoicon from "../../../../Images/infoicon.png";
import addtorequest from "../../../../Images/addtorequest.png";
import { FaPlus } from "react-icons/fa";
import ProductDetails from "./ProductDetails";
import NpcWorkFlowPopUp from "./NpcWorkFlowPopUp";
import { FaPlus } from "react-icons/fa";
import { ImSpinner6 } from "react-icons/im";
import { newRequestnpc } from "../../../../utils/userRequest";
import { toast } from "react-toastify";
import { toast } from "react-toastify";
import axios from "axios";

const Products = () => {
  const [activeTab, setActiveTab] = useState("Standard Search");
  const [selectedWorkflowPopup, setSelectedWorkflowPopup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://gs1ksa.org:3091/api/products?user_id=3716`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiY2x0aXowN2tlMDAwMTEza24xOHIwcHE3NyIsImVtYWlsIjoiYWJkdWxtYWppZDFtMkBnbWFpbC5jb20iLCJpc19zdXBlcl9hZG1pbiI6MSwidXNlcm5hbWUiOiJBYmR1bCBNYWppZCIsInBlcm1pc3Npb25zIjpbIm1lbWJlcnMiLCJicmFuZHMiLCJndGluX2JhcmNvZGUiLCJnbG5fbG9jYXRpb24iLCJzc2NjIiwiZm9yZWlnbl9ndGluIiwicGF5bWVudF9zbGlwc19mb3JlaWduX2d0aW4iLCJvbGRfaW5hY3RpdmVfbWVtYmVycyIsImhlbHBfZGVzayIsInN0YWZmX2hlbHBfZGVzayIsInByb2R1Y3RfcGFja2FnaW5nIiwib3RoZXJfcHJvZHVjdHMiLCJjcl9udW1iZXIiXSwicm9sZXMiOlsiTWFya2V0aW5nIFN0YWZmIl0sImlhdCI6MTcyMzI3MTQ3OSwiZXhwIjoxNzMxMDQ3NDc5fQ.T0Fjd3ca4EFuzGwtpgTRhSieWgcDTBHzTsTwdC16-3A`,
          },
        }
      );
      console.log(response.data);
      // console.log(response.data);
      setData(response?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const tabs = [
    { name: "Standard Search", icon: "" },
    { name: "AI Search", icon: "" },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://gs1ksa.org:3091/api/products/paginatedProducts?page=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiY2x0aXowN2tlMDAwMTEza24xOHIwcHE3NyIsImVtYWlsIjoiYWJkdWxtYWppZDFtMkBnbWFpbC5jb20iLCJpc19zdXBlcl9hZG1pbiI6MSwidXNlcm5hbWUiOiJBYmR1bCBNYWppZCIsInBlcm1pc3Npb25zIjpbIm1lbWJlcnMiLCJicmFuZHMiLCJndGluX2JhcmNvZGUiLCJnbG5fbG9jYXRpb24iLCJzc2NjIiwiZm9yZWlnbl9ndGluIiwicGF5bWVudF9zbGlwc19mb3JlaWduX2d0aW4iLCJvbGRfaW5hY3RpdmVfbWVtYmVycyIsImhlbHBfZGVzayIsInN0YWZmX2hlbHBfZGVzayIsInByb2R1Y3RfcGFja2FnaW5nIiwib3RoZXJfcHJvZHVjdHMiLCJjcl9udW1iZXIiXSwicm9sZXMiOlsiTWFya2V0aW5nIFN0YWZmIl0sImlhdCI6MTcyMzI3MTQ3OSwiZXhwIjoxNzMxMDQ3NDc5fQ.T0Fjd3ca4EFuzGwtpgTRhSieWgcDTBHzTsTwdC16-3A`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setRequests(data.products);
      const totalPages = Math.ceil(data.totalProducts / pageSize);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setRequests([]); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageInput = (e) => {
    const page = Number(e.target.value);
    if (!isNaN(page)) {
      handlePageChange(page);
    }
  };
  
    const updateBrandData = JSON.parse(sessionStorage.getItem("npcUserLoginData"));
    console.log(updateBrandData.user.id);
    

  const cardfunction = (request)=>{
    console.log(request.barcode);
    
  try {
      const response = newRequestnpc.post("/master-data/createproductRequest", {
        brand_owner_user_id: "3716",
        npc_user_id: updateBrandData.user.id,
        status: "2",
        barcode: request.barcode,
      });
        toast.success(response?.data?.message || "Add to Request Successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login Failed");
      setLoading(false);
    }

  }

  console.log("data", data);
  const filteredRequests =
    data &&
    data.filter(
      (request) =>
        request.HSCODES?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        request.BrandName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

  const [isMyProductsPopUpVisible, setIsMyProductsPopUpVisible] =
    useState(false);
  const handleMyProductsPopUp = (data) => {
    setIsMyProductsPopUpVisible(true);
  };

  const [isWorkFlowPopUpVisible, setIsWorkFlowPopUpVisible] = useState(false);
  const handleWorkFlowPopUp = (data) => {
    console.log("data", data);
    setSelectedWorkflowPopup(data);
    setIsWorkFlowPopUpVisible(true);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 shadow-md">
        {/* Tabs */}
        <div className="flex items-center flex-wrap space-x-2 mb-6">
          <div className="overflow-x-auto">
            <div className="flex justify-start items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center justify-center text-sm py-3 px-3 font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.name
                      ? "bg-[#fdba74] text-secondary shadow-lg relative z-10"
                      : "bg-[#D4E1F1] text-gray-600 hover:bg-gray-300"
                  }`}
                  style={{
                    clipPath:
                      activeTab === tab.name
                        ? "polygon(0% 0%, 90% 0%, 95% 100%, 5% 100%, 10% 10%)"
                        : "polygon(10% 0%, 90% 0%, 95% 100%, 5% 100%)",
                    width: "150px",
                    height: activeTab === tab.name ? "50px" : "40px",
                    marginLeft: activeTab === tab.name ? "0px" : "-15px",
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

        <div className="relative mb-6 flex justify-between items-center flex-wrap">
          <button className="flex items-center justify-center bg-primary2 font-sans text-white sm:px-10 px-3 py-2 rounded hover:bg-orange-700 focus:outline-none">
            <i className="fas fa-th-large mr-2"></i>
            Browse All Categories
          </button>

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

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <ImSpinner6 className="text-blue-500 text-4xl animate-spin" />
          </div>
        ) : (
          <>
            {/* Swiper Component */}
            <div className="mb-4 h-auto">
              <div className="relative bg-white p-6 shadow-md rounded-lg">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={10}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  navigation={{
                    nextEl: "#swiper-button-next",
                    prevEl: "#swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 10,
                    },
                  }}
                  modules={[Pagination, Autoplay, Navigation]}
                  className="mySwiper"
                >
                  {requests.map((request) => (
                    <SwiperSlide key={request.id}>
                      <div className="flex flex-col items-center justify-center w-full h-60 transition-transform transform hover:scale-105">
                        <div className="w-32 h-32 mb-2 overflow-hidden rounded-full border border-[#71BAEF] shadow-lg">
                          <img
                            src={listrequst}
                            alt={request.barcode}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <p className="text-center font-normal font-sans text-secondary">
                          {request.barcode}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div
                  id="swiper-button-prev"
                  className="absolute left-0 top-1/2 z-50 -translate-y-1/2 transform md:left-1"
                >
                  <IoIosArrowDropleftCircle className="cursor-pointer rounded-full border-white text-4xl text-black opacity-40 hover:border hover:opacity-80" />
                </div>
                <div
                  id="swiper-button-next"
                  className="absolute right-0 top-1/2 z-20 -translate-y-1/2 transform md:right-1"
                >
                  <IoIosArrowDroprightCircle className="cursor-pointer rounded-full border-white text-4xl text-black opacity-40 hover:border hover:opacity-80" />
                </div>
              </div>
            </div>

            {/* Search by Product Classifications */}
            <div className="sm:py-5 py-3">
              <h2 className="text-secondary font-semibold sm:text-2xl text-lg font-sans">
                Search by Product Classifications
              </h2>
            </div>

            <div className="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
              {requests
                .filter(
                  (request) =>
                    request.barcode
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    request.BrandName.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                )
                .map((request) => (
                  <div
                  key={request.id}
                  className="flex flex-col border border-[#D1D5DB] rounded-lg p-2 shadow-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div 
                  onClick={() => navigate(`/member/product-details`)}>
                  <p className="text-center font-normal font-sans text-white bg-[#100DA6]">
                    GTIN:{request.gcpGLNID}
                  </p>
                  <img
                    src={listrequst}
                    alt={request.BrandName}
                    className="w-36 h-36 mb-4 object-contain self-center"
                  />
                  <p className="text-center font-normal font-sans text-white text-sm bg-[#100DA6]">
                  {request.barcode}
                  </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <img src={infoicon} alt="Info" className="w-8 h-8 cursor-pointer" />
                    <div className="flex items-center">
                      <div className="flex items-center bg-[#FFB484] rounded-l-full px-2 py-1">
                        <img src={addtorequest} alt="Info" className="w-6 h-5 cursor-pointer" />
                      </div>
                      <div className="bg-[#100DA6] rounded-r-full px-3 py-1 cursor-pointer" onClick={()=>cardfunction(request)}>
                        <FaPlus className="text-white" size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                ))}
            </div>
          </>
        )}
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          >
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <span>Page</span>
            <input
              type="number"
              value={currentPage}
              onChange={handlePageInput}
              className="w-16 px-2 py-1 border border-gray-300 rounded-lg"
              min="1"
              max={totalPages}
            />
            <span>of {totalPages}</span>
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>

      {isMyProductsPopUpVisible && (
        <ProductDetails
          isVisible={isMyProductsPopUpVisible}
          setVisibility={setIsMyProductsPopUpVisible}
        />
      )}

      {isWorkFlowPopUpVisible && (
        <NpcWorkFlowPopUp
          isVisible={isWorkFlowPopUpVisible}
          setVisibility={setIsWorkFlowPopUpVisible}
          data={selectedWorkflowPopup}
        />
      )}
    </div>
  );
};

export default Products;

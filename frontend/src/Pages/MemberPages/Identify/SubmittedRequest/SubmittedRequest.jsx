import React, { useContext, useEffect, useState } from "react";
import { allproductColumn } from "../../../../utils/datatablesource";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { QRCodeSVG } from "qrcode.react";
import logo from "../../../../Images/gs1logowhite.png";
import { toast } from "react-toastify";
import Barcode from "react-barcode";
import { useTranslation } from "react-i18next";
import DataTable from "../../../../components/Datatable/Datatable";
import newRequest, { newRequestnpc } from "../../../../utils/userRequest";
import { DataTableContext } from "../../../../Contexts/DataTableContext";

const SubmittedRequest = () => {
  const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();
  // const memberDataString = sessionStorage.getItem('memberData');
  // const memberData = JSON.parse(memberDataString);
  // console.log(memberData);
  // const cartItemData = JSON.parse(memberData?.carts[0]?.cart_items);
  // console.log(cartItemData);
  const {
    rowSelectionModel,
    setRowSelectionModel,
    tableSelectedRows,
    setTableSelectedRows,
    tableSelectedExportRows,
    setTableSelectedExportRows,
  } = useContext(DataTableContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

const fetchData = async () => {
  setIsLoading(true);
  try {
    const response = await newRequestnpc.get("/master-data/getAllProductRequests");
    console.log(response?.data);
     const filteredData = response?.data?.filter(item => item.status === '0' || item.status === "2") || [];
    setData(filteredData|| []); // Ensure data is always an array
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    console.log(row);
    navigate("/member/upate-gtin-product/" + row?.id);
    // navigate("/upate-gtin-product/" + row?.id);
  };

  const handleView = (row) => {
    console.log(row);
    navigate("/member/view-gtin-product/" + row?.id);
  };

  const handleDelete = async (row) => {
    try {
      const deleteResponse = await newRequest.delete(
        `/products/gtin/${row?.id}`
      );
      console.log(deleteResponse.data);
      toast.success(`${t("The product has been deleted successfully")}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // Update the datagrid Table after deletion
      setData((prevData) => prevData.filter((item) => item.id !== row?.id));
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Error", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleRowClickInParent = (item) => {
    if (!item || item?.length === 0) {
      // setTableSelectedRows(data)
      setTableSelectedExportRows(item);
      setFilteredData(data);
      return;
    }

    const barcodes = item.map((row) => row.barcode);
    console.log(barcodes); // This will log an array of barcodes
    setTableSelectedRows(barcodes);
  };

  return (
    <div>
      {/* <SideNav> */}
      <div className={`p-0 h-full bg-dashboard-color min-h-screen`}>
        {/* <div>
          <DashboardRightHeader title={'GTIN'} />
        </div> */}

        <div className="flex justify-center items-center">
          <div className="h-auto w-[97%] px-0 pt-4">
            <div className="h-auto w-full p-0 bg-white shadow-xl rounded-md">
              <div style={{ marginLeft: "-11px", marginRight: "-11px" }}>
                <DataTable
                  data={data}
                  title={"Submitted Request"}
                  columnsName={allproductColumn}
                  loading={isLoading}
                  secondaryColor="secondary"
                  handleRowClickInParent={handleRowClickInParent}
                  actionColumnVisibility={false}
                  dropDownOptions={[
                    // {
                    //   label: "View",
                    //   icon: (
                    //     <VisibilityIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleView,
                    // },
                    // {
                    //   label: `${t("Edit")}`,
                    //   icon: (
                    //     <EditIcon
                    //       fontSize="small"
                    //       color="action"
                    //       style={{ color: "rgb(37 99 235)" }}
                    //     />
                    //   ),
                    //   action: handleEdit,
                    // },
                    {
                      label: "Delete",
                      icon: (
                        <DeleteIcon
                          fontSize="small"
                          style={{ color: "#FF0032" }}
                        />
                      ),
                      action: handleDelete,
                    },
                  ]}
                  uniqueId="gtinMainTableId"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </SideNav> */}
    </div>
  );
};

export default SubmittedRequest;

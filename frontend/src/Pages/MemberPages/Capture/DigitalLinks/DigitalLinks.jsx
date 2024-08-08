import React, { useState } from 'react';
import DataTable from '../../../../components/Datatable/Datatable';
import { GtinColumn, InventorySuppliersDataColumn } from '../../../../utils/datatablesource';

const DigitalLinks = () => {
  const [activeTab, setActiveTab] = useState('Products Contents');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 
  const tabs = [
    { name: 'Products Contents', icon: 'ℹ️' },
    { name: 'Nutritional', icon: '' },
    { name: 'Allergen', icon: '' },
    { name: 'Certification', icon: '' },
    { name: 'Storage', icon: '' },
    { name: 'Ingredients', icon: '' },
    { name: 'Logistics', icon: '' },
    { name: 'Retail', icon: '' },
    { name: 'Seasonal Availability', icon: '' },
    { name: 'Recipes & Tips', icon: '' },
    { name: 'Services', icon: '' },
    { name: 'Packaging', icon: '' },
  ];

  return (
    <div className="mx-auto p-4 bg-[#DDF3F6]">
      <div className="overflow-x-auto shadow-xl bg-white px-3 py-2">
        <table className="min-w-full mb-4">
          <thead>
            <tr className="w-full bg-[#71BAEF]">
              <th className="py-1 px-4 text-gray-700 font-semibold">Product Name</th>
              <th className="py-1 px-4 text-gray-700 font-semibold">Brand Name</th>
              <th className="py-1 px-4 text-gray-700 font-semibold">Barcode</th>
              <th className="py-1 px-4 text-gray-700 font-semibold">Company</th>
              <th className="py-1 px-4 text-gray-700 font-semibold">Licence Type</th>
              <th className="py-1 px-4 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1 px-4 border-b text-sm">Luxurious green cardamom1</td>
              <td className="py-1 px-4 border-b text-sm">Nartec</td>
              <td className="py-1 px-4 border-b text-sm">
                <span className="bg-green-700 text-white rounded-full px-3 py-1">6281100042921</span>
              </td>
              <td className="py-1 px-4 border-b text-sm">CreativeM</td>
              <td className="py-1 px-4 border-b text-sm">---</td>
              <td className="py-1 px-4 border-b text-sm">
                <button className="bg-blue-500 text-white px-4 py-1 rounded">Add Digital Link</button>
              </td>
            </tr>
          </tbody>
        </table>

        </div>
        

        {/* Tabs */}
        <div className="overflow-x-auto mt-3">
          <div className="flex justify-start items-center">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center justify-center text-xs py-3 px-3 font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.name
                    ? 'bg-[#5523E4] text-white shadow-lg relative z-10'
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

        <div className="pt-0 min-h-screen">
          <div className="bg-white p-3 shadow-md border-t-[20px] border-primary2 rounded-md">
           <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>

            <DataTable data={data} title={activeTab} columnsName={InventorySuppliersDataColumn}
              loading={isLoading}
              secondaryColor="secondary"
              // handleRowClickInParent={handleRowClickInParent}
              uniqueId="customerListId"

              dropDownOptions={[
                // {
                //   label: `${t('Edit')}`,
                //   icon: <EditIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                //   ,
                //   action: handleEdit

                // },
                
                // {
                //   label: 'Delete',
                //   icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                //   ,
                //   action: handleDelete,
                // }

              ]}

            />
            </div>
          </div>
        </div>
    </div>
  );
};

export default DigitalLinks;

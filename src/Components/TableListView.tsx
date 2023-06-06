import React from "react";
import { Table } from "antd";
// import type { ColumnsType } from "antd/es/table";

interface AppointmentData {
  key: string;
  name: string;
  timeSlot: string;
  date: string;
}

interface CreateAppointmentModalProps {
  // closeModal: () => void;
  appointmentDetails: AppointmentData[];
  listView: boolean;
}

const TableListView: React.FC<CreateAppointmentModalProps> = ({
  appointmentDetails,
  listView,
}) => {
  console.log("appointmentDetails", appointmentDetails);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      key: "timeSlot",
    },
  ];

  return (
    <div className="py-4">
      {listView ? (
        <div className="flex flex-col">
          {appointmentDetails.map((data) => (
            <div className="flex justify-between pb-2 border-b-2">
              <div>
                <span>Name: </span>
                <span>{data.name}</span>
              </div>
              <div>
                <span>Date: </span>
                <span>{data.date}</span>
              </div>
              <div>
                <span>Time Slot: </span>
                <span>{data.timeSlot}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table dataSource={appointmentDetails} columns={columns} />
      )}
    </div>
  );
};

export default TableListView;

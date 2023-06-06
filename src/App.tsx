import React from "react";
import Header from "./Components/Header";
import ActionsContainer from "./Components/ActionsContainer";
import TableListView from "./Components/TableListView";
import CreateAppointmentModel from "./Components/CreateAppointmentModel";

const App: React.FC = () => {
  const [appointmentDetails, setAppointmentDetails] = React.useState([
    {
      key: "1",
      name: "social",
      timeSlot: "9:00 - 9:30",
      date: "2023-06-01",
    },
    {
      key: "2",
      name: "social1",
      timeSlot: "10:00 - 10:30",
      date: "2023-06-01",
    },
    {
      key: "3",
      name: "social2",
      timeSlot: "19:00 - 19:30",
      date: "2023-06-01",
    },
    {
      key: "4",
      name: "social3",
      timeSlot: "11:00 - 11:30",
      date: "2023-06-01",
    },
    {
      key: "5",
      name: "social4",
      timeSlot: "11:30 - 12:00",
      date: "2023-06-01",
    },
    {
      key: "6",
      name: "social5",
      timeSlot: "12:00 - 12:30",
      date: "2023-06-01",
    },
    {
      key: "7",
      name: "social6",
      timeSlot: "13:00 - 13:30",
      date: "2023-06-01",
    },
  ]);
  const [modelOpen, setModalOpen] = React.useState(false);
  const [listView, setListView] = React.useState(true);

  const closeCreateAppointmentModel = () => {
    setModalOpen(false);
  };
  const openCreateAppointmentModel = () => {
    setModalOpen(true);
  };
  const createAppointment = (data: any) => {
    console.log("data", data);
    const newAppointment = {
      key: String(appointmentDetails.length + 1),
      name: String(data.name),
      timeSlot: String(data.slot),
      date: String(data.date),
    };
    setAppointmentDetails([...appointmentDetails, newAppointment]);
    localStorage.setItem(
      "appointmentDetails",
      JSON.stringify([...appointmentDetails, newAppointment])
    );
    closeCreateAppointmentModel();
  };

  return (
    // bg-green-400
    <div className="flex flex-col h-screen px-6 ">
      <Header></Header>
      <ActionsContainer
        openCreateAppointmentModel={openCreateAppointmentModel}
        setListView={setListView}
        listView={listView}
      ></ActionsContainer>
      <TableListView
        listView={listView}
        appointmentDetails={
          localStorage.getItem("appointmentDetails")
            ? JSON.parse(localStorage.getItem("appointmentDetails") || "")
            : appointmentDetails
        }
      ></TableListView>
      <CreateAppointmentModel
        appointmentDetails={
          localStorage.getItem("appointmentDetails")
            ? JSON.parse(localStorage.getItem("appointmentDetails") || "")
            : appointmentDetails
        }
        modelOpen={modelOpen}
        createAppointment={createAppointment}
        closeCreateAppointmentModel={closeCreateAppointmentModel}
      ></CreateAppointmentModel>
    </div>
  );
};

export default App;

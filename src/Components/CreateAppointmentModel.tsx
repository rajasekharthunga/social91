import React from "react";
import { Button, Modal } from "antd";

interface AppointmentData {
  key: string;
  name: string;
  timeSlot: string;
  date: string;
}

interface CreateAppointmentModalProps {
  appointmentDetails: AppointmentData[];
  modelOpen: boolean;
  createAppointment: any;
  closeCreateAppointmentModel: any;
}

const CreateAppointmentModel: React.FC<CreateAppointmentModalProps> = ({
  appointmentDetails,
  modelOpen,
  createAppointment,
  closeCreateAppointmentModel,
}) => {
  const [appointmentData, setAppointmentData] = React.useState({
    name: "",
    date: "",
    time: "",
    slot: "",
  });

  const [suggestedSlot, setSuggestedSlot] = React.useState<string[]>([]);
  const [warnMessage, setWarnMessage] = React.useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   console.log("appointmentData", appointmentData);
  //   // Validate the input fields before adding the appointment
  //   if (appointmentData.name && appointmentData.date && appointmentData.time) {
  //     // saddAppointment(appointmentData);
  //     // closeModal();
  //   } else {
  //     alert("Please fill in all fields.");
  //   }
  // };

  const timeSlot = [
    "9:00 - 9:30",
    "9:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00",

    "16:00 - 16:30",
    "16:30 - 17:00",
    "17:00 - 17:30",
    "17:30 - 18:00",
    "18:00 - 18:30",
    "18:30 - 19:00",
    "19:00 - 19:30",
    "19:30 - 20:00",
  ];

  const pickedTimeSlot = appointmentDetails.map((detail) => detail.timeSlot);

  function findNearestTimeSlot(timeSlots: any, targetTime: any) {
    timeSlots = timeSlots.map((slot: any) => {
      return slot.split("-")[0].trimEnd();
    });

    // Convert targetTime to minutes
    const targetMinutes = convertToMinutes(targetTime);

    let nearestSlot = timeSlots[0];
    let minDifference = Math.abs(
      convertToMinutes(timeSlots[0]) - targetMinutes
    );

    for (let i = 1; i < timeSlots.length; i++) {
      // Calculate the difference between the current time slot and the target
      const slotMinutes = convertToMinutes(timeSlots[i]);
      const difference = Math.abs(slotMinutes - targetMinutes);

      // Check if the current difference is smaller than the previous minimum difference
      if (difference < minDifference) {
        // Update the nearest time slot and minimum difference
        nearestSlot = timeSlots[i];
        minDifference = difference;
      }
    }

    // Return the nearest time slot
    debugger;
    return nearestSlot;
  }

  function convertToMinutes(time: any) {
    const [hours, minutes] = time.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
  }

  React.useEffect(() => {
    if (appointmentData.time) {
      const nearstStartingHour = findNearestTimeSlot(
        timeSlot.filter((time) => !pickedTimeSlot.includes(time)),
        appointmentData.time
      );
      const suggestedSlot = timeSlot.filter(
        (time) =>
          !pickedTimeSlot.includes(time) &&
          time.split("-")[0].trimEnd() === nearstStartingHour
      );
      setSuggestedSlot(suggestedSlot);
    }
  }, [appointmentData]);

  return (
    <div>
      <Modal
        title="Create Appointment"
        centered
        open={modelOpen}
        okButtonProps={{ style: { backgroundColor: "blue" } }}
        onOk={(e) => {
          if (
            appointmentData.name &&
            appointmentData.slot &&
            appointmentData.date
          ) {
            createAppointment(appointmentData);
            setWarnMessage(false);
          } else {
            setWarnMessage(true);
          }
        }}
        onCancel={(e) => {
          setWarnMessage(false);
          setAppointmentData({
            name: "",
            date: "",
            time: "",
            slot: "",
          });
          closeCreateAppointmentModel();
        }}
      >
        {/* <form onSubmit={handleSubmit}> */}
        <div className="flex flex-col px-6 ">
          {warnMessage && (
            <span className="text-pink-400">
              Please fill in all the neccessary details
            </span>
          )}
          <div className="flex mb-4">
            <label htmlFor="name">Name* :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={appointmentData.name}
              onChange={handleInputChange}
              className="ml-2"
            />
          </div>
          <div className="flex mb-4">
            <label htmlFor="date">Date* :</label>
            <input
              type="date"
              id="date"
              name="date"
              value={appointmentData.date}
              onChange={handleInputChange}
              className="ml-2"
            />
          </div>
          <div className="flex mb-4">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={appointmentData.time}
              onChange={handleInputChange}
              className="ml-2"
            />
          </div>
          <div className="flex mb-4">
            <span className="text-pink-400">
              Click on the suggested Slot value to pick as the Time Slot
            </span>
          </div>
          <div className="flex mb-4">
            <label htmlFor="suggestedSlot">Suggested Slot :</label>
            <span
              className="pl-2 cursor-pointer"
              onClick={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  slot: suggestedSlot[0],
                })
              }
            >
              {suggestedSlot}
            </span>
          </div>
          <div className="flex mb-4">
            <label htmlFor="time">Time Slot* :</label>
            <select
              id="slot"
              name="slot"
              value={appointmentData.slot}
              onChange={handleInputChange}
              className="ml-2"
            >
              <option value="">Select a time slot</option>
              {timeSlot.map((slot) => (
                <option disabled={pickedTimeSlot.includes(slot)} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* </form> */}
      </Modal>
    </div>
  );
};

export default CreateAppointmentModel;

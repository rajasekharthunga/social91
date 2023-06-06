import React from "react";
import {
  UnorderedListOutlined,
  TableOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Switch, Input, Button } from "antd";

interface ActionsContainerInterface {
  openCreateAppointmentModel: any;
  setListView: any;
  listView: boolean;
}

const ActionsContainer: React.FC<ActionsContainerInterface> = ({
  openCreateAppointmentModel,
  setListView,
  listView,
}) => {
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="py-4 flex justify-between">
      {/*

            Toggle Button
            Search
            Create Appointment button
        
        */}

      <Switch
        checkedChildren={<UnorderedListOutlined />}
        unCheckedChildren={<TableOutlined />}
        defaultChecked
        onChange={(e) => setListView(!listView)}
        className="bg-blue-400"
      />
      {/* <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      /> */}
      <Button
        type="primary"
        size={"large"}
        icon={<PlusSquareOutlined />}
        onClick={openCreateAppointmentModel}
        className="bg-blue-400 flex justify-center items-center"
      >
        Create Appointment
      </Button>
    </div>
  );
};

export default ActionsContainer;

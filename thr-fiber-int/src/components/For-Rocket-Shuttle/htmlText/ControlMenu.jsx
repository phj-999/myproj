import React from "react";
import { Button } from "antd";
import { PoweroffOutlined, BulbOutlined } from "@ant-design/icons";
import { useRingLampsStore } from "@/store/store";

const ControlMenu = (props) => {
  const { isVisable } = useRingLampsStore(
    (state) => state.ringLampsState
  );
  const closeLamps = useRingLampsStore((state) => state.closeLamps);
  const openLamps = useRingLampsStore((state) => state.openLamps);
  const CloseRingBule = () => {
    closeLamps();
  }; //光环灯光关闭
  const OpenRingBule = () => {
    openLamps();
  }; // 光环灯光打开
  return (
    <div
      className="
       flex 
       md:flex-row md:justify-between md:content-center
       sm:flex-col
       w-auto h-auto
       absolute 
       top-20 right-10
       opacity-60
       bg-optblue 
       pointer-events-auto
       ring ring-indigo-300 
       z-20 "
    >
      {isVisable ? (
        <Button style={{ pointerEvents: "auto" }} onClick={CloseRingBule} ghost>
          <PoweroffOutlined />
          关闭光环灯光
        </Button>
      ) : (
        <Button style={{ pointerEvents: "auto" }} onClick={OpenRingBule} ghost>
          <BulbOutlined />
          打开光环灯光
        </Button>
      )}
    </div>
  );
};

export default ControlMenu;
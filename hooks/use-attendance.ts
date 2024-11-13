"use client";

import axios from "axios";

const socket = new WebSocket("ws//192.168.100.84/ws");

const useAttendance = () => {
  socket.onopen = () => {
    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.mode === "attendance") {
        try {
          await axios.post(`/api/staffs/attendance/`, data.fingerprintId);
        } catch (error) {
          console.error("failed to record attendance: ", error);
        }
      }
    };
  };
};

export default useAttendance;

"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useAttendance = () => {
  const [fingerprintId, setFingerprintId] = useState(null);

  useEffect(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socketIo.on("attendance", (data) => {
      console.log("Received fingerprint ID:", data);
      setFingerprintId(data);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return { fingerprintId };
};

export default useAttendance;

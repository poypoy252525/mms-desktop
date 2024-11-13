console.log(process.env.NEXT_PUBLIC_SOCKET_URL);
import { useEffect, useState } from "react";
import io from "socket.io-client";

const useFingerprintEnroll = () => {
  const [fingerprintId, setFingerprintId] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server (replace 'http://localhost:3001' with your server's URL)
    const socketIo = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    // Listen for the 'new-fingerprint' event
    socketIo.on("new-fingerprint", (data) => {
      console.log("Received fingerprint ID:", data);
      setFingerprintId(data); // Store the fingerprintId in state
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return { fingerprintId };
};

export default useFingerprintEnroll;

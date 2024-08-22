import React from "react";

const page = ({ params: { id } }: { params: { id: number } }) => {
  return <div>{id}</div>;
};

export default page;

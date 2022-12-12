import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  const styles = {
    width: "120px",
    height: "120px",
    backgroundColor: "#ad876c",
  };

  return (
    <div className="text-center m-5">
      <Spinner style={styles} animation="grow" />
    </div>
  );
};

export default Loader;

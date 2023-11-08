import { HashLoader } from "react-spinners";
import { CSSProperties } from "react";

const override: CSSProperties = {
  position: "absolute",
  display: "block",
  margin: "0 auto",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderColor: "red"
};

function Loader({ loading }) {
  return (
    <>
      <HashLoader
        color={"#F43630"}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      ></HashLoader>
    </>
  );
}

export default Loader;

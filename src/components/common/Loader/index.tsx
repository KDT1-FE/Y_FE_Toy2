import ClockLoader from "react-spinners/ClockLoader";

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <ClockLoader
      color="rgba(89, 89, 89, 1)"
      loading={loading}
      size={50}
      speedMultiplier={2}
    />
  );
};

export default Loader;

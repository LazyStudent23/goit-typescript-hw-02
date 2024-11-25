import { RotatingLines } from "react-loader-spinner";
import css from "../Loader/Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <RotatingLines
        visible={true}
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default Loader;

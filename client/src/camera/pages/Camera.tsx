import UpperCamera from "../components/UpperCamera";
import DepthCamera from "../components/DepthCamera";
import { Helmet } from "react-helmet";
import MainTitle from "../../design-system/components/MainTitle";

export default function Camera() {
  return (
    <>
      <Helmet>
        <title>Camera Track</title>
      </Helmet>
      <MainTitle title="Camera" />
      <UpperCamera />
      <DepthCamera />
    </>
  );
}

import MainTitle from "../../design-system/components/MainTitle";
import Blower from "../components/Blower";
import LightSystem from "../components/LightSystem";
import { Helmet } from "react-helmet";

export default function LightSystem_Blower() {
  return (
    <>
      <Helmet>
        <title>LightSystem & Blower</title>
      </Helmet>
      <MainTitle title="Light System & Blower" />
      <LightSystem />
      <Blower />
    </>
  );
}

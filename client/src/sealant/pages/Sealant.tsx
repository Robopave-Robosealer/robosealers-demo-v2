import MainTitle from "../../design-system/components/MainTitle";
import SealantInfo from "../components/Sealant/SealantInfo";
import { Helmet } from "react-helmet";

export default function Sealant() {
  return (
    <>
      <Helmet>
        <title>Sealant</title>
      </Helmet>
      <MainTitle title="Sealant" />
      <SealantInfo />
    </>
  );
}

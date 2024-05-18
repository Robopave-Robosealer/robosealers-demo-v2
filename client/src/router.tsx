import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/pages/Login";
import Home from "./home";
import Battery from "./battery/pages";
import Motor from "./motor/pages";
import Camera from "./camera/pages/Camera";
import Imu from "./imu/pages";
import LidarMap from "./lidar-map/pages/LidarMap";
import Sealant from "./sealant/pages/Sealant";
import LightSystem_Blower from "./light-system-blower/pages/LightSystem_Blower";
import BaseLayout from "./design-system/BaseLayout/BaseLayout";
import Gps from "./gps";
import RawData from "./raw-data/pages/RawData";
import Distance from "./distance/pages/Distance";
import RunningHours from "./running-hours/pages/RunningHours";
import SealantVolume from "./sealant-volume/pages/SealantVolume";
import CracksNumber from "./cracks-number/pages/CracksNumber";
import CracksVolume from "./cracks-volume/pages/CracksVolume";
import Chart_Graphs from "./chart-graphs/pages/Chart_Graphs";
import AllOperations from "./all-operations/pages/AllOperations";
import Roles from "./roles/pages/Roles";
import Admin from "./admin/pages/Admin";
import WithPermission from "./design-system/components/PermissionsMiddleware/WithPermission";
import Organization from "./orgnization/pages/Organization";
import Users from "./users/pages/Users";
import Robots from "./robots/pages/Robots";

export const allRouters = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    // errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/monitoring/gps",
        element: <Gps />,
      },
      {
        path: "/monitoring/lidar-map",
        element: <LidarMap />,
      },
      {
        path: "/monitoring/battery",
        element: <Battery />,
      },
      {
        path: "/monitoring/motor",
        element: <Motor />,
      },
      {
        path: "/monitoring/camera",
        element: <Camera />,
      },
      {
        path: "/monitoring/imu",
        element: <Imu />,
      },
      {
        path: "/monitoring/sealant",
        element: <Sealant />,
      },
      {
        path: "/monitoring/light-system-blower",
        element: <LightSystem_Blower />,
      },
      {
        path: "/statistics/all-operations",
        element: (
          <WithPermission
            component={AllOperations}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/statistics/distance",
        element: (
          <WithPermission
            component={Distance}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/statistics/running-hours",
        element: (
          <WithPermission
            component={RunningHours}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/statistics/sealant-volume",
        element: (
          <WithPermission
            component={SealantVolume}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/statistics/cracks-number",
        element: (
          <WithPermission
            component={CracksNumber}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/statistics/cracks-volume",
        element: (
          <WithPermission
            component={CracksVolume}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/statistics/chart-graphs",
        element: (
          <WithPermission
            component={Chart_Graphs}
            permission="/admin/operations/list"
          />
        ),
      },
      {
        path: "/roles",
        element: (
          <WithPermission component={Roles} permission="/admin/roles/list" />
        ),
      },
      {
        path: "/admin",
        element: <WithPermission component={Admin} permission="/admin/list" />,
      },
      {
        path: "/organization",
        element: (
          <WithPermission
            component={Organization}
            permission="/admin/orgs/list"
          />
        ),
      },
      {
        path: "/users",
        element: (
          <WithPermission component={Users} permission="/admin/users/list" />
        ),
      },
      {
        path: "/robots",
        element: (
          <WithPermission component={Robots} permission="/admin/robots/list" />
        ),
      },
      {
        path: "/raw-data",
        element: <RawData />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

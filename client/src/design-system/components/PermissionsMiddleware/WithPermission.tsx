import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import NoPermission from "./NoPermission";
type PermissionProps = {
  component: React.ComponentType<any>;
  permission: string;
};

export default function WithPermission({
  component: Component,
  permission,
}: PermissionProps) {
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions || []
  );
  const userRole = useSelector((state: RootState) => state.auth.role);

  const hasAccess =
    userPermissions.includes(permission) || userRole === "superAdmin";

  return hasAccess ? <Component /> : <NoPermission />;
}

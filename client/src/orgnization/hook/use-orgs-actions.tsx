import { useDispatch } from "react-redux";
import { openModal } from "../../design-system/components/ConfirmModal/ConfirmModal";
import { createOrg, deleteOrgById, getOrg, updateOrg } from "../slice/thunk";
import { OrgFormType } from "../types";
import { closeEditOrgModal } from "../slice/org-slice";
import Toast from "../../design-system/components/Toast/Toast";

export const useOrgsActions = () => {
  const dispatch: any = useDispatch();

  const removeOrg = (orgId: string) => {
    openModal({
      text: `Are you sure you remove this organization? `,
      onConfirm: () => {
        dispatch(deleteOrgById(orgId));
      },
    });
  };
  const addOrg = (org: OrgFormType, resetForm: any) => {
    dispatch(createOrg(org)).then((resultAction: any) => {
      if (createOrg.fulfilled.match(resultAction)) {
        Toast({
          status: "success",
          text: "Organization Account Added Successfully",
        });

        resetForm();
      } else if (createOrg.rejected.match(resultAction)) {
        Toast({
          status: "error",
          text: resultAction.error.message,
        });
      }
    });
  };
  const editOrg = (org: OrgFormType, orgId: string, resetForm: any) => {
    dispatch(updateOrg({ org, orgId })).then((resultAction: any) => {
      if (updateOrg.fulfilled.match(resultAction)) {
        Toast({
          status: "success",
          text: "Organization Account Updated Successfully",
        });

        dispatch(closeEditOrgModal());
        resetForm();
      } else if (updateOrg.rejected.match(resultAction)) {
        Toast({
          status: "error",
          text: resultAction.error.message,
        });
      }
    });
  };
  const getOrganization = (orgId: string) => {
    dispatch(getOrg(orgId));
  };

  return { removeOrg, addOrg, editOrg, getOrganization };
};

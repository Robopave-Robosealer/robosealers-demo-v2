import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  ActionIcon,
  Button,
  Flex,
  Loader,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { closeEditAdminModal } from "../../slice/edit-admin-modal-slice";
import { useEffect, useState } from "react";
import { GetService, PutService } from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import { editAdmin } from "../../slice/adminsListSlice";
import { useFormik } from "formik";
import { IconX } from "@tabler/icons-react";
import { FormValues, Role } from "../AddAdminAccount/AddAdminAccount";
import Toast from "../../../design-system/components/Toast/Toast";

export default function EditAdminModal({ admin }: { admin: any }) {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading state
  const [roles, setRoles] = useState<Role[]>([]);
  const openedEditAdminModal = useSelector(
    (state: RootState) => state.editAdminModal.editAdmin
  );

  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      permission: {
        _id: "",
        name: "",
      },
    },
    onSubmit: (values: FormValues, { resetForm }) => {
      PutService({
        route: ApiRoutes.updateAdmin,
        params: {
          _id: admin._id,
        },
        body: {
          name:
            values.name.trim() === admin.name ? undefined : values.name.trim(),
          email:
            values.email.trim() === admin.email
              ? undefined
              : values.email.trim(),

          permission:
            values.permission._id === admin.permission._id
              ? undefined
              : values.permission._id,
        },
      })
        .then((res) => {
          dispatch(editAdmin(res.data.result));
          resetForm();
          dispatch(closeEditAdminModal());
          formik.setFieldValue("permission", { _id: null, name: null }); // Empty the Select input after form submission
          Toast({
            status: "success",
            text: "Admin Account Updated Successfully",
          });
        })
        .catch((error) => {
          Toast({
            status: "error",
            text: error.response.data.error,
          });
        });
      values.permission._id === admin.permission._id
        ? undefined
        : PutService({
            route: ApiRoutes.updateAdminRole,
            params: {
              _id: admin._id,
            },
            body: {
              permission: values.permission._id,
            },
          }).then((res) => {
            dispatch(editAdmin(res.data.result));
            resetForm();
            formik.setFieldValue("permission", { _id: null, name: null }); // Empty the Select input after form submission
          });
    },
  });

  const handleClickPermission = () => {
    GetService({
      route: ApiRoutes.listRoles,
      params: {
        type: "admin",
      },
    }).then((res) => {
      setRoles(res.data.result);
    });
  };

  useEffect(() => {
    if (admin) {
      // Set form values when admin is available
      formik.setValues({
        name: admin.name || "",
        email: admin.email || "",
        permission: {
          _id: admin.permission?._id || "",
          name: admin.permission?.name || "",
        },
      });

      setLoading(false); // Set loading to false when admin is available
    }
  }, [admin]);

  return (
    <>
      <Modal
        size="lg"
        withCloseButton={false}
        opened={openedEditAdminModal}
        onClose={() => dispatch(closeEditAdminModal())}
      >
        {loading ? (
          <Flex justify="center" align="center" my="md">
            <Loader type="dots" />
          </Flex>
        ) : (
          <>
            <Flex justify="end">
              <ActionIcon
                variant="light"
                color="red"
                size="sm"
                onClick={() => dispatch(closeEditAdminModal())}
              >
                <IconX />
              </ActionIcon>
            </Flex>
            <form onSubmit={formik.handleSubmit}>
              <Flex justify="center">
                <Flex w="95%" direction="column" gap="md" mb="xl">
                  <TextInput
                    label="Admin Name"
                    placeholder="Admin Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.values.permission.name && (
                    <Select
                      id="permission"
                      label="Role"
                      name="permission"
                      placeholder="Pick Role"
                      data={roles.map((role: Role) => role.name)}
                      onChange={(value) => {
                        const selectedRole = roles.find(
                          (role: Role) => role.name === value
                        );
                        formik.setFieldValue(
                          "permission",
                          selectedRole ? selectedRole : { _id: null, name: "" }
                        );
                      }}
                      defaultSearchValue={formik.values.permission.name}
                      defaultValue={formik.values.permission.name}
                      onClick={handleClickPermission}
                    />
                  )}
                  <Button type="submit" mt="1.5rem" variant="light">
                    Save
                  </Button>
                </Flex>
              </Flex>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}

import {
  Button,
  Flex,
  Modal,
  TextInput,
  Loader,
  ActionIcon,
  Select,
  MultiSelect,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useFormik } from "formik";

import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { useUsersActions } from "../../hook/use-users-actions";
import { UserFormType } from "../../types";
import { closeEditUserModal } from "../../slice/user-slice";
import { OrganizationType } from "../../../orgnization/types";
import { Role } from "../../../admin/components/AddAdminAccount/AddAdminAccount";
import { fetchOrgsList } from "../../../orgnization/slice/thunk";
import { GetService } from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import { fetchRobotsList } from "../../../robots/slice/thunk";
import { arraysAreEqual } from "../../../design-system/utils";

export default function EditUser() {
  const dispatch: any = useDispatch();
  const { editUser } = useUsersActions();
  const { orgs } = useSelector((state: RootState) => state.orgsList);
  const { robots } = useSelector((state: RootState) => state.robotReducers);
  const [robotsSearchValue, setRobotsSearchValue] = useState("");

  const { openEditModal, user, loading } = useSelector(
    (state: RootState) => state.userReducers
  );
  const [roles, setRoles] = useState<Role[]>([]);

  const formik = useFormik<UserFormType>({
    initialValues: {
      name: "",
      email: "",
      permission: {
        _id: "",
        name: "",
      },
      org: {
        _id: "",
        name: "",
      },
      robots: {
        _id: null,
        name: [],
      },
    },
    onSubmit: (values: UserFormType, { resetForm }) => {
      const isArrayEqual = arraysAreEqual(
        values?.robots?._id as [],
        user?.robots.map((item: { _id: any }) => item._id)
      );

      const updatedUser = {
        name:
          values.name.trim() === user?.name ? undefined : values.name.trim(),
        email:
          values.email.trim() === user?.email ? undefined : values.email.trim(),
        permission:
          values.permission._id === user?.permission?._id
            ? undefined
            : values.permission._id,
        org: values.org._id === user?.org._id ? undefined : values.org._id,
        robots: isArrayEqual ? undefined : values.robots?._id,
      };
      editUser(updatedUser, user?._id, resetForm);
    },
  });

  // Update formik values when org data is available
  useEffect(() => {
    if (user) {
      formik.setValues({
        name: user.name || "",
        email: user.email || "",
        permission: {
          _id: user.permission?._id || "",
          name: user.permission?.name || "",
        },
        org: {
          _id: user.org?._id || "",
          name: user.org?.name || "",
        },
        robots: {
          _id: user.robots?.map((robot: any) => robot._id) || [],
          name: user.robots?.map((robot: any) => robot.name) || [],
        },
      });
      dispatch(fetchRobotsList(user?.org?._id as string));
    }
  }, [user]);

  const handleSelectOrgs = () => {
    dispatch(fetchOrgsList());
  };
  const handleClickPermission = () => {
    GetService({
      route: ApiRoutes.listRoles,
      params: {
        type: "user",
      },
    }).then((res) => {
      setRoles(res.data.result);
    });
  };

  return (
    <>
      <Modal
        size="lg"
        withCloseButton={false}
        opened={openEditModal}
        onClose={() => dispatch(closeEditUserModal())}
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
                onClick={() => dispatch(closeEditUserModal())}
              >
                <IconX />
              </ActionIcon>
            </Flex>
            <form onSubmit={formik.handleSubmit}>
              <Flex justify="center">
                <Flex w="95%" direction="column" gap="md" mb="xl">
                  <TextInput
                    label="User Name"
                    placeholder="User Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.name}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    defaultValue={formik.values.email}
                  />
                  {formik.values.org.name && (
                    <Select
                      id="org"
                      label="Organization"
                      name="org"
                      placeholder="Pick Role"
                      data={orgs.map((org: OrganizationType) => org.name)}
                      onChange={(value) => {
                        formik.setFieldValue("robots", { _id: null, name: [] }); // Empty the Select input after form submission

                        const selectedOrg = orgs.find(
                          (org: OrganizationType) => org.name === value
                        );
                        dispatch(fetchRobotsList(selectedOrg?._id));
                        formik.setFieldValue(
                          "org",
                          selectedOrg ? selectedOrg : { _id: null, name: "" }
                        );
                      }}
                      defaultSearchValue={formik.values.org.name}
                      defaultValue={formik.values.org.name}
                      onClick={handleSelectOrgs}
                    />
                  )}

                  <MultiSelect
                    disabled={formik.values.org.name?.length == 0}
                    label="Robots"
                    placeholder="Pick Robots"
                    data={robots.map((robot: any) => robot.name)}
                    searchable
                    nothingFoundMessage="Nothing found..."
                    searchValue={robotsSearchValue}
                    onSearchChange={setRobotsSearchValue}
                    onChange={(value) => {
                      const arrayOfIds = robots
                        .filter((obj) => value.includes(obj.name))
                        .map((obj) => obj._id);

                      formik.setFieldValue("robots", {
                        _id: [...arrayOfIds],
                        name: [...value],
                      });
                    }}
                    value={formik.values.robots?.name}
                    defaultValue={formik.values.robots?.name}
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

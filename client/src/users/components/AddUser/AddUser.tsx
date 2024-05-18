import { useFormik } from "formik";
import { useUsersActions } from "../../hook/use-users-actions";
import { UserFormType } from "../../types";
import {
  Button,
  Flex,
  MultiSelect,
  Paper,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useState } from "react";
import { fetchOrgsList } from "../../../orgnization/slice/thunk";
import { OrganizationType } from "../../../orgnization/types";
import { Role } from "../../../admin/components/AddAdminAccount/AddAdminAccount";
import { GetService } from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import { fetchRobotsList } from "../../../robots/slice/thunk";
import { RobotType } from "../../../robots/types";

export default function AddUser() {
  const { addUser } = useUsersActions();
  const dispatch: any = useDispatch();
  const { orgs } = useSelector((state: RootState) => state.orgsList);
  const { robots } = useSelector((state: RootState) => state.robotReducers);
  const [roles, setRoles] = useState<Role[]>([]);
  const [robotsSearchValue, setRobotsSearchValue] = useState("");

  const formik = useFormik<UserFormType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      org: {
        _id: null,
        name: "",
      },
      permission: {
        _id: null,
        name: "",
      },
      robots: {
        _id: null,
        name: [],
      },
    },
    onSubmit: (values: UserFormType, { resetForm }) => {
      const user = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        org: values?.org?._id,
        permission: values.permission._id,
        robots: values.robots?._id,
      };

      addUser(user, resetForm);
      formik.setFieldValue("permission", { _id: null, name: null }); // Empty the Select input after form submission
      formik.setFieldValue("org", { _id: null, name: null }); // Empty the Select input after form submission
      formik.setFieldValue("robots", { _id: null, name: [] }); // Empty the Select input after form submission
    },
  });

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
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <form onSubmit={formik.handleSubmit}>
          <Flex justify="center">
            <Flex w="80%" direction="column" gap="md" mb="xl">
              <TextInput
                required
                label="User Name"
                placeholder="User Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <TextInput
                required
                label="Email"
                placeholder="Email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <PasswordInput
                label="Password"
                required
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <Select
                id="org"
                required
                clearable
                label="Organization"
                name="org"
                placeholder="Pick Organization"
                data={orgs.map((org: OrganizationType) => org.name)}
                onChange={(value) => {
                  const selectedOrg = orgs.find(
                    (org: OrganizationType) => org.name === value
                  );
                  formik.setFieldValue("robots", { _id: null, name: [] }); // Empty the Select input after form submission

                  formik.setFieldValue(
                    "org",
                    selectedOrg ? selectedOrg : { _id: null, name: "" }
                  );
                  dispatch(fetchRobotsList(selectedOrg?._id));
                }}
                value={formik.values.org.name}
                onClick={handleSelectOrgs}
              />
              <MultiSelect
                disabled={formik.values.org.name?.length == 0}
                label="Robots"
                placeholder="Pick Robots"
                data={robots.map((robot: RobotType) => robot.name)}
                searchable
                nothingFoundMessage="Nothing found..."
                searchValue={robotsSearchValue}
                onSearchChange={setRobotsSearchValue}
                // onChange={setValue}
                // value={value}
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
              <Select
                id="permission"
                required
                clearable
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
                value={formik.values.permission.name}
                onClick={handleClickPermission}
              />

              <Button type="submit" mt="1.5rem" variant="light">
                Save
              </Button>
            </Flex>
          </Flex>
        </form>
      </Paper>
    </>
  );
}

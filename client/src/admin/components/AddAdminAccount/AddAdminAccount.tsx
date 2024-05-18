import {
  Button,
  Flex,
  Paper,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  GetService,
  PostService,
} from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import { useState } from "react";
import { addAdmin } from "../../slice/adminsListSlice";
import Toast from "../../../design-system/components/Toast/Toast";

export interface Role {
  _id: string;
  name: string;
}

export interface FormValues {
  name: string;
  email: string;
  password?: string;
  permission: {
    _id?: string | null;
    name: string;
  };
}

export default function AddAdminAccount() {
  const dispatch: any = useDispatch();
  const [roles, setRoles] = useState<Role[]>([]);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      permission: {
        _id: null,
        name: "",
      },
    },
    onSubmit: (values: FormValues, { resetForm }) => {
      PostService({
        route: ApiRoutes.createAdmin,
        body: {
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password,
          permission: values.permission._id,
        },
      })
        .then((res) => {
          dispatch(addAdmin(res.data.result));
          resetForm();
          formik.setFieldValue("permission", { _id: null, name: null }); // Empty the Select input after form submission
          Toast({
            status: "success",
            text: "Admin Account Added Successfully",
          });
        })
        .catch((error) => {
          Toast({
            status: "error",
            text: error.response.data.error,
          });
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

  return (
    <Paper shadow="md" radius="md" p="md" mb="xl">
      <form onSubmit={formik.handleSubmit}>
        <Flex justify="center">
          <Flex w="80%" direction="column" gap="md" mb="xl">
            <TextInput
              required
              label="Admin Name"
              placeholder="Admin Name"
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
  );
}

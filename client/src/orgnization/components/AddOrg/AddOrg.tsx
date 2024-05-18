import { useFormik } from "formik";
import { useOrgsActions } from "../../hook/use-orgs-actions";
import { OrgFormType } from "../../types";
import { Button, Flex, Paper, PasswordInput, TextInput } from "@mantine/core";

export default function AddOrg() {
  const { addOrg } = useOrgsActions();

  const formik = useFormik<OrgFormType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values: OrgFormType, { resetForm }) => {
      const org = {
        name: values.name?.trim(),
        email: values.email?.trim(),
        password: values.password,
      };
      addOrg(org, resetForm);
    },
  });

  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <form onSubmit={formik.handleSubmit}>
          <Flex justify="center">
            <Flex w="80%" direction="column" gap="md" mb="xl">
              <TextInput
                required
                label="Organization Name"
                placeholder="Organization Name"
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

import { Button, Flex, PasswordInput, Text, TextInput } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useLoginForm } from "../hooks/use-login-form";

export default function LoginForm() {
  const formik = useLoginForm();

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="md" mt="md">
          <TextInput
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />

          <PasswordInput
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />

          <Button type="submit" variant="outline">
            <Flex align="center" gap=".4rem">
              <Text>Log in</Text>
              <IconLogout />
            </Flex>
          </Button>
        </Flex>
      </form>
    </>
  );
}

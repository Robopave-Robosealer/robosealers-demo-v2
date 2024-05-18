import { useFormik } from "formik";
import { useRobotsActions } from "../../hook/use-robots-actions";
import { RobotFormType } from "../../types";
import { Button, Flex, Paper, Select, TextInput } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { fetchOrgsList } from "../../../orgnization/slice/thunk";
import { OrganizationType } from "../../../orgnization/types";

export default function AddRobot() {
  const { addRobot } = useRobotsActions();
  const dispatch: any = useDispatch();
  const { orgs } = useSelector((state: RootState) => state.orgsList);

  const formik = useFormik<RobotFormType>({
    initialValues: {
      name: "",
      org: {
        _id: null,
        name: "",
      },
    },
    onSubmit: (values: RobotFormType, { resetForm }) => {
      const robot = {
        name: values.name.trim(),
        org: values?.org?._id,
      };
      addRobot(robot, resetForm);
      formik.setFieldValue("org", { _id: null, name: null }); // Empty the Select input after form submission
    },
  });

  const handleSelectOrgs = () => {
    dispatch(fetchOrgsList());
  };

  return (
    <>
      <Paper shadow="md" radius="md" p="md" mb="xl">
        <form onSubmit={formik.handleSubmit}>
          <Flex justify="center">
            <Flex w="80%" direction="column" gap="md" mb="xl">
              <TextInput
                required
                label="Robot Name"
                placeholder="Robot Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
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
                  formik.setFieldValue(
                    "org",
                    selectedOrg ? selectedOrg : { _id: null, name: "" }
                  );
                }}
                value={formik.values.org.name}
                onClick={handleSelectOrgs}
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

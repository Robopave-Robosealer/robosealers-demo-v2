import {
  Button,
  Flex,
  Modal,
  TextInput,
  Loader,
  ActionIcon,
  Select,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useFormik } from "formik";

import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { useRobotsActions } from "../../hook/use-robots-actions";
import { RobotFormType } from "../../types";
import { closeEditRobotModal } from "../../slice/robot-slice";
import { OrganizationType } from "../../../orgnization/types";
import { fetchOrgsList } from "../../../orgnization/slice/thunk";

export default function EditRobot() {
  const dispatch: any = useDispatch();
  const { editRobot } = useRobotsActions();
  const { orgs } = useSelector((state: RootState) => state.orgsList);

  const { openEditModal, robot, loading } = useSelector(
    (state: RootState) => state.robotReducers
  );

  const formik = useFormik<RobotFormType>({
    initialValues: {
      name: "",
      org: {
        _id: "",
        name: "",
      },
    },
    onSubmit: (values: RobotFormType, { resetForm }) => {
      const updatedRobot = {
        name:
          values.name.trim() === robot?.name ? undefined : values.name.trim(),
        org: values.org._id === robot?.org?._id ? undefined : values.org._id,
      };
      editRobot(updatedRobot, robot?._id, resetForm);
    },
  });

  // Update formik values when org data is available
  useEffect(() => {
    if (robot) {
      formik.setValues({
        name: robot.name || "",

        org: {
          _id: robot.org?._id || "",
          name: robot.org?.name || "",
        },
      });
    }
  }, [robot]);

  const handleSelectOrgs = () => {
    dispatch(fetchOrgsList());
  };

  return (
    <>
      <Modal
        size="lg"
        withCloseButton={false}
        opened={openEditModal}
        onClose={() => dispatch(closeEditRobotModal())}
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
                onClick={() => dispatch(closeEditRobotModal())}
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

                  {formik.values.org.name && (
                    <Select
                      id="org"
                      label="Organization"
                      name="org"
                      placeholder="Pick Role"
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
                      defaultSearchValue={formik.values.org.name}
                      defaultValue={formik.values.org.name}
                      onClick={handleSelectOrgs}
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

import {
  Button,
  Flex,
  Modal,
  TextInput,
  Loader,
  ActionIcon,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useFormik } from "formik";
import { OrgFormType } from "../../types";
import { closeEditOrgModal } from "../../slice/org-slice";
import { useOrgsActions } from "../../hook/use-orgs-actions";
import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";

export default function EditOrg() {
  const dispatch: any = useDispatch();
  const { editOrg } = useOrgsActions();
  const { openEditModal, org, loading } = useSelector(
    (state: RootState) => state.orgsList
  );

  const formik = useFormik<OrgFormType>({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: (values: OrgFormType, { resetForm }) => {
      const updatedOrg = {
        name:
          values?.name?.trim() === org.name ? undefined : values.name?.trim(),
        email:
          values.email?.trim() === org.email ? undefined : values.email?.trim(),
      };
      editOrg(updatedOrg, org._id, resetForm);
    },
  });

  // Update formik values when org data is available
  useEffect(() => {
    if (org) {
      formik.setValues({
        name: org.name || "",
        email: org.email || "",
      });
    }
  }, [org]);

  return (
    <>
      <Modal
        size="lg"
        withCloseButton={false}
        opened={openEditModal}
        onClose={() => dispatch(closeEditOrgModal())}
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
                onClick={() => dispatch(closeEditOrgModal())}
              >
                <IconX />
              </ActionIcon>
            </Flex>
            <form onSubmit={formik.handleSubmit}>
              <Flex justify="center">
                <Flex w="90%" direction="column" gap="md" mb="xl">
                  <TextInput
                    label="Organization Name"
                    placeholder="Organization Name"
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

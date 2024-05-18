import {
  ActionIcon,
  Button,
  Checkbox,
  Flex,
  Group,
  Loader,
  Modal,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { usePrimaryColorHex } from "../../../design-system/hooks/use-primary-color";
import { useEffect, useState } from "react";
import { GetService, PutService } from "../../../api/services/requests-service";
import ApiRoutes from "../../../api/services/api-routes";
import { IconX } from "@tabler/icons-react";
import { editRole } from "../../slice/rolesListSlice";
import { closeEditRoleModal } from "../../slice/edit-role-modal-slice";
import { RoleType } from "../../types";
import { objectsAreEqual } from "../../../design-system/utils";
import Toast from "../../../design-system/components/Toast/Toast";

export default function EditRole({ role }: { role: RoleType }) {
  const [adminPermissionList, setAdminPermissionList] = useState<any>({});

  const opened = useSelector(
    (state: RootState) => state.editRoleModal.editRole
  );
  const dispatch = useDispatch();
  const color = usePrimaryColorHex();
  const [roleNameValue, setRoleNameValue] = useState<string>(role?.name);

  const permissionsArray: string[] = role?.permissions
    ? Object.values(role.permissions).flat()
    : [];
  const [groupValue, setGroupValue] = useState<string[]>(permissionsArray);
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  useEffect(() => {
    GetService({
      route:
        role.type === "admin"
          ? ApiRoutes.listAdminPermissions
          : ApiRoutes.listUserPermissions,
    }).then((res) => {
      setAdminPermissionList(res.data.result);
    });
  }, []);

  const handleFormSubmit = (e: any) => {
    setDisabledSubmit(true);
    e.preventDefault();
    const result: any = {};

    groupValue.forEach((path) => {
      const parts = path.split("/").filter((element) => element !== "");

      if (parts.length >= 3) {
        // If there are at least 3 parts (including the empty string before the first '/', i.e., ''), it means there are at least two '/'
        const key = parts[1]; // Get the second part after the first '/'
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(path);
      } else if (parts.length === 2) {
        // If there are exactly 2 parts, set key to 'admins'
        const key = "admins";
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(path);
      }
    });
    const isValuesEqual = objectsAreEqual(role?.permissions, result);
    console.log(isValuesEqual);

    PutService({
      route: ApiRoutes.updateRoles,
      params: {
        _id: role._id,
      },
      body: {
        name:
          roleNameValue.trim() === role.name ? undefined : roleNameValue.trim(),
        permissions: isValuesEqual ? undefined : result,
        type: role.type === "admin" ? "admin" : "user",
      },
    })
      .then((res) => {
        Toast({
          status: "success",
          text: "Role Updated Successfully",
        });

        setRoleNameValue("");
        setGroupValue([]);
        dispatch(editRole(res.data.result));
        setDisabledSubmit(false);
        dispatch(closeEditRoleModal());
      })
      .catch((error) => {
        Toast({
          status: "error",
          text: error.response.data.error,
        });
      });
  };
  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        withCloseButton={false}
        onClose={() => dispatch(closeEditRoleModal())}
      >
        {role && Object.keys(adminPermissionList).length > 0 ? (
          <>
            <Flex justify="end">
              <ActionIcon
                variant="light"
                color="red"
                size="sm"
                onClick={() => dispatch(closeEditRoleModal())}
              >
                <IconX />
              </ActionIcon>
            </Flex>
            <form onSubmit={handleFormSubmit}>
              <TextInput
                placeholder="Enter Role Name"
                defaultValue={roleNameValue}
                onChange={(e) => setRoleNameValue(e.target.value)}
                my="md"
              />
              {Object.entries(adminPermissionList).map(
                ([key, value]) =>
                  (value as []).length > 0 && (
                    <Paper shadow="sm" radius="md" p="md" mb="xl" key={key}>
                      <Checkbox.Group
                        value={groupValue}
                        // value={groupValue}
                        onChange={setGroupValue}
                        label={
                          <Title c={color} order={4}>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, function (str) {
                                return str.toUpperCase();
                              })}
                          </Title>
                        }
                      >
                        <Group mt="lg">
                          {(value as []).map((item: string, index) => (
                            <Checkbox
                              mx="lg"
                              key={index}
                              value={item}
                              label={item
                                .split("/")
                                .pop()
                                ?.replace(/([A-Z])/g, " $1")
                                .replace(/^./, function (str) {
                                  return str.toUpperCase();
                                })}
                            />
                          ))}
                        </Group>
                      </Checkbox.Group>
                    </Paper>
                  )
              )}
              <Button
                loading={disabledSubmit}
                loaderProps={{ type: "dots" }}
                disabled={
                  roleNameValue === "" ||
                  groupValue.length === 0 ||
                  disabledSubmit
                }
                type="submit"
              >
                Save Role
              </Button>
            </form>
          </>
        ) : (
          <Flex justify="center" align="center" my="md">
            <Loader type="dots" />
          </Flex>
        )}
      </Modal>
    </>
  );
}

import {
  Group,
  Button,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Title,
  Flex,
  Text,
  ActionIcon,
} from "@mantine/core";
import classes from "./header.module.scss";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { close, open } from "./slice/menuSlice";
import { IconLogout, IconRobot, IconSettings } from "@tabler/icons-react";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import { Link, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/use-is-mobile";
import { openSettingModal } from "../SettingControl/slice/settingModalSlice";
import SettingControl from "../SettingControl/SettingControl";
import { logout } from "../../../auth/slice/authSlice";
import { openModal } from "../ConfirmModal/ConfirmModal";

export default function Header() {
  const opened = useSelector((state: RootState) => state.menu.status);
  const isUser = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const color = usePrimaryColorHex();
  const navigate = useNavigate();
  const mobile = useIsMobile();

  return (
    <>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {isUser ? (
            <Link to="/home">
              <Flex align="center" c={color}>
                <IconRobot size={"2rem"} />
                <Title order={2}>Robosealers</Title>
              </Flex>
            </Link>
          ) : (
            <Flex align="center" c={color}>
              <IconRobot size={"2rem"} />
              <Title order={2}>Robosealers</Title>
            </Flex>
          )}
          {isUser && !mobile && (
            <>
              <ActionIcon onClick={() => dispatch(openSettingModal())}>
                <IconSettings />
              </ActionIcon>
              <Button
                onClick={() => {
                  openModal({
                    text: "Are you sure you want to log out?",
                    onConfirm: () => {
                      dispatch(logout());
                      navigate("/login");
                    },
                  });
                }}
              >
                <Flex align="center" gap=".4rem">
                  <Text>Log out</Text>
                  <IconLogout />
                </Flex>
              </Button>
            </>
          )}
          {isUser && mobile && (
            <>
              <ActionIcon onClick={() => dispatch(openSettingModal())}>
                <IconSettings />
              </ActionIcon>
              <Burger
                opened={opened}
                onClick={() => dispatch(open())}
                hiddenFrom="sm"
                color="gray.7"
              />
            </>
          )}
        </Group>
      </header>
      <SettingControl />
      <Drawer
        opened={opened}
        onClose={() => dispatch(close())}
        size="md"
        title={
          <Link
            to="/home"
            onClick={() => {
              dispatch(close());
            }}
          >
            <Flex align="center" c={color}>
              <IconRobot size={"2rem"} />
              <Title order={2}>Robosealers</Title>
            </Flex>
          </Link>
        }
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Sidebar />
          <Divider my="sm" />

          {isUser && (
            <Button
              ml="sm"
              onClick={() => {
                openModal({
                  text: "Are you sure you want to log out?",
                  onConfirm: () => {
                    dispatch(logout());
                    dispatch(close());

                    navigate("/login");
                  },
                });
              }}
            >
              <Flex align="center" gap=".4rem">
                <Text>Log out</Text>
                <IconLogout />
              </Flex>
            </Button>
          )}
        </ScrollArea>
      </Drawer>
    </>
  );
}

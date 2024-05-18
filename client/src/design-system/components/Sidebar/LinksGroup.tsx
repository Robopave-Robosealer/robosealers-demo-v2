import { useEffect, useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./sidebar.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../Header/slice/menuSlice";
import { RootState } from "../../../../store/store";

interface LinksGroupProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  permission?: string | undefined;
}

export function LinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  permission,
}: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const dispatch = useDispatch();
  const route = useLocation();
  const [opened, setOpened] = useState(initiallyOpened || false);
  const userPermissions = useSelector(
    (state: RootState) => state.auth.permissions
  );
  const userRole = useSelector((state: RootState) => state.auth.role);

  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={
        route.pathname === link.link ? classes.activeLink : classes.link
      }
      onClick={() => dispatch(close())}
      to={link.link}
      key={link.label}
    >
      {link.label}
    </Link>
  ));

  useEffect(() => {
    setOpened(route.pathname.includes(label.toLowerCase()));
  }, [route.pathname, label]);

  const superAdmin = userRole === "superAdmin";
  const hasPermission = !permission || userPermissions?.includes(permission);
  const renderControl = () => {
    if (
      (!link && items && items.length > 0 && hasPermission) ||
      (!link && items && items.length > 0 && superAdmin)
    ) {
      return (
        <UnstyledButton
          onClick={() => {
            setOpened((o) => !o);
          }}
          className={classes.control}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      );
    }

    if ((link && hasPermission) || (link && superAdmin)) {
      return (
        <Link to={link}>
          <UnstyledButton
            onClick={() => {
              dispatch(close());
            }}
            className={
              route.pathname === link ? classes.activeControl : classes.control
            }
          >
            <Group justify="space-between" gap={0}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon style={{ width: rem(18), height: rem(18) }} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
            </Group>
          </UnstyledButton>
        </Link>
      );
    }

    return null;
  };

  const renderLinks = () => {
    if ((hasLinks && hasPermission) || (hasLinks && superAdmin)) {
      return (
        <Collapse in={opened}>
          {links.map((link) => (
            <Link
              className={
                route.pathname === link.link ? classes.activeLink : classes.link
              }
              onClick={() => dispatch(close())}
              to={link.link}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </Collapse>
      );
    }
    return null;
  };

  return (
    <>
      {renderControl()}
      {renderLinks()}
    </>
  );
}

import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Flex } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import useIsMobile from "../hooks/use-is-mobile";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
export default function BaseLayout() {
  const mobile = useIsMobile();
  const isUser = useSelector((state: RootState) => state.auth.token);

  if (!isUser) return <Navigate to="/login" />;

  return (
    <>
      <Flex direction="column" mih="100vh">
        <Header />
        <Flex pos="relative" justify="space-between">
          {!mobile && isUser && (
            <Box w="22%">
              <Sidebar />
            </Box>
          )}
          <Box w={mobile || !isUser ? "100%" : "79%"} p="md">
            <Outlet />
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

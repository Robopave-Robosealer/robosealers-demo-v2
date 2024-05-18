import { useMediaQuery } from "@mantine/hooks";

export default function useIsMobile(size = 1000) {
  return useMediaQuery(`(max-width: ${size}px)`);
}

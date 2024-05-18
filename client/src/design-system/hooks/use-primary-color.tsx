import { useMantineTheme } from "@mantine/core";

export default function usePrimaryColor(
  shade?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
) {
  const { primaryColor } = useMantineTheme();
  return shade ? `${primaryColor}.${shade}` : primaryColor;
}
export function usePrimaryColorHex(
  shade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 5
) {
  const { colors, primaryColor } = useMantineTheme();
  return colors[primaryColor][shade];
}

export function usePrimaryColors(
  ...shades: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | undefined)[]
) {
  const { primaryColor } = useMantineTheme();
  return shades.map((shade) =>
    shade ? `${primaryColor}.${shade}` : primaryColor
  );
}

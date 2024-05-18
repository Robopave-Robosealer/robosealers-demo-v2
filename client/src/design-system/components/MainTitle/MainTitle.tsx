import { Title } from "@mantine/core";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";

export type MainTitleProps = {
  title: React.ReactNode;
};
export default function MainTitle({ title }: MainTitleProps) {
  const color = usePrimaryColorHex();
  return (
    <>
      <Title order={3} c={color} mb="md">
        {title}
      </Title>
    </>
  );
}

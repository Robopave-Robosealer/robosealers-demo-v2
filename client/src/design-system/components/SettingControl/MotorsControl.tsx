import { Button, Flex, Paper, Text, TextInput } from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { usePrimaryColorHex } from "../../hooks/use-primary-color";
import { openModal } from "../ConfirmModal/ConfirmModal";
export default function MotorsControl() {
  const color = usePrimaryColorHex(6);
  const [speed, setSpeed] = useState(50);
  const formik = useFormik({
    initialValues: {
      speed: speed,
    },
    validationSchema: Yup.object({
      speed: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      openModal({
        text: "Are you sure to save changes",
        onConfirm: () => {
          setSpeed(values.speed);
        },
      });
    },
  });
  return (
    <Flex direction="column" gap="md">
      <form onSubmit={formik.handleSubmit}>
        <Flex gap="1rem" align="center">
          <label htmlFor="speed" style={{ color: color, fontWeight: "bold" }}>
            Speed
          </label>
          <TextInput
            id="speed"
            name="speed"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.speed}
          />
          {formik.touched.speed && formik.errors.speed ? (
            <Text c="red">{formik.errors.speed}</Text>
          ) : null}
        </Flex>
        <Flex direction="column" gap="sm" mt="md">
          <Flex wrap="wrap" c="green.6">
            <Paper radius="sm" bg="green.1" p=".2rem" tt="capitalize">
              The robot will stop and restart with any change made.
            </Paper>
          </Flex>

          <Button variant="light" size="xs" type="submit">
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

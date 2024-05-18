import { Button, Flex, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconFilter } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useFetchOperationData } from "../../hooks/use-fetch-operation-filter";
interface FormValues {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  area: string;
}

export default function AreaTimeFilter({ onFilter }: { onFilter: any }) {
  const { areas, handleSelectAreaClick } = useFetchOperationData({});
  const formik = useFormik<FormValues>({
    initialValues: {
      dateFrom: undefined,
      dateTo: undefined,
      area: "",
    },
    onSubmit: (values: any) => {
      Object.keys(values).forEach((key: string) => {
        if (values[key] === undefined || values[key] === null) {
          delete values[key];
        }
      });

      // Create a new Date object
      const dateFromObj: any = new Date(values?.dateFrom);
      // Set time to the beginning of the day (00:00:00)
      dateFromObj.setHours(0, 0, 0, 0);
      const utcTimeFrom = new Date(
        dateFromObj.getTime() - dateFromObj.getTimezoneOffset() * 60000
      );

      // Create a new Date object
      const dateToObj = new Date(values?.dateTo);

      // Set time to the end of the day (23:59:59.999)
      dateToObj?.setHours(23, 59, 59, 999);
      const utcTimeTo = new Date(
        dateToObj?.getTime() - dateToObj?.getTimezoneOffset() * 60000
      );

      onFilter({
        dateFrom: values.dateFrom && utcTimeFrom?.toISOString(),
        dateTo: values.dateTo && utcTimeTo?.toISOString(),
        area: values.area && values.area,
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex wrap="wrap" align="center" gap="md" mb="xl">
          <DateInput
            clearable
            label="Date From"
            placeholder="Date From"
            name="dateFrom"
            id="dateFrom"
            onChange={(date) => formik.setFieldValue("dateFrom", date)}
            onBlur={formik.handleBlur}
            value={formik.values.dateFrom}
          />
          <DateInput
            clearable
            label="Date To"
            placeholder="Date To"
            name="dateTo"
            onChange={(date) => formik.setFieldValue("dateTo", date)}
            onBlur={formik.handleBlur}
            value={formik.values.dateTo}
          />
          <Select
            clearable
            label="Area"
            name="area"
            placeholder="Pick value"
            data={areas}
            onChange={(value) => formik.setFieldValue("area", value)}
            onBlur={formik.handleBlur}
            value={formik.values.area}
            onClick={handleSelectAreaClick}
          />
          <Button
            type="submit"
            mt="1.5rem"
            variant="light"
            rightSection={<IconFilter size="1.3rem" />}
          >
            Filter
          </Button>
        </Flex>
      </form>
    </>
  );
}

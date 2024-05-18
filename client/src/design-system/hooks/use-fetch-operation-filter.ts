import { useState } from "react";
import { GetService } from "../../api/services/requests-service";
import ApiRoutes from "../../api/services/api-routes";
import toast from "react-simple-toasts";

export function useFetchOperationData({ totalField }: { totalField?: string }) {
  const [operationData, setOperationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [areas, setAreas] = useState([]);

  const fetchData = (params?: any) => {
    setLoading(true);
    GetService({
      route: ApiRoutes.listAdminOperations,
      params: { ...params, sortByDate: "startDate", sort: -1 },
    })
      .then((res) => {
        setOperationData(res.data);
      })
      .catch((err) => {
        // Handle error accordingly
        toast(err, {
          position: "top-right",
        });
      })

      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilter = (values: any) => {
    const params = {
      area: values.area || undefined,
      dateFrom: values.dateFrom || undefined,
      dateTo: values.dateTo || undefined,
      dateField: (values.dateFrom || values.dateTo) && "startDate",
      totalField: totalField,
    };
    fetchData(params);
  };

  const handleSelectAreaClick = () => {
    GetService({
      route: ApiRoutes.listAdminAreasOperations,
    }).then((res) => {
      setAreas(res.data.result);
    });
  };

  return {
    operationData,
    loading,
    fetchData,
    handleFilter,
    handleSelectAreaClick,
    areas,
  };
}

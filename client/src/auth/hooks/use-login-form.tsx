import { useFormik } from "formik";
import * as Yup from "yup";
import { PostService } from "../../api/services/requests-service";
import ApiRoutes from "../../api/services/api-routes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../slice/authSlice";
import Toast from "../../design-system/components/Toast/Toast";

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle login form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await PostService({
          route: ApiRoutes.login,
          body: values,
        });

        const user = { ...response?.data.result, token: response?.data.token };
        if (user?.isActive) {
          dispatch(
            setAuth({
              token: response?.data.token,
              authInfo: response?.data.result,
              permissions: response?.data.result.permission?.permissions,
              role: response?.data.result.role,
            })
          );
        }
        navigate("/home");
        Toast({
          status: "success",
          text: `Hello ${values.email}.`,
        });
      } catch (error: any) {
        Toast({
          status: "Error",
          text: error.response.data.error,
        });
      }
    },
  });
  return formik;
};

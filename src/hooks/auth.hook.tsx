import { ISigninForm } from "../interfaces/";
import ApiService from "../api/ApiService";
import { endpoints } from "../utils/endpoints";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import JwtService from "../api/JwtService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAuthActions } from "../store/userAuth";


const signIn = async (values: ISigninForm) => {
  const { data } = await ApiService.post(endpoints.signIn, values);
  return data;
};

const useSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = userAuthActions;

  return useMutation<any, AxiosError<{ message: string }>, any>({
    mutationFn: signIn,
    onSuccess: (data: any) => {
      JwtService.setToken(data?.data.token);
      dispatch(login());
      navigate("/");
    },
  });
};

export { useSignIn };

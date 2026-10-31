import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Eye from "../SvgIcons/Eye";
import EyeClosed from "../SvgIcons/EyeClosed";
import { useState } from "react";
import ArrowBack from "../SvgIcons/ArrowBack";

interface RegisterProps {
  setModal: () => void;
}

interface RegisterData {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  phone: string;
  password: string;
  gender: boolean;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required!")
    .min(4, "Name must be at least 4 symbols!")
    .max(20, "Name must be maximum 20 symbols!"),
  surname: yup
    .string()
    .required("Surname is required!")
    .min(4, "Surname must be at least 4 symbols!")
    .max(20, "Surname must be maximum 20 symbols!"),
  nickname: yup
    .string()
    .required("Nickname is required!")
    .min(4, "Nickname must be at least 4 symbols!")
    .max(20, "Nickname must be maximum 20 symbols!"),
  email: yup.string().required("Email is required!").email("Incorrect email!"),
  phone: yup
    .string()
    .required("Phone is required!")
    .min(9, "Phone Should be minimum 9 numbers"),
  gender: yup.boolean().required("Gender is required"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be minimum 6 symbols!")
    .max(12, "Password must be maximum 12 symbols!")
    .matches(/(?=.*[A-Z])/, "At least one uppercase letter required!")
    .matches(/(?=.*[a-z])/, "At least one lowercase letter required!"),
  repeatPassword: yup
    .string()
    .required("Please repeat the password!")
    .oneOf([yup.ref("password")], "Passwords must match!"),
});

function Register({ setModal }: RegisterProps) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [visible, setVisible] = useState<boolean>(false);
  const [repeatvisible, setRepeatVisible] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  const stepFields = {
    1: ["name", "surname"],
    2: ["nickname", "email"],
    3: ["password", "repeatPassword"],
    4: ["phone", "gender"],
  } as const;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  async function handleNext() {
    const isValid = await trigger(stepFields[step as 1 | 2 | 3]);
    if (isValid) setStep((prev) => prev + 1);
  }

  async function handleSignUp(data: RegisterData) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.log("error registering user!");
      }
      window.location.reload();
      sessionStorage.clear();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      {step !== 1 ? (
        <ArrowBack onClick={() => setStep((prev) => prev - 1)} />
      ) : (
        ""
      )}
      <h2 className="text-center font-bold text-[20px]">Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)} noValidate>
        <div className="flex gap-2 justify-center my-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className={`w-9 h-2 rounded-[10px] ${index + 1 <= step ? "bg-blue-700" : "bg-blue-300"} transition-all duration-400`}
            ></div>
          ))}
        </div>
        {step === 1 && (
          <>
            <div>
              <input
                className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                type="text"
                placeholder="Name"
                defaultValue={sessionStorage.getItem("name") ?? ""}
                {...register("name", {
                  onChange: (e) => {
                    sessionStorage.setItem("name", e.target.value);
                  },
                })}
              />
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.name?.message}
              </span>
            </div>
            <div>
              <input
                className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                type="text"
                placeholder="Surname"
                defaultValue={sessionStorage.getItem("surname") ?? ""}
                {...register("surname", {
                  onChange: (e) => {
                    sessionStorage.setItem("surname", e.target.value);
                  },
                })}
              />

              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.surname?.message}
              </span>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <input
                className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                type="text"
                placeholder="Nickname"
                defaultValue={sessionStorage.getItem("nickname") ?? ""}
                {...register("nickname", {
                  onChange: (e) => {
                    sessionStorage.setItem("nickname", e.target.value);
                  },
                })}
              />
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.nickname?.message}
              </span>
            </div>
            <div>
              <input
                className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                type="text"
                placeholder="Email"
                defaultValue={sessionStorage.getItem("email") ?? ""}
                {...register("email", {
                  onChange: (e) => {
                    sessionStorage.setItem("email", e.target.value);
                  },
                })}
              />
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.email?.message}
              </span>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div>
              <div className="relative">
                <input
                  className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                />
                {visible ? (
                  <EyeClosed onClick={() => setVisible(false)} />
                ) : (
                  <Eye onClick={() => setVisible(true)} />
                )}
              </div>
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.password?.message}
              </span>
            </div>
            <div>
              <div className="relative">
                <input
                  className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                  type={repeatvisible ? "text" : "password"}
                  placeholder="Repeat Password"
                  {...register("repeatPassword")}
                />
                {repeatvisible ? (
                  <EyeClosed onClick={() => setRepeatVisible(false)} />
                ) : (
                  <Eye onClick={() => setRepeatVisible(true)} />
                )}
              </div>
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.repeatPassword?.message}
              </span>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div>
              <input
                className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
                type="text"
                placeholder="Phone"
                defaultValue={sessionStorage.getItem("phone") ?? ""}
                maxLength={9}
                {...register("phone", {
                  onChange: (e) => {
                    sessionStorage.setItem("phone", e.target.value);
                  },
                })}
              />
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.phone?.message}
              </span>
            </div>
            <div>
              <p className="text-[14px] text-gray-600 mb-2">Gender</p>
              <div className="flex gap-6">
                <label
                  htmlFor="male"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="male"
                    className="peer sr-only"
                    {...register("gender")}
                    value="1"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center transition-all duration-200 peer-checked:border-blue-700 peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:rounded-full peer-checked:after:bg-blue-700 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400" />
                  <span className="text-gray-700">Male</span>
                </label>
                <label
                  htmlFor="female"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id="female"
                    className="peer sr-only"
                    {...register("gender")}
                    value="0"
                  />
                  <span className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center transition-all duration-200 peer-checked:border-blue-700 peer-checked:after:content-[''] peer-checked:after:w-2.5 peer-checked:after:h-2.5 peer-checked:after:rounded-full peer-checked:after:bg-blue-700 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400" />
                  <span className="text-gray-700">Female</span>
                </label>
              </div>
              <span className="h-4.75 block my-2 text-red-500 text-[12px]">
                {errors.gender?.message}
              </span>
            </div>
          </>
        )}

        {step <= 3 ? (
          <button
            key="next"
            className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
            type="button"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            key="submit"
            className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
            type="submit"
          >
            Sign Up
          </button>
        )}
        <p className="text-[14px] text-center my-2">
          Already have an account?{" "}
          <span className="text-blue-700 cursor-pointer" onClick={setModal}>
            Log In
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;

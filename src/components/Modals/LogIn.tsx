import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Eye from "../SvgIcons/Eye";
import EyeClosed from "../SvgIcons/EyeClosed";

interface LogInProps {
  setModal: () => void;
}

const schema = yup.object({
  email: yup.string().required("Email is required!").email("Incorrect email!"),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

function LogIn({ setModal }: LogInProps) {
  const [error, setError] = useState<string>("");
  const API_URL = import.meta.env.VITE_API_URL;
  const [visible, setVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleLogIn(data: { email: string; password: string }) {
    try {
      const res = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 401) {
        setError("Wrong email or password!");
      } else if (res.status === 500) {
        setError("Something went wrong please try again later!");
      } else {
        const result = await res.json();
        localStorage.setItem("token", result.token);
        window.location.reload();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h2 className="text-center font-bold text-[20px]">Log In</h2>
      <form onSubmit={handleSubmit(handleLogIn)} noValidate>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <span className="h-4.75 block my-2 text-red-500 text-[12px]">
            {errors.email?.message}
          </span>
        </div>
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
        <button
          className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
          type="submit"
        >
          Log In
        </button>
        <span className="h-4.75 block my-2 text-red-500 text-[12px] text-center">
          {error}
        </span>
        <p className="text-[14px] text-center my-2">
          Don't have an account?{" "}
          <span className="text-blue-700 cursor-pointer" onClick={setModal}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default LogIn;

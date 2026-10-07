import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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
});

function Register({ setModal }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSignUp(data: RegisterData) {
    try {
      const res = await fetch(
        "https://rentacar-uq9f.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        console.log("error registering user!");
      }
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h2 className="text-center font-bold text-[20px]">Sign Up</h2>
      <form onSubmit={handleSubmit(handleSignUp)} noValidate>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="text"
            placeholder="Name"
            {...register("name")}
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
            {...register("surname")}
          />
          <span className="h-4.75 block my-2 text-red-500 text-[12px]">
            {errors.surname?.message}
          </span>
        </div>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="text"
            placeholder="Nickname"
            {...register("nickname")}
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
            {...register("email")}
          />
          <span className="h-4.75 block my-2 text-red-500 text-[12px]">
            {errors.email?.message}
          </span>
        </div>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="text"
            placeholder="Phone"
            {...register("phone")}
          />
          <span className="h-4.75 block my-2 text-red-500 text-[12px]">
            {errors.phone?.message}
          </span>
        </div>
        <div>
          <input
            className="h-10 border-b-blue-500 border-b-2 outline-none w-full"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <span className="h-4.75 block my-2 text-red-500 text-[12px]">
            {errors.password?.message}
          </span>
        </div>
        <div>
          <div className="flex">
            <div className="flex">
              <label htmlFor="male">Male</label>
              <input type="radio" id="male" {...register("gender")} value={1} />
            </div>
            <div className="flex">
              <label htmlFor="female">Female</label>
              <input type="radio" {...register("gender")} value={0} />
            </div>
          </div>
          <span className="h-4.75 block my-2 text-red-500 text-[12px]">
            {errors.gender?.message}
          </span>
        </div>
        <button
          className="flex items-center justify-center mx-auto bg-blue-700 text-white rounded-sm w-32 h-12 hover:bg-blue-600 transition-all duration-200 cursor-pointer"
          type="submit"
        >
          Sign Up
        </button>
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

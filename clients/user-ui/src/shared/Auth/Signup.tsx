import { REGISTER_USER } from "@/src/graphql/actions/register.action";
import styles from "@/src/utils/style";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long!"),
  phone_number: z.number().min(11),
});

type SignUpSchema = z.infer<typeof formSchema>;

const Signup = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [registerUserMutation, { loading }] = useMutation(REGISTER_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(formSchema),
  });

  //   on submit
  const onSubmit = async (data: SignUpSchema) => {
    try {
      const response = await registerUserMutation({
        variables: data,
      });
      localStorage.setItem(
        "activation_token",
        response.data.register.activation_token
      );

      toast.success("Please check your email to activate your accont");
      reset();
      setActiveState("Verification");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <br />
      <h1 className={`${styles.title}`}>SignUp with Yummi</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name input */}
        <div className="w-full  relative mb-3">
          <label className={`${styles.label}`}>Enter your name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="your name"
            className={`${styles.input}`}
          />
        </div>
        {errors.name && (
          <span className="text-red-500 block mt-1">
            {`${errors.name.message}`}
          </span>
        )}
        {/* email input */}
        <label className={`${styles.label}`}>Enter your email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        {/* phone number input */}
        <div className="w-full  relative mt-3">
          <label className={`${styles.label}`}>Enter your phone number</label>
          <input
            {...register("phone_number", { valueAsNumber: true })}
            type="number"
            placeholder="+8801*******"
            className={`${styles.input}`}
          />
        </div>
        {errors.phone_number && (
          <span className="text-red-500 block mt-1">
            {`${errors.phone_number.message}`}
          </span>
        )}
        {/* password input */}
        <div className="w-full mt-5 relative mb-1">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter your password
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="password!@%"
            className={`${styles.input}`}
          />
          {errors.password && (
            <span className="text-red-500 block mt-1">
              {`${errors.password.message}`}
            </span>
          )}
        </div>

        {/* submit button */}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign Up"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3 `}
          />
        </div>
        <br />
        {/* join with google or github */}
        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          or join with
        </h5>
        <div
          className="flex items-center justify-center my-3"
          onClick={() => signIn()}
        >
          <FcGoogle size={30} className="cursor-pointer mr-2" />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already not have any account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Signup;

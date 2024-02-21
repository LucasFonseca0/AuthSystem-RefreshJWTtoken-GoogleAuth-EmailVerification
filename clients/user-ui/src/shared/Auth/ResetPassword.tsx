"use client"
import { RESET_PASSWORD } from "@/src/graphql/actions/reset-password.action";
import styles from "@/src/utils/style";
import { useMutation } from "@apollo/client";
import { zodResolver  } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long!"),
  confirmPassword: z.string(),

}).refine(
    (values)=>{
       return values.password === values.confirmPassword
    },{
        message:"Passwords must need to match",
        path:["confirmPassword"]
    }
);

type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({activationToken}:{activationToken:string |string[]|undefined}) => {;

    const [resetPassword,{loading,data}] = useMutation(RESET_PASSWORD)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const {password} = data

      const response = await resetPassword({variables:{
        password,
        activationToken
      }})
      toast.success("Password updated successfully!")
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="md:w-[500px] w-full">
          <h1 className={`${styles.title}`}>Reset with Becodemy</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          
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
              <br /> 
            <div className="w-full mt-5 relative mb-1">
              <label htmlFor="confirmPassword" className={`${styles.label}`}>
                Enter your Confirm password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                placeholder="password!@%"
                className={`${styles.input}`}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 block mt-1">
                  {`${errors.confirmPassword.message}`}
                </span>
              )}
             
            </div>
            <div className="w-full mt-5">
          
              <input
                type="submit"
                value="submit"
                disabled={isSubmitting || loading}
                className={`${styles.button} mt-3 `}
              />
            </div>
           <br />
          </form>
      </div>
    </div>
  );
};

export default ResetPassword;

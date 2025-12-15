import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useAuth } from "@/context/auth";

function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuth();
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const password = watch("password");

  const onSubmit = async (data) => {
    setSubmitError(null);
    const { confirmPassword, ...apiData } = data;

    try {
      await registerUser(apiData);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      setSubmitError(err.message || "Đăng ký thất bại");
    }
  };

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 bg-[rgb(var(--background-rgb))]`}
    >
      <Card className="w-full max-w-md bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl ${foregroundColor}`}>
            Create new account
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Login here
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitError && (
            <Alert
              variant="destructive"
              className="mb-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400"
            >
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username" className={foregroundColor}>
                Username
              </Label>
              <Input
                id="username"
                {...register("username", {
                  required: "Vui lòng nhập tên đăng nhập",
                })}
                className={`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
              />
              {errors.username && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className={foregroundColor}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                })}
                className={`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className={foregroundColor}>
                Phone
              </Label>
              <Input
                id="phone"
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                })}
                className={`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="dob" className={foregroundColor}>
                Date of birth
              </Label>
              <Input
                id="dob"
                type="date"
                className={`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor} dark:[color-scheme:dark]`}
                {...register("dob", { required: "Vui lòng nhập ngày sinh" })}
              />
              {errors.dob && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className={foregroundColor}>
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: { value: 6, message: "Tối thiểu 6 ký tự" },
                })}
                className={`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className={foregroundColor}>
                Confirm password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className={`focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
                {...register("confirmPassword", {
                  required: "Vui lòng nhập lại mật khẩu",
                  validate: (val) => val === password || "Mật khẩu không khớp",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors border-none"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>
          </form>
        </CardContent>
        <div className="pb-6">
          <Link
            to="/"
            className={`flex justify-center items-center hover:underline text-sm ${foregroundColor} opacity-80 hover:opacity-100 transition-opacity`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;

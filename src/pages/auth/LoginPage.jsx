import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowRight, User2, Lock } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const loginSchema = z.object({
  username: z.string().min(2, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setSubmitError(null);

    try {
      await login(data.username, data.password);
      navigate("/");
    } catch (err) {
      setSubmitError(
        err.message || "Login failed. Please check your username and password"
      );
    }
  };

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 bg-[rgb(var(--background-rgb))]`}
    >
      <Card className="w-full max-w-md bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className={`text-2xl ${foregroundColor}`}>Login</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Register now
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="username" className={foregroundColor}>
                Username
              </Label>
              <div className="relative">
                <User2
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  className={`pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
                  placeholder="Username"
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className={foregroundColor}>
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-transparent border-gray-300 dark:border-gray-700 ${foregroundColor}`}
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors border-none cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Login <ArrowRight size={16} />
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <div className="pb-6">
          <Link
            to="/"
            className={`flex justify-center items-center hover:underline text-sm ${foregroundColor} opacity-80 hover:opacity-100 transition-opacity`}
          >
            <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
            Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;

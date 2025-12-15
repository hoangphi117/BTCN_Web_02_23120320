import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, User, Calendar, Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/auth";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

const profileSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, {
    message: "Invalid phone number",
  }),
  dob: z.string().refine((date) => new Date(date) <= new Date(), {
    message: "Date of birth cannot be in the future",
  }),
});

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      dob: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (user) {
      const formattedDob = user.dob
        ? new Date(user.dob).toISOString().split("T")[0]
        : "";

      form.reset({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: formattedDob,
      });
    }
  }, [user, form]);

  const onSubmit = async (values) => {
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Bạn chưa đăng nhập!");

      const response = await fetch(`${API_ROOT}/users/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-app-token": APP_TOKEN,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed.");
      }

      const updatedUser = result.data || { ...user, ...values };
      setUser(updatedUser);

      setMessage({
        type: "success",
        content: "Update complete!",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({ type: "error", content: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const foregroundColor = "text-[rgb(var(--foreground-rgb))]";

  return (
    <div className="container max-w-md mx-auto py-10 px-4 animate-fade-in">
      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 shadow-lg">
        <CardHeader>
          <CardTitle
            className={`text-2xl font-bold flex items-center gap-2 ${foregroundColor}`}
          >
            <User className="w-6 h-6 text-blue-500" />
            Profile
          </CardTitle>
          <CardDescription className={`${foregroundColor}`}>
            Manage and update your information
          </CardDescription>
        </CardHeader>

        <CardContent>
          {message.content && (
            <div
              className={`p-3 mb-6 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message.content}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={foregroundColor}>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <Input
                          placeholder="example@email.com"
                          {...field}
                          className={`pl-9 ${foregroundColor}`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={foregroundColor}>
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone
                          size={16}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <Input
                          placeholder="0912..."
                          {...field}
                          className={`pl-9 ${foregroundColor}`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={foregroundColor}>
                      Date of birth
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="absolute left-3 top-3 text-gray-400"
                        />
                        <Input
                          type="date"
                          {...field}
                          className={`pl-9 ${foregroundColor} block`}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;

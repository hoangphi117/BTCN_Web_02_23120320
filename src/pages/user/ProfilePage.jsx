import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/form";
import { useAuth } from "@/context/auth";

const API_ROOT = "/api";
const APP_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIzXzMxIiwicm9sZSI6InVzZXIiLCJhcGlfYWNjZXNzIjp0cnVlLCJpYXQiOjE3NjUzNjE3NjgsImV4cCI6MTc3MDU0NTc2OH0.O4I48nov3NLaKDSBhrPe9rKZtNs9q2Tkv4yK0uMthoo";

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const form = useForm({
    defaultValues: {
      email: "",
      phone: "",
      dob: "",
    },
  });

  useEffect(() => {
    if (user) {
      const formattedDob = user.dob
        ? new Date(user.dob).toISOString().split("T")[0]
        : "";

      form.reset({
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
        throw new Error(result.message || "Update failed!");
      }

      const updatedUser = result.data || { ...user, ...values };
      setUser(updatedUser);

      setMessage({
        type: "success",
        content: "Updated successfully!",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({
        type: "error",
        content: error.message || "Something went wrong",
      });
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
                          className="absolute left-3 top-3 text-gray-400"
                          size={16}
                        />
                        <Input
                          placeholder="example@email.com"
                          {...field}
                          className={`pl-9 ${foregroundColor}`}
                        />
                      </div>
                    </FormControl>
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
                          className="absolute left-3 top-3 text-gray-400"
                          size={16}
                        />
                        <Input
                          placeholder="0912..."
                          {...field}
                          className={`pl-9 ${foregroundColor}`}
                        />
                      </div>
                    </FormControl>
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
                          className="absolute left-3 top-3 text-gray-400"
                          size={16}
                        />
                        <Input
                          type="date"
                          {...field}
                          className={`pl-9 ${foregroundColor}`}
                        />
                      </div>
                    </FormControl>
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

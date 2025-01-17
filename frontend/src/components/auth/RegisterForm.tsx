import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Lock, Mail, Check, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    // Simulate loading for demo
    // Assuming a `register` function exists in your Auth context
    await register(email, password);
  };

  const checkPasswordStrength = (password: string) => {
    const conditions = [
      { met: password.length >= 8, label: "8+ characters" },
      { met: /[A-Z]/.test(password), label: "Uppercase letter" },
      { met: /\d/.test(password), label: "Number" },
      { met: /[!@#$%^&*(),.?":{}|<>]/.test(password), label: "Special character" },
    ];

    const fulfilledCount = conditions.filter((c) => c.met).length;

    return {
      conditions,
      strength:
        fulfilledCount === 0
          ? { label: "Too Weak", color: "red" }
          : fulfilledCount <= 2
          ? { label: "Weak", color: "orange" }
          : fulfilledCount === 3
          ? { label: "Moderate", color: "yellow" }
          : { label: "Strong", color: "green" },
    };
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-4xl p-4 md:p-0">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Branding Section */}
          <div className="relative hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"
                style={{ animation: "pulse 4s infinite" }}
              />
              <div
                className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
                style={{ animation: "pulse 4s infinite 2s" }}
              />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-2xl backdrop-blur-sm p-4 transform transition-transform hover:scale-110">
                <img
                  src="/api/placeholder/96/96"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold">Welcome to NotePal</h2>
                <p className="text-lg text-gray-100">Your personal note-taking companion</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Create Account
                  </span>
                </CardTitle>
                <p className="text-gray-500">Start your journey with us</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <div
                      className={`relative transition-all duration-300 ${
                        focusedField === "email" ? "scale-105" : ""
                      }`}
                    >
                      <Mail
                        className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                          focusedField === "email" ? "text-indigo-600" : "text-gray-400"
                        }`}
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        className="pl-10 py-6 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  {/* Password Strength and Rest of the Form */}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

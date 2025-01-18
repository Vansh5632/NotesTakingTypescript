import React, { useState, FormEvent, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Lock, Mail, Check, X, User } from "lucide-react";

interface PasswordStrengthCondition {
  met: boolean;
  label: string;
}

interface PasswordStrength {
  label: string;
  color: string;
}

interface PasswordStrengthResult {
  conditions: PasswordStrengthCondition[];
  strength: PasswordStrength;
}

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengthResult>({ 
    conditions: [],
    strength: { label: "", color: "" }
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<keyof FormData | "">("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkPasswordStrength = (password: string): PasswordStrengthResult => {
    const conditions: PasswordStrengthCondition[] = [
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Registration successful!", {
        email: formData.email,
        username: formData.username,
        password: formData.password
      });
      // Here you would typically call your registration function
    } catch (error) {
      setErrors({ password: "Registration failed. Please try again." });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-4xl p-4 md:p-0">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Branding Section */}
          <div className="relative hidden md:flex flex-col justify-center items-center w-1/2 p-12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-2xl backdrop-blur-sm p-4">
                <img src="/api/placeholder/96/96" alt="Logo" className="w-full h-full object-contain" />
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
                  {/* Username Field */}
                  <div className="space-y-2">
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "username" ? "scale-105" : ""
                    }`}>
                      <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                        focusedField === "username" ? "text-indigo-600" : "text-gray-400"
                      }`} />
                      <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("username")}
                        onBlur={() => setFocusedField("")}
                        className="pl-10 py-6 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "email" ? "scale-105" : ""
                    }`}>
                      <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                        focusedField === "email" ? "text-indigo-600" : "text-gray-400"
                      }`} />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        className="pl-10 py-6 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "password" ? "scale-105" : ""
                    }`}>
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                        focusedField === "password" ? "text-indigo-600" : "text-gray-400"
                      }`} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField("")}
                        className="pl-10 pr-10 py-6 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className={`h-2 flex-1 rounded-full bg-gray-200`}>
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                passwordStrength.strength.color === "red"
                                  ? "w-1/4 bg-red-500"
                                  : passwordStrength.strength.color === "orange"
                                  ? "w-2/4 bg-orange-500"
                                  : passwordStrength.strength.color === "yellow"
                                  ? "w-3/4 bg-yellow-500"
                                  : "w-full bg-green-500"
                              }`}
                            />
                          </div>
                          <span className={`text-sm font-medium ${
                            passwordStrength.strength.color === "red"
                              ? "text-red-500"
                              : passwordStrength.strength.color === "orange"
                              ? "text-orange-500"
                              : passwordStrength.strength.color === "yellow"
                              ? "text-yellow-600"
                              : "text-green-500"
                          }`}>
                            {passwordStrength.strength.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {passwordStrength.conditions.map((condition, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              {condition.met ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <X className="h-4 w-4 text-red-500" />
                              )}
                              <span className={`text-sm ${condition.met ? "text-green-500" : "text-red-500"}`}>
                                {condition.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <div className={`relative transition-all duration-300 ${
                      focusedField === "confirmPassword" ? "scale-105" : ""
                    }`}>
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                        focusedField === "confirmPassword" ? "text-indigo-600" : "text-gray-400"
                      }`} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField("")}
                        className="pl-10 py-6 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        required
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2, Eye, EyeOff, Lock, Mail, Check, X, StickyNote } from "lucide-react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, isLoading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    await register(email, password);
  };

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  const strengthIndicators = [
    { label: "At least 8 characters", met: hasMinLength },
    { label: "Contains uppercase letter", met: hasUpperCase },
    { label: "Contains number", met: hasNumber },
    { label: "Contains special character", met: hasSpecialChar },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="w-full max-w-lg px-4">
        <Card className="backdrop-blur-md bg-white/90 shadow-2xl border border-gray-200 rounded-xl">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex items-center gap-2">
                <StickyNote className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold text-primary">
                  NotePal
                </span>
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Create Your Account
            </CardTitle>
            <p className="text-sm text-gray-500 text-center">
              Organize your thoughts with NotePal
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants} className="relative">
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </motion.div>

              {password && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-2 bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-xs font-medium text-gray-600">
                    Password strength:
                  </p>
                  <div className="space-y-1">
                    {strengthIndicators.map((indicator, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {indicator.met ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300" />
                        )}
                        <span
                          className={`text-xs ${
                            indicator.met ? "text-green-500" : "text-gray-500"
                          }`}
                        >
                          {indicator.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="relative">
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                  required
                />
              </motion.div>

              {(passwordError || error) && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Alert className="bg-red-50 border-red-200">
                    <AlertDescription className="text-red-700">
                      {passwordError || error?.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-lg py-3 transition-all duration-200 shadow-lg shadow-indigo-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating your account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default RegisterForm;

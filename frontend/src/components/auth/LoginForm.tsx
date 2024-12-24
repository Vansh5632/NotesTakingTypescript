import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock } from "lucide-react";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

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
      <motion.div variants={itemVariants} className="w-full max-w-md px-4">
        <Card className="backdrop-blur-md bg-white/90 shadow-2xl border border-gray-200 rounded-xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-gray-500">Log in to your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Alert variant="destructive" className="bg-red-50 border-red-200">
                    <AlertTitle className="text-red-700">Error</AlertTitle>
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="relative">
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-lg py-3 transition-all duration-200 shadow-lg shadow-indigo-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
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

export default LoginForm;

"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function Login() {
  //Adding eye button in password
  const [showPassword, setShowPassword] = useState(false);
  // Toggle karne ke liye state
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "", // Signup ke liye extra
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Logic: Signup ke liye alag URL aur Login ke liye alag
    const endpoint = isSignup ? "register/" : "login/";
    const url = `https://go-to-marketing-application-backend-1.onrender.com/${endpoint}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (res.ok) {
        if (isSignup) {
          toast.success("Account Created! Now Login.");
          setIsSignup(false); // Signup ke baad auto-switch to login
        } else {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          toast.success("Login Successful!");
          window.location.href = "/form";
        }
      } else {
        if (data.username) {
          toast.error(`Username: ${data.username[0]}`);
        } else if (data.email) {
          toast.error(`Email: ${data.email[0]}`);
        } else if (data.password) {
          toast.error(`Password: ${data.password[0]}`);
        } else if (data.detail) {
          toast.error(data.detail);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    } catch (err) {
      toast.error("Server connection failed. Check if Django is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500 w-full h-screen flex flex-col items-center justify-center  ">
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/login.mp4" type="video/mp4" />
        </video>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        className=" transform origin-center scale-90 sm:scale-95 md:scale-100"
      >
        <div className=" shadow-2xl">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 bg-none text-white rounded shadow-md w-96 border-t-4 border-yellow-300"
          >
            <h2 className="mb-6 text-xl sm:text-2xl text-white font-bold text-center">
              {isSignup ? "Create Your Account" : "Login"}
            </h2>

            {/* Agar Signup mode hai tabhi Email dikhao */}
            {isSignup && (
              <input
                type="email"
                placeholder=" Enter a valid email address"
                className="w-full p-2 mb-4 border cursor-pointer rounded text-white focus:outline-blue-400"
                required
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            )}

            <input
              type="text"
              placeholder=" Enter Your Username"
              className="w-full p-2 mb-4 text-white border cursor-pointer rounded focus:outline-blue-400"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"} //dynamic type
                placeholder=" Enter Your Password"
                className="w-full p-2 mb-6 border cursor-pointer text-white rounded focus:outline-blue-400"
                required
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              {/* Eye Button */}

              <div
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <span>🙈</span> // Hide icon
                ) : (
                  <span>👁️</span> // Show icon
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`w-full p-2 mt-4 text-white rounded font-semibold transition ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
            </button>

            {/* Switch Link */}
            <p className="mt-2 text-center text-white text-sm  ">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <span
                className="text-blue-400 cursor-pointer font-bold hover:underline"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Login here" : "Sign up here"}
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

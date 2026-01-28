"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, TrendingUp } from "lucide-react";

export default function MarketingPlan() {
  const [formData, setFormData] = useState({
    targetAudience: "",
    location: "",

    hasWebsite: "no",
    websiteUrl: "",

    hasApp: "no",
    appName: "",

    businessGoal: "",
    trademark: "no",
    ideaStatus: "new",
    hasPatent: "no",

    category: "",
    subCategory: "",
  });

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   const handleChange = (e: { target: { name: any; value: any } }) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const generatePlan = (e: { preventDefault: () => void }) => {
  //     e.preventDefault();

  //     toast.success("Marketing plan generated successfully 🚀");

  //     const {
  //       category,
  //       subCategory,
  //       targetAudience,
  //       location,
  //       hasWebsite,
  //       websiteUrl,
  //       hasApp,
  //       appName,
  //       businessGoal,
  //       trademark,
  //       ideaStatus,
  //       hasPatent,
  //     } = formData;

  //     const generatedPlan = `
  // 📌 Business Name:
  // ${category}${subCategory ? " - " + subCategory : ""}

  // 🎯 Target Audience:
  // Focus on ${targetAudience} in ${location}.

  // 📣 Marketing Strategy:
  // • Promote ${category} using Instagram & Facebook
  // • Use WhatsApp marketing for local reach
  // • Partner with niche influencers in ${category}
  // • Offer first-time customer discounts
  // • Build trust using testimonials & reviews

  // 🌐 Website Strategy:
  // ${
  //   hasWebsite === "yes"
  //     ? `• Optimize existing website: ${websiteUrl}
  // • Focus on SEO-friendly landing pages
  // • Improve site speed & mobile UX
  // • Add lead capture forms`
  //     : `• Build a simple, fast website (landing page first)
  // • Use Webflow / Next.js / WordPress
  // • Add clear CTA (Call / WhatsApp / Buy Now)`
  // }

  // 📱 Mobile App Strategy:
  // ${
  //   hasApp === "yes"
  //     ? `• Promote app: ${appName}
  // • Run App Install campaigns
  // • Use push notifications for retention
  // • Collect app reviews aggressively`
  //     : `• Start with mobile-optimized website
  // • Analyze demand before app development
  // • Use PWA as a cost-effective option`
  // }

  // 🎯 Business Goal Focus:
  // ${
  //   businessGoal === "growth"
  //     ? "• Focus on user acquisition & reach\n• Run awareness campaigns\n• Collaborations & influencer reach"
  //     : businessGoal === "sales"
  //       ? "• Performance marketing (Google Ads, Meta Ads)\n• Retargeting campaigns\n• Conversion optimization"
  //       : "• Strong brand identity\n• Consistent visual content\n• Storytelling marketing"
  // }

  // 🧾 Legal & Brand Protection:
  // • Trademark Status: ${
  //       trademark === "yes"
  //         ? "Registered – leverage brand credibility"
  //         : "Not registered – initiate trademark filing ASAP"
  //     }
  // • Idea Status: ${
  //       ideaStatus === "new"
  //         ? "New Idea – educate market & build trust"
  //         : "Existing Business – focus on differentiation"
  //     }
  // • Patent: ${
  //       hasPatent === "yes"
  //         ? "Patent available – highlight USP strongly"
  //         : "No patent – compete on branding & execution"
  //     }

  // 📈 Growth Plan:
  // • Collect customer reviews on Google & Socials for ${category}
  // • Run monthly giveaways to boost engagement for ${category}
  // • Post consistently (3–4 times/week)
  // • Track KPIs monthly (Traffic, Leads, Sales) for ${category}
  // • Improve funnels based on data

  // 🚀 Final Note:
  // This go-to-market plan is tailored for your ${category} business in ${location}.
  // Execute step-by-step, track results, and scale what works.
  // `;

  //     setPlan(generatedPlan);
  //   };

  //for AI api integretion

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan("");
    

    try {
      const res = await fetch("https://go-to-marketing-application-backend-1.onrender.com/api/generate-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await res.json();
      setPlan(data.plan);
      toast.success("Marketing plan generated successfully 🚀");
    } catch (err) {
      toast.error("Failed to generate plan. Please try again 😵‍💫");
    } finally {
      setLoading(false);
    }
  };

  //adding print function
  const printPlan = () => {
    const printContents = document.getElementById("print-area")?.innerHTML;
    if (!printContents) return;

    const printWindow = window.open("", "", "height=700,width=900");

    if (!printWindow) {
      alert("Popup blocked. Please allow popups to print.");
      return;
    }

    printWindow.document.write(`
    <html>
      <head>
        <title>Go-To-Market Plan</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 15px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          h1, h2, h3 {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  //for copy text to clipboard
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(plan);
      toast.success("Plan was Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text ❌");
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.96,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    },
  };
  const MotionRocket = motion(Rocket);
  const MotionTrend = motion(TrendingUp);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* {isLoggedIn && ( */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 bg-none text-white px-4 py-2 rounded-md hover:bg-red-600/80 border-white/30 hover: transition"
      >
        LogOut
      </button>
      {/* // )} */}
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/market.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

      {/* MAIN CARD */}
      <div className="relative z-10 w-full max-w-5xl mx-4">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            // bg-white/10 border border-white/20 shadow-2xl niche add kiya tha
            className="rounded-3xl  p-8 mt-4 mb-5"
          >
            {/* HEADER */}
            <motion.h1
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              className="text-3xl font-bold text-white text-center"
            >
              <MotionRocket
                className="inline mr-2 text-purple-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              {/* <img
                src="/gifs/rocket.gif"
                alt="Loading..."
                className="inline mr-2 text-purple-400 w-4"
              /> */}
              <MotionTrend
                className="inline mr-2 text-green-400"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              Go To Market Application
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 3.3,
                ease: "easeOut",
              }}
              className="text-center text-gray-300 mt-2 mb-8"
            >
              Generate a professional launch & marketing strategy
            </motion.p>

            {/* FORM (NOTHING REMOVED) */}
            <form
              onSubmit={generatePlan}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* CATEGORY */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="category"
                onChange={handleChange}
                required
                className="input-modern"
              >
                <option value="">Select Business Category</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Service">Service</option>
                <option value="SaaS">SaaS</option>
                <option value="Manufacturing">Manufacturing</option>
              </motion.select>

              {/* SUB CATEGORY */}
              {formData.category === "E-commerce" && (
                <input
                  name="subCategory"
                  placeholder="E-commerce Field (Electronics, Clothes, Grocery)"
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              )}

              {formData.category === "Service" && (
                <input
                  name="subCategory"
                  placeholder="Enter Service Field (Consulting, Cleaning, Delivery)"
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              )}

              {formData.category === "SaaS" && (
                <input
                  name="subCategory"
                  placeholder="Enter SaaS Field (CRM, Analytics, HR)"
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              )}

              {formData.category === "Manufacturing" && (
                <input
                  name="subCategory"
                  placeholder="Enter Manufacturing Field (Automotive, Food, Textiles)"
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              )}

              {/* TARGET AUDIENCE */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="targetAudience"
                onChange={handleChange}
                required
                className="input-modern"
              >
                <option value="">Select Target Audience</option>
                <option value="students">Students</option>
                <option value="professionals">Professionals</option>
                <option value="influencers">Influencers</option>
              </motion.select>

              {/* LOCATION */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="location"
                onChange={handleChange}
                required
                className="input-modern"
              >
                <option value="">Select Business Location</option>
                <option value="US">US</option>
                <option value="UK">UK</option>
                <option value="India">India</option>
              </motion.select>

              {/* WEBSITE */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="hasWebsite"
                onChange={handleChange}
                className="input-modern"
              >
                <option value="no">Do you have a website? (No)</option>
                <option value="yes">Yes</option>
              </motion.select>

              {formData.hasWebsite === "yes" && (
                <input
                  //  initial={{ opacity: 0, y: -60 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{
                  //   duration: 2,
                  //   ease: "easeOut",
                  // }}
                  name="websiteUrl"
                  placeholder="Website URL / Name"
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              )}

              {/* MOBILE APP */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="hasApp"
                onChange={handleChange}
                className="input-modern"
              >
                <option value="no">Do you have a mobile app? (No)</option>
                <option value="yes">Yes</option>
              </motion.select>

              {formData.hasApp === "yes" && (
                <input
                  //  initial={{ opacity: 0, y: -60 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{
                  //   duration: 2,
                  //   ease: "easeOut",
                  // }}
                  name="appName"
                  placeholder="Mobile App Name"
                  onChange={handleChange}
                  required
                  className="input-modern"
                />
              )}

              {/* BUSINESS GOAL */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="businessGoal"
                onChange={handleChange}
                required
                className="input-modern"
              >
                <option value="">Business Goal</option>
                <option value="growth">Growth</option>
                <option value="sales">Sales</option>
                <option value="branding">Branding</option>
              </motion.select>

              {/* TRADEMARK */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="trademark"
                onChange={handleChange}
                className="input-modern"
              >
                <option value="no">Trademark Registered? (No)</option>
                <option value="yes">Yes</option>
              </motion.select>

              {/* IDEA STATUS */}
              <motion.select
                name="ideaStatus"
                onChange={handleChange}
                className="input-modern"
              >
                <option value="new">Idea is New</option>
                <option value="old">Existing Business</option>
              </motion.select>

              {/* PATENT */}
              <motion.select
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                name="hasPatent"
                onChange={handleChange}
                className="input-modern"
              >
                <option value="no">Patent Available? (No)</option>
                <option value="yes">Yes</option>
              </motion.select>

              {/* SUBMIT */}
              <motion.button
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 2,
                  ease: "easeOut",
                }}
                type="submit"
                disabled={loading}
                className={`md:col-span-2 mt-6 text-white py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer
    ${
      loading
        ? "bg-gradient-to-r from-purple-400 to-indigo-200 cursor-not-allowed"
        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
    }
  `}
              >
                {loading ? "Generating Plan..." : " Generate Your Plan"}
              </motion.button>
            </form>
          </motion.div>
        </AnimatePresence> 

        <AnimatePresence>
          {plan && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* BACKDROP */}
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

              {/* MODAL CONTAINER */}
              <div className="relative z-10 w-full max-w-5xl mx-4">
                {/* 🔘 ACTION BAR */}
                <div className="flex justify-end items-center gap-3 mb-4 print-hide">
                  <button
                    onClick={copyText}
                    className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-gradient-to-r from-purple-600 to-indigo-600
                     text-white hover:opacity-90 transition"
                  >
                    📋 Copy
                  </button>

                  <button
                    onClick={printPlan}
                    className="px-4 py-2 rounded-lg text-sm font-medium
                     bg-gradient-to-r from-blue-500 to-cyan-500
                     text-white hover:opacity-90 transition"
                  >
                    🖨️ Print
                  </button>

                  <button
                    onClick={() => setPlan("")}
                    className="px-3 py-2 rounded-lg text-xl
                     text-white bg-red-500/80 hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* 📄 RESULT CARD */}
                <div
                  id="print-area"
                  className="relative bg-white/95 backdrop-blur-xl
                   rounded-2xl shadow-2xl
                   max-h-[80vh] overflow-y-auto p-8"
                >
                  {/* HEADER */}
                  <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      📊 Generated Marketing Plan
                    </h2>
                    {/* <p className="text-sm text-gray-500 mt-1">
                    AI-generated go-to-market & growth strategy
                  </p> */}
                  </div>

                  {/* CONTENT */}
                  <div className="prose max-w-none text-gray-800 text-sm leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {plan}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

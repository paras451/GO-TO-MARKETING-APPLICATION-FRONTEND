"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-hot-toast";
import { useRouter } from "next/dist/client/components/navigation";

export default function PlanPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      toast.error("Please login first 🔐");
      router.replace("/login");
    }
  }, [router]);

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const shouldGenerate = sessionStorage.getItem("generate_now");

    if (!shouldGenerate) return;

    sessionStorage.removeItem("generate_now");

    const storedData = localStorage.getItem("marketing_form");
    if (!storedData) {
      toast.error("No form data found");
      return;
    }

    generatePlan(storedData);
  }, []);

  const generatePlan = async (storedData: string) => {
    setLoading(true);
    setError("");
    setPlan("");

    try {
      const storedData = localStorage.getItem("marketing_form");

      if (!storedData) {
        toast.error("No form data found");
        return;
      }

      const res = await fetch("https://go-to-marketing-application-backend-1.onrender.com/api/generate-plan/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: storedData,
      });

      if (!res.ok) {
        throw new Error("Failed to generate plan");
      }

      const data = await res.json();
      setPlan(data.plan);
      toast.success("Marketing plan generated successfully 🚀");
    } catch (err) {
      setError("Failed to generate plan");
      toast.error("Failed to generate plan. Please try again 😵‍💫");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-gray-600 font-extrabold text-shadow-gray-600 from-neutral-600 animate-pulse">
          Generating your marketing plan...
        </p>

        <div className="w-full max-w-3xl space-y-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out successfully");
    setIsLoggedIn(false);
    window.location.href = "/";
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
      @page {
        size: A4;
        margin: 30mm 20mm; 
      }

      body {
        font-family: Trebuchet MS, sans-serif;
        line-height: 1.9;            
        padding: 0;
        margin: 0;
      }

      .page {
        max-width: 800px;          
        margin: auto;
      }

      h1, h2, h3 {
        margin-top: 24px;
        margin-bottom: 12px;
        line-height: 1.4;
      }

      p, li {
        margin-bottom: 10px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th, td {
        border: 1px solid #ccc;
        padding: 12px;
        text-align: left;
        vertical-align: top;
      }

      ul {
        padding-left: 20px;
      }
    </style>
  </head>
  <body>
    <div class="page">
      ${printContents}
    </div>
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

  if (error) {
    return (
      <div className="p-10 max-w-xl mx-auto text-center mt-50">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          ❌ Failed to generate plan
        </h2>

        <button
          onClick={() => {
            const storedData = localStorage.getItem("marketing_form");
            if (storedData) {
              setError("");
              generatePlan(storedData);
            }
          }}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          🔄 Regenerate Plan
        </button>
      </div>
    );
  }

  return (
    <div className="p-10 mx-auto relative">
      <button
        onClick={handleLogout}
        className=" top-4 right-4 z-50 bg-red-500 text-white px-2 py-1 sm:py-0 rounded-md hover:bg-red-600/80 border-white/30 hover: transition"
      >
        LogOut
      </button>

      <div className="flex justify-end items-center gap-3 mb-4 print-hide mt-2">
        <button
          onClick={copyText}
          className="px-4 py-2 rounded-lg text-sm font-medium
                  bg-gradient-to-r from-purple-600 to-indigo-600
                     text-white hover:opacity-90 transition"
        >
          📋 Copy Plan
        </button>

        <button
          onClick={printPlan}
          className="px-4 py-2 rounded-lg text-sm font-medium
                     bg-gradient-to-r from-blue-500 to-cyan-500
                     text-white hover:opacity-90 transition"
        >
          🖨️ Print Plan
        </button>
      </div>

      <div className="p-10 max-w-4xl mx-auto relative" id="print-area">
        <h1 className="text-2xl font-bold mb-6">📊 Generated Marketing Plan</h1>

        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{plan}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}


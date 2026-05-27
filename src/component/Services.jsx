import React from "react";
import { motion } from "framer-motion";
import {
  FaCode, FaServer, FaRobot, FaShoppingCart, FaMobile, FaChartBar,
} from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../pages/Home";

const services = [
  {
    icon: FaCode,
    title: "Frontend Development",
    desc: "Pixel-perfect, responsive UIs built with React.js, Next.js, and TailwindCSS with smooth animations.",
    color: "#6366f1",
    features: ["React / Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
  },
  {
    icon: FaServer,
    title: "Backend Development",
    desc: "Scalable REST APIs and server-side architectures with Node.js, Express.js, and NestJS.",
    color: "#a855f7",
    features: ["Node.js / NestJS", "REST APIs", "Auth & JWT", "Socket.io"],
  },
  {
    icon: FaRobot,
    title: "AI Integration",
    desc: "Integrate powerful AI capabilities with OpenAI, Gemini, and Groq into your applications.",
    color: "#06b6d4",
    features: ["OpenAI / GPT-4", "Gemini / Groq", "AI Chatbots", "AI SaaS"],
  },
  {
    icon: FaShoppingCart,
    title: "E-Commerce & Payments",
    desc: "Full-featured e-commerce platforms with payment gateway integrations — Stripe, Razorpay, PayPal.",
    color: "#f59e0b",
    features: ["Stripe / Razorpay", "Cart & Orders", "Admin Dashboard", "Inventory"],
  },
  {
    icon: FaMobile,
    title: "SaaS Development",
    desc: "Complete SaaS platforms with authentication, subscriptions, dashboards, and multi-tenancy.",
    color: "#ec4899",
    features: ["Supabase / Firebase", "Stripe Billing", "Multi-tenant", "Analytics"],
  },
  {
    icon: FaChartBar,
    title: "Admin Dashboards",
    desc: "Complex admin panels and dashboards with data tables, charts, RBAC, and real-time data.",
    color: "#10b981",
    features: ["RBAC & Roles", "Data Tables", "Charts & KPIs", "Real-time"],
  },
];

const Services = () => {
  const { dark } = useTheme();

  return (
    <section id="services" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #6366f1 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="What I Do"
          title="Services I Offer"
          subtitle="From frontend to AI integrations — I deliver end-to-end solutions tailored to your needs."
          dark={dark}
        />

        <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-6 flex flex-col gap-4 cursor-default transition-all duration-300"
              style={{
                background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${service.color}40`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${service.color}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = dark
                  ? "rgba(255,255,255,0.07)"
                  : "rgba(0,0,0,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `${service.color}18`,
                  color: service.color,
                  border: `1px solid ${service.color}30`,
                }}
              >
                <service.icon size={22} />
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-2">
                <h3
                  className="font-bold text-lg"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: dark ? "#f1f5f9" : "#0f172a",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: dark ? "#94a3b8" : "#64748b" }}
                >
                  {service.desc}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {service.features.map((f, j) => (
                  <span
                    key={j}
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: `${service.color}12`,
                      color: service.color,
                      border: `1px solid ${service.color}25`,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-4 mt-16 text-center"
        >
          <p className="text-base" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
            Have a project in mind? Let's build something amazing together.
          </p>
          <a
            href="mailto:nitinkumarja2003@gmail.com"
            data-cursor-hover
            className="btn-primary flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold"
          >
            <span>Start a Project</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

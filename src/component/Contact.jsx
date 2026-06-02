import React, { useState } from "react";
import { motion } from "framer-motion";
import { send } from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiMail, HiLocationMarker } from "react-icons/hi";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../context/ThemeContext";
import { personalDataObj } from "../data/data";

export const _emailConfig = {
  _serviceId: "service_rzg319l",
  _templateId: "template_wdoazvj",
  _userId: "TQqB6yo4iDwKgNeKl",
};

const newObj = () => ({ name: "", email: "", subject: "", message: "" });

const contactInfo = [
  {
    icon: HiMail,
    label: "Email",
    value: "nitinkumarja2003@gmail.com",
    href: "mailto:nitinkumarja2003@gmail.com",
    color: "#6366f1",
  },
  {
    icon: IoLogoWhatsapp,
    label: "WhatsApp",
    value: "+91 7078216535",
    href: personalDataObj.whatsapp,
    color: "#25d366",
  },
  {
    icon: HiLocationMarker,
    label: "Location",
    value: "Delhi, India",
    href: null,
    color: "#f59e0b",
  },
];

const socialLinks = [
  { icon: AiFillGithub, href: personalDataObj.github, label: "GitHub", color: "#ffffff" },
  { icon: FaLinkedinIn, href: personalDataObj.linkedin, label: "LinkedIn", color: "#0a66c2" },
  { icon: SiLeetcode, href: personalDataObj.leetcode, label: "LeetCode", color: "#ffa116" },
  { icon: IoLogoWhatsapp, href: personalDataObj.whatsapp, label: "WhatsApp", color: "#25d366" },
];

const Contact = () => {
  const { dark } = useTheme();
  const [form, setForm] = useState(newObj());
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    const { _serviceId, _templateId, _userId } = _emailConfig;
    const params = { ...form, subject: form.name };
    setLoading(true);
    send(_serviceId, _templateId, params, _userId)
      .then(() => {
        toast.success("Message sent successfully!", {
          style: { background: dark ? "#1e1e2e" : "#fff", color: dark ? "#e2e8f0" : "#0f172a" },
        });
        setForm(newObj());
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to send. Try emailing directly.");
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          background:
            "radial-gradient(ellipse at 80% 80%, #6366f1 0%, transparent 60%)",
        }}
      />

      <ToastContainer position="bottom-right" />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project idea or want to collaborate? I'd love to hear from you."
          dark={dark}
        />

        <div className="grid grid-cols-2 md:grid-cols-1 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-3">
              <h3
                className="text-2xl font-bold"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: dark ? "#f1f5f9" : "#0f172a",
                }}
              >
                Ready to Build Something{" "}
                <span className="gradient-text">Amazing?</span>
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: dark ? "#94a3b8" : "#64748b" }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                    border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <item.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor-hover
                        className="text-sm font-semibold transition-colors"
                        style={{ color: dark ? "#e2e8f0" : "#334155" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = item.color)}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = dark ? "#e2e8f0" : "#334155")
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: dark ? "#e2e8f0" : "#334155" }}>
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                Follow Me
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-hover
                    title={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                      color: dark ? "#94a3b8" : "#64748b",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${s.color}18`;
                      e.currentTarget.style.borderColor = `${s.color}40`;
                      e.currentTarget.style.color = s.color === "#ffffff" ? (dark ? "#fff" : "#334155") : s.color;
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                      e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <s.icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSend}
              className="flex flex-col gap-4 p-8 rounded-2xl sm:p-5"
              style={{
                background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                    Your Name
                  </label>
                  <input
                    className="premium-input px-4 py-3 rounded-xl text-sm w-full"
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={form.name}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                    Email Address
                  </label>
                  <input
                    className="premium-input px-4 py-3 rounded-xl text-sm w-full"
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    value={form.email}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                  Subject
                </label>
                <input
                  className="premium-input px-4 py-3 rounded-xl text-sm w-full"
                  type="text"
                  id="subject"
                  placeholder="Project Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                  Message
                </label>
                <textarea
                  className="premium-input px-4 py-3 rounded-xl text-sm w-full resize-none"
                  rows={5}
                  id="message"
                  placeholder="Tell me about your project..."
                  value={form.message}
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                data-cursor-hover
                disabled={loading}
                className="btn-primary flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold mt-2 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 border-2 rounded-full animate-spin"
                      style={{ borderColor: "#fff3", borderTopColor: "#fff" }}
                    />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <RiSendPlaneFill size={16} />
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

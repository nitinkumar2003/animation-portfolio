import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import { useTheme } from "../pages/Home";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "CTO",
    company: "Ideahelix Pvt. Ltd.",
    avatar: "AM",
    color: "#6366f1",
    rating: 5,
    text: "Nitin consistently delivered high-quality React.js components ahead of schedule. His deep understanding of Redux Toolkit and performance optimization brought significant improvements to our LiveWired and AgingOptions platforms. An exceptional developer with great problem-solving skills.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Manager",
    company: "iByte Infomatics",
    avatar: "PS",
    color: "#a855f7",
    rating: 5,
    text: "Working with Nitin on BlackPearl and Thunder Script was a great experience. He architected a clean, scalable frontend that our team could easily maintain. His ability to integrate complex NestJS APIs into the React frontend was impressive. Highly recommend!",
  },
  {
    id: 3,
    name: "Rahul Gupta",
    role: "Founder",
    company: "TechStartup Delhi",
    avatar: "RG",
    color: "#06b6d4",
    rating: 5,
    text: "Nitin built our AI-powered SaaS platform from scratch using Next.js, Supabase, and OpenAI. He delivered a production-ready product with auth, subscriptions, and dashboard in under 6 weeks. His full-stack expertise and attention to UI detail is remarkable.",
  },
  {
    id: 4,
    name: "Sneha Jain",
    role: "Senior Developer",
    company: "Ideahelix Pvt. Ltd.",
    avatar: "SJ",
    color: "#10b981",
    rating: 5,
    text: "Nitin is one of the most reliable developers I've worked with. His code is clean, well-structured, and follows best practices. He helped mentor junior developers and his contributions to the Braining educational platform were outstanding.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "CEO",
    company: "BuyOff Real Estate",
    avatar: "VS",
    color: "#f59e0b",
    rating: 5,
    text: "Nitin developed our entire real estate platform — from property listings to the admin dashboard — with exceptional quality. The performance, SEO optimization, and mobile responsiveness exceeded our expectations. He's a true full-stack professional.",
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <FaStar key={i} size={12} style={{ color: "#f59e0b" }} />
    ))}
  </div>
);

const Testimonials = () => {
  const { dark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.96,
      transition: { duration: 0.3 },
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #6366f1 0%, transparent 65%)",
        }}
      />

      <div className="container mx-auto relative z-10">
        <SectionHeading
          tag="Testimonials"
          title="What People Say"
          subtitle="Feedback from clients and colleagues I've had the pleasure of working with."
          dark={dark}
        />

        {/* Main testimonial card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[280px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full rounded-2xl p-8 sm:p-6 flex flex-col gap-6"
                style={{
                  background: dark ? "rgba(255,255,255,0.04)" : "#fff",
                  border: dark
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: dark
                    ? "0 20px 60px rgba(0,0,0,0.3)"
                    : "0 20px 60px rgba(0,0,0,0.08)",
                }}
              >
                {/* Quote icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${t.color}18`,
                    color: t.color,
                    border: `1px solid ${t.color}30`,
                  }}
                >
                  <FaQuoteLeft size={18} />
                </div>

                {/* Text */}
                <p
                  className="text-base leading-relaxed flex-1"
                  style={{
                    color: dark ? "#cbd5e1" : "#475569",
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)`,
                      color: "#fff",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p
                      className="font-semibold text-sm"
                      style={{ color: dark ? "#f1f5f9" : "#0f172a", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: dark ? "#64748b" : "#94a3b8" }}>
                      {t.role} · {t.company}
                    </p>
                    <Stars count={t.rating} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  data-cursor-hover
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background:
                      i === current
                        ? "linear-gradient(90deg, #6366f1, #a855f7)"
                        : dark
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                data-cursor-hover
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                  color: dark ? "#94a3b8" : "#64748b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.color = "#6366f1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                  e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b";
                }}
              >
                <FaChevronLeft size={13} />
              </button>
              <button
                onClick={next}
                data-cursor-hover
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
                  color: dark ? "#94a3b8" : "#64748b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99,102,241,0.15)";
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.color = "#6366f1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
                  e.currentTarget.style.color = dark ? "#94a3b8" : "#64748b";
                }}
              >
                <FaChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Mini cards row (all testimonials at a glance) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-14"
        >
          {testimonials.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              data-cursor-hover
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="rounded-xl p-4 flex flex-col items-center gap-2 text-center transition-all duration-300"
              style={{
                background:
                  i === current
                    ? `${item.color}12`
                    : dark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                border:
                  i === current
                    ? `1px solid ${item.color}35`
                    : dark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}bb)`,
                  color: "#fff",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {item.avatar}
              </div>
              <div>
                <p
                  className="text-xs font-semibold leading-tight"
                  style={{ color: dark ? "#e2e8f0" : "#0f172a" }}
                >
                  {item.name}
                </p>
                <p className="text-xs" style={{ color: dark ? "#475569" : "#94a3b8" }}>
                  {item.role}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

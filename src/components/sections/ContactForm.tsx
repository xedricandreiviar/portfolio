"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const charCount = formData.message.length;
  const maxChars = 500;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Quest failed! Try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Connection lost! Check your network.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center gap-4 border-2 border-xp-green bg-bg-primary p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        role="status"
        aria-live="polite"
      >
        <motion.div
          className="text-4xl"
          animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          🎉
        </motion.div>
        <motion.p
          className="font-display text-sm text-xp-green"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          ✓ MESSAGE SENT!
        </motion.p>
        <p className="font-body text-xl text-text-secondary text-center">
          +50 XP gained! I&apos;ll respond to your quest soon.
        </p>
        <motion.div
          className="mt-2 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-2 w-24 border border-border bg-bg-primary overflow-hidden">
            <motion.div
              className="h-full bg-xp-green"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <span className="font-body text-sm text-xp-green">+50 XP</span>
        </motion.div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="pixel-btn mt-2 bg-bg-social px-4 py-2 font-body text-lg text-accent hover:bg-accent hover:text-text-dark transition-colors"
        >
          [Send Another]
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      noValidate
    >
      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        <span className="font-display text-[6px] text-text-secondary">FORM PROGRESS:</span>
        <div className="flex-1 h-2 border border-border bg-bg-primary overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            animate={{
              width: `${
                [formData.name, formData.email, formData.subject, formData.message].filter(Boolean).length * 25
              }%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="font-body text-sm text-accent">
          {[formData.name, formData.email, formData.subject, formData.message].filter(Boolean).length}/4
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <motion.div
          className="flex flex-col gap-1"
          animate={focusedField === "name" ? { x: [0, -2, 2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          <label
            htmlFor="contact-name"
            className="font-display text-[7px] text-text-secondary"
          >
            PLAYER NAME {formData.name && <span className="text-xp-green">✓</span>}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            required
            aria-required="true"
            className="border-2 border-border bg-bg-primary px-3 py-2 font-body text-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none transition-colors"
            placeholder="Enter your name..."
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-1"
          animate={focusedField === "email" ? { x: [0, -2, 2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          <label
            htmlFor="contact-email"
            className="font-display text-[7px] text-text-secondary"
          >
            EMAIL ADDRESS {formData.email && <span className="text-xp-green">✓</span>}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            required
            aria-required="true"
            className="border-2 border-border bg-bg-primary px-3 py-2 font-body text-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-1"
          animate={focusedField === "subject" ? { x: [0, -2, 2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          <label
            htmlFor="contact-subject"
            className="font-display text-[7px] text-text-secondary"
          >
            SUBJECT LINE {formData.subject && <span className="text-xp-green">✓</span>}
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            required
            aria-required="true"
            className="border-2 border-border bg-bg-primary px-3 py-2 font-body text-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none transition-colors"
            placeholder="Quest name..."
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-1"
          animate={focusedField === "message" ? { x: [0, -2, 2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-message"
              className="font-display text-[7px] text-text-secondary"
            >
              MESSAGE {formData.message && <span className="text-xp-green">✓</span>}
            </label>
            <span className={`font-body text-sm ${charCount > maxChars ? "text-health-red" : "text-text-secondary"}`}>
              {charCount}/{maxChars}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            required
            aria-required="true"
            rows={4}
            maxLength={maxChars}
            className="resize-none border-2 border-border bg-bg-primary px-3 py-2 font-body text-xl text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none transition-colors"
            placeholder="Describe your quest..."
          />
        </motion.div>
      </div>

      {status === "error" && (
        <motion.p
          className="font-body text-lg text-health-red"
          role="alert"
          initial={{ x: -10 }}
          animate={{ x: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.4 }}
        >
          ⚠️ {errorMessage}
        </motion.p>
      )}

      <div className="flex items-center gap-4">
        <Button
          label={status === "sending" ? "⏳ Casting..." : "📨 Send Message"}
          variant="submit"
          type="submit"
        />
        {status === "sending" && (
          <span className="text-base text-accent">
            Sending...
          </span>
        )}
      </div>
    </form>
  );
}

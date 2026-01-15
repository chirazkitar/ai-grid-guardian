import { useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { SiteData } from "@/data/mockData";
import { MessageCircle, Sparkles, Send } from "lucide-react";

interface CoachSectionProps {
  data: SiteData;
}

interface Message {
  text: string;
  who: 'user' | 'bot';
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const quickPrompts = [
  "How much did I save this month?",
  "Why did my peak increase today?",
  "Any anomalies I should fix?",
  "Best next step to save more?",
];

export function CoachSection({ data }: CoachSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your AI Energy Coach. Ask me about your energy use, savings, peaks, or anomalies.", who: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const getAnswer = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes("save") && q.includes("month")) {
      return `This month you saved ${data.month.savedMoney} ${data.currency} (${data.month.savedPct}%). That equals about ${data.month.savedKwh} kWh and ${data.month.savedCo2Kg} kg CO₂ avoided.`;
    }
    if (q.includes("peak")) {
      return `Today's peak is ${data.peakTodayKw.toFixed(1)} kW. AI reduces peaks by shifting flexible loads (e.g., HVAC ramping, EV/heater scheduling) and smoothing startups to avoid demand spikes.`;
    }
    if (q.includes("anomal") || q.includes("issue") || q.includes("fix")) {
      if (!data.anomalies.length) return "No anomalies detected right now 🎉";
      const top = data.anomalies[0];
      return `Top issue: ${top.issue}. Estimated impact: ${top.impact}. Suggested fix: ${top.fix}. Confidence: ${top.conf}.`;
    }
    if (q.includes("why") && (q.includes("bill") || q.includes("cost"))) {
      return `Your cost changes mainly with tariff windows and peak demand. Today you saved ${data.todaySaved.toFixed(1)} ${data.currency} by shifting flexible loads and avoiding peak tariffs. Check Peak & Tariffs for details.`;
    }
    return `I can help with savings, peaks, tariffs, and anomalies. Try: "How much did I save this month?" or "Any anomalies I should fix?"`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, who: 'user' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { text: getAnswer(userMsg), who: 'bot' }]);
    }, 300);
  };

  const handleQuickAsk = (prompt: string) => {
    setMessages(prev => [...prev, { text: prompt, who: 'user' }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: getAnswer(prompt), who: 'bot' }]);
    }, 300);
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Chat */}
      <GlassPanel variants={item} className="lg:col-span-7">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-sm font-medium">AI Energy Coach</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Ask questions like: "Why was my bill higher?" or "How can I save more?"
        </p>

        <div className="flex flex-col h-[420px]">
          <div className="flex-1 overflow-auto p-4 rounded-xl bg-black/20 border border-white/[0.06] scrollbar-thin space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed border border-white/[0.08] ${
                  msg.who === 'user'
                    ? 'ml-auto bg-primary/15 text-foreground'
                    : 'bg-accent/10 text-foreground'
                }`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {msg.text}
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a question…"
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.10] text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
            <motion.button
              onClick={handleSend}
              className="px-4 py-3 rounded-xl bg-success/15 border border-success/30 text-success hover:bg-success/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </GlassPanel>

      {/* Quick Suggestions */}
      <GlassPanel variants={item} className="lg:col-span-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-warning" />
          </div>
          <h3 className="text-sm font-medium">Quick Suggestions</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Tap to send a prompt.
        </p>

        <div className="space-y-2">
          {quickPrompts.map((prompt, i) => (
            <motion.button
              key={prompt}
              onClick={() => handleQuickAsk(prompt)}
              className="w-full text-left px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm hover:bg-white/[0.08] transition-all"
              whileHover={{ scale: 1.01, x: 4 }}
              whileTap={{ scale: 0.99 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {prompt}
            </motion.button>
          ))}
        </div>

        <div className="h-px bg-white/[0.06] my-4" />

        <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-mono text-xs text-muted-foreground">
          <p className="text-foreground font-medium mb-2">Replace the demo responses with your LLM:</p>
          <ul className="space-y-1 list-disc list-inside text-[11px]">
            <li>POST /chat &#123;siteId, question&#125;</li>
            <li>Stream tokens for a live feel</li>
          </ul>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

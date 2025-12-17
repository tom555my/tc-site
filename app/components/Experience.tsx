import { motion } from "framer-motion";

const experiences = [
  {
    company: "Robots and Pencils ULC",
    location: "Canada",
    period: "June 2024 – Current",
    role: "Senior Data Science Engineer",
    description: [
      "Innovate with Generative AI and Agentic AI for client in educational technology",
      "Develop Conversational Simulation Solution with OpenAI GPT 4o, Vercel AI SDK, React Router and Koa.js",
      "Participant in development of in-house semantic search engine, LLMOps solution adoption"
    ]
  },
  {
    company: "Caribou Technology Limited",
    location: "Freelance / Remote",
    period: "Aug 2023 – June 2024",
    role: "Lead Developer",
    description: [
      "Lead system design and development for client-facing applications",
      "Implement Next.js apps with Vercel, AWS EventBus, AWS Lambda, orchestrated with SST.dev",
      "Design and build chatbot system with GPT4, Claude3, LangChain"
    ]
  },
  {
    company: "Mad Head App Limited",
    location: "Hong Kong",
    period: "June 2022 – June 2023",
    role: "Senior Programmer",
    description: [
      "Maintained internal game configuration tools with React and MUI",
      "Built campaign apps serving 400k users with Koa.js, MongoDB, GCP Cloud Function",
      "Modernized dev tools, reducing start time by ~60% and CI/CD time by ~50%"
    ]
  },
  {
    company: "PrimeCredit",
    location: "Hong Kong",
    period: "April 2021 – April 2022",
    role: "Data Scientist",
    description: [
      "Built chatbot and NLP projects with Python, Pytorch and Hugging Face",
      "Revamped Customer Data Platform, saving ~CAD$175k per year using n8n and MariaDB",
      "Coached junior colleagues and promoted innovation culture"
    ]
  },
  {
    company: "DataTech.ai",
    location: "Hong Kong",
    period: "June 2019 – April 2021",
    role: "Data Scientist",
    description: [
      "Developed Topic Mining System for popular forum with Next.js, Python, FastAPI",
      "Built Data Solution/ETL Pipeline for Cosmetic/Retail client",
      "Analysed Customer Data and made recommendations on business strategies"
    ]
  }
];

export function Experience() {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.company + exp.period}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
            <h3 className="text-white font-semibold group-hover:text-accent-blue transition-colors">
              {exp.company}
            </h3>
            <span className="text-xs text-muted/60 font-mono italic">
              {exp.period}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
             <span className="text-sm text-muted font-medium">{exp.role}</span>
             <span className="text-[10px] text-muted/40">•</span>
             <span className="text-[11px] text-muted/50 uppercase tracking-wider">{exp.location}</span>
          </div>
          <ul className="space-y-2">
            {exp.description.map((item, i) => (
              <li key={i} className="text-sm text-muted/80 leading-relaxed flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-blue/30 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

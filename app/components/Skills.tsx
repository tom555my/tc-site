import { motion } from "framer-motion";
import { 
  SiJavascript, SiTypescript, SiNodedotjs, SiReact, SiNextdotjs, 
  SiReactrouter, SiExpress, SiKoa, SiPython, SiPandas,
  SiMysql, SiPostgresql, SiMongodb, SiMariadb, SiCloudflare,
  SiAmazonwebservices, SiDocker, SiKubernetes, SiGooglecloud,
  SiGit, SiVercel, SiN8N, SiExpo, SiHasura, SiSst
} from "react-icons/si";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React Router", icon: SiReactrouter },
      { name: "React Native", icon: SiReact },
      { name: "ExpressJS", icon: SiExpress },
      { name: "Koa.js", icon: SiKoa },
      { name: "Python", icon: SiPython },
      { name: "Pandas", icon: SiPandas }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "Postgresql", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MariaDB", icon: SiMariadb },
      { name: "D1 (SQLite)", icon: SiCloudflare }
    ]
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      { name: "AWS (CDK, SQS, S3...)", icon: SiAmazonwebservices },
      { name: "SST.dev", icon: SiSst },
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "GCP Cloud Function", icon: SiGooglecloud },
      { name: "Cloudflare", icon: SiCloudflare }
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "Vercel", icon: SiVercel },
      { name: "n8n", icon: SiN8N },
      { name: "Expo", icon: SiExpo },
      { name: "Hasura (GraphQL)", icon: SiHasura }
    ]
  }
];

export function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {skillCategories.map((cat, index) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="border border-white/5 rounded-lg p-5 hover:border-white/10 transition-colors"
        >
          <h3 className="text-xs font-semibold text-muted/40 uppercase tracking-widest mb-4">
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <span
                key={skill.name}
                className="flex items-center gap-2 text-[13px] text-muted/80 px-2.5 py-1.5 rounded bg-white/[0.03] border border-white/5 hover:border-accent-blue/30 hover:text-accent-blue transition-all"
              >
                <skill.icon className="w-3.5 h-3.5" />
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

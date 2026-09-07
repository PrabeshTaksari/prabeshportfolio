import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronRight, Cpu, Download, ExternalLink, FileText, Github, Layout, Linkedin, Mail, Menu, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import {
  canOpenIrsLive,
  canUseLocalDevApis,
  getIrsAppUrl,
  getPrinterAppUrl,
} from "../../config/site";
interface NavLink {
  name: string;
  href: string;
}
interface Skill {
  name: string;
}
interface Interest {
  name: string;
}
interface TechItem {
  name: string;
}
interface Project {
  title: string;
  description: string;
  tag: string;
  techStack: TechItem[];
  link: string;
  featured: boolean;
  aiPowered?: boolean;
}
interface Certification {
  name: string;
  date: string;
  group: string;
  link?: string;
  image?: string;
}
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}
const IRS_REPOSITORY_URL = "https://github.com/PrabeshTaksari/Intelligence-Recon-System";
const NAV_LINKS: NavLink[] = [{
  name: "Home",
  href: "#home"
}, {
  name: "About",
  href: "#about"
}, {
  name: "Skills",
  href: "#skills"
}, {
  name: "Projects",
  href: "#projects"
}, {
  name: "Certifications",
  href: "#certifications"
}, {
  name: "Contact",
  href: "#contact"
}];
const TECHNICAL_SKILLS: Skill[] = [{
  name: "HTML",
}, {
  name: "CSS",
}, {
  name: "JavaScript",
}, {
  name: "Python",
}, {
  name: "Java"
}, {
  name: "Security Tools"
}];
const INTERESTS: Interest[] = [{
  name: "Web Design"
}, {
  name: "Web Development"
}, {
  name: "UI/UX Design"
}, {
  name: "Report Writing"
}, {
  name: "Communication"
}, {
  name: "Collaboration"
}];
const PROJECTS: Project[] = [{
  title: "Intelligence Recon System",
  description: "An AI-powered cybersecurity tool that scans domains, IPs, and URLs for vulnerabilities, using httpX and Naabu to probe targets and gather live clues such as open ports, services, and HTTP responses. A Gemini API intelligence layer analyzes those clues to decide which security tools are most suitable for the target, then automatically generates a structured vulnerability report with findings, risk levels, and AI-driven recommendations.",
  tag: "Cybersecurity | Final Year Project",
  techStack: [{
    name: "HTML"
  }, {
    name: "CSS"
  }, {
    name: "JavaScript"
  }, {
    name: "Python"
  }, {
    name: "Gemini API"
  }],
  link: "#projects",
  featured: true,
  aiPowered: true
}, {
  title: "Printer E-Commerce Website",
  description: "A first-semester group project that showcases a responsive printer store website, with landing pages, product presentation, and a simple multi-page browsing experience.",
  tag: "Web Development | 1st Semester Group Project",
  techStack: [{
    name: "HTML"
  }, {
    name: "CSS"
  }, {
    name: "JavaScript"
  }],
  link: "#projects",
  featured: false
}, {
  title: "Land Rent Management System",
  description: "A management system for handling land rental operations including renting, returning, and real-time tracking of land assets.",
  tag: "Web Application",
  techStack: [{
    name: "Python"
  }],
  link: "https://github.com/PrabeshTaksari/Land-Rental-System",
  featured: false
}, {
  title: "Fingerprint Based Door Lock System",
  description: "An IoT smart lock system built with ESP32 and AS608 fingerprint sensor, integrated with Blynk for real-time cloud alerts and remote monitoring.",
  tag: "IoT Project",
  techStack: [{
    name: "ESP32"
  }, {
    name: "AS608"
  }, {
    name: "Blynk"
  }, {
    name: "IoT"
  }],
  link: "https://github.com/PrabeshTaksari/Fingerprint-Based-Door-Lock-System",
  featured: false
}, {
  title: "QuadraCrypt Cipher Algorithm",
  description: "A multi-layered encryption system combining Playfair, Caesar, Shift, and XOR cipher techniques for enhanced data security.",
  tag: "Cryptography",
  techStack: [{
    name: "Cryptography"
  }],
  link: "https://github.com/PrabeshTaksari/Quadracrypt-Cipher",
  featured: false
}, {
  title: "Ethical Hacking Simulation",
  description: "Simulated a real-world password attack module using professional penetration testing tools to demonstrate vulnerability assessment techniques.",
  tag: "Ethical Hacking",
  techStack: [{
    name: "Kali Linux"
  }, {
    name: "Ubuntu"
  }, {
    name: "Hashcat v7.1.2 (SHA-512)"
  }, {
    name: "Hydra"
  }, {
    name: "rockyou.txt"
  }, {
    name: "John the Ripper"
  }],
  link: "/23047464 Prabesh Sundar Taksari (1).pdf",
  featured: false
}, {
  title: "Backdoor Exploit Analysis - vsftpd 2.3.4",
  description: "Analyzed and exploited the vsftpd 2.3.4 backdoor using Metasploit on Kali Linux, then documented mitigation strategies to prevent unauthorized system access.",
  tag: "Ethical Hacking",
  techStack: [{
    name: "Kali Linux"
  }, {
    name: "Metasploit"
  }, {
    name: "vsftpd 2.3.4"
  }],
  link: "https://github.com/PrabeshTaksari/Backdoor-Exploit-Analysis",
  featured: false
}];
const CERTIFICATIONS: Certification[] = [{
  name: "AWS Academy Cloud Foundations",
  date: "March 19, 2025",
  group: "AWS Academy",
  link: "https://www.credly.com/badges/b61fa4ea-7137-48a0-93d8-ead5d1f95838"
}, {
  name: "AWS Academy Cloud Security Foundations",
  date: "March 22, 2025",
  group: "AWS Academy",
  link: "https://www.credly.com/badges/4979dec2-fda3-4660-8506-bfad20e21826"
}, {
  name: "AWS Academy Cloud Operations",
  date: "April 2, 2025",
  group: "AWS Academy",
  link: "https://www.credly.com/badges/6c7f0fe4-fe80-4eee-9422-f323a32d4f0a"
}, {
  name: "AWS Academy Cloud Architecting",
  date: "April 4, 2025",
  group: "AWS Academy",
  link: "https://www.credly.com/badges/64b038fb-9bed-46e3-928a-63f5567caba8"
}, {
  name: "API Security Fundamentals",
  date: "August 22, 2025",
  group: "Security Training",
  link: "https://www.credly.com/badges/94ad994d-3dd6-428e-92ea-56cf14334ed4"
}, {
  name: "UI/UX Design Workshop",
  date: "2024",
  group: "Professional Training",
  image: "/ui-ux-workshop-certificate.jpg"
}, {
  name: "Introduction to Linux",
  date: "August 30, 2025",
  group: "Systems Training",
  image: "/intro-linux-certificate.png"
}];
const SectionTitle = ({
  title,
  subtitle,
  light = false
}: SectionTitleProps) => {
  return <header className="mb-12 max-w-3xl">
      <p className={cn("mb-3 text-xs font-bold uppercase tracking-[0.34em]", light ? "text-gray-400" : "text-gray-500")}>
        <span>Portfolio Section</span>
      </p>
      <h2 className={cn("text-3xl font-black tracking-[-0.04em] md:text-5xl", light ? "text-white" : "text-black")}>
        <span>{title}</span>
      </h2>
      <div className="mt-5 h-0.5 w-16 bg-[#E01010]" aria-hidden="true" />
      {subtitle ? <p className={cn("mt-5 text-base leading-8 md:text-lg", light ? "text-gray-300" : "text-gray-600")}>
          <span>{subtitle}</span>
        </p> : null}
    </header>;
};
export const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");
  const [previewCertificate, setPreviewCertificate] = React.useState<Certification | null>(null);
  const [isIrsSetupPromptOpen, setIsIrsSetupPromptOpen] = React.useState(false);
  const [irsHostHasFiles, setIrsHostHasFiles] = React.useState(false);
  const [profileImageSrc, setProfileImageSrc] = React.useState("/ba9e027c-9c1e-4aeb-b28e-2bca8d151629.jpeg");
  const [isSubmittingContact, setIsSubmittingContact] = React.useState(false);

  React.useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setActiveSection("home");
  }, []);

  React.useEffect(() => {
    if (!canUseLocalDevApis()) {
      setIrsHostHasFiles(false);
      return;
    }

    fetch("/api/irs-status")
      .then(response => response.ok ? response.json() : null)
      .then(data => setIrsHostHasFiles(Boolean(data?.hasFiles)))
      .catch(() => setIrsHostHasFiles(false));
  }, []);

  const openIrsApp = async (asOwner: boolean) => {
    const url = getIrsAppUrl(asOwner);

    if (!url) {
      toast.error("IRS live URL is not configured yet. Deploy IRS and set VITE_IRS_PUBLIC_URL.");
      return;
    }

    if (asOwner && canUseLocalDevApis()) {
      try {
        await fetch("/api/start-irs", { method: "POST" });
      } catch {
        // Continue even if the local start helper is unavailable.
      }
    }

    window.open(url, "_blank", "noopener,noreferrer");
    setIsIrsSetupPromptOpen(false);
  };

  const handleProjectClick = async (event: React.MouseEvent<HTMLAnchorElement>, project: Project) => {
    if (project.title === "Intelligence Recon System") {
      event.preventDefault();
      setIsIrsSetupPromptOpen(true);
      return;
    }

    if (project.title === "Printer E-Commerce Website") {
      event.preventDefault();

      const printerUrl = getPrinterAppUrl();
      if (printerUrl && !canUseLocalDevApis()) {
        window.open(printerUrl, "_blank", "noopener,noreferrer");
        return;
      }

      if (!canUseLocalDevApis()) {
        toast.error("Printer demo is not hosted online yet. Set VITE_PRINTER_PUBLIC_URL after deploy.");
        return;
      }

      try {
        const response = await fetch("/api/start-printer-site", {
          method: "POST"
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          toast.error(errorData.message || "The printer website could not be started locally.");
          return;
        }

        window.open(printerUrl, "_blank", "noopener,noreferrer");
      } catch {
        toast.error("Unable to open the printer website right now.");
      }
      return;
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !email || !message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }

    const payload = new FormData();
    payload.append("name", name);
    payload.append("email", email);
    payload.append("message", message);
    payload.append("_subject", `Portfolio message from ${name}`);
    payload.append("_captcha", "false");

    setIsSubmittingContact(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/taksariprabesh05@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: payload
      });

      if (!response.ok) {
        throw new Error("Message delivery failed");
      }

      toast.success("Your message was sent successfully. I’ll get back to you soon.");
      formElement.reset();
    } catch {
      toast.error("Sorry, your message could not be sent right now. Please try again.");
    } finally {
      setIsSubmittingContact(false);
    }
  };
  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  React.useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.href.replace("#", ""));
    const handleSectionChange = () => {
      const pageOffset = window.scrollY + 180;
      let nextSection = "home";
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= pageOffset) {
          nextSection = sectionId;
        }
      }
      setActiveSection(nextSection);
    };
    handleSectionChange();
    window.addEventListener("scroll", handleSectionChange);
    window.addEventListener("resize", handleSectionChange);
    return () => {
      window.removeEventListener("scroll", handleSectionChange);
      window.removeEventListener("resize", handleSectionChange);
    };
  }, []);
  return <div className="min-h-screen bg-white font-sans text-black selection:bg-[#E01010] selection:text-white">
      <nav className={cn("fixed left-0 top-0 z-50 w-full border-b border-white/10 transition-all duration-300", scrolled ? "bg-black/95 py-4 shadow-xl backdrop-blur-md" : "bg-black py-5")} aria-label="Primary navigation">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 md:px-8 lg:px-12">
          <a href="#home" className="group inline-flex items-center gap-3 text-white" aria-label="Prabesh Sundar Taksari home">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E01010] transition-transform group-hover:scale-125" aria-hidden="true" />
            <span className="text-xl font-black tracking-[-0.06em]">PST</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map(link => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return <a key={link.name} href={link.href} onClick={() => setActiveSection(sectionId)} className={cn("text-sm font-medium transition-colors", isActive ? "text-[#E01010]" : "text-gray-300 hover:text-[#E01010]") }>
                <span>{link.name}</span>
              </a>;
          })}
          </div>

          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-[#E01010] hover:text-[#E01010] md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? <motion.div initial={{
          opacity: 0,
          y: -12
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -12
        }} className="rounded-b-3xl border-t border-white/10 bg-black px-5 py-6 shadow-2xl md:hidden">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(link => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return <a key={link.name} href={link.href} onClick={() => {
                  setActiveSection(sectionId);
                  setIsMenuOpen(false);
                }} className={cn("rounded-xl px-3 py-3 text-lg font-semibold transition-colors", isActive ? "bg-white/5 text-[#E01010]" : "text-white hover:bg-white/5 hover:text-[#E01010]") }>
                    <span>{link.name}</span>
                  </a>;
              })}
              </div>
            </motion.div> : null}
        </AnimatePresence>
      </nav>

      <main>
        <section id="home" className="bg-black pt-32 text-white md:pt-40">
          <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-7xl items-center gap-14 px-5 pb-20 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
            <motion.header initial={{
            opacity: 0,
            y: 26
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.75
          }} className="max-w-5xl">
              <p className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.32em] text-gray-400">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E01010]" aria-hidden="true" />
                <span>Computer Networking & IT Security Graduate</span>
              </p>
              <h1 className="max-w-[8ch] text-5xl font-black leading-[0.88] tracking-[-0.05em] text-white md:text-7xl lg:text-8xl">
                <span className="block whitespace-nowrap">Prabesh Sundar</span>
                <span className="block">Taksari</span>
              </h1>
              <p className="mt-7 max-w-2xl text-xl font-semibold leading-8 text-[#E01010] md:text-2xl">
                <span>Aspiring Web Developer with a cybersecurity mindset.</span>
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">
                <span>
                  Building practical digital experiences, security-focused tools, and well-documented technical solutions with steady discipline and curiosity.
                </span>
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-[#E01010] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#bd0d0d]">
                  <span>View My Work</span>
                </a>
                <a href="cv.pdf" download="cv.pdf" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black">
                  <span>Download CV</span>
                  <Download size={18} aria-hidden="true" />
                </a>
              </div>
            </motion.header>

            <aside className="mt-4 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30 md:mt-6 md:p-5 lg:mt-4" aria-label="Portfolio highlights">
              <div className="grid gap-3">
                <div className="border-l-2 border-[#E01010] bg-white/[0.04] p-4 md:p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-gray-400">
                    <span>Focus</span>
                  </p>
                  <p className="mt-3 text-lg font-normal tracking-normal text-white md:text-xl">
                    <span>Web Developer & IT Security Graduate passionate about building clean, secure, and user-friendly digital solutions.</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white/[0.04] p-4 md:p-5">
                    <p className="text-2xl font-black text-white md:text-3xl">
                      <span>06</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      <span>Applied projects</span>
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white/[0.04] p-4 md:p-5">
                    <p className="text-2xl font-black text-white md:text-3xl">
                      <span>07</span>
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      <span>Certifications</span>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className="bg-white py-24 md:py-32">
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
            <motion.div initial={{
            opacity: 0,
            scale: 0.94
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} className="flex items-center justify-center lg:justify-start">
              <div className="flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-black shadow-2xl md:h-80 md:w-80">
                <img src={profileImageSrc} onError={() => {
                if (profileImageSrc !== "/public/ba9e027c-9c1e-4aeb-b28e-2bca8d151629.jpeg") {
                  setProfileImageSrc("/public/ba9e027c-9c1e-4aeb-b28e-2bca8d151629.jpeg");
                }
              }} alt="Prabesh Sundar Taksari" className="h-full w-full object-cover object-center" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <SectionTitle title="About Me" />
              <div className="space-y-6 text-lg leading-8 text-gray-700">
                <p>
                  <span>I recently completed my Bachelor&apos;s degree in </span>
                  <strong className="font-bold text-black">BSc (Hons) Computer Networking and IT Security</strong>
                  <span>. My academic background gives me a strong foundation in secure systems, networking principles, and practical technical documentation.</span>
                </p>
                <p>
                  <span>
                    I am passionate about web design, web development, UI/UX, and report writing. I value steady improvement, clear communication, and the careful craft required to turn technical ideas into usable products.
                  </span>
                </p>
              </div>

              <article className="mt-10 rounded-3xl border-l-2 border-[#E01010] bg-gray-50 p-7 shadow-sm">
                <h3 className="flex items-center gap-3 text-xl font-black tracking-[-0.03em] text-black">
                  <Layout className="text-[#E01010]" size={20} aria-hidden="true" />
                  <span>Education</span>
                </h3>
                <p className="mt-4 font-semibold text-black">
                  <span>BSc (Hons) Computer Networking & IT Security</span>
                </p>
                <p className="mt-2 text-gray-600">
                  <span>Islington College / London Metropolitan University</span>
                </p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.28em] text-[#E01010]">
                  <span>Recently Completed</span>
                </p>
              </article>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="bg-black py-24 text-white md:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
            <SectionTitle title="My Skills" light />
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
              <section aria-labelledby="technical-skills-title">
                <h3 id="technical-skills-title" className="mb-8 flex items-center gap-3 text-2xl font-black tracking-[-0.04em]">
                  <Cpu className="text-[#E01010]" aria-hidden="true" />
                  <span>Technical Skills</span>
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {TECHNICAL_SKILLS.map(skill => <article key={skill.name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#E01010]">
                      <div className="flex items-center justify-between gap-5">
                        <h4 className="font-semibold text-[#E01010]">
                          <span>{skill.name}</span>
                        </h4>
                        <ChevronRight className="text-gray-500 transition-colors group-hover:text-[#E01010]" aria-hidden="true" />
                      </div>
                    </article>)}
                </div>
              </section>

              <section aria-labelledby="interests-title">
                <h3 id="interests-title" className="mb-8 flex items-center gap-3 text-2xl font-black tracking-[-0.04em]">
                  <Layout className="text-[#E01010]" aria-hidden="true" />
                  <span>Areas of Interest</span>
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {INTERESTS.map(interest => <article key={interest.name} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[#E01010]">
                      <div className="flex items-center justify-between gap-5">
                        <h4 className="font-semibold text-white">
                          <span>{interest.name}</span>
                        </h4>
                        <ChevronRight className="text-gray-500 transition-colors group-hover:text-[#E01010]" aria-hidden="true" />
                      </div>
                    </article>)}
                </div>
              </section>

              <article className="mx-auto w-full max-w-4xl rounded-3xl border-l-2 border-r-2 border-[#E01010] bg-white/[0.04] p-7 text-center lg:col-span-2">
                <h4 className="text-lg font-black tracking-[-0.02em] text-white">
                  <span>Ready for New Challenges</span>
                </h4>
                <p className="mt-3 text-sm leading-7 text-gray-300">
                  <span>Always exploring new frameworks, security practices, and design methods to keep improving.</span>
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="bg-gray-50 py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
            <SectionTitle title="Projects" subtitle="Selected academic and self-directed work across cybersecurity, web development, IoT, and applied systems." />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map(project => <motion.article key={project.title} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.45
            }} className={cn("flex min-h-[360px] flex-col rounded-3xl bg-white p-7 text-black shadow-[0_18px_55px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)]", project.featured ? "border-l-4 border-[#E01010] md:col-span-2 lg:col-span-2" : "border-t-2 border-[#E01010]")}>
                  <div className="mb-7 flex items-start justify-between gap-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E01010]">
                      <span>{project.tag}</span>
                    </p>
                    {project.featured ? <div className="flex flex-col items-end gap-2">
                        <span className="rounded-full bg-black px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                          <span>Featured</span>
                        </span>
                        {project.aiPowered ? <span className="rounded-full border border-[#E01010] bg-[#E01010]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E01010]">
                            <span>AI Powered</span>
                          </span> : null}
                      </div> : null}
                  </div>
                  <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-black md:text-3xl">
                    <span>{project.title}</span>
                  </h3>
                  <p className="mt-5 flex-grow text-base leading-8 text-gray-600">
                    <span>{project.description}</span>
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
                    {project.techStack.map(tech => <span key={`${project.title}-${tech.name}`} className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
                        {tech.name}
                      </span>)}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" onClick={(event) => handleProjectClick(event, project)} className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-black transition-colors hover:text-[#E01010]">
                    <span>View Project</span>
                    <ExternalLink size={16} aria-hidden="true" />
                  </a>
                </motion.article>)}
            </div>
          </div>
        </section>

        <section id="certifications" className="bg-white py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
            <SectionTitle title="Certifications & Training" subtitle="A growing record of practical training across cloud, security, Linux, and product design fundamentals." />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CERTIFICATIONS.map(certificate => {
              const card = <article className={cn("rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 hover:border-gray-300", certificate.image ? "cursor-zoom-in" : "")}>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-[#E01010]">
                      {certificate.group === "AWS Academy" ? <ShieldCheck size={22} aria-hidden="true" /> : <Award size={22} aria-hidden="true" />}
                    </div>
                    <span className="rounded-full bg-gray-900 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                      {certificate.group}
                    </span>
                  </div>
                  <h3 className="text-xl font-black leading-tight tracking-[-0.03em] text-black">
                    <span>{certificate.name}</span>
                  </h3>
                  <p className="mt-4 text-sm font-semibold text-gray-600">
                    <span>{certificate.date}</span>
                  </p>
                </article>;
              return certificate.image ? <button key={`${certificate.name}-${certificate.date}`} type="button" onClick={() => setPreviewCertificate(certificate)} className="block w-full text-left">
                  {card}
                </button> : certificate.link ? <a key={`${certificate.name}-${certificate.date}`} href={certificate.link} target="_blank" rel="noreferrer" className="block">
                  {card}
                </a> : <div key={`${certificate.name}-${certificate.date}`}>
                  {card}
                </div>;
            })}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {previewCertificate ? <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm" onClick={() => setPreviewCertificate(null)}>
              <motion.div initial={{
            opacity: 0,
            scale: 0.96,
            y: 14
          }} animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }} exit={{
            opacity: 0,
            scale: 0.96,
            y: 14
          }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 md:px-7">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E01010]">Certificate Preview</p>
                    <h3 className="mt-1 text-xl font-black tracking-[-0.03em] text-black md:text-2xl">{previewCertificate.name}</h3>
                  </div>
                  <button type="button" onClick={() => setPreviewCertificate(null)} className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-black transition-colors hover:border-[#E01010] hover:text-[#E01010]">Close</button>
                </div>
                <div className="bg-gray-50 p-4 md:p-7">
                  <img src={previewCertificate.image} alt={previewCertificate.name} className="max-h-[75vh] w-full rounded-[1.5rem] object-contain" />
                </div>
              </motion.div>
            </motion.div> : null}
        </AnimatePresence>

        <AnimatePresence>
          {isIrsSetupPromptOpen ? <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm" onClick={() => setIsIrsSetupPromptOpen(false)}>
              <motion.div initial={{
            opacity: 0,
            scale: 0.96,
            y: 14
          }} animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }} exit={{
            opacity: 0,
            scale: 0.96,
            y: 14
          }} className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-black text-white shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="border-b border-white/10 px-6 py-5 md:px-8">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#E01010]">Intelligence Recon System</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] md:text-3xl">How would you like to open IRS?</h3>
                </div>

                <div className="space-y-6 px-6 py-6 md:px-8 md:py-7">
                  <p className="text-base leading-8 text-gray-300 md:text-lg">
                    <span>
                      Open the live Intelligence Recon System in your browser. Each device starts with its own clean default state. If you want the full source code to run locally, use the GitHub option.
                    </span>
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <button type="button" disabled={!canOpenIrsLive()} onClick={() => {
                  void openIrsApp(false);
                }} className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40">
                      <span>Open IRS app</span>
                    </button>
                    {irsHostHasFiles ? <button type="button" onClick={() => {
                  void openIrsApp(true);
                }} className="inline-flex flex-1 items-center justify-center rounded-full border border-[#E01010]/40 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-[#E01010] transition-colors hover:border-[#E01010] hover:bg-[#E01010] hover:text-white">
                      <span>Open with my data</span>
                    </button> : null}
                    <button type="button" onClick={() => {
                  window.open(IRS_REPOSITORY_URL, "_blank", "noopener,noreferrer");
                  setIsIrsSetupPromptOpen(false);
                }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E01010] px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#bd0d0d]">
                      <span>Install from GitHub</span>
                      <ExternalLink size={16} aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-xs leading-6 text-gray-500">
                    <span>Install from GitHub downloads the source code. After setup, start the IRS server on your machine, then open it from here.</span>
                  </p>
                </div>
              </motion.div>
            </motion.div> : null}
        </AnimatePresence>

        <section id="contact" className="bg-[#111111] py-24 text-white md:py-32">
          <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <section aria-labelledby="contact-title">
                <SectionTitle title="Get In Touch" light />
                <p id="contact-title" className="sr-only">
                  <span>Get In Touch</span>
                </p>
                <p className="max-w-xl text-lg leading-8 text-gray-300 md:text-xl">
                  <span>
                    I&apos;m open to opportunities, collaborations, and learning experiences. If you have a project in mind or want to connect, feel free to reach out.
                  </span>
                </p>

                <div className="mt-10 space-y-5">
                  <article className="rounded-2xl border-l-2 border-[#E01010] bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.06]">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=taksariprabesh05@gmail.com" target="_blank" rel="noreferrer" className="group flex items-center gap-5" aria-label="Compose email to taksariprabesh05@gmail.com in Gmail">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:text-[#E01010]">
                        <Mail size={22} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.24em] text-gray-400 transition-colors group-hover:text-[#E01010]">Email Me</span>
                        <span className="mt-1 block text-lg font-semibold text-white">
                          <span>taksariprabesh05@gmail.com</span>
                        </span>
                      </span>
                    </a>
                  </article>
                  <article className="rounded-2xl border-l-2 border-[#E01010] bg-white/[0.04] p-5">
                    <div className="flex items-center gap-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                        <Linkedin size={22} aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400">
                          <span>LinkedIn</span>
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          <span>linkedin.com/in/prabeshpst</span>
                        </p>
                      </div>
                    </div>
                  </article>
                  <article className="rounded-2xl border-l-2 border-[#E01010] bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.06]">
                    <a href="https://github.com/PrabeshTaksari" target="_blank" rel="noreferrer" className="group flex items-center gap-5" aria-label="Open GitHub profile for Prabesh Taksari">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-colors group-hover:text-[#E01010]">
                        <Github size={22} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-[0.24em] text-gray-400 transition-colors group-hover:text-[#E01010]">GitHub</span>
                        <span className="mt-1 block text-lg font-semibold text-white">
                          <span>github.com/PrabeshTaksari</span>
                        </span>
                      </span>
                    </a>
                  </article>
                </div>
              </section>

              <section aria-label="Contact form" className="rounded-3xl bg-white p-6 text-black shadow-2xl md:p-10">
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-black uppercase tracking-[0.2em] text-black">
                        <span>Name</span>
                      </label>
                      <input id="contact-name" name="name" type="text" placeholder="Your Name" className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-black outline-none transition-colors focus:border-black" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-[0.2em] text-black">
                        <span>Email</span>
                      </label>
                      <input id="contact-email" name="email" type="email" placeholder="yourmail@example.com" className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-black outline-none transition-colors focus:border-black" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-[0.2em] text-black">
                      <span>Message</span>
                    </label>
                    <textarea id="contact-message" name="message" rows={5} placeholder="Tell me about your project..." className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-black outline-none transition-colors focus:border-black" />
                  </div>
                  <button type="submit" disabled={isSubmittingContact} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-7 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#E01010] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-black">
                    <span>{isSubmittingContact ? "Sending..." : "Send Message"}</span>
                    <FileText size={18} aria-hidden="true" />
                  </button>
                  <p className="text-center text-xs font-medium leading-5 text-gray-500">
                    <span>Your message is sent directly to my inbox from this form.</span>
                  </p>
                </form>
              </section>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-12 text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center md:flex-row md:px-8 md:text-left lg:px-12">
          <div>
            <p className="text-lg font-black tracking-[-0.03em]">
              <span>Prabesh Sundar Taksari</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <span>Building capability through secure, thoughtful digital work.</span>
            </p>
          </div>

          <div className="flex gap-4" aria-label="Social links">
            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#E01010] hover:text-[#E01010]" aria-label="GitHub profile">
              <Github size={20} aria-hidden="true" />
            </a>
            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#E01010] hover:text-[#E01010]" aria-label="LinkedIn profile">
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-[#E01010] hover:text-[#E01010]" aria-label="Email Prabesh">
              <Mail size={20} aria-hidden="true" />
            </a>
          </div>

          <p className="text-sm text-gray-500">
            <span>© 2025 Prabesh Sundar Taksari. All rights reserved.</span>
          </p>
        </div>
      </footer>
    </div>;
};
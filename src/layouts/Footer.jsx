import {Link} from "react-router"
import { Dumbbell, Instagram, Facebook, Twitter, Youtube } from "lucide-react"

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Our Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  programs: [
    { label: "Strength Training", href: "#" },
    { label: "Group Classes", href: "#" },
    { label: "Personal Training", href: "#" },
    { label: "Nutrition Plans", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
]

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Dumbbell className="h-7 w-7 text-red-600" />
              <span className="text-xl font-bold uppercase tracking-wider text-white">
                Classic Fitness
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              Premium fitness facility dedicated to transforming lives through
              expert coaching, state-of-the-art equipment, and a supportive
              community.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 text-zinc-400 transition-colors hover:border-red-600 hover:text-red-500"
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Programs
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 md:flex-row">
          <p className="text-xs text-zinc-500">
            &copy; 2026 Classic Fitness Gym. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Open 24/7 &middot; 123 Gulsan, Dhaka-1210, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

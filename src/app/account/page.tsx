import type { Metadata } from "next";
import { AccountHero } from "@/components/mariana/account-hero";
import { MarianaPanel } from "@/components/mariana/mariana-panel";
import { mariana } from "@/lib/mariana";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "My account",
  description:
    "Log in or create your EVOA account to book classes, see your reservations, and manage your packages and credits.",
};

export default function AccountPage() {
  return (
    <>
      <AccountHero />
      <MarianaPanel id="account" route={mariana.routes.account} label="your account">
        <p className="font-sans text-[13.5px] font-light leading-relaxed text-ink/70">
          Forgotten your password?{" "}
          <a href={mariana.resetPasswordUrl} className="text-rust underline underline-offset-4 transition-colors hover:text-spark">
            Reset it here
          </a>
          . Anything else, write to{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-rust underline underline-offset-4 transition-colors hover:text-spark">
            {siteConfig.email}
          </a>
          .
        </p>
      </MarianaPanel>
    </>
  );
}

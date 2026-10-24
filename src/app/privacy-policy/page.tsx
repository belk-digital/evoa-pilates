import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Evoa Pilates collects, uses and protects your personal information, including the health details you share so we can teach you safely.",
};

const email = siteConfig.email;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          Evoa Pilates (“Evoa”, “we”, “us”) is a private wellness club offering reformer and mat Pilates, recovery and
          breathwork. We are responsible for the personal information described in this policy, which applies to our
          website, our membership and booking, our newsletter and the studio itself.
        </p>
        <p>
          If anything here is unclear, write to <a href={`mailto:${email}`}>{email}</a> and we will explain it in plain
          words.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    content: (
      <>
        <h3>What you give us</h3>
        <ul>
          <li>
            <strong>Contact and identity:</strong> your name, email address, phone number, date of birth and an
            emergency contact.
          </li>
          <li>
            <strong>Membership and bookings:</strong> the plan you choose, the classes and private sessions you book,
            your attendance and cancellations, and preferences such as spring settings or preferred reformer.
          </li>
          <li>
            <strong>Payment details:</strong> handled by our payment provider. We receive confirmation of payment, the
            last four digits of your card and your billing address, never your full card number.
          </li>
          <li>
            <strong>Messages:</strong> anything you send through the contact form, by email, or when you join the
            newsletter.
          </li>
        </ul>
        <h3>Health and wellbeing information</h3>
        <p>
          So we can teach safely, we may ask about injuries, surgeries, pregnancy or postnatal status, and conditions
          that affect how you move. Sharing this is optional and is covered in detail in the section on health
          information below.
        </p>
        <h3>What we collect automatically</h3>
        <p>
          When you visit our website we collect technical data such as your IP address, browser and device type, the
          pages you view and the page that referred you, using cookies and similar technologies. In the studio, our
          check-in records the time you arrive. Security cameras, where installed, cover entrances and reception only;
          there are none in changing or recovery areas. We do not photograph or film members without your consent.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    content: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>create and manage your membership and take payment;</li>
          <li>book classes, send reminders and manage waitlists and cancellations;</li>
          <li>keep you safe, including adapting exercises to your body and your needs;</li>
          <li>tell you about schedule changes, billing and studio policies;</li>
          <li>send news and invitations, but only if you have asked to receive them;</li>
          <li>run, secure and improve our website and the studio;</li>
          <li>meet our legal, tax and insurance obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "health-information",
    title: "Health information",
    content: (
      <>
        <p>
          We treat health and wellbeing details as sensitive. We collect them only with your consent, share them only
          with the instructors who need them to adapt your class, and keep them separate from marketing data. We never
          use them for advertising and we never sell them.
        </p>
        <p>
          You can withdraw your consent or ask us to delete these details at any time. That will not affect classes you
          have already taken, but we may not be able to adapt a session to a condition we do not know about. Pilates is
          movement instruction, not medical care, and we do not diagnose or treat conditions.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Our legal bases",
    content: (
      <>
        <p>If you are in the United Kingdom or European Economic Area, we rely on the following bases:</p>
        <ul>
          <li>
            <strong>Contract:</strong> to provide your membership, bookings and payments.
          </li>
          <li>
            <strong>Consent:</strong> for health information and for marketing messages. You can withdraw it whenever
            you like.
          </li>
          <li>
            <strong>Legitimate interests:</strong> to run a safe, well-organised studio, prevent fraud and improve our
            services, always balanced against your rights.
          </li>
          <li>
            <strong>Legal obligation:</strong> for tax, accounting and health-and-safety record keeping.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    content: (
      <>
        <p>
          We share only what is needed, with providers who process it on our behalf: booking and scheduling software, our
          payment processor, an email and newsletter service, website hosting and analytics, and professional advisers
          such as accountants, insurers and lawyers.
        </p>
        <p>
          We may also disclose information when the law requires it, to protect someone’s safety or rights, or as part
          of a sale or reorganisation of the business, in which case we will tell you. We do not sell your personal
          information and we do not share it for cross-context behavioural advertising.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    content: (
      <>
        <p>
          Essential cookies keep the site working, for example by remembering form entries. Analytics cookies tell us
          which pages are useful so we can improve them; where the law requires it we use them only with your consent.
        </p>
        <p>
          You can refuse non-essential cookies in your browser settings. Blocking some cookies may affect parts of the
          site, but not your ability to read it or contact us.
        </p>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing and your choices",
    content: (
      <>
        <p>
          We send our newsletter and invitations only if you have opted in. Every email carries an unsubscribe link, or
          you can write to us. We will still send essential messages about your membership, bookings and the studio.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <>
        <ul>
          <li>
            <strong>Membership and booking records:</strong> while your membership is active and for up to six years
            afterwards, for tax and accounting.
          </li>
          <li>
            <strong>Health and wellbeing notes:</strong> until twelve months after your last visit, or sooner if you ask.
          </li>
          <li>
            <strong>Marketing preferences:</strong> until you unsubscribe.
          </li>
          <li>
            <strong>Website analytics:</strong> typically up to 26 months.
          </li>
          <li>
            <strong>Enquiries:</strong> up to 24 months.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <>
        <p>
          We use access controls, encryption in transit and reputable providers. Health notes can be seen only by the
          staff who need them. No system is perfectly secure, so if a breach affects you we will tell you and the
          relevant authority as the law requires.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>
          Depending on where you live, including under the UK and EU GDPR and California privacy law, you may have the
          right to:
        </p>
        <ul>
          <li>access the personal information we hold about you and receive a copy;</li>
          <li>correct information that is wrong or out of date;</li>
          <li>ask us to delete it, restrict how we use it, or object to a use;</li>
          <li>move your information to another provider, where it is technically possible;</li>
          <li>withdraw consent at any time; and</li>
          <li>be treated equally whether or not you use these rights.</li>
        </ul>
        <p>
          To use any of them, email <a href={`mailto:${email}`}>{email}</a>. We may need to confirm who you are first and
          will reply within 30 days (45 for California residents, extended where the law allows). We do not sell or
          share personal information as those terms are defined in California law. You may also complain to your local
          data protection authority.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    content: (
      <>
        <p>
          Membership is for adults aged 18 and over. We do not knowingly collect information from children under 16
          through our website. If we ever offer a programme for younger clients, a parent or guardian’s consent will be
          required first.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    content: (
      <>
        <p>
          Some of our providers process data outside your country. When we transfer personal information out of the UK
          or EEA we use recognised safeguards, such as standard contractual clauses.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <>
        <p>
          We may update this policy as the studio or the law changes. The date at the top always shows the latest
          version, and we will tell members by email or notice in the studio about changes that matter.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>
          For questions or requests about your information, email <a href={`mailto:${email}`}>{email}</a>, or write to
          Evoa Pilates, {siteConfig.address}.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy."
      noun="this policy"
      updated="October 23, 2026"
      intro="What we collect, why we collect it, how we protect it, and the choices you have. We run the studio quietly and with care, and we treat your information the same way."
      sections={sections}
      other={{ label: "Read the Terms of Services", href: "/terms-of-services" }}
    />
  );
}

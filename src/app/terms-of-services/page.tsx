import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Services",
  description:
    "The terms for Evoa Pilates memberships, booking and cancellation, studio standards and your use of our website.",
};

const email = siteConfig.email;

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    content: (
      <>
        <p>
          Evoa Pilates (“Evoa”, “we”, “us”) is a private wellness club. In these terms, “studio” means our premises,
          “services” means our classes, private sessions, recovery offerings and membership, and “site” means this
          website. By requesting membership, booking a class or using the site, you agree to them.
        </p>
        <p>If you do not agree, please do not use the services.</p>
      </>
    ),
  },
  {
    id: "membership",
    title: "Membership and eligibility",
    content: (
      <>
        <p>
          Membership is by request and invitation, and we may approve or decline any request. You must be 18 or over and
          give us accurate information. Membership is personal to you and cannot be transferred or shared.
        </p>
        <p>
          Our plans, Access, Residence and Atelier, are described on the Membership page. We may change what a plan
          includes with reasonable notice.
        </p>
      </>
    ),
  },
  {
    id: "billing",
    title: "Billing and renewals",
    content: (
      <>
        <p>
          Plans are billed monthly or yearly in advance through our payment provider and renew automatically until you
          cancel. By joining you authorise those recurring charges. Prices exclude any taxes that apply.
        </p>
        <p>
          If a payment fails we may try again and may pause your booking until the balance is cleared. We will give at
          least 30 days’ notice of a price change, and you may cancel before it takes effect.
        </p>
      </>
    ),
  },
  {
    id: "booking",
    title: "Booking and class size",
    content: (
      <>
        <p>
          Every class is capped at eight people so your instructor can guide your alignment, springs and pacing
          individually. You can book through our schedule or member portal. How far ahead you can book depends on your
          plan: seven days on Access, fourteen on Residence and thirty on Atelier.
        </p>
        <p>
          If a class is full you may join the waitlist. A spot that opens is offered automatically, and you will need to
          confirm it. We may change the schedule or substitute an instructor when we need to.
        </p>
      </>
    ),
  },
  {
    id: "arrival",
    title: "Arriving on time",
    content: (
      <>
        <p>
          Please arrive ten minutes before your class. The room is set for you and the doors close when the class begins,
          so for safety and out of respect for others, anyone who arrives late may be asked to rebook.
        </p>
      </>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations and no-shows",
    content: (
      <>
        <ul>
          <li>
            <strong>Group classes:</strong> cancel at least 12 hours before the start to keep your class credit.
          </li>
          <li>
            <strong>Private sessions:</strong> cancel at least 24 hours before the start.
          </li>
          <li>
            <strong>Later cancellations and no-shows</strong> use the credit, or are charged where you are not on a plan
            with credits.
          </li>
          <li>
            <strong>If we cancel</strong> a class, the credit is returned to you.
          </li>
        </ul>
        <p>
          We will always consider genuine illness or emergencies and may return a credit at our discretion.
        </p>
      </>
    ),
  },
  {
    id: "changing-membership",
    title: "Pausing, changing and ending membership",
    content: (
      <>
        <p>
          You can move to another plan from your next billing date. You can pause or cancel by email or through the
          member portal at least seven days before your next billing date; your access continues to the end of the period
          you have paid for.
        </p>
        <p>
          We do not refund part-used periods unless the law requires it. Yearly plans may be cancelled for a full refund
          within 14 days of purchase if you have not yet attended a class.
        </p>
      </>
    ),
  },
  {
    id: "guests",
    title: "Guest passes and private sessions",
    content: (
      <>
        <p>
          Where your plan includes guest passes, your guest signs the same health declaration before their first class
          and follows the same studio standards. Private sessions are booked directly with your instructor and may be
          rescheduled up to 24 hours before they begin.
        </p>
      </>
    ),
  },
  {
    id: "health-and-safety",
    title: "Health, safety and risk",
    content: (
      <>
        <p>
          Pilates is physical exercise and carries a risk of injury, as any movement practice does. Please:
        </p>
        <ul>
          <li>speak to your doctor first if you have any condition, injury or pregnancy that concerns you;</li>
          <li>tell your instructor about injuries, surgeries or pregnancy before every class, and any change since the last;</li>
          <li>use the equipment as instructed and stop if you feel pain, dizziness or strain;</li>
          <li>understand that instructors may modify an exercise or ask you to sit one out.</li>
        </ul>
        <p>
          We offer movement instruction, not medical advice or treatment. You take part voluntarily and accept the
          inherent risks of exercise, and before your first visit you will be asked to sign a health declaration and
          waiver.
        </p>
      </>
    ),
  },
  {
    id: "studio-standards",
    title: "Studio standards",
    content: (
      <>
        <p>The studio works because everyone keeps to a few simple things:</p>
        <ul>
          <li>Grip socks are required on the reformers, for grip and hygiene. They are available at the studio.</li>
          <li>Phones stay in your locker. The studio is a room, not a feed.</li>
          <li>Between rooms we move quietly. Take the long way and let your breath catch up.</li>
          <li>Wear fitted, comfortable clothing so your instructor can see your alignment.</li>
          <li>Please stay home if you are unwell, and wipe down shared equipment if asked.</li>
          <li>Do not photograph or record other members or instructors.</li>
        </ul>
        <p>
          We may ask you to leave, and may suspend or end a membership, for conduct that affects the safety or calm of
          others.
        </p>
      </>
    ),
  },
  {
    id: "belongings",
    title: "Lockers and belongings",
    content: (
      <>
        <p>
          Lockers are provided for your use during your visit. Please keep valuables with you or locked away. To the
          extent the law allows, we are not responsible for lost, stolen or damaged belongings.
        </p>
      </>
    ),
  },
  {
    id: "photography",
    title: "Photography and media",
    content: (
      <>
        <p>
          We photograph or film in the studio only for our own communications and only with your consent, which you can
          withdraw. We never photograph in changing or recovery areas.
        </p>
      </>
    ),
  },
  {
    id: "website",
    title: "Using our website",
    content: (
      <>
        <p>
          You may use the site for lawful purposes. Please do not copy it automatically, probe its security, or use it in
          a way that interferes with others. Links to other sites are provided for convenience, and we do not control
          their content.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The Evoa name and logo, the site, our photography, written content and class programming belong to us or are
          used with permission. You may not copy or reuse them without written consent. If you send us feedback, you
          allow us to use it to improve the studio without obligation to you.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    content: (
      <>
        <p>
          The services are provided for general wellbeing, and we cannot promise specific results. To the extent the law
          allows, we are not liable for indirect or consequential losses, and our total liability to you is limited to
          the fees you paid us in the 12 months before the claim.
        </p>
        <p>Nothing in these terms limits any liability that cannot be limited under applicable law.</p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    content: (
      <>
        <p>
          We may suspend or end your membership if you breach these terms, put others at risk, or do not pay. If we end
          your membership for another reason, we will refund the unused part of the period you have paid for.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: (
      <>
        <p>
          These terms are governed by the laws of the State of New York, United States, and any dispute will be heard in
          the courts of New York County, unless the law where you live gives you the right to bring a claim elsewhere.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <>
        <p>
          We may update these terms. The date at the top shows the latest version, and we will give members reasonable
          notice of changes that matter. Continuing to use the services after a change means you accept it.
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
          Questions about these terms? Email <a href={`mailto:${email}`}>{email}</a>, or write to Evoa Pilates,{" "}
          {siteConfig.address}.
        </p>
      </>
    ),
  },
];

export default function TermsOfServicesPage() {
  return (
    <LegalPage
      title="Terms of Services."
      noun="these terms"
      updated="October 23, 2026"
      intro="Plain terms for a simple way of running a studio: small classes, careful instruction and a calm room. Please read them before you join or book."
      sections={sections}
      other={{ label: "Read the Privacy Policy", href: "/privacy-policy" }}
    />
  );
}

import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const CONTACT_EMAIL = "me@maxlibin.com"
const EFFECTIVE_DATE = "20 May 2026"

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-fg mb-3">
      {title}
    </h2>
    <div className="prose prose-gray dark:prose-invert max-w-none text-muted space-y-3">
      {children}
    </div>
  </section>
)

const Privacy = () => {
  return (
    <Layout>
      <article className="mt-8 mb-16 px-4 md:px-0 max-w-3xl">
        <div className="mb-3 text-sm">
          <Link
            to="/homeworkai/"
            className="text-fg hover:underline"
          >
            ← homeworkAI
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold text-fg mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-faint mb-10">
          Effective {EFFECTIVE_DATE}
        </p>

        <Section title="The short version">
          <p>
            homeworkAI is a homework helper for primary-school children. We
            collect as little as we can and we don't sell anything.
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>No account, no sign-up, no email required to use the app.</li>
            <li>
              No advertising SDKs, no analytics SDKs, no third-party trackers in
              the app.
            </li>
            <li>
              Your scan history, photos, parent PIN, and preferences stay on
              your device.
            </li>
            <li>
              The question text and the cropped photo you scan are sent to our
              server only to generate the answer.
            </li>
          </ul>
        </Section>

        <Section title="Who runs the app">
          <p>
            homeworkAI ("we", "us", "the app") is an independent product built
            and operated by Max Li Bin (Singapore). Contact:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-fg hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="What stays on your device">
          <p>The following never leaves your iPhone or iPad:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Your scan history (the photo, the question text, the generated
              explanation, follow-up Q&amp;A).
            </li>
            <li>Selected grade level and enabled subjects.</li>
            <li>Parent Zone PIN and parent-allowed subject settings.</li>
            <li>Daily-scan counters used for the free-tier limit.</li>
          </ul>
          <p>
            These are stored using Apple's standard on-device storage
            (UserDefaults and SwiftData). They are included in your iCloud
            device backup only if you have iCloud backup enabled in iOS.
            Deleting the app removes them.
          </p>
        </Section>

        <Section title="What is sent to our server">
          <p>
            When you scan or type a homework question, the app sends the
            following to our backend (a Cloudflare Worker we operate) so we can
            generate an answer:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The question text (typed, transcribed, or empty).</li>
            <li>
              The cropped photo of the question (auto-cropped on-device before
              upload).
            </li>
            <li>
              The child's selected grade and subject, and the chosen language
              (English or Simplified Chinese).
            </li>
            <li>
              For follow-up questions, the prior question and prior Q&amp;A
              turns in that conversation.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> send your name, email, IP-derived
            location, contacts, device identifiers, microphone audio, or any
            other personal information.
          </p>
        </Section>

        <Section title="Third parties that help us deliver the answer">
          <p>
            To produce an explanation, our backend sends the question text and
            photo to large language model providers (currently Anthropic and/or
            OpenAI). These providers process the request to generate the
            response and, under their API terms, do not use it to train their
            models.
          </p>
          <p>
            Photos you choose to keep in your scan history are stored in our
            Cloudflare R2 / Cloudflare Images bucket so they can be displayed
            later. They are accessed by URL and are not indexed, listed
            publicly, or shared with anyone.
          </p>
          <p>
            Subscriptions are handled entirely by Apple via StoreKit. We never
            see your payment details, full name, or Apple ID.
          </p>
        </Section>

        <Section title="Camera, microphone, photos, speech">
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Camera:</strong> used to scan a homework question. The
              cropped photo is sent to our server as described above.
            </li>
            <li>
              <strong>Photo Library:</strong> if you pick an existing photo, we
              only access the photo you pick.
            </li>
            <li>
              <strong>Microphone &amp; Speech Recognition:</strong> used so you
              can ask follow-up questions by voice. Speech is transcribed to
              text on-device by Apple's Speech framework — the audio itself is{" "}
              <strong>not</strong> sent to our server.
            </li>
          </ul>
        </Section>

        <Section title="Children and parents">
          <p>
            homeworkAI is designed to be set up and supervised by a parent or
            guardian. The Parent Zone (PIN-gated) lets you restrict which
            subjects appear, set a daily scan cap, and reset on-device data.
          </p>
          <p>
            We do not knowingly collect personal information from children. The
            app does not require an account, does not ask the child for their
            name, email, age, address, or phone number, and does not use
            advertising or tracking. The only data sent off-device is the
            homework content itself (text and the cropped photo) — please make
            sure scanned pages do not include personal information about your
            child.
          </p>
          <p>
            If you believe a child has submitted personal information through
            the app and you would like it removed, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-fg hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="Analytics and tracking">
          <p>
            We do not embed advertising SDKs, analytics SDKs, or third-party
            trackers in the app. We do not use the IDFA. We do not build a
            profile of you or your child.
          </p>
          <p>
            Our server keeps short-lived operational logs (e.g. request
            timestamps and error traces) so we can keep the service running and
            debug failures. These logs are not used for advertising or sold to
            anyone.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            On-device data lives until you delete it (per-record swipe-to-delete
            in History, or "Reset everything" in Parent Zone, or by deleting the
            app).
          </p>
          <p>
            Photos uploaded for solving may be retained in our image store for
            up to 90 days for caching and debugging, then deleted. Operational
            logs are retained for up to 30 days. Email us to request earlier
            deletion of anything tied to your installation.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Depending on where you live, you may have the right to access,
            correct, delete, or restrict processing of your personal data, and
            to lodge a complaint with a data protection authority. Email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-fg hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            and we'll respond within a reasonable time.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. We'll change
            the effective date above and, for material changes, surface a
            notice in the app.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-fg hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>
      </article>
    </Layout>
  )
}

export default Privacy

export const Head = () => (
  <SEO
    title="homeworkAI — Privacy Policy"
    description="What homeworkAI collects, what it doesn't, and where it goes. No accounts, no ads, no third-party trackers."
    pathname="/homeworkai/privacy/"
    breadcrumbs={[
      { name: "Home", item: "/" },
      { name: "homeworkAI", item: "/homeworkai/" },
      { name: "Privacy Policy", item: "/homeworkai/privacy/" },
    ]}
  />
)

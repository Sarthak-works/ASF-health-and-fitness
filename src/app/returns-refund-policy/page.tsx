import type { Metadata } from "next";
import {
  PolicyPage,
  PolicySection,
  PolicyList,
  ContactBlock,
} from "@/components/sections/PolicyLayout";

export const metadata: Metadata = {
  title: "Returns & Refund Policy | ASF Coaching",
  description:
    "How cancellations and refund requests are handled at ASF Coaching.",
};

export default function ReturnsRefundPolicyPage() {
  return (
    <PolicyPage title="Returns & Refund Policy" lastUpdated="1 October 2026">
      <PolicySection>
        <p>
          At ASF Coaching, our services are personalised around each
          client&apos;s goals, requirements, schedule and coaching needs.
        </p>
        <p>
          Because ASF Coaching provides coaching and professional services
          rather than physical products, there are no physical products to
          return.
        </p>
        <p>
          The ASF Coaching website also does not provide direct online programme
          purchases or an online checkout system. Coaching programmes are
          discussed, agreed and arranged directly between the client and the ASF
          Coaching team following an enquiry or consultation.
        </p>
      </PolicySection>

      <PolicySection title="1. No Online Programme Purchases">
        <p>
          The ASF Coaching website is primarily an information and enquiry
          platform.
        </p>
        <p>
          Submitting an enquiry, requesting a consultation, requesting a
          callback or expressing interest in a coaching programme does not
          constitute a purchase.
        </p>
        <p>
          A coaching programme is confirmed only after the client and ASF
          Coaching have discussed and agreed upon the relevant programme, price,
          payment arrangements and applicable service terms.
        </p>
      </PolicySection>

      <PolicySection title="2. Refund Requests">
        <p>
          Because ASF Coaching provides personalised coaching services, any
          request for a cancellation or refund will be handled personally and
          directly by the ASF Coaching coaching team.
        </p>
        <p>
          There is no online refund portal or automated refund-request process.
        </p>
        <p>
          If you would like to discuss a cancellation or refund, please contact
          your coach or the ASF Coaching team directly.
        </p>
        <p>
          The coaching team will review the circumstances of the request and
          discuss the appropriate resolution with the client.
        </p>
      </PolicySection>

      <PolicySection title="3. Programme-Specific Refund Terms">
        <p>
          Where specific cancellation or refund terms have been agreed with a
          client before or during a coaching programme, those agreed terms will
          apply, subject to applicable law.
        </p>
        <p>
          Any applicable refund will be handled directly between ASF Coaching
          and the client using the relevant payment/refund method agreed between
          the parties.
        </p>
      </PolicySection>

      <PolicySection title="4. Services Already Provided">
        <p>
          Where coaching services, sessions, consultations, personalised
          programming, nutrition guidance, assessments or other agreed services
          have already been provided, the amount attributable to those services
          may be considered when reviewing a refund request.
        </p>
        <p>
          Each refund request will be considered based on the circumstances of
          the individual coaching arrangement and applicable law.
        </p>
      </PolicySection>

      <PolicySection title="5. Missed or Cancelled Sessions">
        <p>
          Training sessions are scheduled directly between the client and their
          coach.
        </p>
        <p>
          Clients should provide reasonable notice if they need to cancel or
          reschedule a session.
        </p>
        <p>
          Any applicable cancellation, late-cancellation, missed-session or
          rescheduling conditions will be communicated directly by the coaching
          team and may form part of the client&apos;s coaching agreement.
        </p>
      </PolicySection>

      <PolicySection title="6. Changes to a Coaching Programme">
        <p>
          If your circumstances change after beginning a coaching programme,
          please contact your coach as soon as possible.
        </p>
        <p>
          Depending on the circumstances and the applicable programme terms, ASF
          Coaching may discuss options such as:
        </p>
        <PolicyList
          items={[
            "Rescheduling",
            "Adjusting the coaching arrangement",
            "Pausing the programme where appropriate",
            "Changing the training format",
            "Other mutually agreed arrangements",
          ]}
        />
        <p>Any such arrangement will be discussed directly with the client.</p>
      </PolicySection>

      <PolicySection title="7. Refund Processing">
        <p>
          Where ASF Coaching agrees that a refund is applicable, the coaching
          team will communicate the applicable refund amount and processing
          details directly with the client.
        </p>
        <p>Refunds are not automatically generated through the website.</p>
        <p>
          Any agreed refund will be processed in accordance with the applicable
          payment arrangements and applicable law.
        </p>
      </PolicySection>

      <PolicySection title="8. Consumer Rights">
        <p>
          Nothing in this Returns &amp; Refund Policy is intended to remove,
          restrict or override any rights or protections that a consumer may
          have under applicable UAE laws and regulations.
        </p>
        <p>
          Where applicable, mandatory consumer protections will continue to
          apply.
        </p>
      </PolicySection>

      <PolicySection title="9. How to Request a Refund or Discuss a Cancellation">
        <p>
          To discuss a refund, cancellation, missed session or change to your
          coaching arrangement, please contact your ASF Coaching representative
          or contact us directly.
        </p>
        <p>
          Please provide your name, contact details and the coaching programme
          or service concerned so that our team can locate the relevant records
          and assist you.
        </p>
        <ContactBlock />
      </PolicySection>

      <PolicySection title="10. Policy Updates">
        <p>
          ASF Coaching may update this Returns &amp; Refund Policy when
          necessary to reflect changes to our services, business practices or
          applicable legal requirements.
        </p>
        <p>
          The latest version will be published on this page with a revised Last
          Updated date.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}

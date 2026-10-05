import type { Metadata } from "next";
import {
  PolicyPage,
  PolicySection,
  PolicyList,
  ContactBlock,
} from "@/components/sections/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of Service | ASF Coaching",
  description:
    "Terms governing your use of the ASF Coaching website and coaching services.",
};

export default function TermsOfServicePage() {
  return (
    <PolicyPage title="Terms of Service" lastUpdated="3 October 2026">
      <PolicySection>
        <p>Welcome to ASF Coaching.</p>
        <p>
          These Terms of Service govern your use of the ASF Coaching website and
          your interactions with ASF Coaching regarding our fitness, personal
          training, nutrition, wellness and coaching services.
        </p>
        <p>
          By using this website or contacting ASF Coaching regarding our
          services, you acknowledge that you have read and understood these
          Terms of Service.
        </p>
      </PolicySection>

      <PolicySection title="1. About ASF Coaching">
        <p>
          ASF Coaching is operated by Akshay Sahu Sports Coaching Services LLC
          and provides personalised fitness, training, nutrition, wellness and
          performance coaching services in Dubai, United Arab Emirates.
        </p>
        <p>Depending on the coaching programme, services may include:</p>
        <PolicyList
          items={[
            "C-Suite Coaching",
            "VIP Training",
            "Personal Training",
            "Semi-Private Training",
            "Couple Training",
            "Nutrition Coaching",
            "Mental Well-being Coaching",
            "Pain Management",
            "Injury Rehabilitation",
            "Posture Correction",
            "Clinical Conditioning",
            "Mobility and Recovery",
            "Strength Development",
            "Lifestyle and accountability support",
          ]}
        />
        <p>
          The specific services provided to a client depend on the programme and
          coaching arrangement agreed directly between the client and ASF
          Coaching.
        </p>
      </PolicySection>

      <PolicySection title="2. Use of the Website">
        <p>
          You may use this website for lawful purposes and to learn about ASF
          Coaching and its services.
        </p>
        <p>You agree not to:</p>
        <PolicyList
          items={[
            "Use the website for unlawful purposes",
            "Attempt to gain unauthorised access to the website or its systems",
            "Interfere with or disrupt website functionality",
            "Submit false, misleading or fraudulent information",
            "Copy or reproduce website content for unauthorised commercial purposes",
            "Use the website to impersonate another person or organisation",
          ]}
        />
      </PolicySection>

      <PolicySection title="3. Enquiries and Consultations">
        <p>
          The ASF Coaching website does not function as an online checkout or
          direct programme-purchasing platform.
        </p>
        <p>
          Visitors may submit an enquiry or express interest in ASF Coaching
          services through the website.
        </p>
        <p>
          Following an enquiry, a member of the ASF Coaching team may contact
          you to discuss:
        </p>
        <PolicyList
          items={[
            "Your fitness and lifestyle goals",
            "Your current training experience",
            "Your preferred coaching format",
            "Your schedule and availability",
            "Your requirements",
            "Available coaching options",
            "Programme duration",
            "Pricing",
            "Payment arrangements",
            "Other relevant service details",
          ]}
        />
        <p>
          Submitting an enquiry does not constitute a purchase, payment or
          guaranteed enrolment. A coaching programme is confirmed only after the
          relevant arrangements have been discussed and agreed directly between
          the client and ASF Coaching.
        </p>
      </PolicySection>

      <PolicySection title="4. Pricing and Payment">
        <p>
          Prices may vary depending on the coaching service, programme
          structure, duration and level of support selected.
        </p>
        <p>
          Pricing and payment arrangements are communicated directly to
          prospective clients by the ASF Coaching team.
        </p>
        <p>The website does not provide direct online programme purchases.</p>
        <p>
          Where a client decides to proceed, the applicable programme, price,
          payment terms and service details will be communicated directly before
          the coaching arrangement begins.
        </p>
      </PolicySection>

      <PolicySection title="5. Coaching Services">
        <p>
          ASF Coaching provides personalised fitness and wellness coaching based
          on the information provided by the client and the coaching
          requirements discussed with the team.
        </p>
        <p>
          Depending on the agreed programme, coaching may include personal
          training, exercise programming, nutrition guidance, mobility work,
          accountability, lifestyle guidance and other relevant coaching
          services.
        </p>
        <p>
          The exact services included in your programme will depend on the
          arrangement agreed directly with ASF Coaching.
        </p>
      </PolicySection>

      <PolicySection title="6. Results and Expectations">
        <p>Fitness and wellness outcomes vary between individuals.</p>
        <p>Results may depend on factors including:</p>
        <PolicyList
          items={[
            "Individual starting point",
            "Consistency",
            "Training effort",
            "Nutrition",
            "Sleep",
            "Recovery",
            "Lifestyle",
            "Physical condition",
            "Adherence to coaching recommendations",
          ]}
        />
        <p>
          ASF Coaching does not guarantee a specific amount of weight loss,
          muscle gain, body-fat reduction, athletic performance or other
          physical result.
        </p>
        <p>
          Testimonials, transformations and client experiences shown on the
          website represent individual experiences and should not be interpreted
          as a guarantee of identical results.
        </p>
      </PolicySection>

      <PolicySection title="7. Health and Fitness Disclaimer">
        <p>
          ASF Coaching provides fitness, training, nutrition and wellness
          coaching. Our services are not intended to replace medical diagnosis,
          treatment or professional medical advice.
        </p>
        <p>
          Clients are responsible for informing their coach about relevant
          injuries, medical conditions, physical limitations, medications or
          other circumstances that may affect their ability to exercise safely.
        </p>
        <p>
          If you have a medical condition, injury or concern about participating
          in physical activity, you should consult an appropriately qualified
          healthcare professional before beginning or changing an exercise
          programme.
        </p>
        <p>
          Clients should immediately inform their coach if they experience pain,
          discomfort, dizziness, unusual symptoms or any other concern during
          training.
        </p>
      </PolicySection>

      <PolicySection title="8. Client Responsibilities">
        <p>Clients are expected to:</p>
        <PolicyList
          items={[
            "Provide accurate and relevant information",
            "Follow agreed coaching instructions responsibly",
            "Attend scheduled sessions on time",
            "Communicate scheduling issues as early as reasonably possible",
            "Inform their coach of relevant injuries or physical limitations",
            "Follow any programme-specific requirements communicated by ASF Coaching",
            "Treat ASF Coaching coaches and staff respectfully",
          ]}
        />
        <p>
          Failure to follow coaching guidance or repeatedly missing scheduled
          sessions may affect the coaching experience and programme progress.
        </p>
      </PolicySection>

      <PolicySection title="9. Scheduling and Rescheduling">
        <p>
          Training sessions are arranged directly between the client and the ASF
          Coaching team.
        </p>
        <p>
          Clients should provide reasonable notice if they need to cancel or
          reschedule a session.
        </p>
        <p>
          Any applicable cancellation, rescheduling, late-arrival or
          missed-session arrangements will be communicated directly to the
          client and may form part of the client&apos;s coaching agreement.
        </p>
      </PolicySection>

      <PolicySection title="10. Intellectual Property">
        <p>
          Unless otherwise stated, the content appearing on the ASF Coaching
          website, including text, graphics, photographs, videos, logos,
          branding, designs, layouts and other materials, is owned by or
          licensed to ASF Coaching.
        </p>
        <p>
          You may not reproduce, distribute, modify, republish or commercially
          exploit website content without prior written permission.
        </p>
      </PolicySection>

      <PolicySection title="11. Testimonials and Transformation Content">
        <p>
          ASF Coaching may display client testimonials, photographs, videos or
          transformation stories where appropriate permission has been obtained.
        </p>
        <p>
          Individual results vary and such content should not be interpreted as
          a guarantee of future results.
        </p>
      </PolicySection>

      <PolicySection title="12. Third-Party Services and Links">
        <p>
          The website may contain links to third-party websites, platforms or
          services.
        </p>
        <p>
          ASF Coaching does not control third-party services and is not
          responsible for their content, availability, security or privacy
          practices.
        </p>
      </PolicySection>

      <PolicySection title="13. Website Availability">
        <p>
          ASF Coaching aims to keep the website accurate and available but does
          not guarantee that the website will always be uninterrupted,
          error-free or continuously available.
        </p>
        <p>
          We may update, modify, suspend or discontinue parts of the website
          when necessary.
        </p>
      </PolicySection>

      <PolicySection title="14. Changes to These Terms">
        <p>
          ASF Coaching may update these Terms of Service from time to time to
          reflect changes to our services, business practices or applicable
          legal requirements.
        </p>
        <p>
          The updated version will be published on this page with a revised Last
          Updated date.
        </p>
      </PolicySection>

      <PolicySection title="15. Governing Law">
        <p>
          These Terms of Service shall be interpreted in accordance with the
          applicable laws and regulations of the United Arab Emirates and the
          Emirate of Dubai, subject to any mandatory rights and protections
          available to consumers under applicable law.
        </p>
        <p>
          Nothing in these Terms is intended to exclude or limit any consumer
          rights that cannot lawfully be excluded or limited.
        </p>
      </PolicySection>

      <PolicySection title="16. Contact Us">
        <p>
          For questions regarding these Terms of Service or your coaching
          arrangement, please contact:
        </p>
        <ContactBlock />
      </PolicySection>
    </PolicyPage>
  );
}

import type { Metadata } from "next";
import {
  PolicyPage,
  PolicySection,
  PolicyList,
  ContactBlock,
} from "@/components/sections/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | ASF Coaching",
  description:
    "How ASF Coaching collects, uses and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" lastUpdated="1 October 2026">
      <PolicySection>
        <p>
          ASF Coaching respects your privacy and is committed to protecting the
          personal information you provide when you visit our website, submit an
          enquiry, request a consultation, or communicate with our coaching
          team.
        </p>
        <p>
          This Privacy Policy explains what information we may collect, how we
          use it, how we protect it, and how you can contact us regarding your
          personal information.
        </p>
        <p>
          ASF Coaching is operated by Akshay Sahu Sports Coaching Services LLC,
          based in Dubai, United Arab Emirates.
        </p>
      </PolicySection>

      <PolicySection title="1. Information We Collect">
        <p>
          When you interact with the ASF Coaching website or contact our team,
          we may collect information that you voluntarily provide, including:
        </p>
        <PolicyList
          items={[
            "Full name",
            "Email address",
            "Phone number",
            "Fitness or coaching interests",
            "Preferred coaching service",
            "Preferred consultation or contact time",
            "Fitness goals and requirements",
            "Information provided during enquiries or consultations",
            "Any other information you choose to provide to our coaching team",
          ]}
        />
        <p>
          We may also automatically collect certain technical information when
          you use our website, such as:
        </p>
        <PolicyList
          items={[
            "IP address",
            "Browser type",
            "Device type",
            "Operating system",
            "Pages visited",
            "Website usage information",
            "Referring website or source",
          ]}
        />
      </PolicySection>

      <PolicySection title="2. How We Use Your Information">
        <p>We may use the information we collect to:</p>
        <PolicyList
          items={[
            "Respond to enquiries and requests",
            "Contact you regarding ASF Coaching services",
            "Arrange consultations",
            "Understand your fitness and coaching goals",
            "Provide and manage coaching services",
            "Communicate with existing or prospective clients",
            "Improve our website and services",
            "Respond to questions or support requests",
            "Maintain business and administrative records",
            "Comply with applicable legal and regulatory requirements",
          ]}
        />
        <p>
          We use personal information for legitimate business and
          service-related purposes and seek to collect only information that is
          relevant to those purposes.
        </p>
      </PolicySection>

      <PolicySection title="3. Fitness and Wellness Information">
        <p>
          As part of an enquiry, consultation or coaching relationship, you may
          voluntarily provide information relating to your fitness goals,
          lifestyle, training experience, physical limitations, injuries or
          other wellness-related requirements.
        </p>
        <p>
          This information may be used by ASF Coaching and its authorised
          coaching staff to understand your requirements and provide appropriate
          coaching services.
        </p>
        <p>
          You should provide accurate and relevant information to your coach and
          inform your coach of any circumstances that may affect your ability to
          participate safely in physical activity.
        </p>
        <p>
          ASF Coaching&apos;s coaching services are not a substitute for medical
          diagnosis or treatment. Where appropriate, clients should seek advice
          from a qualified healthcare professional before beginning or changing
          a physical training programme.
        </p>
      </PolicySection>

      <PolicySection title="4. How We Share Your Information">
        <p>ASF Coaching does not sell or rent your personal information.</p>
        <p>
          Your information may be accessed by authorised members of ASF Coaching
          or by service providers who assist us with website operations,
          communications, administration or other legitimate business functions.
        </p>
        <p>
          We may also disclose personal information where required or permitted
          by applicable law, regulation, legal proceedings, or a lawful request
          from an authorised authority.
        </p>
      </PolicySection>

      <PolicySection title="5. Website Enquiries">
        <p>
          The ASF Coaching website is primarily used to provide information
          about our services and allow visitors to express interest or request
          contact from our team.
        </p>
        <p>
          Submitting an enquiry does not automatically purchase or enrol you in
          a coaching programme.
        </p>
        <p>
          Following an enquiry, a member of the ASF Coaching team may contact
          you to discuss your goals, requirements, available services, pricing
          and other relevant details.
        </p>
        <p>
          Any coaching programme is arranged and agreed directly between the
          client and ASF Coaching.
        </p>
      </PolicySection>

      <PolicySection title="6. Cookies and Website Technologies">
        <p>
          Our website may use cookies or similar technologies to support website
          functionality, understand website usage, improve performance and
          measure marketing activities where applicable.
        </p>
        <p>
          You may be able to control or restrict cookies through your browser
          settings. Disabling certain cookies may affect some website
          functionality.
        </p>
      </PolicySection>

      <PolicySection title="7. Data Security">
        <p>
          ASF Coaching takes reasonable measures to protect personal information
          from unauthorised access, misuse, disclosure, alteration or loss.
        </p>
        <p>
          However, no method of transmitting or storing information
          electronically can be guaranteed to be completely secure.
        </p>
      </PolicySection>

      <PolicySection title="8. Data Retention">
        <p>
          We retain personal information for as long as reasonably necessary for
          the purposes for which it was collected, including providing services,
          maintaining business records, resolving disputes and complying with
          applicable legal obligations.
        </p>
        <p>
          When information is no longer required, we may securely delete or
          anonymise it, subject to applicable legal and operational
          requirements.
        </p>
      </PolicySection>

      <PolicySection title="9. Your Privacy Rights">
        <p>
          Subject to applicable law, you may have rights regarding your personal
          information, including rights to request access to or correction of
          certain information and to raise questions about how your information
          is handled.
        </p>
        <p>
          If you have a privacy-related request, please contact us using the
          contact details provided below.
        </p>
      </PolicySection>

      <PolicySection title="10. Third-Party Websites">
        <p>
          Our website may contain links to third-party websites, platforms or
          services.
        </p>
        <p>
          ASF Coaching is not responsible for the privacy practices, content or
          security of third-party websites. We recommend reviewing the privacy
          policies of those websites before providing personal information.
        </p>
      </PolicySection>

      <PolicySection title="11. Changes to This Privacy Policy">
        <p>
          ASF Coaching may update this Privacy Policy from time to time to
          reflect changes to our services, website, business practices or
          applicable legal requirements.
        </p>
        <p>
          Any updated version will be published on this page with a revised Last
          Updated date.
        </p>
      </PolicySection>

      <PolicySection title="12. Contact Us">
        <p>
          If you have questions about this Privacy Policy or how ASF Coaching
          handles your personal information, please contact us:
        </p>
        <ContactBlock />
      </PolicySection>
    </PolicyPage>
  );
}

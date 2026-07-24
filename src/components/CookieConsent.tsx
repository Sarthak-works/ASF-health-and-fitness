"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
        },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {},
        marketing: {},
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "ASF Coaching uses cookies to improve your experience and understand site usage.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              sections: [
                {
                  title: "Strictly necessary",
                  description: "Required for the site to function.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  description: "Helps us understand how visitors use the site.",
                  linkedCategory: "analytics",
                },
                {
                  title: "Marketing",
                  description: "Used for Meta Pixel and similar tools.",
                  linkedCategory: "marketing",
                },
              ],
            },
          },
        },
      },
      onConsent: ({ cookie }) => {
        if (cookie.categories.includes("analytics")) {
          window.dispatchEvent(new CustomEvent("consent:analytics"));
        }
        if (cookie.categories.includes("marketing")) {
          window.dispatchEvent(new CustomEvent("consent:meta-pixel"));
        }
      },
      onChange: ({ cookie }) => {
        if (cookie.categories.includes("analytics")) {
          window.dispatchEvent(new CustomEvent("consent:analytics"));
        }
      },
    });
  }, []);

  return null;
}

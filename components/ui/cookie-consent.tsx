"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
  });
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent");

    if (!hasAccepted) {
      // Show cookie consent after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // If they have accepted, load their preferences
      try {
        const savedPreferences = JSON.parse(
          localStorage.getItem("cookiePreferences") || "{}"
        );
        if (savedPreferences) {
          setPreferences((prev) => ({ ...prev, ...savedPreferences }));
        }
      } catch (e) {
        console.error("Error parsing cookie preferences", e);
      }
    }
  }, []);

  const acceptAllCookies = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setIsVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const handlePreferenceChange = (type: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 p-4 md:p-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold">Cookie Notice</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-text-light mb-4">
          We use cookies to enhance your browsing experience, serve personalized
          ads or content, and analyze our traffic. By clicking "Accept All", you
          consent to our use of cookies. You can also customize your
          preferences.
        </p>

        {showPreferences && (
          <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Essential Cookies</h4>
                <p className="text-sm text-gray-500">
                  Required for the website to function properly. Cannot be
                  disabled.
                </p>
              </div>
              <input type="checkbox" checked disabled className="h-4 w-4" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Analytics Cookies</h4>
                <p className="text-sm text-gray-500">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handlePreferenceChange("analytics")}
                className="h-4 w-4"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Marketing Cookies</h4>
                <p className="text-sm text-gray-500">
                  Used to deliver relevant ads and track their performance.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => handlePreferenceChange("marketing")}
                className="h-4 w-4"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={togglePreferences}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            {showPreferences ? "Hide Preferences" : "Customize"}
          </button>
          <button
            onClick={acceptEssentialOnly}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Essential Only
          </button>
          {showPreferences ? (
            <button
              onClick={savePreferences}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={acceptAllCookies}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Accept All
            </button>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          For more information, please read our{" "}
          <Link href="/privacy-policy" className="text-accent1 hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

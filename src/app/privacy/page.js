import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/footer";
export default function PrivacyPolicyPage() {
  return (
    <>
    <main className="bg-payne-gray text-white">
      <Navbar/>
      <section name="privacy-policy" className="my-10 px-14">
      <h1 class="text-3xl font-semibold mb-4">
        Privacy Policy
      </h1>

      <h2 class="text-2xl font-bold my-4">1. Introduction</h2>
      <p class="mb-2">
        We take your privacy seriously and are committed to protecting your
        personal data. This Privacy Policy outlines how we use, store, and
        process your information in compliance with the General Data Protection
        Regulation (GDPR).
      </p>

      <h2 class="text-2xl font-bold my-4">2. Information We Collect</h2>
      <p class="mb-2">When you use our service, we may:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>
          Store and/or access information on your device, such as cookies,
          device identifiers, or other similar information.
        </li>
      </ul>

      <h2 class="text-2xl font-bold my-4">
        3. Purposes for Processing Your Data
      </h2>
      <p>We use your data for the following purposes:</p>

      <ol class="list-decimal pl-6 mb-4">
        <li class="my-2">
          <strong>Basic Advertising</strong>
          <ul class="list-disc pl-6">
            <li>
              Displaying ads based on the content you view, the app you use,
              your approximate location, or your device type.
            </li>
          </ul>
        </li>

        <li class="my-2">
          <strong>Personalised Advertising Profile & Content</strong>
          <ul class="list-disc pl-6">
            <li>
              Building a profile about you based on your interests to show you
              personalised ads and content that are relevant to you.
            </li>
          </ul>
        </li>

        <li class="my-2">
          <strong>Performance Measurement</strong>
          <ul class="list-disc pl-6">
            <li>
              Analyzing the performance and effectiveness of the ads and content
              you interact with.
            </li>
          </ul>
        </li>

        <li class="my-2">
          <strong>Market Research</strong>
          <ul class="list-disc pl-6">
            <li>
              Understanding more about our audience to improve user experience.
            </li>
          </ul>
        </li>

        <li class="my-2">
          <strong>Product Development and Improvement</strong>
          <ul class="list-disc pl-6">
            <li>Using your data to improve and innovate products.</li>
          </ul>
        </li>
      </ol>

      <h2 class="text-2xl font-bold my-4">4. Your Rights Under GDPR</h2>
      <p>You have various rights under the GDPR, including the right to:</p>
      <ul class="list-disc pl-6 mb-4">
        <li>Access the data we hold about you.</li>
        <li>Rectify incorrect data.</li>
        <li>Erase your data.</li>
        <li>Object to or restrict processing.</li>
        <li>Data portability.</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us using the contact
        details provided below.
      </p>

      <h2 class="text-2xl font-bold my-4">5. Cookies</h2>
      <p>
        Cookies are small pieces of data stored on your device. Refusing cookies
        might affect our service&apos;s functionality and your user experience.
      </p>

      <h2 class="text-2xl font-bold my-4">6. Data Retention</h2>
      <p>
        We retain your data only for as long as necessary for the purposes
        stated in this Privacy Policy.
      </p>

      <h2 class="text-2xl font-bold my-4">7. Data Protection</h2>
      <p>
        We employ security measures to protect your data from unauthorized
        access or loss.
      </p>

      <h2 class="text-2xl font-bold my-4">8. Third-party Access</h2>
      <p>
        Your data won&apos;t be shared with third parties unless necessary or legally
        required.
      </p>

      <h2 class="text-2xl font-bold my-4">9. Changes to This Policy</h2>
      <p>
        Review this page periodically to stay informed about our data protection
        practices.
      </p>

      <h2 class="text-2xl font-bold my-4">10. Contact Us</h2>
      <p>
        For any questions regarding this Privacy Policy, or to exercise your
        GDPR rights, contact us at [Contact Email Address].
      </p>
      </section>
      <Footer/>
      </main>
    </>
  );
}

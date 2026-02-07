import { Link } from "react-router-dom";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background px-6 py-24">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-primary hover:text-rose-deep transition-colors font-body mb-8 inline-block">
        ← Back to Home
      </Link>
      <h1 className="section-heading text-foreground mb-8">Privacy Policy</h1>
      <div className="prose prose-sm text-muted-foreground font-body space-y-6">
        <p>Tatiana Torres Beauty ("we", "us", "our") is committed to protecting your privacy in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.</p>
        <h2 className="font-heading text-xl text-foreground">Information We Collect</h2>
        <p>We may collect personal information including your name, email address, phone number, and treatment preferences when you book a consultation or contact us.</p>
        <h2 className="font-heading text-xl text-foreground">How We Use Your Information</h2>
        <p>Your personal data is used to provide aesthetic treatments, communicate regarding appointments, and improve our services. We will never sell your data to third parties.</p>
        <h2 className="font-heading text-xl text-foreground">Your Rights</h2>
        <p>Under UK GDPR, you have the right to access, rectify, erase, or restrict processing of your personal data. To exercise these rights, please contact us directly.</p>
        <h2 className="font-heading text-xl text-foreground">Contact</h2>
        <p>For privacy-related enquiries, please reach out via WhatsApp or visit our clinic in Birmingham.</p>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;

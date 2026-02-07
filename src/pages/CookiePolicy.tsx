import { Link } from "react-router-dom";

const CookiePolicy = () => (
  <div className="min-h-screen bg-background px-6 py-24">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-primary hover:text-rose-deep transition-colors font-body mb-8 inline-block">
        ← Back to Home
      </Link>
      <h1 className="section-heading text-foreground mb-8">Cookie Policy</h1>
      <div className="prose prose-sm text-muted-foreground font-body space-y-6">
        <p>This website uses cookies to enhance your browsing experience and provide personalised content.</p>
        <h2 className="font-heading text-xl text-foreground">What Are Cookies?</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help us understand how you interact with our site.</p>
        <h2 className="font-heading text-xl text-foreground">Types of Cookies We Use</h2>
        <p><strong>Essential cookies:</strong> Required for the website to function properly.</p>
        <p><strong>Analytics cookies:</strong> Help us understand visitor behaviour to improve our services.</p>
        <h2 className="font-heading text-xl text-foreground">Managing Cookies</h2>
        <p>You can manage or disable cookies through your browser settings. Note that disabling certain cookies may affect website functionality.</p>
      </div>
    </div>
  </div>
);

export default CookiePolicy;

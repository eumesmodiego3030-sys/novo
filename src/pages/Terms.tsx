import { Link } from "react-router-dom";

const Terms = () => (
  <div className="min-h-screen bg-background px-6 py-24">
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="text-sm text-primary hover:text-rose-deep transition-colors font-body mb-8 inline-block">
        ← Back to Home
      </Link>
      <h1 className="section-heading text-foreground mb-8">Terms & Conditions</h1>
      <div className="prose prose-sm text-muted-foreground font-body space-y-6">
        <p>By using this website and our services, you agree to the following terms and conditions.</p>
        <h2 className="font-heading text-xl text-foreground">Services</h2>
        <p>Tatiana Torres Beauty provides advanced aesthetic treatments in Birmingham, UK. All treatments are subject to a prior consultation to assess suitability.</p>
        <h2 className="font-heading text-xl text-foreground">Bookings & Cancellations</h2>
        <p>We require 24 hours' notice for cancellations. Late cancellations or no-shows may be subject to a fee.</p>
        <h2 className="font-heading text-xl text-foreground">Results Disclaimer</h2>
        <p>Individual results may vary. Before and after images shown on this website are for illustrative purposes only and do not guarantee specific outcomes.</p>
        <h2 className="font-heading text-xl text-foreground">Liability</h2>
        <p>While we take every precaution to ensure safety, aesthetic treatments carry inherent risks. These will be fully discussed during your consultation.</p>
      </div>
    </div>
  </div>
);

export default Terms;

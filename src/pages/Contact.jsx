import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "../components/Contact/ContactForm";
import ContactInfo from "../components/Contact/ContactInfo";
import { Helmet } from "react-helmet";
import SuccessAlert from "../components/Alert/SuccessAlert";
import ErrorAlert from "../components/Alert/ErrorAlert";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "123 Fitness Blvd, Gulsan, Dhaka-1200, Bangladesh" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: Mail, label: "Email", value: "info@classicfitness.com" },
  { icon: Clock, label: "Hours", value: "Open 24/7" },
]

const Contact = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
    <Helmet>
      <title>Contact</title>
    </Helmet>
      <main>
        <PageHeader
          label="Get in Touch"
          title="Contact Us"
          description="Have questions about our programs or membership? We would love to hear from you. Reach out and our team will respond within 24 hours."
        />

        <section className="bg-zinc-950 pb-24">
          <div className="mx-auto max-w-7xl px-6">
            {successMsg && <SuccessAlert message={successMsg} />}
            {errorMsg && <ErrorAlert message={errorMsg} />}
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Contact Form */}
              <ContactForm setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} />

              {/* Contact Info */}
              <ContactInfo contactInfo={contactInfo} />

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;

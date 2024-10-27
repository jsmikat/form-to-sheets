import Link from "next/link";

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="max-w-md space-y-6 rounded-lg p-6 text-center">
        <h1 className="text-4xl font-black text-primary">Thank You!</h1>
        <p className="text-lg text-gray-700">
          Your order has been submitted successfully. We&apos;ll get back to you
          soon!
        </p>

        <Link href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </Link>

        <div className="mt-8">
          <ConnectWithUs />
        </div>
      </div>
    </div>
  );
}

function ConnectWithUs() {
  const socialLinks = [
    { href: "https://facebook.com", icon: <FaFacebook />, name: "Facebook" },
    { href: "https://twitter.com", icon: <FaTwitter />, name: "Twitter" },
    { href: "https://instagram.com", icon: <FaInstagram />, name: "Instagram" },
    { href: "https://linkedin.com", icon: <FaLinkedin />, name: "LinkedIn" },
  ];

  return (
    <div className="rounded-lg border-2 border-primary bg-gray-50 p-4 shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Connect with Us
      </h2>
      <div className="flex justify-around">
        {socialLinks.map(({ href, icon, name }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-blue-500"
            aria-label={name}
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

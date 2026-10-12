function Contact() {
  return (
    <section className="bg-white max-w-112.5 mx-auto w-full lg:max-w-110 lg:flex lg:flex-col lg:h-full rounded-[10px] p-4 mt-4">
      <div>
        <h2 className="text-[20px] font-bold pb-3 text-[#1A202C]">
          Contact Info
        </h2>
        <hr className="border-gray-200" />
        <div className="flex flex-col gap-5 py-3">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <span className="text-xl">📞</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C]">Phone Number</h3>
              <a
                href="tel:+995555123456"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                +995 555 12 34 56
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <span className="text-xl">✉️</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C]">Email Address</h3>
              <a
                href="mailto:info@carrent.ge"
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                info@carrent.ge
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <span className="text-xl">🕒</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C]">Working Hours</h3>
              <p className="text-sm text-gray-500">Monday – Sunday</p>
              <p className="text-sm text-gray-500">09:00 AM – 09:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <span className="text-xl">📍</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A202C]">Our Location</h3>
              <p className="text-sm text-gray-500">Tbilisi, Georgia</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <hr className="border-gray-200 pb-3" />
        <iframe
          className="rounded-[10px] w-full h-75"
          src="https://www.google.com/maps?q=Tbilisi,+Georgia&output=embed"
          title="Car rental office location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href="tel:+995555123456"
          className="mt-4 w-full rounded-lg bg-[#3563E9] py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}

export default Contact;

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonialTrackRef = useRef<HTMLDivElement>(null);

  // Constants
  const testimonials = [
    {
      initials: "RD",
      name: "Rizky Dwi",
      location: "Pelanggan dari Jakarta",
      text: '"Kopi Toraja dari Kopi Nusantara benar-benar luar biasa! Aromanya harum banget dan rasanya smooth. Sudah langganan hampir 2 tahun dan nggak pernah mengecewakan."',
    },
    {
      initials: "SA",
      name: "Sarah Amelia",
      location: "Pelanggan dari Bandung",
      text: '"Packing-nya rapi, kopi-nya segar banget sampai bisa cium aromanya dari luar. Aceh Gayo-nya juara! Recommended banget buat pecinta kopi."',
    },
    {
      initials: "BP",
      name: "Budi Prasetyo",
      location: "Home Barista, Surabaya",
      text: '"Sebagai barista rumahan, saya sangat memperhatikan kualitas biji kopi. Flores Bajawa dari Kopi Nusantara punya body yang kuat dan aftertaste yang memorable. Top!"',
    },
    {
      initials: "NW",
      name: "Nia Wulandari",
      location: "Pelanggan dari Yogyakarta",
      text: '"Bali Kintamani-nya punya karakter citrus yang segar, cocok banget buat morning coffee. Pelayanan juga ramah, fast response di WhatsApp. Sukses terus Kopi Nusantara!"',
    },
  ];

  const getCardsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const getMaxIndex = () => Math.max(0, testimonials.length - getCardsPerView());

  // Effects
  useEffect(() => {
    // Navbar Scroll Effect
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50);
      setIsBackToTopVisible(window.scrollY > 600);

      // Active Section Tracking
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id") || "";
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Scroll Animations (IntersectionObserver)
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-on-scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));

    // Floating Particles
    const container = document.getElementById("particles");
    if (container) {
      container.innerHTML = "";
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.setProperty("--duration", 8 + Math.random() * 12 + "s");
        particle.style.setProperty("--delay", Math.random() * 8 + "s");
        const size = 2 + Math.random() * 4 + "px";
        particle.style.width = size;
        particle.style.height = size;
        particle.style.opacity = (0.1 + Math.random() * 0.3).toString();
        container.appendChild(particle);
      }
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Testimonial Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev >= getMaxIndex() ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const updateSlider = () => {
    if (testimonialTrackRef.current) {
      const gap = 24; // 1.5rem
      const cardWidth =
        (testimonialTrackRef.current.firstElementChild as HTMLElement)
          ?.offsetWidth + gap || 0;
      testimonialTrackRef.current.style.transform = `translateX(-${
        testimonialIndex * cardWidth
      }px)`;
    }
  };

  useEffect(() => {
    updateSlider();
  }, [testimonialIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (testimonialIndex > getMaxIndex()) setTestimonialIndex(getMaxIndex());
      updateSlider();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [testimonialIndex]);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isNavbarScrolled ? "scrolled" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#beranda" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-coffee-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-mug-hot text-coffee-900 text-lg"></i>
              </div>
              <span className="font-display text-xl font-bold tracking-wide">
                Kopi Nusantara
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#beranda"
                className={`nav-link ${activeSection === "beranda" ? "active" : ""}`}
              >
                Beranda
              </a>
              <a
                href="#tentang"
                className={`nav-link ${activeSection === "tentang" ? "active" : ""}`}
              >
                Tentang
              </a>
              <a
                href="#produk"
                className={`nav-link ${activeSection === "produk" ? "active" : ""}`}
              >
                Produk
              </a>
              <a
                href="#testimoni"
                className={`nav-link ${activeSection === "testimoni" ? "active" : ""}`}
              >
                Testimoni
              </a>
              <a
                href="#kontak"
                className={`nav-link ${activeSection === "kontak" ? "active" : ""}`}
              >
                Kontak
              </a>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara!%20Saya%20tertarik%20untuk%20memesan%20kopi."
                target="_blank"
                className="cta-btn-small"
              >
                <i className="fab fa-whatsapp mr-1"></i> Pesan Sekarang
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="hamburger"
              className={`md:hidden flex flex-col gap-[6px] p-2 group ${
                isMobileMenuOpen ? "hamburger-active" : ""
              }`}
              aria-label="Toggle Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu md:hidden ${
            isMobileMenuOpen ? "mobile-menu-open" : ""
          }`}
        >
          <div className="px-6 py-8 flex flex-col gap-4">
            <a
              href="#beranda"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              Beranda
            </a>
            <a
              href="#tentang"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              Tentang
            </a>
            <a
              href="#produk"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              Produk
            </a>
            <a
              href="#testimoni"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              Testimoni
            </a>
            <a
              href="#kontak"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              Kontak
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara!%20Saya%20tertarik%20untuk%20memesan%20kopi."
              target="_blank"
              className="cta-btn-small mt-4 text-center"
            >
              <i className="fab fa-whatsapp mr-1"></i> Pesan Sekarang
            </a>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section
        id="beranda"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-coffee.png"
            alt="Kopi Nusantara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-coffee-900/80 via-coffee-900/60 to-coffee-900"></div>
        </div>

        {/* Floating particles */}
        <div className="particles" id="particles"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-on-scroll">
            <p className="text-coffee-300 font-body text-sm md:text-base tracking-[0.3em] uppercase mb-4">
              Est. 2018 • Yogyakarta
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-cream">
              Cita Rasa<br />
              <span className="text-coffee-400 italic">Nusantara</span><br />
              Dalam Setiap Tegukan
            </h1>
            <p className="text-coffee-100/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Kopi single-origin terbaik dari pelosok Indonesia, di-roasting
              dengan penuh cinta di jantung kota Yogyakarta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara!%20Saya%20tertarik%20untuk%20memesan%20kopi."
                target="_blank"
                className="cta-btn-primary"
              >
                <i className="fab fa-whatsapp mr-2"></i> Pesan via WhatsApp
              </a>
              <a href="#produk" className="cta-btn-secondary">
                Lihat Produk <i className="fas fa-arrow-down ml-2"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-coffee-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-coffee-400/70 rounded-full scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* ===== TENTANG SECTION ===== */}
      <section id="tentang" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="animate-on-scroll relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/coffee-shop.png"
                  alt="Interior Kopi Nusantara"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/40 to-transparent"></div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-coffee-700/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-coffee-600/30">
                <p className="font-display text-3xl font-bold text-coffee-300">
                  7+
                </p>
                <p className="text-coffee-100/70 text-sm">
                  Tahun<br />Pengalaman
                </p>
              </div>
            </div>

            {/* Text Content */}
            <div className="animate-on-scroll">
              <p className="text-coffee-400 font-body text-sm tracking-[0.2em] uppercase mb-3">
                Tentang Kami
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight text-cream">
                Dari Biji Pilihan,<br />
                <span className="text-coffee-300 italic">Untuk Penikmat Sejati</span>
              </h2>
              <div className="space-y-4 text-coffee-100/70 leading-relaxed">
                <p>
                  <strong className="text-cream">Kopi Nusantara</strong> lahir
                  dari kecintaan kami terhadap kekayaan kopi Indonesia. Sejak
                  2018, kami telah menjelajahi berbagai daerah penghasil kopi
                  terbaik — dari dataran tinggi Toraja hingga lereng Gunung Ijen
                  — untuk menemukan biji kopi dengan karakter unik.
                </p>
                <p>
                  Setiap biji kopi kami roasting langsung di workshop kami di
                  Yogyakarta menggunakan metode <em>artisan roasting</em>,
                  memastikan setiap cangkir kopi yang Anda nikmati memiliki cita
                  rasa yang kaya dan autentik.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10">
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-coffee-400">
                    15+
                  </p>
                  <p className="text-coffee-100/60 text-sm mt-1">
                    Asal Biji Kopi
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-coffee-400">
                    5K+
                  </p>
                  <p className="text-coffee-100/60 text-sm mt-1">
                    Pelanggan Setia
                  </p>
                </div>
                <div className="text-center">
                  <p className="font-display text-3xl font-bold text-coffee-400">
                    4.9
                  </p>
                  <p className="text-coffee-100/60 text-sm mt-1">Rating Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KEUNGGULAN SECTION ===== */}
      <section className="py-20 bg-coffee-800/50 relative">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"30\" cy=\"30\" r=\"2\" fill=\"%23c48a52\"/></svg>')",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-coffee-400 font-body text-sm tracking-[0.2em] uppercase mb-3 text-cream">
              Mengapa Kami
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream">
              Keunggulan Kami
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-fire text-2xl"></i>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-cream">
                Fresh Roasted
              </h3>
              <p className="text-coffee-100/60 leading-relaxed">
                Setiap batch kopi di-roasting segar sesuai pesanan. Kami
                pastikan kopi sampai ke tangan Anda dalam kondisi paling
                optimal.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-mountain text-2xl"></i>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-cream">
                Single Origin
              </h3>
              <p className="text-coffee-100/60 leading-relaxed">
                Biji kopi dipilih langsung dari petani lokal di berbagai daerah
                Indonesia, mendukung ekonomi petani kopi Nusantara.
              </p>
            </div>

            <div className="feature-card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-truck text-2xl"></i>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-cream">
                Gratis Ongkir
              </h3>
              <p className="text-coffee-100/60 leading-relaxed">
                Free delivery untuk area Yogyakarta dan subsidi ongkir untuk
                pengiriman ke seluruh Indonesia via ekspedisi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUK SECTION ===== */}
      <section id="produk" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-coffee-400 font-body text-sm tracking-[0.2em] uppercase mb-3">
              Menu Pilihan
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-cream">
              Produk Unggulan
            </h2>
            <p className="text-coffee-100/60 max-w-2xl mx-auto">
              Kopi single-origin pilihan dari berbagai daerah terbaik Indonesia,
              di-roasting sempurna untuk Anda.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product items... */}
            {[
              {
                name: "Toraja Sapan",
                notes: "Cokelat, Rempah, Floral",
                price: "85K",
                badge: "Best Seller",
                roast: "Medium Roast",
              },
              {
                name: "Aceh Gayo",
                notes: "Fruity, Herbal, Sweet",
                price: "90K",
                badge: "Organic",
                badgeClass: "bg-forest-600",
                roast: "Light Roast",
              },
              {
                name: "Bali Kintamani",
                notes: "Citrus, Vanilla, Nutty",
                price: "95K",
                roast: "Medium Roast",
              },
              {
                name: "Flores Bajawa",
                notes: "Smoky, Caramel, Bold",
                price: "100K",
                badge: "Premium",
                badgeStyle: {
                  background: "linear-gradient(135deg, #7a4f2c, #c48a52)",
                },
                roast: "Dark Roast",
              },
            ].map((p, i) => (
              <div key={i} className="product-card animate-on-scroll">
                <div className="product-image-wrapper">
                  <img
                    src="/coffee-varieties.png"
                    alt={p.name}
                    className="product-image"
                  />
                  {p.badge && (
                    <div
                      className={`product-badge ${p.badgeClass || ""}`}
                      style={p.badgeStyle}
                    >
                      {p.badge}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-coffee-700/60 text-coffee-300 px-2 py-1 rounded-full">
                      {p.roast}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1 text-cream">
                    {p.name}
                  </h3>
                  <p className="text-coffee-100/50 text-sm mb-3">
                    Notes: {p.notes}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xl font-bold text-coffee-300">
                      Rp {p.price}
                    </p>
                    <span className="text-coffee-100/40 text-xs">250gr</span>
                  </div>
                  <a
                    href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20memesan%20Kopi%20${p.name}%20250gr`}
                    target="_blank"
                    className="product-cta mt-4"
                  >
                    <i className="fab fa-whatsapp mr-1"></i> Pesan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI SECTION ===== */}
      <section
        id="testimoni"
        className="py-24 md:py-32 bg-coffee-800/30 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-64 h-64 bg-coffee-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coffee-400/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-coffee-400 font-body text-sm tracking-[0.2em] uppercase mb-3">
              Testimoni
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-cream">
              Kata Mereka
            </h2>
            <p className="text-coffee-100/60 max-w-2xl mx-auto">
              Apa kata pelanggan setia kami tentang pengalaman menikmati Kopi
              Nusantara.
            </p>
          </div>

          <div className="testimonial-slider relative">
            <div
              className="testimonial-track"
              id="testimonial-track"
              ref={testimonialTrackRef}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <i key={j} className="fas fa-star text-coffee-400"></i>
                    ))}
                  </div>
                  <p className="text-coffee-100/80 leading-relaxed mb-6 italic">
                    {t.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-coffee-600 flex items-center justify-center">
                      <span className="font-display font-bold text-coffee-200">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-cream">{t.name}</p>
                      <p className="text-coffee-100/50 text-sm">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 mt-10">
              <button
                onClick={() =>
                  setTestimonialIndex((prev) =>
                    prev <= 0 ? getMaxIndex() : prev - 1
                  )
                }
                className="slider-btn"
                aria-label="Previous"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <div className="flex items-center gap-2">
                {[...Array(getMaxIndex() + 1)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`slider-dot ${
                      i === testimonialIndex ? "slider-dot-active" : ""
                    }`}
                  ></button>
                ))}
              </div>
              <button
                onClick={() =>
                  setTestimonialIndex((prev) =>
                    prev >= getMaxIndex() ? 0 : prev + 1
                  )
                }
                className="slider-btn"
                aria-label="Next"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALERI SECTION ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-coffee-400 font-body text-sm tracking-[0.2em] uppercase mb-3">
              Galeri
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-cream">
              Momen Kami
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-on-scroll">
            <div className="gallery-item col-span-2 md:col-span-1 md:row-span-2">
              <img
                src="/hero-coffee.png"
                alt="Galeri Kopi 1"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay">
                <i className="fas fa-mug-hot text-2xl mb-2"></i>
                <p className="font-display font-semibold">
                  Secangkir Kebahagiaan
                </p>
              </div>
            </div>
            <div className="gallery-item">
              <img
                src="/coffee-shop.png"
                alt="Galeri Kedai"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay">
                <i className="fas fa-store text-2xl mb-2"></i>
                <p className="font-display font-semibold">Kedai Kami</p>
              </div>
            </div>
            <div className="gallery-item">
              <img
                src="/coffee-varieties.png"
                alt="Galeri Biji Kopi"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay">
                <i className="fas fa-seedling text-2xl mb-2"></i>
                <p className="font-display font-semibold">Biji Pilihan</p>
              </div>
            </div>
            <div className="gallery-item col-span-2">
              <img
                src="/coffee-shop.png"
                alt="Galeri Roastery"
                className="w-full h-full object-cover"
              />
              <div className="gallery-overlay">
                <i className="fas fa-fire text-2xl mb-2"></i>
                <p className="font-display font-semibold">Proses Roasting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KONTAK SECTION ===== */}
      <section id="kontak" className="py-24 md:py-32 bg-coffee-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <p className="text-coffee-400 font-body text-sm tracking-[0.2em] uppercase mb-3 text-cream">
              Hubungi Kami
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-cream">
              Temui Kami
            </h2>
            <p className="text-coffee-100/60 max-w-2xl mx-auto">
              Kunjungi kedai kami atau hubungi via WhatsApp untuk pemesanan dan
              informasi lebih lanjut.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-on-scroll space-y-8">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt text-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-cream">Alamat</h4>
                  <p className="text-coffee-100/60">
                    Jl. Prawirotaman No. 42, Mergangsan,
                    <br />
                    Yogyakarta 55153
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-clock text-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-cream"> Jam Operasional </h4>
                  <p className="text-coffee-100/60">
                    Senin - Sabtu: 08.00 - 22.00 WIB
                    <br />
                    Minggu: 09.00 - 21.00 WIB
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fab fa-whatsapp text-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-cream">WhatsApp</h4>
                  <p className="text-coffee-100/60">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-envelope text-lg"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-cream">Email</h4>
                  <p className="text-coffee-100/60">hello@kopinusantara.id</p>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-tiktok text-xl"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-coffee-700/30 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.0!2d110.3666!3d-7.8106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDgnMzguMiJTIDExMMKwMjInMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kopi Nusantara"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center animate-on-scroll">
            <div className="big-cta-box">
              <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 text-cream">
                Siap Menikmati Kopi Terbaik?
              </h3>
              <p className="text-coffee-100/70 mb-8 max-w-lg mx-auto">
                Hubungi kami via WhatsApp untuk pemesanan, konsultasi pilihan
                kopi, atau kunjungi langsung kedai kami.
              </p>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara!%20Saya%20tertarik%20untuk%20memesan%20kopi."
                target="_blank"
                className="cta-btn-primary text-lg px-10 py-4"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i> Chat via
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-coffee-900 border-t border-coffee-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-coffee-400 flex items-center justify-center">
                  <i className="fas fa-mug-hot text-coffee-900 text-sm"></i>
                </div>
                <span className="font-display text-lg font-bold text-cream">
                  Kopi Nusantara
                </span>
              </div>
              <p className="text-coffee-100/50 text-sm leading-relaxed">
                Roasteri kopi spesialti Indonesia. Dari biji pilihan, untuk
                penikmat sejati.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-coffee-300">Menu</h4>
              <div className="flex flex-col gap-2">
                <a
                  href="#beranda"
                  className="text-coffee-100/50 hover:text-coffee-300 transition-colors text-sm"
                >
                  Beranda
                </a>
                <a
                  href="#tentang"
                  className="text-coffee-100/50 hover:text-coffee-300 transition-colors text-sm"
                >
                  Tentang
                </a>
                <a
                  href="#produk"
                  className="text-coffee-100/50 hover:text-coffee-300 transition-colors text-sm"
                >
                  Produk
                </a>
                <a
                  href="#kontak"
                  className="text-coffee-100/50 hover:text-coffee-300 transition-colors text-sm"
                >
                  Kontak
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-coffee-300">Kontak</h4>
              <div className="flex flex-col gap-2 text-sm text-coffee-100/50">
                <p>
                  <i className="fas fa-phone mr-2 text-coffee-400"></i>+62
                  812-3456-7890
                </p>
                <p>
                  <i className="fas fa-envelope mr-2 text-coffee-400"></i>
                  hello@kopinusantara.id
                </p>
                <p>
                  <i className="fas fa-map-marker-alt mr-2 text-coffee-400"></i>
                  Yogyakarta, Indonesia
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-coffee-800/30 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-coffee-100/40 text-sm">
              &copy; 2026 Kopi Nusantara. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-coffee-100/40 hover:text-coffee-300 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-coffee-100/40 hover:text-coffee-300 transition-colors"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="#"
                className="text-coffee-100/40 hover:text-coffee-300 transition-colors"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP BTN ===== */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Kopi%20Nusantara!%20Saya%20tertarik%20untuk%20memesan%20kopi."
        target="_blank"
        id="wa-float"
        className="wa-float"
        aria-label="Chat WhatsApp"
      >
        <div className="wa-float-pulse"></div>
        <div className="wa-float-icon">
          <i className="fab fa-whatsapp text-3xl"></i>
        </div>
        <span className="wa-float-label">Chat Kami</span>
      </a>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        id="back-to-top"
        className={`back-to-top ${isBackToTopVisible ? "back-to-top-visible" : ""}`}
        aria-label="Back to Top"
      >
        <i className="fas fa-chevron-up"></i>
      </button>
    </>
  );
}

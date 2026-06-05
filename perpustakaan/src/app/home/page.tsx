"use client";

import { useEffect, useRef, useState } from "react";

const books = [
  {
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
    year: 2005,
    color: "#C8A96E",
  },
  {
    title: "Bumi Manusia",
    author: "Pramoedya A. Toer",
    category: "Sastra",
    year: 1980,
    color: "#8B6F5E",
  },
  {
    title: "Ronggeng Dukuh Paruk",
    author: "Ahmad Tohari",
    category: "Sastra",
    year: 1982,
    color: "#6B8E7F",
  },
  {
    title: "Sang Pemimpi",
    author: "Andrea Hirata",
    category: "Fiksi",
    year: 2006,
    color: "#9B7B6B",
  },
  {
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    category: "Motivasi",
    year: 2009,
    color: "#7A9E9F",
  },
  {
    title: "Perahu Kertas",
    author: "Dee Lestari",
    category: "Roman",
    year: 2009,
    color: "#B8860B",
  },
];

const stats = [
  { number: "24,000+", label: "Koleksi Buku" },
  { number: "3,200", label: "Anggota Aktif" },
  { number: "18", label: "Tahun Berdiri" },
  { number: "7", label: "Cabang Kota" },
];

export default function LibraryLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [activeBook, setActiveBook] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: "#F5F0E8",
        color: "#1A1208",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Raleway:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { font-family: 'Raleway', sans-serif; }

        .hero-title { font-family: 'Cormorant Garamond', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineExpand {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(-2deg); }
        }
        @keyframes floatMid {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-2%,-3%); }
          30% { transform: translate(3%,2%); }
          50% { transform: translate(-1%,3%); }
          70% { transform: translate(2%,-2%); }
          90% { transform: translate(-3%,1%); }
        }

        .fade-up { animation: fadeUp 0.9s ease forwards; }
        .fade-up-delay-1 { animation: fadeUp 0.9s 0.2s ease both; }
        .fade-up-delay-2 { animation: fadeUp 0.9s 0.4s ease both; }
        .fade-up-delay-3 { animation: fadeUp 0.9s 0.6s ease both; }

        .nav-link {
          font-family: 'Raleway', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #F5F0E8;
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.3s;
        }
        .nav-link:hover { opacity: 1; }

        .book-card {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease;
          cursor: pointer;
        }
        .book-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 60px rgba(0,0,0,0.2);
        }

        .cta-btn {
          font-family: 'Raleway', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          border: 1px solid #F5F0E8;
          color: #F5F0E8;
          background: transparent;
          padding: 14px 36px;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .cta-btn:hover {
          background: #F5F0E8;
          color: #1A1208;
        }
        .cta-btn-dark {
          border-color: #1A1208;
          color: #1A1208;
        }
        .cta-btn-dark:hover {
          background: #1A1208;
          color: #F5F0E8;
        }

        .grain-overlay {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          animation: grain 0.5s steps(1) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
        }

        .section-label {
          font-family: 'Raleway', sans-serif;
          font-size: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
          opacity: 0.5;
        }

        .divider {
          width: 40px;
          height: 1px;
          background: currentColor;
          display: inline-block;
          vertical-align: middle;
          margin-right: 12px;
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "24px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrollY > 80 ? "rgba(26,18,8,0.95)" : "transparent",
          backdropFilter: scrollY > 80 ? "blur(12px)" : "none",
          transition: "all 0.4s ease",
          borderBottom:
            scrollY > 80 ? "1px solid rgba(245,240,232,0.1)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect
              x="4"
              y="4"
              width="8"
              height="20"
              rx="1"
              fill="#C8A96E"
              opacity="0.9"
            />
            <rect
              x="14"
              y="6"
              width="8"
              height="18"
              rx="1"
              fill="#C8A96E"
              opacity="0.6"
            />
            <rect x="2" y="22" width="24" height="2" rx="1" fill="#C8A96E" />
          </svg>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20,
              color: "#F5F0E8",
              letterSpacing: 1,
            }}
          >
            Pustaka Nusantara
          </span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {["Koleksi", "Tentang", "Layanan"].map((item) => (
            <a key={item} href="#" className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a
          href="/login"
          className="cta-btn"
          style={{ padding: "10px 24px", fontSize: "10px" }}
        >
          Masuk
        </a>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #1A1208 0%, #2C1E0F 50%, #1A1208 100%)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "0 48px",
        }}
      >
        {/* Decorative gold lines */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "8%",
            width: 1,
            height: "35%",
            background:
              "linear-gradient(to bottom, transparent, #C8A96E, transparent)",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "6%",
            width: "20%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, #C8A96E, transparent)",
            opacity: 0.4,
          }}
        />

        {/* Floating books illustration */}
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: 0.15,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 60 + i * 15,
                height: 80 + i * 10,
                background: `hsl(${35 + i * 8}, 40%, ${30 + i * 5}%)`,
                borderRadius: "2px 6px 6px 2px",
                left: i * 30,
                top: i * -20,
                animation:
                  i % 2 === 0
                    ? "floatSlow 6s ease-in-out infinite"
                    : "floatMid 5s ease-in-out infinite",
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Large decorative number */}
        <div
          style={{
            position: "absolute",
            right: "12%",
            bottom: "8%",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "280px",
            color: "#C8A96E",
            opacity: 0.04,
            lineHeight: 1,
            userSelect: "none",
            fontWeight: 300,
          }}
        >
          I
        </div>

        <div style={{ maxWidth: 700, position: "relative", zIndex: 2 }}>
          <div
            className="fade-up"
            style={{ display: "flex", alignItems: "center", marginBottom: 32 }}
          >
            <span className="divider" style={{ background: "#C8A96E" }} />
            <span className="section-label" style={{ color: "#C8A96E" }}>
              Perpustakaan Umum
            </span>
          </div>

          <h1
            className="hero-title fade-up-delay-1"
            style={{
              fontSize: "clamp(52px, 7vw, 96px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#F5F0E8",
              marginBottom: 8,
              letterSpacing: "-1px",
            }}
          >
            Tempat di Mana
          </h1>
          <h1
            className="hero-title fade-up-delay-1"
            style={{
              fontSize: "clamp(52px, 7vw, 96px)",
              fontWeight: 300,
              lineHeight: 1.05,
              color: "#C8A96E",
              marginBottom: 32,
              letterSpacing: "-1px",
              fontStyle: "italic",
            }}
          >
            Kata Hidup Selamanya
          </h1>

          <p
            className="fade-up-delay-2"
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 16,
              lineHeight: 1.8,
              color: "#F5F0E8",
              opacity: 0.65,
              maxWidth: 480,
              marginBottom: 48,
              fontWeight: 300,
            }}
          >
            Lebih dari dua dekade melayani para pencari ilmu. Temukan lebih dari
            24.000 koleksi buku, jurnal, dan manuskrip langka dari seluruh
            Nusantara.
          </p>

          <div className="fade-up-delay-3" style={{ display: "flex", gap: 16 }}>
            <a href="/login" className="cta-btn">
              Jelajahi Koleksi
            </a>
            <a href="#about" className="cta-btn" style={{ opacity: 0.5 }}>
              Pelajari Lebih
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "'Raleway'",
              fontSize: 9,
              letterSpacing: 3,
              color: "#F5F0E8",
              opacity: 0.4,
              textTransform: "uppercase",
            }}
          >
            Gulir
          </span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, #C8A96E, transparent)",
              opacity: 0.6,
            }}
          />
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          background: "#C8A96E",
          padding: "48px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              borderRight: i < 3 ? "1px solid rgba(26,18,8,0.2)" : "none",
              padding: "16px 24px",
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 48,
                fontWeight: 300,
                color: "#1A1208",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#1A1208",
                opacity: 0.6,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* KOLEKSI UNGGULAN */}
      <section style={{ padding: "100px 48px", background: "#F5F0E8" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 60,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span className="divider" />
              <span className="section-label">Koleksi Pilihan</span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 300,
                lineHeight: 1.1,
                color: "#1A1208",
              }}
            >
              Bacaan yang Telah
              <br />
              <em>Mengubah Peradaban</em>
            </h2>
          </div>
          <a href="/login" className="cta-btn cta-btn-dark">
            Lihat Semua →
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {books.map((book, i) => (
            <div
              key={i}
              className="book-card"
              onMouseEnter={() => setActiveBook(i)}
              onMouseLeave={() => setActiveBook(null)}
              style={{
                background: activeBook === i ? book.color : "#1A1208",
                borderRadius: 4,
                overflow: "hidden",
                transition: "background 0.4s ease",
              }}
            >
              {/* Book spine decoration */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, ${book.color}22, ${book.color}44)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 1,
                    height: "80%",
                    background: book.color,
                    opacity: 0.3,
                    left: "30%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 1,
                    height: "80%",
                    background: book.color,
                    opacity: 0.3,
                    right: "30%",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 72,
                    color: book.color,
                    opacity: 0.4,
                    fontWeight: 300,
                    fontStyle: "italic",
                  }}
                >
                  {book.title[0]}
                </span>
              </div>
              <div style={{ padding: "24px 28px 28px" }}>
                <div
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 9,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: book.color,
                    marginBottom: 8,
                  }}
                >
                  {book.category} · {book.year}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    color: "#F5F0E8",
                    fontWeight: 400,
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}
                >
                  {book.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 13,
                    color: "#F5F0E8",
                    opacity: 0.5,
                  }}
                >
                  {book.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYANAN */}
      <section
        style={{
          padding: "100px 48px",
          background: "#2C1E0F",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "35%",
            background:
              "linear-gradient(to left, rgba(200,169,110,0.08), transparent)",
          }}
        />

        <div style={{ marginBottom: 64 }}>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
          >
            <span className="divider" style={{ background: "#C8A96E" }} />
            <span className="section-label" style={{ color: "#C8A96E" }}>
              Layanan Kami
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 4vw, 56px)",
              fontWeight: 300,
              color: "#F5F0E8",
              lineHeight: 1.1,
            }}
          >
            Lebih dari Sekadar
            <br />
            <em style={{ color: "#C8A96E" }}>Meminjam Buku</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
          }}
        >
          {[
            {
              icon: "◈",
              title: "Peminjaman Digital",
              desc: "Akses ribuan e-book dan jurnal ilmiah kapan saja dan di mana saja melalui aplikasi kami.",
            },
            {
              icon: "◉",
              title: "Ruang Baca Premium",
              desc: "Nikmati suasana membaca yang tenang dan nyaman di ruang baca ber-AC kami yang luas.",
            },
            {
              icon: "◇",
              title: "Kelas Literasi",
              desc: "Program workshop dan seminar bulanan bersama penulis dan akademisi terkemuka.",
            },
            {
              icon: "◆",
              title: "Arsip & Riset",
              desc: "Layanan khusus peneliti untuk mengakses koleksi manuskrip dan dokumen langka.",
            },
            {
              icon: "○",
              title: "Perpustakaan Anak",
              desc: "Ruang khusus anak dengan koleksi buku bergambar dan program storytelling mingguan.",
            },
            {
              icon: "●",
              title: "Pengiriman Buku",
              desc: "Layanan antar-jemput buku ke rumah Anda dalam radius 10 km dari cabang terdekat.",
            },
          ].map((svc, i) => (
            <div
              key={i}
              style={{
                padding: "36px 32px",
                borderTop: "1px solid rgba(245,240,232,0.08)",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(200,169,110,0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div style={{ fontSize: 20, color: "#C8A96E", marginBottom: 16 }}>
                {svc.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  color: "#F5F0E8",
                  marginBottom: 12,
                  fontWeight: 400,
                }}
              >
                {svc.title}
              </div>
              <p
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 13,
                  color: "#F5F0E8",
                  opacity: 0.5,
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        style={{
          padding: "120px 48px",
          background: "#F5F0E8",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <span className="divider" />
            <span className="section-label">Bergabung Sekarang</span>
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 300,
              color: "#1A1208",
              marginBottom: 24,
              lineHeight: 1.1,
            }}
          >
            Mulai Perjalanan
            <br />
            <em>Membaca Anda Hari Ini</em>
          </h2>
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 15,
              color: "#1A1208",
              opacity: 0.55,
              maxWidth: 420,
              margin: "0 auto 48px",
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Daftar sebagai anggota dan dapatkan akses penuh ke seluruh koleksi
            kami. Gratis untuk pelajar dan mahasiswa.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <a href="/login" className="cta-btn cta-btn-dark">
              Daftar Gratis
            </a>
            <a
              href="#"
              className="cta-btn cta-btn-dark"
              style={{ opacity: 0.4 }}
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "48px",
          background: "#1A1208",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(200,169,110,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <rect
              x="4"
              y="4"
              width="8"
              height="20"
              rx="1"
              fill="#C8A96E"
              opacity="0.9"
            />
            <rect
              x="14"
              y="6"
              width="8"
              height="18"
              rx="1"
              fill="#C8A96E"
              opacity="0.6"
            />
            <rect x="2" y="22" width="24" height="2" rx="1" fill="#C8A96E" />
          </svg>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16,
              color: "#F5F0E8",
              opacity: 0.7,
            }}
          >
            Pustaka Nusantara
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 11,
            color: "#F5F0E8",
            opacity: 0.3,
            letterSpacing: 1,
          }}
        >
          © 2026 Pustaka Nusantara. Hak cipta dilindungi.
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privasi", "Syarat", "Peta Situs"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: 11,
                letterSpacing: 1,
                color: "#F5F0E8",
                opacity: 0.35,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

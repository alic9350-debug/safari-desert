import LeadForm from "@/components/LeadForm";
import PickPackage from "@/components/PickPackage";
import { FAQ, PACKAGES, REVIEWS, SITE, WHY } from "@/lib/site";
import { waLink } from "@/lib/tracking";

const WA_TEXT = "Hi Maverick Safari! I'd like the price for a desert safari.";

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <img src="/img/logo.png" alt={SITE.brand} width={168} height={48} className="logo" />
          <a className="top-wa" data-loc="header" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener">
            WhatsApp<span className="num"> {SITE.whatsappDisplay}</span>
          </a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="book">
          <div className="hero-bg" aria-hidden="true" />
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="eyebrow">Direct from the operator · Lahbab red dunes</p>
              <h1>Dubai Desert Safari with hotel pickup, BBQ dinner &amp; live shows, from <span className="hl">AED&nbsp;75</span></h1>
              <p className="sub">No resellers, no hidden upsells. Tell us your date and group size, and we&apos;ll send your exact price and pickup time on WhatsApp in minutes.</p>
              <ul className="ticks">
                <li>4x4 dune bashing, sandboarding &amp; camel ride</li>
                <li>Pickup from Dubai, Sharjah &amp; Ajman</li>
                <li>100% halal BBQ buffet, vegetarian options</li>
                <li>DTCM-certified drivers, insured roll-caged 4x4s</li>
              </ul>
            </div>
            <div className="hero-form">
              <LeadForm />
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="strip">
          <div className="wrap strip-in">
            <span><strong>Real Google reviews</strong> from guests worldwide</span>
            <span><strong>Morning, evening</strong> &amp; overnight</span>
            <span><strong>Private safaris</strong> for families</span>
            <span><strong>Fast WhatsApp</strong> confirmation</span>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="sec" id="packages">
          <div className="wrap">
            <h2>Pick your desert safari</h2>
            <p className="sec-sub">Transparent prices. What you see is what you pay.</p>
            <div className="pkgs">
              {PACKAGES.map((p) => (
                <article key={p.id} className="pkg">
                  {p.tag && <span className="pkg-tag">{p.tag}</span>}
                  <h3>{p.name}</h3>
                  <p className="pkg-time">{p.time}</p>
                  <p className="pkg-price"><small>from</small> AED {p.price} <small>/ {p.unit}</small></p>
                  <p className="pkg-blurb">{p.blurb}</p>
                  <ul>{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                  <PickPackage id={p.id} className="btn btn-primary btn-block">Check availability</PickPackage>
                </article>
              ))}
            </div>
            <p className="addons">Add-ons at camp: quad bike (from AED 150), dune buggy, long camel ride, sheesha, falcon photos.</p>
          </div>
        </section>

        {/* WHY */}
        <section className="sec sec-dark">
          <div className="wrap">
            <h2>Why travelers choose Maverick</h2>
            <div className="why">
              {WHY.map((w) => (
                <div key={w.title} className="why-i">
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="sec">
          <div className="wrap">
            <h2>Booked in 3 simple steps</h2>
            <ol className="how">
              <li><strong>Send your request</strong><span>Choose a safari, date and group size. It takes 30 seconds.</span></li>
              <li><strong>Get your price on WhatsApp</strong><span>We confirm availability, total price and pickup time.</span></li>
              <li><strong>Enjoy the dunes</strong><span>Your driver picks you up and drops you back after dinner and shows.</span></li>
            </ol>
            <div className="center"><PickPackage id="">Get my price now</PickPackage></div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery" aria-label="Photos from our safaris">
          {["g1", "g2", "g3", "g4", "g5", "g6"].map((g) => (
            <img key={g} src={`/img/${g}.webp`} alt="Maverick Safari guests in the Dubai desert" loading="lazy" width={480} height={640} />
          ))}
        </section>

        {/* REVIEWS */}
        <section className="sec">
          <div className="wrap">
            <h2>What our guests say</h2>
            <p className="sec-sub">Verified reviews from Google</p>
            <div className="reviews">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="review">
                  <div className="stars" aria-label="5 stars">★★★★★</div>
                  <blockquote>“{r.text}”</blockquote>
                  <figcaption>{r.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec sec-sand">
          <div className="wrap narrow">
            <h2>Questions, answered</h2>
            {FAQ.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final">
          <div className="wrap center">
            <h2>Sunset over the red dunes is waiting</h2>
            <p>Popular dates fill up fast in winter. Lock in your spot today.</p>
            <div className="final-btns">
              <PickPackage id="">Check availability</PickPackage>
              <a className="btn btn-wa" data-loc="final_cta" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener">Ask on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap">
          <p>© {new Date().getFullYear()} {SITE.brand} · Dubai, UAE · <a href={`${SITE.mainSite}/privacy-policy/`}>Privacy policy</a> · <a href={SITE.mainSite}>Main website</a></p>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="sticky">
        <PickPackage id="" className="btn btn-primary">Get price</PickPackage>
        <a className="btn btn-wa" data-loc="sticky" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </>
  );
}

import LeadForm from "@/components/LeadForm";
import PickPackage from "@/components/PickPackage";
import Icon from "@/components/Icon";
import StickyBar from "@/components/StickyBar";
import { CHOOSER, COMPARE, FAQ, GUEST_PHOTOS, JOURNEY, PACKAGES, REVIEWS, SITE, WHY, packageById } from "@/lib/site";
import { waLink } from "@/lib/tracking";
import { asset, IS_PREVIEW } from "@/lib/asset";

const HERO_SHADE = "linear-gradient(90deg, rgba(15,13,11,.88) 0%, rgba(15,13,11,.6) 45%, rgba(15,13,11,.25) 100%), linear-gradient(0deg, rgba(15,13,11,.55) 0%, rgba(15,13,11,0) 40%)";

const WA_TEXT = "Hi Maverick Safari! I'd like the price for a desert safari.";
const Stars = () => (
  <span className="stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={16} />)}
  </span>
);

export default function Home() {
  return (
    <>
      {IS_PREVIEW && <div className="preview-note">Preview version: form submissions are not sent to GHL here. The live site sends every lead.</div>}
      <div className="announce">
        <span>🌅 Winter season is here: sunset dates book up fast. <strong>Check availability free</strong> in 30 seconds.</span>
      </div>

      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" aria-label={SITE.brand}><img src={asset("/img/logo.png")} alt={SITE.brand} width={150} height={43} className="logo" /></a>
          <nav className="nav-links" aria-label="Sections">
            <a href="#packages">Packages</a>
            <a href="#experience">Experience</a>
            <a href="#reviews">Reviews</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="nav-cta">
            <a className="nav-wa" data-loc="header" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
              <Icon name="chat" /> <span>{SITE.whatsappDisplay}</span>
            </a>
            <PickPackage id="" className="btn btn-primary btn-sm">Check availability</PickPackage>
          </div>
        </div>
      </header>

      <main id="top">
        {/* 1. HERO — promise + form above the fold */}
        <section className="hero" id="book">
          <div className="hero-bg" aria-hidden="true" style={{ backgroundImage: `${HERO_SHADE}, url(${asset("/img/hero.jpg")})` }} />
          <div className="wrap hero-in">
            <div className="hero-copy">
              <div className="rating-chip"><Stars /> <span>Loved by guests on Google</span></div>
              <h1>Watch the sun set over Dubai&apos;s <span className="grad">red dunes</span></h1>
              <p className="sub">
                Dune bashing, camel ride, BBQ dinner &amp; live shows, booked <strong>direct with the operator</strong>. No middlemen, no hidden fees. From <strong>AED&nbsp;75</strong>.
              </p>
              <ul className="hero-points">
                <li><Icon name="check" /> Pickup from Dubai, Sharjah &amp; Ajman</li>
                <li><Icon name="check" /> Boutique camp, no 1,000-person crowds</li>
                <li><Icon name="check" /> Price &amp; pickup time on WhatsApp in minutes</li>
              </ul>
              <div className="hero-proof">
                <div className="avatars" aria-hidden="true">
                  {["family", "sunset-jump", "group", "sit"].map((g) => <img key={g} src={asset(`/img/${g}.webp`)} alt="" width={40} height={40} />)}
                </div>
                <span>Travelers from <strong>around the world</strong> book direct with Maverick</span>
              </div>
            </div>
            <div className="hero-form"><LeadForm /></div>
          </div>
        </section>

        {/* 2. TRUST BAR */}
        <section className="trustbar" aria-label="Why it's safe to book">
          <div className="wrap trust-in">
            <div><Icon name="shield" size={22} /><span><strong>DTCM-certified</strong> drivers</span></div>
            <div><Icon name="car" size={22} /><span><strong>Insured</strong> roll-caged 4x4s</span></div>
            <div><Icon name="leaf" size={22} /><span><strong>100% halal</strong> BBQ buffet</span></div>
            <div><Icon name="users" size={22} /><span><strong>Direct operator</strong>, not a reseller</span></div>
          </div>
        </section>

        {/* 3. PACKAGES */}
        <section className="sec" id="packages">
          <div className="wrap">
            <div className="sec-head">
              <p className="kicker">Packages &amp; prices</p>
              <h2>Choose your desert adventure</h2>
              <p>Transparent prices. What you see is what you pay.</p>
            </div>
            <div className="pkgs">
              {PACKAGES.map((p) => (
                <article key={p.id} className={`pkg ${p.id === "vip" ? "pkg-hot" : ""}`}>
                  <div className="pkg-img">
                    <img src={p.img} alt={p.name} loading="lazy" width={480} height={360} />
                    {p.tag && <span className="pkg-tag">{p.tag}</span>}
                  </div>
                  <div className="pkg-body">
                    <p className="pkg-time"><Icon name="clock" size={14} /> {p.time}</p>
                    <h3>{p.name}</h3>
                    <p className="pkg-blurb">{p.blurb}</p>
                    <ul>{p.includes.map((i) => <li key={i}><Icon name="check" size={16} /> {i}</li>)}</ul>
                    <div className="pkg-foot">
                      <p className="pkg-price"><small>from</small><span>AED {p.price}<small> / {p.unit}</small></span></p>
                      <PickPackage id={p.id} className="btn btn-primary btn-sm">Check dates</PickPackage>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="addons">Popular add-ons: quad bike (from AED 150) · dune buggy · long camel ride · falcon photo · sheesha</p>
          </div>
        </section>

        {/* 4. CHOOSER */}
        <section className="sec sec-tint">
          <div className="wrap">
            <div className="sec-head">
              <p className="kicker">Not sure which one?</p>
              <h2>Find your perfect safari in one tap</h2>
            </div>
            <div className="chooser">
              {CHOOSER.map((c) => {
                const p = packageById(c.pick)!;
                return (
                  <PickPackage key={c.who} id={c.pick} className="choose">
                    <span className="choose-who">{c.who}</span>
                    <span className="choose-pick">{p.name} <em>from AED {p.price}</em></span>
                    <span className="choose-why">{c.why}</span>
                    <span className="choose-go">Select <Icon name="arrow" size={14} /></span>
                  </PickPackage>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. EXPERIENCE TIMELINE */}
        <section className="sec" id="experience">
          <div className="wrap">
            <div className="sec-head">
              <p className="kicker">Your evening, step by step</p>
              <h2>6 hours you&apos;ll talk about for years</h2>
            </div>
            <ol className="journey">
              {JOURNEY.map((j, i) => (
                <li key={j.t}>
                  <img src={j.img} alt={j.t} loading="lazy" width={360} height={270} />
                  <div>
                    <span className="j-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{j.t}</h3>
                    <p>{j.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. WHY / COMPARISON */}
        <section className="sec sec-dark">
          <div className="wrap why-grid">
            <div>
              <p className="kicker kicker-l">The Maverick difference</p>
              <h2>Not another mega-camp</h2>
              <p className="lede">Most cheap safaris are resold by agents and end at crowded camps with surprise charges. We run our own trips, end to end.</p>
              <div className="cmp" role="table" aria-label="Maverick vs typical safari">
                <div className="cmp-row cmp-h" role="row"><span role="columnheader" /><span role="columnheader">Maverick</span><span role="columnheader">Typical safari</span></div>
                {COMPARE.map(([k, a, b]) => (
                  <div className="cmp-row" role="row" key={k}>
                    <span role="cell">{k}</span>
                    <span role="cell" className="yes"><Icon name="check" size={16} /> {a}</span>
                    <span role="cell" className="no">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="camp-mosaic" aria-label="Our camp">
              <img src={asset("/img/gate.webp")} alt="Camp entrance" loading="lazy" width={360} height={480} />
              <img src={asset("/img/vip.webp")} alt="VIP seating" loading="lazy" width={360} height={480} />
              <img src={asset("/img/buffet.webp")} alt="BBQ buffet" loading="lazy" width={360} height={480} />
              <img src={asset("/img/lounge.webp")} alt="Camp lounge" loading="lazy" width={360} height={480} />
            </div>
          </div>
          <div className="wrap why-list">
            {WHY.map((w) => (
              <div key={w.title}><h3>{w.title}</h3><p>{w.text}</p></div>
            ))}
          </div>
        </section>

        {/* 7. REVIEWS */}
        <section className="sec" id="reviews">
          <div className="wrap">
            <div className="sec-head">
              <p className="kicker">Real guests, real reviews</p>
              <h2>Loved by travelers from around the world</h2>
              <p className="g-line"><Stars /> Verified reviews from Google</p>
            </div>
            <div className="reviews">
              {REVIEWS.map((r) => (
                <figure key={r.name} className="review">
                  <Stars />
                  <blockquote>“{r.text}”</blockquote>
                  <figcaption><span className="av">{r.name[0]}</span>{r.name}<small>Google review</small></figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="guest-strip" aria-label="Guest photos">
            {[...GUEST_PHOTOS, ...GUEST_PHOTOS].map((g, i) => <img key={i} src={asset(`/img/${g}.webp`)} alt="Maverick guests in the desert" loading="lazy" width={220} height={290} />)}
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="sec sec-tint" id="faq">
          <div className="wrap narrow">
            <div className="sec-head">
              <p className="kicker">Good to know</p>
              <h2>Questions, answered</h2>
            </div>
            {FAQ.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 9. FINAL CTA with second form */}
        <section className="final">
          <div className="final-bg" aria-hidden="true" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,13,11,.92), rgba(15,13,11,.7)), url(${asset("/img/dune.webp")})` }} />
          <div className="wrap final-in">
            <div>
              <h2>Your sunset in the dunes starts here</h2>
              <p>Send your date and group size now. We&apos;ll reply on WhatsApp with your exact price and pickup time. Asking is free and you pay nothing now.</p>
              <ul className="hero-points">
                <li><Icon name="check" /> No payment to check availability</li>
                <li><Icon name="check" /> Real person replies, not a bot</li>
                <li><Icon name="check" /> Prefer chatting? <a data-loc="final_text" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener">WhatsApp us directly</a></li>
              </ul>
            </div>
            <LeadForm id="lead-form-2" title="Get your price in minutes" />
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <img src={asset("/img/logo.png")} alt={SITE.brand} width={140} height={40} className="foot-logo" />
          <div>
            <p><strong>{SITE.brand}</strong> · Desert safaris &amp; UAE tours · Dubai, United Arab Emirates</p>
            <p><Icon name="chat" size={14} /> WhatsApp: <a data-loc="footer" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener">{SITE.whatsappDisplay}</a> · <a href={`${SITE.mainSite}/contact/`}>Contact</a> · <a href={`${SITE.mainSite}/privacy-policy/`}>Privacy policy</a> · <a href={SITE.mainSite}>Main website</a></p>
            <p className="copy">© {new Date().getFullYear()} {SITE.brand}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <StickyBar>
        <a className="btn btn-wa" data-loc="sticky" href={waLink(WA_TEXT, SITE.whatsapp)} target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="chat" size={20} /></a>
        <PickPackage id="" className="btn btn-primary">Check availability &amp; price</PickPackage>
      </StickyBar>
    </>
  );
}

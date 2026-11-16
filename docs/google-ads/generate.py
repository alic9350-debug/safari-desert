import csv, json, os, sys
OUT = os.path.dirname(os.path.abspath(__file__))
BASE = "https://book.mavericksafariuae.com/"
CAMP_UAE = "Maverick | Search | UAE In-Destination"
CAMP_PRE = "Maverick | Search | Pre-Trip Source Markets"

# Shared brand / trust (H6-H9) and CTA (H10-H15) pools, combined per ad group
G = {
 "generic": dict(url=BASE, path=("Desert-Safari","Dubai"),
   kw=["desert safari dubai","dubai desert safari","desert safari in dubai","desert safari tour dubai","desert safari tours dubai",
       "book desert safari dubai","desert safari dubai booking","desert safari dubai packages","dune bashing dubai","red dune safari dubai"],
   h=["Desert Safari Dubai","Dubai Desert Safari Tours","Book Desert Safari in Dubai","Desert Safari Dubai Packages","Desert Safari From AED 75",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","DTCM-Certified 4x4 Drivers",
      "BBQ Dinner and Live Shows","Pickup Across Dubai","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Reserve Your Sunset Spot"],
   d=["Red dune bashing, camel ride, sandboarding, BBQ dinner and live shows. Book direct today.",
      "Direct desert safari operator in Dubai. No hidden fees. Get your exact price on WhatsApp.",
      "Evening, VIP, private, morning and overnight safaris. Pickup in Dubai, Sharjah and Ajman.",
      "Boutique camp, DTCM-certified drivers and 100% halal BBQ. Check availability in seconds."]),
 "evening": dict(url=BASE+"?pkg=evening-standard", path=("Evening-Safari","Dubai"),
   kw=["evening desert safari dubai","evening desert safari","desert safari with bbq dinner","desert safari dubai with dinner",
       "sunset desert safari dubai","evening desert safari dubai price"],
   h=["Evening Desert Safari Dubai","Evening Safari From AED 75","Desert Safari with BBQ Dinner","Sunset Desert Safari Dubai","Evening Dune Bashing Dubai",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","DTCM-Certified 4x4 Drivers",
      "Camel Ride and Live Shows","4x4 Pickup From Your Hotel","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Reserve Your Sunset Spot"],
   d=["Sunset over the red dunes, 30-40 min dune bashing, camel ride, BBQ dinner and live shows.",
      "Evening desert safari from AED 75 with 4x4 pickup. Direct operator, no hidden fees.",
      "100% halal BBQ buffet, Tanoura, belly dance and fire show at a boutique desert camp.",
      "Tell us your date and group size. We reply with your exact price on WhatsApp in minutes."]),
 "vip": dict(url=BASE+"?pkg=vip", path=("VIP-Safari","Dubai"),
   kw=["vip desert safari dubai","vip desert safari","luxury desert safari dubai","premium desert safari dubai","desert safari dubai vip package"],
   h=["VIP Desert Safari Dubai","VIP Desert Safari From AED 110","Luxury Desert Safari Dubai","Premium Desert Safari Dubai","VIP Seating and Table Service",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","DTCM-Certified 4x4 Drivers",
      "No Queues at the BBQ Buffet","Shared 4x4 Hotel Pickup","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Reserve Your VIP Seats"],
   d=["VIP seating with prime show views and table service, so no waiting in buffet lines.",
      "VIP desert safari from AED 110 with 4x4 pickup, dune bashing, camel ride and BBQ dinner.",
      "Book direct with the operator. No middlemen, no hidden fees, fast WhatsApp confirmation.",
      "Perfect for couples and special occasions. Check your date and get your price in minutes."]),
 "private": dict(url=BASE+"?pkg=private", path=("Private-Safari","Dubai"),
   kw=["private desert safari dubai","private desert safari","private land cruiser desert safari","family desert safari dubai",
       "private desert tour dubai","desert safari for family dubai"],
   h=["Private Desert Safari Dubai","Private Land Cruiser Safari","Family Desert Safari Dubai","Private Safari From AED 500","Up to 6 Guests per Vehicle",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","DTCM-Certified 4x4 Drivers",
      "Soft-Drive Option for Kids","Flexible Door-to-Door Pickup","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Reserve Your Private 4x4"],
   d=["Your own Land Cruiser for up to 6 guests with flexible pickup and a soft-drive option.",
      "Private desert safari from AED 500 per vehicle with camel ride, BBQ dinner and live shows.",
      "Ideal for families, couples and elderly guests. Extreme dune bashing or a gentle ride.",
      "Book direct with the operator. No hidden fees. Get your price on WhatsApp in minutes."]),
 "morning": dict(url=BASE+"?pkg=morning", path=("Morning-Safari","Dubai"),
   kw=["morning desert safari dubai","morning desert safari","morning dune bashing dubai","morning safari dubai","dune bashing dubai morning"],
   h=["Morning Desert Safari Dubai","Morning Dune Bashing Dubai","Morning Safari From AED 160","Red Dune Bashing in Dubai","Sandboarding and Camel Ride",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","DTCM-Certified 4x4 Drivers",
      "Back at Your Hotel by Lunch","Morning 4x4 Hotel Pickup","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Reserve Your Morning Slot"],
   d=["40-45 min of extreme Lahbab red dune bashing, sandboarding and camel ride. Beat the heat.",
      "Morning desert safari from AED 160 with 4x4 pickup. Back at your hotel by lunchtime.",
      "Book direct with the operator. DTCM-certified drivers, insured roll-caged 4x4 vehicles.",
      "Short on time? Tell us your date and get your exact price on WhatsApp in minutes."]),
 "overnight": dict(url=BASE+"?pkg=overnight", path=("Overnight","Dubai"),
   kw=["overnight desert safari dubai","overnight desert safari","desert camping dubai","overnight camping dubai desert",
       "desert safari with overnight stay","desert camp dubai overnight"],
   h=["Overnight Desert Safari Dubai","Desert Camping in Dubai","Overnight Safari From AED 185","Sleep Under the Desert Stars","Desert Camp with Breakfast",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","DTCM-Certified 4x4 Drivers",
      "Tent, Bedding and Pillows","BBQ Dinner and Live Shows","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Reserve Your Desert Tent"],
   d=["Full evening safari, then a night under the stars and a desert sunrise with breakfast.",
      "Overnight desert safari from AED 185 with 4x4 pickup, BBQ dinner, tent and bedding.",
      "Dune bashing, camel ride, sandboarding and live shows. Book direct with the operator.",
      "No hidden fees. Tell us your date and get your exact price on WhatsApp in minutes."]),
 "budget": dict(url=BASE+"?pkg=basic-bus", path=("Desert-Safari","Price"),
   kw=["cheap desert safari dubai","desert safari dubai price","desert safari dubai cost","desert safari dubai offers",
       "desert safari dubai deals","budget desert safari dubai","desert safari dubai price per person"],
   h=["Desert Safari Dubai Price","Desert Safari From AED 55","Budget Desert Safari Dubai","Desert Safari Dubai Deals","Cheap Desert Safari Dubai",
      "Maverick Safari UAE","Direct Operator, No Middlemen","No Hidden Fees or Upsells","Transparent Prices Online",
      "BBQ Dinner and Live Shows","Bus Pickup From Central Dubai","Check Availability Today","Get Your Price in Minutes","Book Now on WhatsApp","Compare All Safari Prices"],
   d=["Budget bus desert safari from AED 55 with dune bashing, camel ride, BBQ and live shows.",
      "Direct operator prices with no hidden fees. Water, henna and seating are all included.",
      "Evening AED 75, VIP AED 110, private AED 500 per vehicle. Compare packages and book.",
      "Tell us your date and group size. Get your exact price on WhatsApp in minutes."]),
}
# Pre-trip campaign reuses these ad groups (planning-stage travelers abroad)
PRE_GROUPS = ["generic","private","overnight","vip"]

NEG = ["job","jobs","vacancy","vacancies","salary","career","careers","hiring","recruitment","driver job","license","licence",
 "free","wiki","wikipedia","map","weather","temperature","history","safari park","dubai safari park","zoo","animals",
 "video","youtube","photos","pictures","wallpaper","png","game","rental","rent","for rent","buggy rental","quad bike rental",
 "kenya","tanzania","africa","qatar","doha","oman","muscat","riyadh","jeddah","saudi","las vegas","arizona","morocco","egypt",
 "course","training","blog","reddit","tripadvisor forum","resort","restaurant","drawing","clipart","meaning",
 "dubai frame","burj khalifa","aquarium","miracle garden","global village","abu dhabi","al ain","liwa","fujairah"]

CALLOUTS = ["Direct Safari Operator","No Hidden Fees","Pickup Across Dubai","100% Halal BBQ Dinner","DTCM-Certified Drivers",
 "Reply in Minutes","Private Tours Available","Live Shows Included","Boutique Desert Camp","Insured 4x4 Vehicles"]
SITELINKS = [
 ("Evening Desert Safari","From AED 75 per person","BBQ dinner and live shows","?pkg=evening-standard"),
 ("VIP Desert Safari","VIP seating, table service","From AED 110 per person","?pkg=vip"),
 ("Private Land Cruiser","Up to 6 guests per vehicle","Soft-drive option for families","?pkg=private"),
 ("Morning Desert Safari","40-45 min red dune bashing","Back at your hotel by lunch","?pkg=morning"),
 ("Overnight Desert Camping","Tent, dinner and breakfast","From AED 185 per person","?pkg=overnight"),
 ("Budget Bus Safari","From AED 55 per person","Full evening camp program","?pkg=basic-bus"),
]
SNIPPETS = {"Types":["Evening Safari","VIP Safari","Private Safari","Morning Safari","Overnight Safari","Budget Bus Safari"],
            "Amenities":["BBQ Dinner","Camel Ride","Sandboarding","Henna Painting","Live Shows","Arabic Coffee"]}
PRICES = [("Evening Desert Safari","Per person, BBQ and shows",75,"?pkg=evening-standard"),
          ("VIP Desert Safari","Per person, table service",110,"?pkg=vip"),
          ("Private Land Cruiser","Per vehicle, up to 6",500,"?pkg=private"),
          ("Morning Desert Safari","Per person, dune bashing",160,"?pkg=morning"),
          ("Overnight Desert Safari","Per person, tent, meals",185,"?pkg=overnight"),
          ("Budget Bus Safari","Per person, full program",55,"?pkg=basic-bus")]

# ---------- validation ----------
errs=[]
def chk(label,s,n):
    if len(s)>n: errs.append(f"{label} too long ({len(s)}>{n}): {s}")
    if label.startswith("H") and "!" in s: errs.append(f"{label} has '!': {s}")
for k,g in G.items():
    assert len(g["h"])==15 and len(set(x.lower() for x in g["h"]))==15, k
    assert len(g["d"])==4, k
    for i,h in enumerate(g["h"],1): chk(f"H{i} {k}",h,30)
    for i,d in enumerate(g["d"],1): chk(f"D{i} {k}",d,90)
    for p in g["path"]: chk(f"path {k}",p,15)
    # first 5 headlines must contain the group's core keyword theme
for c in CALLOUTS: chk("callout",c,25)
for t,d1,d2,_ in SITELINKS: chk("sitelink",t,25); chk("sl d1",d1,35); chk("sl d2",d2,35)
for h,vals in SNIPPETS.items():
    for v in vals: chk("snippet",v,25)
for h,d,_,_ in PRICES: chk("price h",h,25); chk("price d",d,25)
if errs: print("\n".join(errs)); sys.exit(1)

# ---------- Google Ads Editor CSVs ----------
def camp_groups():
    for k in G: yield CAMP_UAE,k
    for k in PRE_GROUPS: yield CAMP_PRE,k
AGNAME={"generic":"Desert Safari Dubai – Generic","evening":"Evening Desert Safari","vip":"VIP Desert Safari","private":"Private Desert Safari",
        "morning":"Morning Desert Safari","overnight":"Overnight Desert Safari","budget":"Desert Safari Price – Budget"}
with open(f"{OUT}/editor-keywords.csv","w",newline="") as f:
    w=csv.writer(f); w.writerow(["Campaign","Ad group","Keyword","Criterion Type"])
    for c,k in camp_groups():
        for kw in G[k]["kw"]:
            w.writerow([c,AGNAME[k],kw,"Exact"]); w.writerow([c,AGNAME[k],kw,"Phrase"])
with open(f"{OUT}/editor-ads.csv","w",newline="") as f:
    w=csv.writer(f)
    hdr=["Campaign","Ad group","Ad type","Final URL","Path 1","Path 2"]
    for i in range(1,16): hdr+= [f"Headline {i}",f"Headline {i} position"]
    for i in range(1,5): hdr+= [f"Description {i}",f"Description {i} position"]
    w.writerow(hdr)
    for c,k in camp_groups():
        g=G[k]
        for variant in ("pinned","unpinned"):
            row=[c,AGNAME[k],"Responsive search ad",g["url"],g["path"][0],g["path"][1]]
            for i,h in enumerate(g["h"],1):
                pos = "1" if (variant=="pinned" and i<=3) else ""
                row+=[h,pos]
            ds = g["d"] if variant=="pinned" else g["d"][2:]+g["d"][:2]
            for d in ds: row+=[d,""]
            w.writerow(row)
with open(f"{OUT}/editor-negatives.csv","w",newline="") as f:
    w=csv.writer(f); w.writerow(["Campaign","Keyword","Criterion Type"])
    for c in (CAMP_UAE,CAMP_PRE):
        for n in NEG: w.writerow([c,n,"Campaign negative phrase"])
json.dump(dict(G=G,NEG=NEG,CALLOUTS=CALLOUTS,SITELINKS=SITELINKS,SNIPPETS=SNIPPETS,PRICES=PRICES,AGNAME=AGNAME,PRE=PRE_GROUPS,CAMP_UAE=CAMP_UAE,CAMP_PRE=CAMP_PRE),open(os.path.join(OUT,"ads.json"),"w"))
print("OK: all assets within Google limits.",
      sum(len(G[k]['kw']) for k in G),"UAE keywords x2 match types;",len(NEG),"negatives;",len(G),"UAE ad groups +",len(PRE_GROUPS),"pre-trip ad groups")

// Central content model consumed by tools/generate.mjs.
// Business values here MUST match assets/js/business-data.js.
// gtmId / formEndpoint are intentionally empty until real values are
// provided — generate.mjs guards all rendering so an empty value never
// shows up on the page (see gtmHead/gtmBody and the lead-form fallback).
export const biz = {
  brandName: "VeresVill 0–24",
  domain: "www.veresvill0-24.hu",
  phoneDisplay: "+36 70 728 3434",
  phoneTel: "+36707283434",
  email: "veresvill24@gmail.com",
  primaryCity: "Budapest",
  serviceArea: "Pest vármegye",
  gtmId: "",
  formEndpoint: "",
};

export const nav = [
  { label: "Főoldal", href: "/", slug: "home" },
  { label: "Szolgáltatások", href: "/#szolgaltatasok", slug: "services" },
  { label: "Hibaelhárítás", href: "/hibaelharitas/", slug: "hibaelharitas" },
  { label: "Rólunk", href: "/rolunk/", slug: "rolunk" },
  { label: "Miért mi", href: "/#referenciak", slug: "referenciak" },
  { label: "Kapcsolat", href: "/kapcsolat/", slug: "kapcsolat" },
];

export const services = [
  {
    slug: "villanyszereles",
    icon: "home",
    stripLine1: "LAKOSSÁGI",
    stripLine2: "VILLANYSZERELÉS",
    navLabel: "Villanyszerelés",
    metaTitle: `Villanyszerelés ${biz.primaryCity} és ${biz.serviceArea} | ${biz.brandName}`,
    metaDescription: `Lakossági villanyszerelés ${biz.primaryCity} és ${biz.serviceArea} területén: új bekötés, felújítás, bővítés. Hívjon telefonos egyeztetésért.`,
    eyebrow: `VILLANYSZERELÉS ${biz.primaryCity}EN ÉS PEST VÁRMEGYÉBEN`,
    h1: `Villanyszerelés ${biz.primaryCity}en és Pest vármegyében`,
    intro: `Teljes körű lakossági villanyszerelést vállalunk ${biz.primaryCity}en és ${biz.serviceArea} térségében — új bekötéstől a felújításon át a bővítésig. Az első lépés egy rövid telefonos egyeztetés, ahol átbeszéljük, mire van szüksége.`,
    problemsHeading: "Milyen esetben keressen minket?",
    problems: [
      "Teljes lakásfelújítás elektromos hálózatának kiépítése",
      "Új vezetékezés falban, burkolat vagy festés előtt",
      "Régi, elavult vezetékek cseréje",
      "Elosztó bővítése új fogyasztók (pl. klíma, indukciós tűzhely) miatt",
      "Ingatlan-tanúsítványhoz vagy adásvételhez szükséges javítások",
    ],
    faqs: [
      { q: "Milyen munkákat vállalnak lakossági villanyszerelés keretében?", a: "Új bekötést, teljes felújítást, bővítést és részleges javításokat egyaránt vállalunk — a pontos tartalmat a helyszíni felmérés után, írásos árajánlatban rögzítjük." },
      { q: "Kérhetek helyszíni felmérést előre?", a: "Igen, a telefonos egyeztetés után egyeztetett időpontban helyszíni felmérést tartunk, ez alapján készül az árajánlat." },
      { q: "Vállalnak új építésű ingatlanhoz bekötést?", a: "Igen, új építésű ingatlanok teljes elektromos kiépítését is vállaljuk, a tervezéstől a kivitelezésig." },
      { q: "Mennyi idő alatt készül el egy teljes lakás bekötése?", a: "Ez a lakás méretétől és a munka jellegétől függ — pontos időtartamot a helyszíni felmérés után tudunk mondani." },
    ],
    relatedSlugs: ["hibaelharitas", "biztositektabla", "konnektor-kapcsolo"],
  },
  {
    slug: "hibaelharitas",
    icon: "warningTriangle",
    stripLine1: "HIBAELHÁRÍTÁS",
    stripLine2: "ÉS JAVÍTÁS",
    navLabel: "Hibaelhárítás",
    metaTitle: `Villany hibaelhárítás ${biz.primaryCity} | ${biz.brandName}`,
    metaDescription: `Villanyszerelési hiba ${biz.primaryCity}en? Gyors diagnosztika és javítás zárlat, áramkimaradás vagy vibráló világítás esetén. Hívjon minket.`,
    eyebrow: `VILLANY HIBAELHÁRÍTÁS ${biz.primaryCity}EN ÉS PEST VÁRMEGYÉBEN`,
    h1: `Villany hibaelhárítás ${biz.primaryCity}en és Pest vármegyében`,
    intro: `Elektromos hiba esetén a gyors és pontos diagnosztika a legfontosabb. Ezen az oldalon a hibaelhárítási és javítási szolgáltatásunkról olvashat — hívjon minket, ha áramkimaradást, zárlatgyanút vagy szokatlan jelenséget tapasztal.`,
    problemsHeading: "Mikor van szükség hibaelhárításra?",
    problems: [
      "Nincs áram egy helyiségben vagy egy áramkörön",
      "Folyamatosan kicsapódik a kismegszakító vagy az életvédelmi relé",
      "Zárlatgyanú, égett szag a kapcsolószekrényben",
      "Vibráló vagy pislákoló világítás",
      "Áramütés-veszélyes érintés egy fém felületen vagy készüléken",
    ],
    faqs: [
      { q: "Mennyi idő alatt tudnak kijönni hibaelhárításra?", a: "A pontos időpont a naptári leterheltségtől és a hiba jellegétől függ — ezt telefonos egyeztetéskor tudjuk megmondani." },
      { q: "Mit mondjak el telefonon a hiba bejelentésekor?", a: "Érdemes elmondani, mikor és hogyan jelentkezett a hiba, mely helyiséget/áramkört érinti, és tapasztalt-e szagot, hangot vagy füstöt." },
      { q: "Mi történik, ha a hiba a mérőóra előtt van?", a: "Ez esetben a hálózati engedélyes (szolgáltató) illetékes — jelezzük, ha a helyszíni diagnosztika ezt állapítja meg." },
      { q: "Mennyibe kerül a hibakeresés?", a: "A díjazás a hiba jellegétől és a szükséges munkaidőtől függ, erről helyszíni felmérés vagy telefonos egyeztetés után adunk tájékoztatást." },
    ],
    relatedSlugs: ["biztositektabla", "villanyszereles", "konnektor-kapcsolo"],
  },
  {
    slug: "biztositektabla",
    icon: "shieldCheck",
    stripLine1: "BIZTOSÍTÉKTÁBLA",
    stripLine2: "SZERELÉS",
    navLabel: "Biztosítéktábla",
    metaTitle: `Biztosítéktábla csere ${biz.primaryCity} | ${biz.brandName}`,
    metaDescription: `Elavult biztosítéktábla cseréje, korszerűsítése ${biz.primaryCity}en. Életvédelmi relé beépítése, mérés, jegyzőkönyv. Kérjen árajánlatot.`,
    eyebrow: `BIZTOSÍTÉKTÁBLA SZERELÉS ÉS CSERE ${biz.primaryCity}EN ÉS PEST VÁRMEGYÉBEN`,
    h1: `Biztosítéktábla szerelés és csere ${biz.primaryCity}en és Pest vármegyében`,
    intro: `Egy elavult, kerámiabiztosítékos elosztótábla nemcsak kényelmetlen, hanem biztonsági kockázatot is jelenthet. Vállaljuk a biztosítéktábla cseréjét, korszerűsítését és az életvédelmi (FI-) relé beépítését.`,
    problemsHeading: "Mikor érdemes cserélni?",
    problems: [
      "Elavult, kerámiabiztosítékos elosztótábla",
      "Nincs életvédelmi (FI-) relé beépítve",
      "Túlterhelt, alulméretezett elosztó új fogyasztók miatt",
      "Biztosítéktábla-csere teljes felújítás részeként",
      "Ingatlan-tanúsítványhoz vagy adásvételhez szükséges megfelelőség",
    ],
    faqs: [
      { q: "Miért fontos az életvédelmi (FI-) relé?", a: "Az életvédelmi relé áramütés esetén tizedmásodperceken belül lekapcsolja az áramkört, jelentősen csökkentve a veszélyt." },
      { q: "Mennyi ideig tart a biztosítéktábla cseréje?", a: "Ez a tábla méretétől és a bekötés összetettségétől függ — helyszíni felmérés után tudunk pontos időtartamot mondani." },
      { q: "Kikapcsol-e az áram a csere alatt az egész lakásban?", a: "Igen, a csere idejére a biztonságos munkavégzéshez szükséges az áramtalanítás, ennek időtartamáról előre tájékoztatjuk." },
      { q: "Szükséges-e engedély a cseréhez?", a: "Lakossági biztosítéktábla-cseréhez jellemzően nincs szükség külön hatósági engedélyre, de erről egyedi esetben tájékoztatást adunk." },
    ],
    relatedSlugs: ["hibaelharitas", "villanyszereles", "elektromos-auto-tolto"],
  },
  {
    slug: "konnektor-kapcsolo",
    icon: "plug",
    stripLine1: "KONNEKTOROK",
    stripLine2: "ÉS KAPCSOLÓK",
    navLabel: "Konnektor és kapcsoló",
    metaTitle: `Konnektor és kapcsoló szerelés ${biz.primaryCity} | ${biz.brandName}`,
    metaDescription: `Konnektor, kapcsoló szerelés, csere és bővítés ${biz.primaryCity}en. Okos kapcsolók, USB-s aljzatok telepítése. Kérjen ajánlatot.`,
    eyebrow: `KONNEKTOR ÉS KAPCSOLÓ SZERELÉS ${biz.primaryCity}EN ÉS PEST VÁRMEGYÉBEN`,
    h1: `Konnektor és kapcsoló szerelés`,
    intro: `Kevés a konnektor, elkopott a kapcsoló, vagy okosotthon-eszközt szeretne beépíteni? Vállaljuk a konnektorok és kapcsolók cseréjét, bővítését és áthelyezését is.`,
    problemsHeading: "Milyen esetben keressen minket?",
    problems: [
      "Hiányzó vagy kevés konnektor egy helyiségben",
      "Régi, kopott, laza kapcsolók cseréje",
      "Új konnektor kihelyezése bútor mögé vagy konyhapultra",
      "USB-s vagy okos kapcsoló/konnektor beépítése",
      "Szikrázó, meghibásodott aljzat cseréje",
    ],
    faqs: [
      { q: "Áthelyezhető egy meglévő konnektor máshova?", a: "Igen, ez a fal szerkezetétől és a vezetékezés útvonalától függően megoldható — helyszíni felmérés után tudunk pontosat mondani." },
      { q: "Vállalnak okos kapcsoló/konnektor telepítést?", a: "Igen, okosotthon-eszközök bekötését és beüzemelését is vállaljuk." },
      { q: "Szikrázik a konnektorom, ez veszélyes?", a: "Igen, a szikrázó vagy melegedő aljzat tűz- és áramütésveszélyt jelenthet — javasoljuk mielőbb ellenőriztetni." },
      { q: "Mennyibe kerül egy kapcsoló cseréje?", a: "A díjazás az anyagköltségtől és a munka jellegétől függ, erről telefonos egyeztetés vagy helyszíni felmérés után adunk tájékoztatást." },
    ],
    relatedSlugs: ["vilagitas", "villanyszereles", "hibaelharitas"],
  },
  {
    slug: "vilagitas",
    icon: "bulb",
    stripLine1: "VILÁGÍTÁS",
    stripLine2: "SZERELÉS",
    navLabel: "Világítás",
    metaTitle: `Világítás szerelés ${biz.primaryCity} | ${biz.brandName}`,
    metaDescription: `Lámpatest, csillár és spotlámpa felszerelés ${biz.primaryCity}en. Kültéri és beltéri világítás szerelése, LED korszerűsítés.`,
    eyebrow: `VILÁGÍTÁS ÉS LÁMPA SZERELÉS ${biz.primaryCity}EN ÉS PEST VÁRMEGYÉBEN`,
    h1: `Világítás és lámpa szerelés`,
    intro: `Lámpatest cseréjétől a teljes spotlámpás álmennyezet kialakításáig vállaljuk a világítási rendszerek szerelését és bekötését, beltéren és kültéren egyaránt.`,
    problemsHeading: "Milyen esetben keressen minket?",
    problems: [
      "Lámpatest vagy csillár felszerelése, bekötése",
      "Beépített spotlámpás álmennyezet kialakítása",
      "Kültéri világítás szerelése (bejárat, terasz, kert)",
      "Mozgásérzékelős lámpa telepítése",
      "Régi világítás LED-es korszerűsítése",
    ],
    faqs: [
      { q: "Hozhatok saját lámpatestet?", a: "Igen, a saját lámpatest felszerelését és bekötését is vállaljuk." },
      { q: "Vállalnak spotlámpás álmennyezet kialakítást?", a: "Igen, a kapcsolási pontok kialakításától a lámpatestek beszereléséig teljes körűen vállaljuk." },
      { q: "Kültéri lámpa szerelése mennyibe kerül?", a: "A pontos ár a lámpatest típusától és a szerelés összetettségétől függ, erről egyedi ajánlatot adunk." },
      { q: "Mozgásérzékelős világítást is szerelnek?", a: "Igen, mozgásérzékelős és szürkületkapcsolós világítást is telepítünk." },
    ],
    relatedSlugs: ["konnektor-kapcsolo", "villanyszereles", "elektromos-auto-tolto"],
  },
  {
    slug: "elektromos-auto-tolto",
    icon: "car",
    stripLine1: "ELEKTROMOS TÖLTŐK",
    stripLine2: "TELEPÍTÉSE",
    navLabel: "Autótöltő telepítés",
    metaTitle: `Elektromos autó töltő telepítés ${biz.primaryCity} | ${biz.brandName}`,
    metaDescription: `Otthoni wallbox és elektromos autó töltő telepítése ${biz.primaryCity}en, családi házhoz és társasházhoz is. Kérjen felmérést.`,
    eyebrow: `ELEKTROMOS AUTÓ TÖLTŐ TELEPÍTÉS ${biz.primaryCity}EN ÉS PEST VÁRMEGYÉBEN`,
    h1: `Elektromos autó töltő telepítés`,
    intro: `Otthoni wallbox telepítését vállaljuk családi házhoz és társasházi parkolóhelyhez egyaránt — a hálózati kapacitás felmérésétől a beüzemelésig.`,
    problemsHeading: "Milyen esetben keressen minket?",
    problems: [
      "Otthoni wallbox telepítése családi házhoz",
      "Társasházi/parkolóhelyi töltő kiépítése",
      "Meglévő elosztó alkalmassá tétele töltő fogadására",
      "Megfelelő kábelezés és túláramvédelem kialakítása",
      "Okos, mérős vagy hozzáférés-kezelős töltő bekötése",
    ],
    faqs: [
      { q: "Milyen wallboxot érdemes választani?", a: "Ez az autó típusától, a tervezett töltési teljesítménytől és az igényektől függ — a helyszíni felmérés után adunk javaslatot." },
      { q: "Elég erős hozzá a jelenlegi mérőórám?", a: "Ezt a helyszíni felmérés során ellenőrizzük, szükség esetén jelezzük, ha a hálózati kapacitás bővítése szükséges." },
      { q: "Társasházban is vállalják a telepítést?", a: "Igen, társasházi parkolóhelyre történő telepítést is vállalunk, a közös képviselővel/társasházzal egyeztetve." },
      { q: "Kell hozzá külön engedély?", a: "A pontos engedélyeztetési kötelezettség a hálózati csatlakozás jellegétől függ, erről tájékoztatást adunk a felmérés során." },
    ],
    relatedSlugs: ["biztositektabla", "villanyszereles", "konnektor-kapcsolo"],
  },
];

// Benefit-led, not numeric claims — we don't have verified figures (years
// in business, review counts, response times) to stand behind yet.
export const stats = [
  { icon: "shieldCheck", number: "Megbízhatóság", label: "Korrekt, átlátható munkavégzés" },
  { icon: "calendar", number: "Tapasztalat", label: "Szakértelem minden munkánál" },
  { icon: "users", number: "Ügyfélközpontú", label: "Munkavégzés az Ön igényei szerint" },
  { icon: "clock", number: "Gyors egyeztetés", label: "Rövid határidőn belüli időpontfoglalás" },
];

// SAMPLE CONTENT — trust-benefit cards, not real customer testimonials.
// Do not swap in invented customer names/quotes/star ratings; replace with
// real, permission-cleared reviews when available.
export const testimonials = [
  { heading: "Gyors kapcsolat", text: "Könnyen elérhető telefonon, az egyeztetés egyszerű és gyors." },
  { heading: "Korrekt tájékoztatás", text: "A munka megkezdése előtt érthetően egyeztetjük a feladatot." },
  { heading: "Precíz munkavégzés", text: "A cél a rendezett, biztonságos és szakszerű kivitelezés." },
];

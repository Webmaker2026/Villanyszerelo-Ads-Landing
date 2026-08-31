// Central content model consumed by tools/generate.mjs.
// Business values here MUST match assets/js/business-data.js.
// gtmId / formEndpoint are intentionally empty until real values are
// provided — generate.mjs guards all rendering so an empty value never
// shows up on the page (see gtmHead/gtmBody and the lead-form fallback).
export const biz = {
  brandName: "VeresVill 0–24",
  domain: "villanyszerelo-ads-landing.vercel.app",
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
  { label: "Árak", href: "/arak/", slug: "arak" },
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
    relatedSlugs: ["biztositektabla", "sos-villanyszerelo", "villanyszereles"],
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
    relatedSlugs: ["hibaelharitas", "villanyszereles", "sos-villanyszerelo"],
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
    relatedSlugs: ["konnektor-kapcsolo", "villanyszereles", "hibaelharitas"],
  },
  {
    slug: "sos-villanyszerelo",
    icon: "alertCircle",
    primary: true,
    stripLine1: "SOS",
    stripLine2: "VILLANYSZERELÉS",
    navLabel: "SOS villanyszerelés",
    metaTitle: `SOS villanyszerelő ${biz.primaryCity} | ${biz.brandName}`,
    metaDescription: `SOS villanyszerelő ${biz.primaryCity}en és ${biz.serviceArea} területén: sürgős hibaelhárítás, zárlat, áramkimaradás, FI-relé leoldás. Hívja most: ${biz.phoneDisplay}.`,
    eyebrow: `SOS VILLANYSZERELÉS • ${biz.primaryCity.toUpperCase()} ÉS PEST VÁRMEGYE`,
    h1Lines: ["Sürgős elektromos hiba?", "Hívjon most."],
    h1: `SOS villanyszerelő ${biz.primaryCity}en és Pest vármegyében`,
    intro: `SOS villanyszerelő ${biz.primaryCity}en és Pest vármegyében: sürgős elektromos hibák — zárlatgyanú, áramkimaradás, folyamatosan lecsapó kismegszakító vagy leoldó FI-relé — esetén telefonon jelezze a problémát, és röviden egyeztetünk a kiszállásról.`,
    problemsHeading: "Mikor érdemes SOS villanyszerelőt hívni?",
    problems: [
      "Elment az áram az ingatlanban",
      "Folyamatosan lecsap a kismegszakító",
      "Leold a FI-relé (életvédelmi relé)",
      "Zárlat gyanúja",
      "Szikrázik egy konnektor vagy kapcsoló",
      "Égett szag tapasztalható",
      "Melegszik egy elektromos szerelvény",
      "Részleges áramkimaradás egy helyiségben vagy áramkörön",
      "Sürgős elektromos hibakeresés szükséges",
    ],
    safetyNote: "Tűz, füst, aktív szikrázás vagy közvetlen veszély esetén elsődleges a biztonság: hagyja el a veszélyes területet, és szükség esetén hívja a 112-es segélyhívót. Ne nyúljon élő elektromos berendezéshez, és feszültség alatt lévő rendszeren ne végezzen önálló hibakeresést.",
    faqs: [
      { q: "Mennyi idő alatt érnek ki egy sürgős hiba esetén?", a: "A kiérkezési idő a napszaktól, a leterheltségtől és a helyszín távolságától függ — telefonos egyeztetéskor tájékoztatjuk a várható időpontról." },
      { q: "Mit tegyek, amíg a szerelőre várok?", a: "Kerülje az érintett áramkör vagy készülék használatát, és ne nyúljon élő elektromos berendezéshez. Ha biztonságosan elérhető, kapcsolja le az érintett kismegszakítót — füst, égett szag vagy szikrázás esetén inkább hagyja el a helyiséget." },
      { q: "Mennyibe kerül a kiszállás éjszaka vagy hétvégén?", a: "Hétköznap 06:00–18:00 között a kiszállás ingyenes, ezen kívül, valamint hétvégén és ünnepnapokon 10 000 Ft. A pontos díjakat lásd az árlistában." },
      { q: "Ha nem életveszélyes vagy sürgős a probléma, mit tegyek?", a: "Ebben az esetben is hívhat minket, vagy tekintse meg a hibaelhárítási szolgáltatásunkat és kérjen normál ajánlatot." },
    ],
    relatedSlugs: ["hibaelharitas", "biztositektabla", "villanyszereles"],
  },
  {
    slug: "elektromos-auto-tolto",
    icon: "car",
    primary: false,
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

// SAMPLE CONTENT — illustrative testimonial snippets, not real customer
// quotes. Replace with real, permission-cleared reviews when available.
export const testimonials = [
  { heading: "Gyors hibakeresés", text: "Este ment el nálunk az áram, még aznap kijöttek, és elég gyorsan megtalálták a hibát." },
  { heading: "Konnektorcsere", text: "Az egyik konyhai konnektor szikrázott, gyorsan kicserélték, azóta semmi probléma." },
  { heading: "Biztosítéktábla csere", text: "A régi biztosítéktábla folyton kiment, most modernebb megoldást kaptunk, azóta nyugalom van." },
  { heading: "Sürgős hiba hétvégén", text: "Hétvégén hívtam egy sürgős hiba miatt, és tényleg gyorsan reagáltak, nem kellett napokat várni." },
  { heading: "Lámpák bekötése", text: "Új lámpákat szereltettek fel nálunk, rendes, tiszta munkát végeztek, semmi maradék turkálás nem volt." },
  { heading: "Összességében elégedettek vagyunk", text: "Korrekt árazás, pontos időpont, a munka is rendben lezajlott, csak ajánlani tudom." },
];

// Business prices — net (nettó) amounts as supplied by the business.
// Used by both /arak/ (full list) and the SOS price preview.
export const pricing = {
  minFee: {
    label: "Minimum munkadíj",
    value: "25 000 Ft",
    desc: "Lámpák, kapcsolók és konnektorok esetén 1 db megrendelésekor.",
  },
  groups: [
    {
      id: "kiszallas",
      heading: "Kiszállás",
      rows: [
        { service: "Kiszállás díja (sürgősségi esetén is)", price: "Ingyenes", note: "Hétköznap 06:00–18:00 között (napközben)." },
        { service: "Kiszállás díja (sürgősségi esetén is)", price: "10 000 Ft", note: "Hétköznap 18:00–06:00, hétvégén és ünnepnapokon." },
      ],
    },
    {
      id: "sos",
      heading: "SOS hibakeresés",
      rows: [
        { service: "Munkadíj", price: "10 000 Ft / óra", note: "Hétfő–péntek 08:00–20:00 között." },
        { service: "Munkadíj (emelt díjas idősáv)", price: "15 000 Ft / óra", note: "Hétfő–péntek 20:00 után, hétvégén és ünnepnapokon." },
      ],
      showSosCta: true,
    },
    {
      id: "szerelvenyek",
      heading: "Lámpák, szerelvények, bekötések",
      rows: [
        { service: "Lámpák szerelése", price: "6 500 Ft-tól", note: "Meglévő kiállásra, átlagos belmagasság mellett." },
        { service: "Kapcsolók, konnektorok cseréje / szerelése", price: "4 500 Ft-tól", note: "Meglévő dobozba, normál beltéri szerelvényekre." },
        { service: "Kerámia / indukciós főzőlap / tűzhely bekötés", price: "25 000 Ft", note: "Garanciával, előkészített kiállásra, próbaüzemmel." },
        { service: "Sütő, bojler, klíma bekötés", price: "20 000 Ft", note: "Garanciával, teljesítmény és keresztmetszet ellenőrzéssel." },
        { service: "Lakáselosztó szerelés / korszerűsítés / FI-relé kiépítése", price: "Egyeztetés alapján", note: "Pontos ár a meglévő rendszer állapotától és igényektől függ." },
      ],
      showMinFee: true,
    },
    {
      id: "lakaseloszto",
      heading: "Lakáselosztó és egyéb díjak",
      rows: [
        { service: "Lakáselosztó szerelés / csere (4 kismegszakítóig)", price: "45 000 Ft", note: "Új elosztó szekrény szerelése, 4 darab kismegszakítóig." },
        { service: "5. kismegszakítótól (anyaggal együtt)", price: "2 900 Ft / db", note: "Az alap csomagon felüli további kismegszakítók darabára." },
        { service: "Helyszíni felmérés", price: "15 000 Ft", note: "Árajánlat elfogadása esetén a felmérés díja a végszámlából levonásra kerül." },
        { service: "Szakvélemény készítése", price: "45 000 Ft", note: "Írásos szakvélemény meglévő hálózat állapotáról, fotókkal és jegyzetekkel." },
      ],
    },
  ],
};

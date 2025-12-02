import React, { useMemo, useState } from "react";

/* Languages */
type Lang = "en" | "nl" | "fr" | "de";

const SUPPORTED_LANGS: Lang[] = ["en", "nl", "fr", "de"];

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    app_title: "Custom Plate Configurator",
    app_subtitle:
      "Order made to measure plates. Choose size, material, processing, and quantity.",

    quantity: "Quantity",
    width_cm: "Width (cm)",
    length_cm: "Length (cm)",
    material: "Material",

    processing: "Processing",
    processing_cut: "Cut to measure",
    processing_cut_milling: "Cut to measure + milling",

    boreholes: "Boreholes",
    boreholes_help: "Add boreholes and set their X/Y position in cm.",
    boreholes_empty: 'No boreholes yet. Click "Add borehole" to place one.',
    add_borehole: "Add borehole",

    circular_cutouts: "Circular cut outs",
    circular_help: "Add circular cutouts with diameter and center position in cm.",
    circular_empty: "No circular cut outs yet.",
    add_circular: "Add circular cutout",

    rect_cutouts: "Square / rectangle cut outs",
    rect_help: "Add square or rectangle cutouts with size and position in cm.",
    rect_empty: "No square or rectangle cut outs yet.",
    add_rect: "Add cutout",

    price_per_plate: "Price per plate",
    total: "Total",
    price_note: "incl. VAT, excl. shipping.",
    ex_vat_label: "≈ {amount} excl. VAT",
    total_ex_vat_label: "≈ {amount} excl. VAT",

    add_to_cart: "Add to cart",

    preview: "Preview",
    preview_note: "Visual indication. Not an exact technical drawing.",
  },

  nl: {
    app_title: "Plaatconfigurator op maat",
    app_subtitle:
      "Bestel platen op maat. Kies afmeting, materiaal, bewerking en aantal.",

    quantity: "Aantal",
    width_cm: "Breedte (cm)",
    length_cm: "Lengte (cm)",
    material: "Materiaal",

    processing: "Bewerking",
    processing_cut: "Op maat gesneden",
    processing_cut_milling: "Op maat gesneden + frezen",

    boreholes: "Boorgaten",
    boreholes_help: "Voeg boorgaten toe en stel hun X/Y positie in cm in.",
    boreholes_empty:
      'Nog geen boorgaten. Klik op "Boorgat toevoegen" om er een te plaatsen.',
    add_borehole: "Boorgat toevoegen",

    circular_cutouts: "Ronde uitsparingen",
    circular_help:
      "Voeg ronde uitsparingen toe met diameter en positie van het middelpunt in cm.",
    circular_empty: "Nog geen ronde uitsparingen.",
    add_circular: "Uitsparing toevoegen",

    rect_cutouts: "Vierkante / rechthoekige uitsparingen",
    rect_help:
      "Voeg vierkante of rechthoekige uitsparingen toe met afmeting en positie in cm.",
    rect_empty: "Nog geen vierkante of rechthoekige uitsparingen.",
    add_rect: "Uitsparing toevoegen",

    price_per_plate: "Prijs per plaat",
    total: "Totaal",
    price_note: "incl. btw, excl. verzending.",
    ex_vat_label: "≈ {amount} excl. btw",
    total_ex_vat_label: "≈ {amount} excl. btw",

    add_to_cart: "Toevoegen aan winkelmand",

    preview: "Voorbeeld",
    preview_note: "Visuele indicatie. Geen exacte technische tekening.",
  },

  fr: {
    app_title: "Configurateur de plaques sur mesure",
    app_subtitle:
      "Commandez des plaques sur mesure. Choisissez dimensions, matériau, usinage et quantité.",

    quantity: "Quantité",
    width_cm: "Largeur (cm)",
    length_cm: "Longueur (cm)",
    material: "Matériau",

    processing: "Usinage",
    processing_cut: "Découpe sur mesure",
    processing_cut_milling: "Découpe sur mesure + fraisage",

    boreholes: "Trous de perçage",
    boreholes_help:
      "Ajoutez des trous de perçage et définissez leur position X/Y en cm.",
    boreholes_empty:
      "Aucun trou pour l'instant. Cliquez sur « Ajouter un trou » pour en placer un.",
    add_borehole: "Ajouter un trou",

    circular_cutouts: "Découpes circulaires",
    circular_help:
      "Ajoutez des découpes circulaires avec diamètre et position du centre en cm.",
    circular_empty: "Aucune découpe circulaire pour l'instant.",
    add_circular: "Ajouter une découpe circulaire",

    rect_cutouts: "Découpes carrées / rectangulaires",
    rect_help:
      "Ajoutez des découpes carrées ou rectangulaires avec dimensions et position en cm.",
    rect_empty:
      "Aucune découpe carrée ou rectangulaire pour l'instant.",
    add_rect: "Ajouter une découpe",

    price_per_plate: "Prix par plaque",
    total: "Total",
    price_note:
      "TVA incluse, livraison exclue.",
    ex_vat_label: "≈ {amount} hors TVA",
    total_ex_vat_label: "≈ {amount} hors TVA",

    add_to_cart: "Ajouter au panier",

    preview: "Aperçu",
    preview_note: "Indication visuelle. Ce n'est pas un plan technique exact.",
  },

  de: {
    app_title: "Platten-Konfigurator nach Maß",
    app_subtitle:
      "Bestellen Sie Platten nach Maß. Wählen Sie Größe, Material, Bearbeitung und Menge.",

    quantity: "Menge",
    width_cm: "Breite (cm)",
    length_cm: "Länge (cm)",
    material: "Material",

    processing: "Bearbeitung",
    processing_cut: "Zuschnitt nach Maß",
    processing_cut_milling: "Zuschnitt nach Maß + Fräsen",

    boreholes: "Bohrungen",
    boreholes_help:
      "Fügen Sie Bohrungen hinzu und legen Sie ihre X/Y-Position in cm fest.",
    boreholes_empty:
      'Noch keine Bohrungen. Klicken Sie auf "Bohrung hinzufügen", um eine zu platzieren.',
    add_borehole: "Bohrung hinzufügen",

    circular_cutouts: "Runde Ausfräsungen",
    circular_help:
      "Fügen Sie runde Ausfräsungen mit Durchmesser und Mittelpunkt-Position in cm hinzu.",
    circular_empty: "Noch keine runden Ausfräsungen.",
    add_circular: "Ausfräsung hinzufügen",

    rect_cutouts: "Eckige Ausfräsungen",
    rect_help:
      "Fügen Sie quadratische oder rechteckige Ausfräsungen mit Größe und Position in cm hinzu.",
    rect_empty: "Noch keine eckigen Ausfräsungen.",
    add_rect: "Ausfräsung hinzufügen",

    price_per_plate: "Preis pro Platte",
    total: "Gesamt",
    price_note:
      "inkl. MwSt., exkl. Versand.",
      ex_vat_label: "≈ {amount} zzgl. MwSt.",
    total_ex_vat_label: "≈ {amount} zzgl. MwSt.",

    add_to_cart: "In den Warenkorb",

    preview: "Vorschau",
    preview_note: "Visuelle Darstellung. Keine exakte technische Zeichnung.",
  },
};

function useTranslation(lang: Lang) {
  return (key: string, vars?: Record<string, string | number>) => {
    const raw = TRANSLATIONS[lang][key] ?? key;
    if (!vars) return raw;
    return Object.keys(vars).reduce((acc, k) => {
      return acc.replace(`{${k}}`, String(vars[k]));
    }, raw);
  };
}

/** VAT settings */
const VAT_RATE = 0.21;

/** Read ?lang=xx from the URL, then fall back to browser language or English */
function resolveInitialLang(): Lang {
  // 1. URL parameter (from Odoo iframe)
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = (params.get("lang") || "").slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(urlLang as Lang)) {
      return urlLang as Lang;
    }
  } catch {
    // ignore
  }

  // 2. Browser language fallback
  try {
    const navLang =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      "en";
    const short = navLang.slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(short as Lang)) {
      return short as Lang;
    }
  } catch {
    // ignore
  }

  // 3. Default
  return "en";
}

/* Pricing and types */

const PRICING = {
  currency: "EUR",
  minPrice: 0,
  maxDimensions: { width: 200, length: 200 },
  minDimensions: { width: 1, length: 1 },
  materials: {
    "XT Transparant anti-reflectie 2mm": { pricePerCm2: 0.002057, thickness_mm: 2 },
    "XT Transparant anti-reflectie 3mm": { pricePerCm2: 0.00293, thickness_mm: 3 },
    "Greencast Blauw 71062 3mm": { pricePerCm2: 0.004361, thickness_mm: 3 },
    "Greencast Geel 71014 3mm": { pricePerCm2: 0.002453, thickness_mm: 3 },
    "Greencast Geel fluo 71112 3mm": { pricePerCm2: 0.005309, thickness_mm: 3 },
    "Greencast Grijs 71075 3mm": { pricePerCm2: 0.002453, thickness_mm: 3 },
  },
  milling: {
    boreholePerHole: 1.2,
    cutoutCircle: 4.5,
    cutoutRectangle: 4.0,
  },
} as const;

type MaterialKey = keyof typeof PRICING.materials;
type ProcessingType = "cut" | "cut_milling";

type Borehole = {
  id: number;
  x_cm: number;
  y_cm: number;
  diameter_cm: number;
};

type CircleCutout = {
  id: number;
  diameter_cm: number;
  x_cm: number;
  y_cm: number;
};

type RectCutout = {
  id: number;
  width_cm: number;
  height_cm: number;
  x_cm: number;
  y_cm: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatCurrency(n: number, currency = PRICING.currency) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);
}

interface PlateConfigSummary {
  quantity: number;
  width_cm: number;
  length_cm: number;
  material: MaterialKey;
  material_thickness_mm: number;
  processing_type: ProcessingType;
  area_cm2_per_plate: number;
  milling_price_per_plate_eur: number;
  unit_price_ex_vat_eur: number;
  unit_price_incl_vat_eur: number;
  total_price_ex_vat_eur: number;
  total_price_incl_vat_eur: number;
  vat_rate: number;
  boreholes: Borehole[];
  circle_cutouts: CircleCutout[];
  rect_cutouts: RectCutout[];
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => resolveInitialLang());
  const t = useTranslation(lang);

  const [quantity, setQuantity] = useState(12);
  const [width, setWidth] = useState(20);
  const [length, setLength] = useState(30);

  const materialNames = Object.keys(PRICING.materials) as MaterialKey[];
  const [material, setMaterial] = useState<MaterialKey>(materialNames[0]);

  const [processingType, setProcessingType] = useState<ProcessingType>("cut");

  const [boreholes, setBoreholes] = useState<Borehole[]>([]);
  const [circleCutouts, setCircleCutouts] = useState<CircleCutout[]>([]);
  const [rectCutouts, setRectCutouts] = useState<RectCutout[]>([]);

  const errors = useMemo(() => {
    const e: string[] = [];

    if (quantity < 1) e.push("Quantity must be at least 1.");

    if (width < PRICING.minDimensions.width || width > PRICING.maxDimensions.width) {
      e.push(
        `Width must be between ${PRICING.minDimensions.width} and ${PRICING.maxDimensions.width} cm.`
      );
    }

    if (length < PRICING.minDimensions.length || length > PRICING.maxDimensions.length) {
      e.push(
        `Length must be between ${PRICING.minDimensions.length} and ${PRICING.maxDimensions.length} cm.`
      );
    }

    if (processingType === "cut_milling") {
      boreholes.forEach((b, idx) => {
        const radius = b.diameter_cm / 2;
        if (b.diameter_cm <= 0) {
          e.push(`Borehole ${idx + 1} must have a positive diameter.`);
        }
        if (
          b.x_cm - radius <= 0 ||
          b.x_cm + radius >= width ||
          b.y_cm - radius <= 0 ||
          b.y_cm + radius >= length
        ) {
          e.push(
            `Borehole ${idx + 1} does not fit on the plate. Check diameter and X/Y in cm.`
          );
        }
      });

      circleCutouts.forEach((c, idx) => {
        const radius = c.diameter_cm / 2;
        if (c.diameter_cm <= 0) {
          e.push(`Circle cutout ${idx + 1} must have a positive diameter.`);
        }
        if (
          c.x_cm - radius <= 0 ||
          c.x_cm + radius >= width ||
          c.y_cm - radius <= 0 ||
          c.y_cm + radius >= length
        ) {
          e.push(
            `Circle cutout ${idx + 1} does not fit on the plate with this diameter and position.`
          );
        }
      });

      rectCutouts.forEach((r, idx) => {
        if (r.width_cm <= 0 || r.height_cm <= 0) {
          e.push(`Rectangle cutout ${idx + 1} must have positive width and height.`);
        }

        if (
          r.x_cm < 0 ||
          r.x_cm + r.width_cm > width ||
          r.y_cm < 0 ||
          r.y_cm > length ||
          r.y_cm - r.height_cm < 0
        ) {
          e.push(
            `Rectangle cutout ${idx + 1} does not fit on the plate with this size and position.`
          );
        }
      });
    }

    return e;
  }, [quantity, width, length, processingType, boreholes, circleCutouts, rectCutouts]);

  const {
    unitPriceExcl,
    unitPriceIncl,
    totalPriceExcl,
    totalPriceIncl,
    areaCm2,
    millingPricePerPlate,
  } = useMemo(() => {
    if (quantity < 1) {
      return {
        unitPriceExcl: 0,
        unitPriceIncl: 0,
        totalPriceExcl: 0,
        totalPriceIncl: 0,
        areaCm2: 0,
        millingPricePerPlate: 0,
      };
    }

    const w = clamp(width, PRICING.minDimensions.width, PRICING.maxDimensions.width);
    const l = clamp(length, PRICING.minDimensions.length, PRICING.maxDimensions.length);

    const area = w * l;
    const baseRate = PRICING.materials[material].pricePerCm2;

    // base material cost (excl. VAT)
    const rateWithMarkup = baseRate * 1.2 * 1.55;

    const unitBase = area * rateWithMarkup;

    let millingUnit = 0;

    if (processingType === "cut_milling") {
      const m = PRICING.milling;

      const boreholesCount = boreholes.length;
      if (boreholesCount > 0) {
        millingUnit += boreholesCount * m.boreholePerHole;
      }

      if (circleCutouts.length > 0) {
        millingUnit += circleCutouts.length * m.cutoutCircle;
      }

      if (rectCutouts.length > 0) {
        millingUnit += rectCutouts.length * m.cutoutRectangle;
      }
    }

    const unitNet = unitBase + millingUnit;
    const totalNet = unitNet * quantity;

    const unitGross = unitNet * (1 + VAT_RATE);
    const totalGross = totalNet * (1 + VAT_RATE);

    const unitNetRounded = Math.max(PRICING.minPrice, Math.round(unitNet * 100) / 100);
    const totalNetRounded = Math.max(PRICING.minPrice, Math.round(totalNet * 100) / 100);
    const unitGrossRounded = Math.max(PRICING.minPrice, Math.round(unitGross * 100) / 100);
    const totalGrossRounded = Math.max(PRICING.minPrice, Math.round(totalGross * 100) / 100);

    return {
      unitPriceExcl: unitNetRounded,
      unitPriceIncl: unitGrossRounded,
      totalPriceExcl: totalNetRounded,
      totalPriceIncl: totalGrossRounded,
      areaCm2: area,
      millingPricePerPlate: millingUnit,
    };
  }, [quantity, width, length, material, processingType, boreholes, circleCutouts, rectCutouts]);

  const thicknessMm = PRICING.materials[material].thickness_mm ?? 3;

  const summary: PlateConfigSummary = useMemo(
    () => ({
      quantity,
      width_cm: width,
      length_cm: length,
      material,
      material_thickness_mm: thicknessMm,
      processing_type: processingType,
      area_cm2_per_plate: areaCm2,
      milling_price_per_plate_eur: millingPricePerPlate,
      unit_price_ex_vat_eur: unitPriceExcl,
      unit_price_incl_vat_eur: unitPriceIncl,
      total_price_ex_vat_eur: totalPriceExcl,
      total_price_incl_vat_eur: totalPriceIncl,
      vat_rate: VAT_RATE,
      boreholes,
      circle_cutouts: circleCutouts,
      rect_cutouts: rectCutouts,
    }),
    [
      quantity,
      width,
      length,
      material,
      thicknessMm,
      processingType,
      areaCm2,
      millingPricePerPlate,
      unitPriceExcl,
      unitPriceIncl,
      totalPriceExcl,
      totalPriceIncl,
      boreholes,
      circleCutouts,
      rectCutouts,
    ]
  );

  function handleAddToCart() {
    fetch("/plateconfig/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary),
      credentials: "include",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return r.json();
      })
      .then((res) => {
        alert("Added to cart. Quantity: " + (res.cart_qty ?? "n/a"));
      })
      .catch((err) => {
        alert("Error adding to cart: " + err.message);
      });
  }

  function addBorehole() {
    setBoreholes((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        x_cm: width / 2,
        y_cm: length / 2,
        diameter_cm: 0.5,
      },
    ]);
  }

  function addCircleCutout() {
    setCircleCutouts((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        diameter_cm: Math.min(width, length) / 4,
        x_cm: width / 2,
        y_cm: length / 2,
      },
    ]);
  }

  function addRectCutout() {
    setRectCutouts((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        width_cm: width / 4,
        height_cm: length / 4,
        x_cm: width / 4,
        y_cm: (3 * length) / 4,
      },
    ]);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6">
      <header className="grid gap-1 md:grid-cols-[1fr,auto] md:items-start">
        <div>
          <h1 className="text-2xl font-semibold">{t("app_title")}</h1>
          <p className="text-sm text-gray-600">
            {t("app_subtitle")}
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex justify-start md:justify-end">
          <select
            className="border rounded-xl px-3 py-2 text-sm bg-white"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
          >
            <option value="en">English</option>
            <option value="nl">Nederlands</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 items-stretch min-h-[520px]">
        <PlatePreview
          widthCm={width}
          lengthCm={length}
          processingType={processingType}
          boreholes={boreholes}
          circleCutouts={circleCutouts}
          rectCutouts={rectCutouts}
          lang={lang}
        />

        <div className="grid gap-6">
          <section className="grid md:grid-cols-3 gap-4 items-end">
            <Field label={t("quantity")}>
              <NumberInput value={quantity} setValue={setQuantity} step={1} min={1} max={999} />
            </Field>
            <Field label={t("width_cm")}>
              <NumberInput
                value={width}
                setValue={setWidth}
                step={1}
                min={PRICING.minDimensions.width}
                max={PRICING.maxDimensions.width}
              />
            </Field>
            <Field label={t("length_cm")}>
              <NumberInput
                value={length}
                setValue={setLength}
                step={1}
                min={PRICING.minDimensions.length}
                max={PRICING.maxDimensions.length}
              />
            </Field>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <Select<MaterialKey>
              label={t("material")}
              value={material}
              setValue={setMaterial}
              options={materialNames}
            />
          </section>

          <section className="grid gap-2">
            <span className="text-sm text-gray-700">{t("processing")}</span>

            <div className="inline-flex rounded-2xl border bg-gray-50 p-1 text-sm">
              <SegmentedButton
                isActive={processingType === "cut"}
                onClick={() => setProcessingType("cut")}
              >
                {t("processing_cut")}
              </SegmentedButton>
              <SegmentedButton
                isActive={processingType === "cut_milling"}
                onClick={() => setProcessingType("cut_milling")}
              >
                {t("processing_cut_milling")}
              </SegmentedButton>
            </div>

            <div className="mt-3 grid gap-3 rounded-2xl border bg-gray-50 p-4 text-sm min-h-[260px]">
              {processingType === "cut_milling" ? (
                <>
                  {/* Boreholes */}
                  <details
                    className="rounded-xl border bg-white/80 p-3"
                    defaultOpen={boreholes.length > 0}
                  >
                    <summary className="flex items-center justify-between cursor-pointer select-none">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {t("boreholes")}
                        </span>
                        {boreholes.length > 0 && (
                          <span className="text-[11px] text-gray-500">
                            {boreholes.length} added
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">▼</span>
                    </summary>

                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {t("boreholes_help")}
                        </p>
                        <button
                          type="button"
                          onClick={addBorehole}
                          className="text-xs px-2 py-1 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          {t("add_borehole")}
                        </button>
                      </div>

                      {boreholes.length === 0 && (
                        <p className="text-xs text-gray-400">
                          {t("boreholes_empty")}
                        </p>
                      )}

                      <div className="grid gap-2">
                        {boreholes.map((b, idx) => (
                          <div
                            key={b.id}
                            className="rounded-lg border bg-gray-50 px-2 py-2 text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">Hole {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setBoreholes((prev) => prev.filter((h) => h.id !== b.id))
                                }
                                className="text-[11px] px-2 py-0.5 rounded-md border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">Diameter (cm)</span>
                                <NumberInput
                                  value={b.diameter_cm}
                                  setValue={(n) =>
                                    setBoreholes((prev) =>
                                      prev.map((h) =>
                                        h.id === b.id ? { ...h, diameter_cm: n } : h
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0.1}
                                  max={Math.min(width, length)}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">X from left (cm)</span>
                                <NumberInput
                                  value={b.x_cm}
                                  setValue={(n) =>
                                    setBoreholes((prev) =>
                                      prev.map((h) =>
                                        h.id === b.id ? { ...h, x_cm: n } : h
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0}
                                  max={width}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">
                                  Y from bottom (cm)
                                </span>
                                <NumberInput
                                  value={b.y_cm}
                                  setValue={(n) =>
                                    setBoreholes((prev) =>
                                      prev.map((h) =>
                                        h.id === b.id ? { ...h, y_cm: n } : h
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0}
                                  max={length}
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-gray-400">
                        Diameter and position are measured from the center of the borehole to the
                        left and bottom edges.
                      </p>
                    </div>
                  </details>

                  {/* Circular cutouts */}
                  <details
                    className="rounded-xl border bg-white/80 p-3"
                    defaultOpen={circleCutouts.length > 0}
                  >
                    <summary className="flex items-center justify-between cursor-pointer select-none">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {t("circular_cutouts")}
                        </span>
                        {circleCutouts.length > 0 && (
                          <span className="text-[11px] text-gray-500">
                            {circleCutouts.length} added
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">▼</span>
                    </summary>

                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {t("circular_help")}
                        </p>
                        <button
                          type="button"
                          onClick={addCircleCutout}
                          className="text-xs px-2 py-1 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          {t("add_circular")}
                        </button>
                      </div>

                      {circleCutouts.length === 0 && (
                        <p className="text-xs text-gray-400">
                          {t("circular_empty")}
                        </p>
                      )}

                      <div className="grid gap-2">
                        {circleCutouts.map((c, idx) => (
                          <div
                            key={c.id}
                            className="rounded-lg border bg-gray-50 px-2 py-2 text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">Circle {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setCircleCutouts((prev) =>
                                    prev.filter((cc) => cc.id !== c.id)
                                  )
                                }
                                className="text-[11px] px-2 py-0.5 rounded-md border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">Diameter (cm)</span>
                                <NumberInput
                                  value={c.diameter_cm}
                                  setValue={(n) =>
                                    setCircleCutouts((prev) =>
                                      prev.map((cc) =>
                                        cc.id === c.id ? { ...cc, diameter_cm: n } : cc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0.1}
                                  max={Math.min(width, length)}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">Center X (cm)</span>
                                <NumberInput
                                  value={c.x_cm}
                                  setValue={(n) =>
                                    setCircleCutouts((prev) =>
                                      prev.map((cc) =>
                                        cc.id === c.id ? { ...cc, x_cm: n } : cc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0}
                                  max={width}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">Center Y (cm)</span>
                                <NumberInput
                                  value={c.y_cm}
                                  setValue={(n) =>
                                    setCircleCutouts((prev) =>
                                      prev.map((cc) =>
                                        cc.id === c.id ? { ...cc, y_cm: n } : cc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0}
                                  max={length}
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-gray-400">
                        Diameter and position are defined from the center of the circle.
                      </p>
                    </div>
                  </details>

                  {/* Rect cutouts */}
                  <details
                    className="rounded-xl border bg-white/80 p-3"
                    defaultOpen={rectCutouts.length > 0}
                  >
                    <summary className="flex items-center justify-between cursor-pointer select-none">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-800">
                          {t("rect_cutouts")}
                        </span>
                        {rectCutouts.length > 0 && (
                          <span className="text-[11px] text-gray-500">
                            {rectCutouts.length} added
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">▼</span>
                    </summary>

                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">
                          {t("rect_help")}
                        </p>
                        <button
                          type="button"
                          onClick={addRectCutout}
                          className="text-xs px-2 py-1 rounded-lg border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          {t("add_rect")}
                        </button>
                      </div>

                      {rectCutouts.length === 0 && (
                        <p className="text-xs text-gray-400">
                          {t("rect_empty")}
                        </p>
                      )}

                      <div className="grid gap-2">
                        {rectCutouts.map((r, idx) => (
                          <div
                            key={r.id}
                            className="rounded-lg border bg-gray-50 px-2 py-2 text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold">Cutout {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setRectCutouts((prev) => prev.filter((rc) => rc.id !== r.id))
                                }
                                className="text-[11px] px-2 py-0.5 rounded-md border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">Width (cm)</span>
                                <NumberInput
                                  value={r.width_cm}
                                  setValue={(n) =>
                                    setRectCutouts((prev) =>
                                      prev.map((rc) =>
                                        rc.id === r.id ? { ...rc, width_cm: n } : rc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0.1}
                                  max={width}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">Height (cm)</span>
                                <NumberInput
                                  value={r.height_cm}
                                  setValue={(n) =>
                                    setRectCutouts((prev) =>
                                      prev.map((rc) =>
                                        rc.id === r.id ? { ...rc, height_cm: n } : rc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0.1}
                                  max={length}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">
                                  Top-left X from left (cm)
                                </span>
                                <NumberInput
                                  value={r.x_cm}
                                  setValue={(n) =>
                                    setRectCutouts((prev) =>
                                      prev.map((rc) =>
                                        rc.id === r.id ? { ...rc, x_cm: n } : rc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0}
                                  max={width}
                                />
                              </label>
                              <label className="flex-1 min-w-[90px] flex flex-col gap-1">
                                <span className="text-[11px] text-gray-500">
                                  Top-left Y from bottom (cm)
                                </span>
                                <NumberInput
                                  value={r.y_cm}
                                  setValue={(n) =>
                                    setRectCutouts((prev) =>
                                      prev.map((rc) =>
                                        rc.id === r.id ? { ...rc, y_cm: n } : rc
                                      )
                                    )
                                  }
                                  step={0.1}
                                  min={0}
                                  max={length}
                                />
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-gray-400">
                        Position is measured from the top-left corner of the cutout to the left and
                        bottom edges.
                      </p>
                    </div>
                  </details>
                </>
              ) : (
                <div className="flex items-center justify-center text-xs text-gray-400">
                  No additional milling selected.
                </div>
              )}
            </div>
          </section>

          {errors.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <ul className="ml-5 list-disc">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <section className="grid gap-3">
            <div className="flex flex-wrap items-baseline gap-6">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {t("price_per_plate")}
                </div>
                <div className="text-2xl font-semibold">
                  {formatCurrency(unitPriceIncl)}
                </div>
                <div className="text-[11px] text-gray-500">
                  {t("ex_vat_label", { amount: formatCurrency(unitPriceExcl) })}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {t("total")}
                </div>
                <div className="text-3xl font-semibold">
                  {formatCurrency(totalPriceIncl)}
                </div>
                <div className="text-[11px] text-gray-500">
                  {t("total_ex_vat_label", { amount: formatCurrency(totalPriceExcl) })}
                </div>
              </div>  
            </div>

            <button
              onClick={handleAddToCart}
              disabled={errors.length > 0}
              className="w-full md:w-auto px-5 py-3 rounded-2xl bg-black text-white hover:opacity-90 disabled:opacity-50"
            >
              {t("add_to_cart")}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-gray-700">{label}</span>
      {children}
    </label>
  );
}

function NumberInput({
  value,
  setValue,
  step = 1,
  min,
  max,
  disabled = false,
}: {
  value: number;
  setValue: (n: number) => void;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
}) {
  return (
    <input
      type="number"
      className="rounded-lg border px-2 py-2 text-sm disabled:opacity-50 w-full"
      value={Number.isFinite(value) ? value : ""}
      step={step}
      min={min}
      max={max}
      disabled={disabled}
      onChange={(e) => {
        const raw = e.target.value;
        const n = Number(raw);
        if (Number.isNaN(n)) {
          return;
        }
        setValue(n);
      }}
    />
  );
}

function Select<T extends string>({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: T;
  setValue: (v: T) => void;
  options: T[];
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-gray-700">{label}</span>
      <select
        className="rounded-xl border p-3 text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o || "Select..."}
          </option>
        ))}
      </select>
    </label>
  );
}

function SegmentedButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex-1 rounded-2xl px-3 py-2 text-center text-sm font-medium transition " +
        (isActive
          ? "bg-black text-white shadow-sm"
          : "bg-transparent text-gray-700 hover:bg-white hover:text-black")
      }
    >
      {children}
    </button>
  );
}

function PlatePreview({
  widthCm,
  lengthCm,
  processingType,
  boreholes,
  circleCutouts,
  rectCutouts,
  lang,
}: {
  widthCm: number;
  lengthCm: number;
  processingType: ProcessingType;
  boreholes: Borehole[];
  circleCutouts: CircleCutout[];
  rectCutouts: RectCutout[];
  lang: Lang;
}) {
  const t = useTranslation(lang);

  const safeWidthCm = Math.max(widthCm, 0.1);
  const safeLengthCm = Math.max(lengthCm, 0.1);

  const axisX = 10;
  const axisY = 90;
  const axisTop = 18;

  const drawingLeft = axisX + 5;
  const drawingRight = 95;
  const drawingTop = 8;
  const drawingBottom = axisY - 5;
  const availWidth = drawingRight - drawingLeft;
  const availHeight = drawingBottom - drawingTop;

  const aspect = safeWidthCm / safeLengthCm;

  let plateWidth: number;
  let plateHeight: number;

  if (aspect >= 1) {
    plateWidth = availWidth;
    plateHeight = availWidth / aspect;
    if (plateHeight > availHeight) {
      plateHeight = availHeight;
      plateWidth = availHeight * aspect;
    }
  } else {
    plateHeight = availHeight;
    plateWidth = availHeight * aspect;
    if (plateWidth > availWidth) {
      plateWidth = availWidth;
      plateHeight = availWidth / aspect;
    }
  }

  const originX = drawingLeft + (availWidth - plateWidth) / 2;
  const originY = drawingTop + (availHeight - plateHeight) / 2;

  function toSvgX(cm: number) {
    return originX + (cm / safeWidthCm) * plateWidth;
  }

  function toSvgYFromBottom(cm: number) {
    return originY + plateHeight - (cm / safeLengthCm) * plateHeight;
  }

  const holeRadius = 2.5;
  const gridLines = 8;

  return (
    <div className="border rounded-xl p-3 bg-slate-50 w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-700">
          {t("preview")}
        </span>
        <span className="text-[11px] text-gray-400">
          {t("preview_note")}
        </span>
      </div>
      <svg viewBox="0 0 100 100" className="w-full flex-1 bg-white rounded-lg">
        {/* grid */}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const tLine = i / gridLines;
          const x = drawingLeft + tLine * availWidth;
          return (
            <line
              key={`gv-${i}`}
              x1={x}
              y1={drawingTop}
              x2={x}
              y2={drawingBottom}
              stroke="#e5e7eb"
              strokeWidth={0.3}
            />
          );
        })}
        {Array.from({ length: gridLines + 1 }).map((_, i) => {
          const tLine = i / gridLines;
          const y = drawingTop + tLine * availHeight;
          return (
            <line
              key={`gh-${i}`}
              x1={drawingLeft}
              y1={y}
              x2={drawingRight}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth={0.3}
            />
          );
        })}

        {/* axes */}
        <line x1={axisX} y1={axisTop} x2={axisX} y2={axisY} stroke="#9ca3af" strokeWidth={0.3} />
        <text
          x={axisX - 3}
          y={axisTop - 4}
          fontSize="3"
          fill="#4b5563"
          textAnchor="middle"
        >
          Y (cm)
        </text>
        <text x={axisX - 1} y={axisY} fontSize="3" fill="#9ca3af" textAnchor="end">
          0
        </text>

        <line x1={axisX} y1={axisY} x2={95} y2={axisY} stroke="#9ca3af" strokeWidth={0.3} />
        <text x={93} y={axisY - 2} fontSize="3" fill="#4b5563" textAnchor="end">
          X (cm)
        </text>
        <text x={axisX} y={axisY - 2} fontSize="3" fill="#9ca3af">
          0
        </text>

        {/* plate */}
        <rect
          x={originX}
          y={originY}
          width={plateWidth}
          height={plateHeight}
          rx={2}
          ry={2}
          fill="#f9fafb"
          stroke="#999"
          strokeWidth={0.3}
        />

        <text
          x={originX + plateWidth / 2}
          y={originY + plateHeight + 4}
          textAnchor="middle"
          fontSize="4"
          fill="#666"
        >
          {widthCm} cm
        </text>

        <text
          x={originX - 4}
          y={originY + plateHeight / 2}
          textAnchor="middle"
          fontSize="4"
          fill="#666"
          transform={`rotate(-90 ${originX - 4} ${originY + plateHeight / 2})`}
        >
          {lengthCm} cm
        </text>

        {/* boreholes */}
        {processingType === "cut_milling" &&
          boreholes.map((b) => {
            const radiusNorm =
              (b.diameter_cm / 2 / safeWidthCm) * plateWidth || holeRadius / 3;
            return (
              <g key={b.id}>
                <circle
                  cx={toSvgX(b.x_cm)}
                  cy={toSvgYFromBottom(b.y_cm)}
                  r={radiusNorm}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth={0.4}
                />
              </g>
            );
          })}

        {/* circular cutouts */}
        {processingType === "cut_milling" &&
          circleCutouts.map((c) => {
            const radiusNorm = (c.diameter_cm / 2 / safeWidthCm) * plateWidth;
            return (
              <g key={c.id}>
                <circle
                  cx={toSvgX(c.x_cm)}
                  cy={toSvgYFromBottom(c.y_cm)}
                  r={radiusNorm}
                  fill="none"
                  stroke="#e11d48"
                  strokeDasharray="2 2"
                  strokeWidth={0.3}
                />
              </g>
            );
          })}

        {/* rect cutouts */}
        {processingType === "cut_milling" &&
          rectCutouts.map((r) => {
            const wNorm = (r.width_cm / safeWidthCm) * plateWidth;
            const hNorm = (r.height_cm / safeLengthCm) * plateHeight;

            const yBottomCm = r.y_cm - r.height_cm;
            const yBottomSvg = toSvgYFromBottom(yBottomCm);
            const yTopSvg = yBottomSvg - hNorm;

            const x = toSvgX(r.x_cm);
            const y = yTopSvg;

            return (
              <rect
                key={r.id}
                x={x}
                y={y}
                width={wNorm}
                height={hNorm}
                fill="none"
                stroke="#0ea5e9"
                strokeDasharray="3 2"
                strokeWidth={0.3}
              />
            );
          })}
      </svg>
    </div>
  );
}

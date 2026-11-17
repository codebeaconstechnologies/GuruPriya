import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { comingSoonTrips, getUpcomingTrips, ALL_TRAVEL_OPTIONS } from "@/data/trips";
import { categories } from "@/data/catalog/categories";
import { tailorMadePackages } from "@/data/catalog/packages";
import { validateContactForm, MESSAGE_MAX, type ContactFormValues, type ContactFormErrors } from "@/utils/validation";
import { trackEvent } from "@/utils/analytics";

const initialValues: ContactFormValues = {
  fullName: "",
  mobile: "",
  email: "",
  destination: "",
  category: "",
  yatra: "",
  travellers: "",
  preferredDate: "",
  travelMode: "",
  message: "",
  consent: false,
  company: ""
};

const L = {
  destination: { en: "Where do you want to go?", mr: "कुठे जायचे आहे?" },
  destinationPh: { en: "e.g. Kashmir, Dubai, Char Dham", mr: "उदा. काश्मीर, दुबई, चारधाम" },
  category: { en: "Travel type", mr: "सहलीचा प्रकार" },
  categoryDefault: { en: "Not sure yet", mr: "अजून ठरवले नाही" },
  tour: { en: "Tour / package (optional)", mr: "टूर / पॅकेज (ऐच्छिक)" },
  tourDefault: { en: "Choose a tour", mr: "टूर निवडा" },
  yatras: { en: "Group yatras", mr: "समूह यात्रा" },
  tailor: { en: "Tailor-made itineraries", mr: "पसंतीनुसार सहली" },
  month: { en: "Travel month", mr: "प्रवासाचा महिना" }
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { t, language } = useI18n();
  const pick = useLocalized();
  const [searchParams] = useSearchParams();

  const tourOptions = useMemo(
    () => ({
      yatras: [
        ...getUpcomingTrips().map((tr) => ({ value: tr.slug, label: pick(tr.title) })),
        ...comingSoonTrips.map((tr) => ({ value: tr.slug, label: `${pick(tr.title)} (${t.common.comingSoon})` }))
      ],
      tailor: tailorMadePackages.map((p) => ({ value: `pkg:${p.slug}`, label: `${p.title} (${p.nights}N/${p.days}D)` }))
    }),
    [pick, t.common.comingSoon]
  );
  const allTourOptions = [...tourOptions.yatras, ...tourOptions.tailor];

  // Pre-fill from links like /contact?destination=Goa&category=family&month=2027-01&travellers=4&package=…
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  // Pre-fill after hydration so the prerendered form matches the first render.
  useEffect(() => {
    setValues(prefillFromUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function prefillFromUrl(): ContactFormValues {
    const presetMode = searchParams.get("mode") ?? "";
    const presetPackage = searchParams.get("package") ?? "";
    const matchedPkg = tailorMadePackages.find((p) => presetPackage.startsWith(p.title));
    const presetService = searchParams.get("service");
    const month = searchParams.get("month") ?? "";
    const travellers = searchParams.get("travellers") ?? "";
    const category = searchParams.get("category") ?? "";
    return {
      ...initialValues,
      destination: (searchParams.get("destination") ?? "").slice(0, 120),
      category: categories.some((c) => c.slug === category) ? category : "",
      yatra: searchParams.get("yatra") ?? (matchedPkg ? `pkg:${matchedPkg.slug}` : ""),
      travellers: /^\d{1,3}$/.test(travellers) ? travellers : "",
      preferredDate: /^\d{4}-\d{2}$/.test(month) ? month : "",
      travelMode: ALL_TRAVEL_OPTIONS.some((o) => o.mode === presetMode) ? presetMode : "",
      message: presetService ? `I'd like help with: ${presetService.slice(0, 80)}. ` : !matchedPkg && presetPackage ? `I'm interested in: ${presetPackage.slice(0, 120)}. ` : ""
    };
  }
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [started, setStarted] = useState(false);
  // Time-trap: the server rejects forms submitted implausibly fast (bots).
  const [startedAt] = useState(() => Date.now());

  function handleChange<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validateContactForm(values, t.contact.validation);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Honeypot: bots fill hidden fields — silently drop without alerting them.
    if (values.company.trim() !== "") {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Readable labels so the enquiry email doesn't show slugs/codes.
          yatraTitle: allTourOptions.find((o) => o.value === values.yatra)?.label ?? "",
          categoryLabel: categories.find((c) => c.slug === values.category)?.name.en ?? "",
          travelModeLabel: ALL_TRAVEL_OPTIONS.find((o) => o.mode === values.travelMode)?.name.en ?? "",
          language,
          startedAt,
          pageUrl: window.location.href
        })
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      trackEvent("generate_lead", {
        form_name: "enquiry",
        tour: allTourOptions.find((o) => o.value === values.yatra)?.label ?? "",
        travel_type: values.category,
        travel_mode: values.travelMode,
        destination: values.destination.trim().slice(0, 60),
        travellers: values.travellers,
        travel_month: values.preferredDate
      });
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-green-200 bg-green-50 p-10 text-center" role="status">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <h3 className="font-display text-xl font-bold text-green-800">{t.contact.successTitle}</h3>
        <p className="text-green-700">{t.contact.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={() => {
        if (!started) {
          setStarted(true);
          trackEvent("form_start", { form_name: "enquiry" });
        }
      }}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Honeypot field — hidden from real users, catches simple bots */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(e) => handleChange("company", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.contact.fields.fullName} error={errors.fullName} required>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={200}
            value={values.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder={t.contact.placeholders.fullName}
            aria-invalid={!!errors.fullName}
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field label={t.contact.fields.mobile} error={errors.mobile} required>
          <input
            type="tel"
            name="mobile"
            autoComplete="tel-national"
            inputMode="numeric"
            required
            maxLength={14}
            value={values.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            placeholder={t.contact.placeholders.mobile}
            aria-invalid={!!errors.mobile}
            className={inputClass(!!errors.mobile)}
          />
        </Field>

        <Field label={pick(L.destination)}>
          <input
            type="text"
            name="destination"
            maxLength={120}
            value={values.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            placeholder={pick(L.destinationPh)}
            className={inputClass(false)}
          />
        </Field>

        <Field label={pick(L.category)}>
          <select value={values.category} onChange={(e) => handleChange("category", e.target.value)} className={inputClass(false)}>
            <option value="">{pick(L.categoryDefault)}</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {pick(c.name)}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label={pick(L.tour)}>
            <select value={values.yatra} onChange={(e) => handleChange("yatra", e.target.value)} className={inputClass(false)}>
              <option value="">{pick(L.tourDefault)}</option>
              <optgroup label={pick(L.yatras)}>
                {tourOptions.yatras.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label={pick(L.tailor)}>
                {tourOptions.tailor.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </Field>
        </div>

        <Field label={t.contact.fields.travellers} error={errors.travellers}>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={values.travellers}
            onChange={(e) => handleChange("travellers", e.target.value)}
            placeholder={t.contact.placeholders.travellers}
            className={inputClass(!!errors.travellers)}
          />
        </Field>

        <Field label={pick(L.month)}>
          <input type="month" value={values.preferredDate} onChange={(e) => handleChange("preferredDate", e.target.value)} className={inputClass(false)} />
        </Field>

        <Field label={t.contact.fields.travelMode}>
          <select value={values.travelMode} onChange={(e) => handleChange("travelMode", e.target.value)} className={inputClass(false)}>
            <option value="">{t.contact.travelModeDefault}</option>
            {ALL_TRAVEL_OPTIONS.map((opt) => (
              <option key={opt.mode} value={opt.mode}>
                {pick(opt.name)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.contact.fields.email} error={errors.email}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={200}
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={t.contact.placeholders.email}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <Field label={t.contact.fields.message}>
        <textarea
          rows={4}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder={t.contact.placeholders.message}
          className={inputClass(false)}
        />
      </Field>

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 text-sm text-navy-900/75">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => handleChange("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-0.5 h-4 w-4 shrink-0 accent-saffron-600"
          />
          <span>
            {t.contact.fields.consent}{" "}
            <Link to="/privacy" className="font-semibold text-saffron-700 underline underline-offset-2">
              {t.contact.privacyLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent && <span className="text-xs font-medium text-red-600">{errors.consent}</span>}
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-bold">{t.contact.errorTitle}</p>
            <p>{t.contact.errorMessage}</p>
          </div>
        </div>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-fit">
        <Send className="h-4 w-4" />
        {status === "submitting" ? t.contact.submitting : t.contact.submit}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `field ${hasError ? "!border-red-400" : ""}`;
}

function Field({ label, error, children, required }: { label: string; error?: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-navy-900/80">
      <span>
        {label}
        {required && <span className="text-saffron-600"> *</span>}
      </span>
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

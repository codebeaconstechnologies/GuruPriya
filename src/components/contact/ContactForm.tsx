import { useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, Send } from "lucide-react";
import { useI18n, useLocalized } from "@/i18n/I18nContext";
import { trips, comingSoonTrips } from "@/data/trips";
import { validateContactForm, type ContactFormValues, type ContactFormErrors } from "@/utils/validation";

const initialValues: ContactFormValues = {
  fullName: "",
  mobile: "",
  email: "",
  yatra: "",
  travellers: "",
  preferredDate: "",
  message: "",
  company: ""
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { t } = useI18n();
  const pick = useLocalized();
  const [searchParams] = useSearchParams();
  const presetYatra = searchParams.get("yatra") ?? "";

  const [values, setValues] = useState<ContactFormValues>({ ...initialValues, yatra: presetYatra });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const allYatraOptions = [
    ...trips.map((tr) => ({ slug: tr.slug, label: pick(tr.title) })),
    ...comingSoonTrips.map((tr) => ({ slug: tr.slug, label: `${pick(tr.title)} (${t.common.comingSoon})` }))
  ];

  function handleChange<K extends keyof ContactFormValues>(key: K, value: string) {
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
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <h3 className="font-display text-xl font-bold text-green-800">{t.contact.successTitle}</h3>
        <p className="text-green-700">{t.contact.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
        <Field label={t.contact.fields.fullName} error={errors.fullName}>
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder={t.contact.placeholders.fullName}
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field label={t.contact.fields.mobile} error={errors.mobile}>
          <input
            type="tel"
            value={values.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            placeholder={t.contact.placeholders.mobile}
            className={inputClass(!!errors.mobile)}
          />
        </Field>

        <Field label={t.contact.fields.email} error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={t.contact.placeholders.email}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label={t.contact.fields.selectYatra}>
          <select
            value={values.yatra}
            onChange={(e) => handleChange("yatra", e.target.value)}
            className={inputClass(false)}
          >
            <option value="">{t.contact.selectYatraDefault}</option>
            {allYatraOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.contact.fields.travellers} error={errors.travellers}>
          <input
            type="number"
            min={1}
            value={values.travellers}
            onChange={(e) => handleChange("travellers", e.target.value)}
            placeholder={t.contact.placeholders.travellers}
            className={inputClass(!!errors.travellers)}
          />
        </Field>

        <Field label={t.contact.fields.preferredDate}>
          <input
            type="date"
            value={values.preferredDate}
            onChange={(e) => handleChange("preferredDate", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
      </div>

      <Field label={t.contact.fields.message}>
        <textarea
          rows={4}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder={t.contact.placeholders.message}
          className={inputClass(false)}
        />
      </Field>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
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
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-gold ${
    hasError ? "border-red-400" : "border-charcoal/15"
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-charcoal/80">
      {label}
      {children}
      {error && <span className="text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}

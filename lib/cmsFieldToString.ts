/**
 * CMS/API fields are sometimes returned as strings and sometimes as objects
 * (e.g. { icon, text }). React cannot render plain objects as children — coerce to text.
 */
export function cmsFieldToString(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(cmsFieldToString).filter(Boolean).join(" ");
  }
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.text === "string") return o.text;
    if (typeof o.title === "string") return o.title;
    if (typeof o.description === "string") return o.description;
    if (typeof o.content === "string") return o.content;
    if (typeof o.html === "string") return o.html;
  }
  return "";
}

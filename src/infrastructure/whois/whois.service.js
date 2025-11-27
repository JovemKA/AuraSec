import dotenv from "dotenv";
import { WhoisJson } from "@whoisjson/whoisjson";

dotenv.config();

const whoisClient = new WhoisJson({
  apiKey: process.env.WHOIS_JSON_API_KEY,
});

function normalizeDomain(raw) {
  if (!raw) return null;
  let d = raw.toLowerCase().trim();
  d = d.replace(/^(https?:\/\/)/, ""); // remove http(s)
  d = d.split("/")[0]; // remove path
  d = d.replace(/^www\./, ""); // remove www
  return d;
}

function buildDto(domain, whoisLookup, nsLookup, sslInfo, availability) {
  const created = whoisLookup?.created || null;
  const ageInDays = created
    ? Math.floor(
        (Date.now() - new Date(created).getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return {
    domain,
    whois: whoisLookup || null,
    dns: nsLookup?.records || null,
    ssl: sslInfo || null,
    availability: availability || null,
    meta: {
      ageInDays,
      lastCheckedAt: new Date().toISOString(),
    },
  };
}

export async function analyzeOfficialDomain(rawDomain = "") {
  const domain = normalizeDomain(rawDomain);
  if (!domain) throw new Error("Invalid domain");

  try {
    const whoisLookup = await whoisClient.lookup(domain);
    const nsLookup = await whoisClient.nslookup(domain);

    let sslInfo = null;
    try {
      sslInfo = await whoisClient.ssl(domain);
    } catch (_) {}

    let availability = null;
    try {
      availability = await whoisClient.checkDomainAvailability(domain);
    } catch (_) {}

    return buildDto(domain, whoisLookup, nsLookup, sslInfo, availability);
  } catch (err) {
    console.error(`[WHOIS ERROR] Domain: ${domain}`, err?.message || err);
    return {
      domain,
      error: err?.message || "whois_lookup_failed",
    };
  }
}

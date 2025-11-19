import dotenv from 'dotenv';
import { WhoisJson } from '@whoisjson/whoisjson';

dotenv.config();

const whoisClient = new WhoisJson({
    apiKey: process.env.WHOIS_API_KEY,
});

const parseDomain = (raw) => {
    if (!raw) return null;
    let domain = raw.toLowerCase().trim();
    domain = domain.replace(/^(https?:\/\/)/, ''); // remove http(s)
    domain = domain.split('/')[0]; // remove path
    domain = domain.replace(/^www\./, ''); // remove www
    return domain;
}

const buildDto = (domain, whoisLookup, nsLookup, sslInfo, availability) => {
    const created = whoisLookup?.created || null;
    const ageInDays = created
        ? Math.floor((new Date() - new Date(created).getTime) / (1000 * 60 * 60 * 24))
        : null;

    return {
        domain,
        whois: whoisLookup || null,
        dns: nsLookup?.records || null,
        ssl: sslInfo || null,
        availability: availability || null,
        meta: {
            ageInDays,
            lastChecked: new Date().toISOString(),
        }
    };
}

export async function analyzeOfficialDomain(rawDomain = '') {
  const domain = parseDomain(rawDomain);
  if (!domain) throw new Error('Invalid domain');

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

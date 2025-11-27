// services/virustotal.service.js
import axios from "axios";

const VT_API = "https://www.virustotal.com/api/v3";
const VT_KEY = process.env.VIRUSTOTAL_API_KEY;

function normalizeDomain(raw) {
  if (!raw) return null;
  let d = raw.trim().toLowerCase();
  d = d.replace(/^(https?:\/\/)/, "");
  d = d.split("/")[0];
  d = d.replace(/^www\./, "");
  return d;
}

function buildDto(domain, data) {
  const stats = data?.attributes?.last_analysis_stats || {};

  return {
    domain,
    malicious: stats.malicious || 0,
    suspicious: stats.suspicious || 0,
    harmless: stats.harmless || 0,
    undetected: stats.undetected || 0,
    reputation: data?.attributes?.reputation ?? null,
    categories: data?.attributes?.categories || {},
    lastAnalysisDate: data?.attributes?.last_analysis_date
      ? new Date(data.attributes.last_analysis_date * 1000).toISOString()
      : null,
    raw: data || null,
    meta: {
      lastCheckedAt: new Date().toISOString(),
    },
  };
}

export async function analyzeDomainVT(rawDomain = "") {
  const domain = normalizeDomain(rawDomain);
  if (!domain) throw new Error("Invalid domain");

  try {
    const res = await axios.get(`${VT_API}/domains/${domain}`, {
      headers: { "x-apikey": VT_KEY },
    });

    return buildDto(domain, res.data.data);
  } catch (err) {
    console.error("[VirusTotal] Error:", err?.response?.data || err.message);
    return {
      domain,
      error: err?.response?.data || err.message,
      meta: { lastCheckedAt: new Date().toISOString() },
    };
  }
}

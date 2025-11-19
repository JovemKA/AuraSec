export class MonitoredDomainEntity {
  /**
   * @param {Object} props
   * @param {string} props.domain - Domínio a ser analisado
   * @param {string} [props.source='generated'] - Origem do domínio (manual, generated)
   * @param {Object} props.whois - Resultado da consulta ao Whois API
   * @param {string} [props.status='pending'] - Status de análise do domínio (pending, checked, alerted)
   * @param {Date} props.firstSeen - Data da primeira detecção do domínio
   * @param {Date} props.lastChecked - Data da última verificação/análise realizada
   * @param {Date} props.createdAt - Data de criação deste registro
   * @param {Date} props.updatedAt - Data de atualização deste registro
   * @param {string} props.id
   * @param {string} props.companyId
   */
  constructor({
    id,
    companyId,
    domain,
    source = 'generated',
    whois = {},
    status = 'pending',
    firstSeen = null,
    lastChecked = null,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.companyId = companyId;
    this.domain = domain;
    this.source = source;
    this.whois = whois;
    this.status = status;
    this.firstSeen = firstSeen
    this.lastChecked = lastChecked;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      companyId: this.companyId,
      domain: this.domain,
      source: this.source,
      whois: this.whois,
      status: this.status,
      firstSeen: this.firstSeen,
      lastChecked: this.lastChecked
    };
  }
}
export class CompanyEntity {
  /**
   * @param {Object} props
   * @param {string} props.name - Nome da empresa
   * @param {Array<{ domain: string, source?: string, verified?: boolean, addedAt?: Date }>} props.officialDomains - Domínios oficiais
   * @param {string[]} props.brandKeywords - Palavras-chave associadas à marca
   * @param {string[]} props.alertEmails - E-mails que receberão alertas
   * @param {string} [props.status='active'] - Status da empresa (active/inactive)
   * @param {Date} [props.createdAt] - Data de criação
   * @param {Date} [props.updatedAt] - Data de atualização
   * @param {string} [props.id] - Identificador (MongoID)
   */
  constructor({
    id = null,
    name,
    officialDomains = [],
    brandKeywords = [],
    alertEmails = [],
    status = 'active',
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    if (!name) throw new Error('Company name is required');
    if (!Array.isArray(officialDomains) || officialDomains.length === 0) {
      throw new Error('At least one official domain is required');
    }

    this.id = id;
    this.name = name;
    this.officialDomains = officialDomains.map(d => ({
      domain: typeof d === 'string' ? d : d.domain,
      source: d.source || 'manual',
      verified: d.verified || false,
      addedAt: d.addedAt || new Date(),
    }));
    this.brandKeywords = brandKeywords;
    this.alertEmails = alertEmails;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Adiciona um novo domínio oficial
   * @param {string|{domain:string,source?:string}} domainData
   */
  addDomain(domainData) {
    const domain = typeof domainData === 'string' ? domainData : domainData.domain;
    const exists = this.officialDomains.some(d => d.domain === domain);
    if (exists) throw new Error(`Domain ${domain} already exists`);
    this.officialDomains.push({
      domain,
      source: domainData.source || 'manual',
      verified: false,
      addedAt: new Date(),
    });
    this.updatedAt = new Date();
  }

  /**
   * Marca um domínio como verificado
   * @param {string} domain
   */
  verifyDomain(domain) {
    const dom = this.officialDomains.find(d => d.domain === domain);
    if (!dom) throw new Error(`Domain ${domain} not found`);
    dom.verified = true;
    this.updatedAt = new Date();
  }

  /**
   * Retorna os dados em formato JSON limpo
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      officialDomains: this.officialDomains,
      brandKeywords: this.brandKeywords,
      alertEmails: this.alertEmails,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

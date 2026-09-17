const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="pca-nav-icon">
    {children}
  </svg>
);

const items = [
  { code: "3.3.90.30.01.00.002", name: "Material de expediente", qty: "300", value: "R$ 8.500,00", status: "Validado", tone: "success" },
  { code: "3.3.90.30.01.00.014", name: "Papel A4", qty: "100", value: "R$ 4.000,00", status: "Validado", tone: "success" },
  { code: "3.3.90.30.01.00.021", name: "Cartucho de tinta", qty: "24", value: "R$ 5.200,00", status: "Pendente", tone: "warning" },
  { code: "3.3.90.30.02.00.007", name: "Água mineral", qty: "120", value: "R$ 1.860,00", status: "Não iniciado", tone: "neutral" },
];

function Status({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span className={`pca-status pca-status-${tone}`}>
      <span className="pca-status-dot" />
      {children}
    </span>
  );
}

function navIcon(type: string) {
  if (type === "dashboard") return <Icon><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Icon>;
  if (type === "pca") return <Icon><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></Icon>;
  if (type === "imports") return <Icon><path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 19h16" /></Icon>;
  if (type === "execution") return <Icon><circle cx="12" cy="12" r="8" /><path d="m10 8 6 4-6 4z" /></Icon>;
  return <Icon><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-1.9 1.9-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V20h-2.7v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1-1.9-1.9.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H6v-2.7h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1 1.9-1.9.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V6h2.7v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1 1.9 1.9-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 1.5 1h.1v2.7h-.1a1.7 1.7 0 0 0-1.5 1Z" /></Icon>;
}

export default function HomePage() {
  return (
    <div className="pca-shell">
      <aside className="pca-sidebar">
        <div className="pca-brand">
          <div className="pca-brand-mark" aria-hidden="true"><span /></div>
          <div className="pca-brand-copy">
            <div className="pca-brand-title">PCA Auto</div>
            <span className="pca-brand-subtitle">Painel de planejamento</span>
          </div>
        </div>

        <nav className="pca-nav" aria-label="Navegação principal">
          <div className="pca-nav-label">Principal</div>
          <a className="pca-nav-item active" href="#"><span>{navIcon("dashboard")}</span><span>Visão geral</span></a>
          <a className="pca-nav-item" href="#pca"><span>{navIcon("pca")}</span><span>Meus PCAs</span></a>
          <a className="pca-nav-item" href="#importar"><span>{navIcon("imports")}</span><span>Importações</span></a>
          <a className="pca-nav-item" href="#execucao"><span>{navIcon("execution")}</span><span>Execuções</span></a>
          <div className="pca-nav-label">Sistema</div>
          <a className="pca-nav-item" href="#config"><span>{navIcon("settings")}</span><span>Configurações</span></a>
        </nav>

        <div className="pca-sidebar-footer">
          Ambiente interno<br />e-ComprasDF · MVP
        </div>
      </aside>

      <div className="pca-content">
        <header className="pca-topbar">
          <div className="pca-breadcrumb">PCA Auto <span> / </span> <strong>Visão geral</strong></div>
          <div className="pca-user">
            <div className="pca-user-copy">
              <div className="pca-user-name">Administração Regional</div>
              <div className="pca-user-role">Candangolândia · GDF</div>
            </div>
            <div className="pca-avatar" aria-label="Administração Regional">AR</div>
          </div>
        </header>

        <main className="pca-main">
          <section className="pca-hero">
            <div>
              <div className="pca-eyebrow">Planejamento 2027</div>
              <h1 className="pca-title">Controle do PCA</h1>
              <p className="pca-subtitle">Prepare, valide e acompanhe os itens antes de executar o lançamento no e-ComprasDF.</p>
            </div>
            <div className="pca-actions">
              <button className="pca-btn pca-btn-secondary" type="button">Salvar rascunho</button>
              <button className="pca-btn pca-btn-primary" type="button"><span>＋</span> Novo PCA</button>
            </div>
          </section>

          <section className="pca-grid pca-kpis" aria-label="Resumo do PCA">
            <div className="pca-card pca-kpi">
              <div className="pca-kpi-top"><span className="pca-kpi-label">Itens no PCA</span><span className="pca-kpi-icon">{navIcon("pca")}</span></div>
              <div className="pca-kpi-value">83</div>
              <div className="pca-kpi-foot"><span className="pca-trend">+83</span> importados neste ciclo</div>
            </div>
            <div className="pca-card pca-kpi">
              <div className="pca-kpi-top"><span className="pca-kpi-label">Validados</span><span className="pca-kpi-icon">✓</span></div>
              <div className="pca-kpi-value">81</div>
              <div className="pca-kpi-foot"><span className="pca-trend">97,6%</span> do total</div>
            </div>
            <div className="pca-card pca-kpi">
              <div className="pca-kpi-top"><span className="pca-kpi-label">Pendências</span><span className="pca-kpi-icon">!</span></div>
              <div className="pca-kpi-value">2</div>
              <div className="pca-kpi-foot">revisões necessárias antes da execução</div>
            </div>
            <div className="pca-card pca-kpi">
              <div className="pca-kpi-top"><span className="pca-kpi-label">Executados</span><span className="pca-kpi-icon">▶</span></div>
              <div className="pca-kpi-value">0</div>
              <div className="pca-kpi-foot">aguardando liberação da execução</div>
            </div>
          </section>

          <section className="pca-grid pca-layout">
            <div className="pca-card pca-panel" id="pca">
              <div className="pca-panel-header">
                <div>
                  <h2 className="pca-panel-title">Itens do PCA</h2>
                  <div className="pca-panel-note">Amostra visual — dados reais entram após a importação.</div>
                </div>
                <a className="pca-link" href="#pca">Ver todos →</a>
              </div>
              <div className="pca-table-wrap">
                <table className="pca-table">
                  <thead><tr><th>Código</th><th>Item</th><th>Qtd.</th><th>Valor</th><th>Status</th></tr></thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.code}>
                        <td><span className="pca-code">{item.code}</span></td>
                        <td><span className="pca-item-name">{item.name}</span></td>
                        <td>{item.qty}</td>
                        <td>{item.value}</td>
                        <td><Status tone={item.tone}>{item.status}</Status></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pca-upload" id="importar">
                <div className="pca-upload-copy">
                  <div className="pca-upload-icon">{navIcon("imports")}</div>
                  <div>
                    <div className="pca-upload-title">Importar novos itens</div>
                    <div className="pca-upload-note">Excel como entrada principal. PDF poderá ser adicionado posteriormente.</div>
                  </div>
                </div>
                <button className="pca-btn pca-btn-primary" type="button">Selecionar arquivo</button>
              </div>
            </div>

            <aside className="pca-card pca-progress-card" id="execucao">
              <div className="pca-panel-header">
                <div>
                  <h2 className="pca-panel-title">Progresso da execução</h2>
                  <div className="pca-panel-note">Status atual do processamento</div>
                </div>
                <Status tone="warning">Aguardando</Status>
              </div>
              <div className="pca-progress-ring"><div className="pca-progress-value">0%<span className="pca-progress-caption">executado</span></div></div>
              <div className="pca-progress-line">
                <div className="pca-progress-row"><span>Validação</span><strong>81 / 83</strong></div>
                <div className="pca-progress-track"><div className="pca-progress-fill" style={{ width: "97.6%" }} /></div>
              </div>
              <div className="pca-progress-line">
                <div className="pca-progress-row"><span>Execução</span><strong>0 / 83</strong></div>
                <div className="pca-progress-track"><div className="pca-progress-fill" style={{ width: "0%" }} /></div>
              </div>
              <button className="pca-btn pca-btn-secondary" type="button" style={{ width: "100%", marginTop: 18, justifyContent: "center" }}>Abrir detalhes da execução</button>
            </aside>
          </section>

          <div className="pca-footer-note">PCA Auto · MVP interno · Interface em desenvolvimento</div>
        </main>
      </div>
    </div>
  );
}

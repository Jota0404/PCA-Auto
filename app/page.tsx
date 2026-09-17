"use client";

import { useMemo, useRef, useState } from "react";

type View = "dashboard" | "pca" | "imports" | "execution" | "settings";

type MockItem = {
  code: string;
  name: string;
  qty: string;
  value: string;
  status: "Validado" | "Pendente" | "Não iniciado";
  tone: "success" | "warning" | "neutral";
};

const initialItems: MockItem[] = [
  { code: "3.3.90.30.01.00.002", name: "Material de expediente", qty: "300", value: "R$ 8.500,00", status: "Validado", tone: "success" },
  { code: "3.3.90.30.01.00.014", name: "Papel A4", qty: "100", value: "R$ 4.000,00", status: "Validado", tone: "success" },
  { code: "3.3.90.30.01.00.021", name: "Cartucho de tinta", qty: "24", value: "R$ 5.200,00", status: "Pendente", tone: "warning" },
  { code: "3.3.90.30.02.00.007", name: "Água mineral", qty: "120", value: "R$ 1.860,00", status: "Não iniciado", tone: "neutral" },
];

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="pca-nav-icon" aria-hidden="true">
    {children}
  </svg>
);

function navIcon(type: string) {
  if (type === "dashboard") return <Icon><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Icon>;
  if (type === "pca") return <Icon><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></Icon>;
  if (type === "imports") return <Icon><path d="M12 3v12" /><path d="m8 11 4 4 4-4" /><path d="M4 19h16" /></Icon>;
  if (type === "execution") return <Icon><circle cx="12" cy="12" r="8" /><path d="m10 8 6 4-6 4z" /></Icon>;
  return <Icon><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1-1.9 1.9-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V20h-2.7v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1-1.9-1.9.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H6v-2.7h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1 1.9-1.9.1.1a1.7 1.7 0 0 0 1.8.3 1.7 1.7 0 0 0 1-1.5V6h2.7v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1 1.9 1.9-.1.1a1.7 1.7 0 0 0-.3 1.8 1.7 1.7 0 0 0 .3 1.8 1.7 1.7 0 0 0 1.5 1h.1v2.7h-.1a1.7 1.7 0 0 0-1.5 1Z" /></Icon>;
}

function Status({ tone, children }: { tone: MockItem["tone"]; children: React.ReactNode }) {
  return (
    <span className={`pca-status pca-status-${tone}`}>
      <span className="pca-status-dot" />
      {children}
    </span>
  );
}

export default function HomePage() {
  const [view, setView] = useState<View>("dashboard");
  const [showNewPca, setShowNewPca] = useState(false);
  const [draftName, setDraftName] = useState("PCA 2027");
  const [draftYear, setDraftYear] = useState("2027");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [items, setItems] = useState(initialItems);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validation = useMemo(() => {
    const valid = items.filter((item) => item.status === "Validado").length;
    return { valid, total: items.length, percentage: items.length ? Math.round((valid / items.length) * 1000) / 10 : 0 };
  }, [items]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2800);
  };

  const selectView = (nextView: View) => setView(nextView);

  const handleNewPca = () => {
    setItems([]);
    setDraftName(`PCA ${draftYear}`);
    setShowNewPca(false);
    setView("dashboard");
    notify("Novo PCA criado como rascunho local.");
  };

  const handleFileSelection = (file: File | undefined) => {
    if (!file) return;
    setSelectedFile(file.name);
    notify(`Arquivo selecionado: ${file.name}`);
  };

  const handleSave = () => notify("Rascunho salvo localmente nesta demonstração.");

  const handleValidate = () => {
    if (items.length === 0) {
      notify("Importe um arquivo antes de validar o PCA.");
      return;
    }
    if (items.some((item) => item.status === "Pendente")) {
      notify("Existem pendências que precisam de revisão antes da execução.");
      return;
    }
    notify("PCA validado e pronto para a próxima etapa.");
  };

  const handleExecution = () => {
    if (items.length === 0) {
      notify("Ainda não existem itens para executar.");
      return;
    }
    if (items.some((item) => item.status === "Pendente")) {
      notify("Corrija as pendências antes de iniciar a execução.");
      return;
    }
    selectView("execution");
  };

  const runMockImport = () => {
    setItems(initialItems);
    notify("Importação simulada concluída. Dados reais serão conectados ao Excel depois.");
    setView("pca");
  };

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
          <button className={`pca-nav-item ${view === "dashboard" ? "active" : ""}`} type="button" onClick={() => selectView("dashboard")}><span>{navIcon("dashboard")}</span><span>Visão geral</span></button>
          <button className={`pca-nav-item ${view === "pca" ? "active" : ""}`} type="button" onClick={() => selectView("pca")}><span>{navIcon("pca")}</span><span>Meus PCAs</span></button>
          <button className={`pca-nav-item ${view === "imports" ? "active" : ""}`} type="button" onClick={() => selectView("imports")}><span>{navIcon("imports")}</span><span>Importações</span></button>
          <button className={`pca-nav-item ${view === "execution" ? "active" : ""}`} type="button" onClick={() => selectView("execution")}><span>{navIcon("execution")}</span><span>Execuções</span></button>
          <div className="pca-nav-label">Sistema</div>
          <button className={`pca-nav-item ${view === "settings" ? "active" : ""}`} type="button" onClick={() => selectView("settings")}><span>{navIcon("settings")}</span><span>Configurações</span></button>
        </nav>

        <div className="pca-sidebar-footer">
          Ambiente interno<br />e-ComprasDF · MVP
        </div>
      </aside>

      <div className="pca-content">
        <header className="pca-topbar">
          <div className="pca-breadcrumb">PCA Auto <span> / </span> <strong>{view === "dashboard" ? "Visão geral" : view === "pca" ? "Meus PCAs" : view === "imports" ? "Importações" : view === "execution" ? "Execuções" : "Configurações"}</strong></div>
          <div className="pca-user">
            <div className="pca-user-copy">
              <div className="pca-user-name">Administração Regional</div>
              <div className="pca-user-role">Candangolândia · GDF</div>
            </div>
            <div className="pca-avatar" aria-label="Administração Regional">AR</div>
          </div>
        </header>

        <main className="pca-main">
          {view === "dashboard" && (
            <>
              <section className="pca-hero">
                <div>
                  <div className="pca-eyebrow">Planejamento {draftYear}</div>
                  <h1 className="pca-title">Controle do PCA</h1>
                  <p className="pca-subtitle">Prepare, valide e acompanhe os itens antes de executar o lançamento no e-ComprasDF.</p>
                </div>
                <div className="pca-actions">
                  <button className="pca-btn pca-btn-secondary" type="button" onClick={handleSave}>Salvar rascunho</button>
                  <button className="pca-btn pca-btn-primary" type="button" onClick={() => setShowNewPca(true)}><span>＋</span> Novo PCA</button>
                </div>
              </section>

              <section className="pca-grid pca-kpis" aria-label="Resumo do PCA">
                <div className="pca-card pca-kpi"><div className="pca-kpi-top"><span className="pca-kpi-label">Itens no PCA</span><span className="pca-kpi-icon">{navIcon("pca")}</span></div><div className="pca-kpi-value">{items.length || 0}</div><div className="pca-kpi-foot"><span className="pca-trend">{items.length ? `+${items.length}` : "0"}</span> importados neste ciclo</div></div>
                <div className="pca-card pca-kpi"><div className="pca-kpi-top"><span className="pca-kpi-label">Validados</span><span className="pca-kpi-icon">✓</span></div><div className="pca-kpi-value">{validation.valid}</div><div className="pca-kpi-foot"><span className="pca-trend">{validation.percentage}%</span> do total</div></div>
                <div className="pca-card pca-kpi"><div className="pca-kpi-top"><span className="pca-kpi-label">Pendências</span><span className="pca-kpi-icon">!</span></div><div className="pca-kpi-value">{items.filter((item) => item.status === "Pendente").length}</div><div className="pca-kpi-foot">revisões necessárias antes da execução</div></div>
                <div className="pca-card pca-kpi"><div className="pca-kpi-top"><span className="pca-kpi-label">Executados</span><span className="pca-kpi-icon">▶</span></div><div className="pca-kpi-value">0</div><div className="pca-kpi-foot">aguardando liberação da execução</div></div>
              </section>

              <section className="pca-grid pca-layout">
                <div className="pca-card pca-panel">
                  <div className="pca-panel-header"><div><h2 className="pca-panel-title">Itens do PCA</h2><div className="pca-panel-note">{items.length ? "Amostra visual — dados de demonstração até o Excel real chegar." : "Nenhum item importado neste rascunho."}</div></div><button className="pca-link pca-link-button" type="button" onClick={() => selectView("pca")}>Ver todos →</button></div>
                  {items.length > 0 ? (
                    <div className="pca-table-wrap"><table className="pca-table"><thead><tr><th>Código</th><th>Item</th><th>Qtd.</th><th>Valor</th><th>Status</th></tr></thead><tbody>{items.map((item) => <tr key={item.code}><td><span className="pca-code">{item.code}</span></td><td><span className="pca-item-name">{item.name}</span></td><td>{item.qty}</td><td>{item.value}</td><td><Status tone={item.tone}>{item.status}</Status></td></tr>)}</tbody></table></div>
                  ) : <div className="pca-empty">Nenhum item carregado. Importe seu arquivo para começar.</div>}
                  <div className="pca-upload">
                    <div className="pca-upload-copy"><div className="pca-upload-icon">{navIcon("imports")}</div><div><div className="pca-upload-title">Importar novos itens</div><div className="pca-upload-note">Excel como entrada principal. PDF poderá ser adicionado posteriormente.</div>{selectedFile && <div className="pca-upload-file">Arquivo selecionado: {selectedFile}</div>}</div></div>
                    <input ref={fileInputRef} className="pca-file-input" type="file" accept=".xlsx,.xls,.csv,.pdf" onChange={(event) => handleFileSelection(event.target.files?.[0])} />
                    <button className="pca-btn pca-btn-primary" type="button" onClick={() => fileInputRef.current?.click()}>Selecionar arquivo</button>
                  </div>
                </div>

                <aside className="pca-card pca-progress-card">
                  <div className="pca-panel-header"><div><h2 className="pca-panel-title">Progresso da execução</h2><div className="pca-panel-note">Status atual do processamento</div></div><Status tone="warning">Aguardando</Status></div>
                  <div className="pca-progress-ring"><div className="pca-progress-value">0%<span className="pca-progress-caption">executado</span></div></div>
                  <div className="pca-progress-line"><div className="pca-progress-row"><span>Validação</span><strong>{validation.valid} / {items.length || 0}</strong></div><div className="pca-progress-track"><div className="pca-progress-fill" style={{ width: `${validation.percentage}%` }} /></div></div>
                  <div className="pca-progress-line"><div className="pca-progress-row"><span>Execução</span><strong>0 / {items.length || 0}</strong></div><div className="pca-progress-track"><div className="pca-progress-fill" style={{ width: "0%" }} /></div></div>
                  <button className="pca-btn pca-btn-secondary" type="button" style={{ width: "100%", marginTop: 18, justifyContent: "center" }} onClick={() => handleExecution()}>Abrir detalhes da execução</button>
                </aside>
              </section>

              <div className="pca-actions" style={{ marginTop: 18, justifyContent: "flex-end" }}><button className="pca-btn pca-btn-secondary" type="button" onClick={handleValidate}>Validar PCA</button><button className="pca-btn pca-btn-primary" type="button" onClick={handleExecution}>Preparar execução</button></div>
            </>
          )}

          {view === "pca" && (
            <section>
              <div className="pca-hero"><div><div className="pca-eyebrow">{draftYear}</div><h1 className="pca-title">Meus PCAs</h1><p className="pca-subtitle">Revise os itens importados e acompanhe o estado do planejamento.</p></div><div className="pca-actions"><button className="pca-btn pca-btn-primary" type="button" onClick={() => setShowNewPca(true)}>＋ Novo PCA</button></div></div>
              <div className="pca-card pca-panel"><div className="pca-panel-header"><div><h2 className="pca-panel-title">{draftName}</h2><div className="pca-panel-note">Rascunho local · {items.length} itens</div></div><Status tone={items.some((item) => item.status === "Pendente") ? "warning" : "success"}>{items.some((item) => item.status === "Pendente") ? "Revisão necessária" : "Pronto para revisar"}</Status></div><div className="pca-table-wrap"><table className="pca-table"><thead><tr><th>Código</th><th>Item</th><th>Qtd.</th><th>Valor</th><th>Status</th></tr></thead><tbody>{items.length ? items.map((item) => <tr key={item.code}><td><span className="pca-code">{item.code}</span></td><td><span className="pca-item-name">{item.name}</span></td><td>{item.qty}</td><td>{item.value}</td><td><Status tone={item.tone}>{item.status}</Status></td></tr>) : <tr><td colSpan={5}><div className="pca-empty">Nenhum item importado.</div></td></tr>}</tbody></table></div><div className="pca-actions" style={{ marginTop: 20 }}><button className="pca-btn pca-btn-secondary" type="button" onClick={() => setView("dashboard")}>← Voltar</button><button className="pca-btn pca-btn-secondary" type="button" onClick={handleValidate}>Validar PCA</button><button className="pca-btn pca-btn-primary" type="button" onClick={handleExecution}>Preparar execução</button></div></div>
            </section>
          )}

          {view === "imports" && (
            <section>
              <div className="pca-hero"><div><div className="pca-eyebrow">Entrada de dados</div><h1 className="pca-title">Importações</h1><p className="pca-subtitle">Área para receber arquivos e acompanhar o processamento da entrada.</p></div></div>
              <div className="pca-card pca-panel"><div className="pca-panel-header"><div><h2 className="pca-panel-title">Nova importação</h2><div className="pca-panel-note">Nesta fase a importação é apenas demonstrativa.</div></div></div><div className="pca-upload" style={{ marginTop: 0 }}><div className="pca-upload-copy"><div className="pca-upload-icon">{navIcon("imports")}</div><div><div className="pca-upload-title">{selectedFile ?? "Selecione um arquivo"}</div><div className="pca-upload-note">Excel é o formato principal; PDF entra em uma etapa futura.</div></div></div><input ref={fileInputRef} className="pca-file-input" type="file" accept=".xlsx,.xls,.csv,.pdf" onChange={(event) => handleFileSelection(event.target.files?.[0])} /><button className="pca-btn pca-btn-primary" type="button" onClick={() => fileInputRef.current?.click()}>Selecionar arquivo</button></div>{selectedFile && <div className="pca-actions" style={{ marginTop: 18 }}><button className="pca-btn pca-btn-primary" type="button" onClick={runMockImport}>Simular importação</button></div>}</div>
            </section>
          )}

          {view === "execution" && (
            <section>
              <div className="pca-hero"><div><div className="pca-eyebrow">Processamento</div><h1 className="pca-title">Execução</h1><p className="pca-subtitle">Acompanhe o andamento da execução item a item.</p></div><Status tone="warning">Aguardando</Status></div>
              <div className="pca-grid pca-layout"><div className="pca-card pca-panel"><div className="pca-panel-header"><div><h2 className="pca-panel-title">Resumo</h2><div className="pca-panel-note">A execução real permanece bloqueada até a integração ser validada.</div></div></div><div className="pca-kpi-value">0%</div><div className="pca-progress-track" style={{ marginTop: 10 }}><div className="pca-progress-fill" style={{ width: "0%" }} /></div><div className="pca-actions" style={{ marginTop: 20 }}><button className="pca-btn pca-btn-secondary" type="button" onClick={() => setView("dashboard")}>← Voltar</button><button className="pca-btn pca-btn-primary" type="button" onClick={() => notify("A execução real ainda está bloqueada no MVP.")}>Executar</button></div></div><aside className="pca-card pca-progress-card"><h2 className="pca-panel-title">Itens</h2><div className="pca-panel-note" style={{ marginBottom: 14 }}>{items.length} itens preparados</div>{items.length ? items.map((item) => <div key={item.code} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eef1f3" }}><span className="pca-item-name">{item.name}</span><Status tone={item.tone}>{item.status}</Status></div>) : <div className="pca-empty">Nenhum item preparado.</div>}</aside></div>
            </section>
          )}

          {view === "settings" && (
            <section>
              <div className="pca-hero"><div><div className="pca-eyebrow">Sistema</div><h1 className="pca-title">Configurações</h1><p className="pca-subtitle">Preferências do ambiente interno do PCA Auto.</p></div></div>
              <div className="pca-card pca-panel"><h2 className="pca-panel-title">Ambiente</h2><div className="pca-settings-grid"><div><span className="pca-settings-label">Unidade</span><strong>Administração Regional da Candangolândia</strong></div><div><span className="pca-settings-label">Sistema</span><strong>e-ComprasDF</strong></div><div><span className="pca-settings-label">Modo</span><strong>Simulação / investigação</strong></div></div></div>
            </section>
          )}

          <div className="pca-footer-note">PCA Auto · MVP interno · Interface em desenvolvimento</div>
        </main>
      </div>

      {showNewPca && (
        <div className="pca-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowNewPca(false); }}>
          <div className="pca-modal" role="dialog" aria-modal="true" aria-labelledby="new-pca-title">
            <div className="pca-modal-head"><div><div className="pca-eyebrow">Novo planejamento</div><h2 id="new-pca-title">Criar PCA</h2></div><button className="pca-modal-close" type="button" onClick={() => setShowNewPca(false)} aria-label="Fechar">×</button></div>
            <div className="pca-form-grid">
              <label><span>Ano</span><input value={draftYear} onChange={(event) => setDraftYear(event.target.value)} inputMode="numeric" /></label>
              <label><span>Nome do PCA</span><input value={draftName} onChange={(event) => setDraftName(event.target.value)} /></label>
              <label className="pca-form-full"><span>Unidade</span><input defaultValue="Administração Regional da Candangolândia" /></label>
            </div>
            <div className="pca-modal-note">Esta ação cria apenas o rascunho da interface. A persistência real será ligada ao backend na próxima etapa.</div>
            <div className="pca-actions" style={{ marginTop: 20 }}><button className="pca-btn pca-btn-secondary" type="button" onClick={() => setShowNewPca(false)}>Cancelar</button><button className="pca-btn pca-btn-primary" type="button" onClick={handleNewPca}>Criar rascunho</button></div>
          </div>
        </div>
      )}

      {toast && <div className="pca-toast" role="status">{toast}</div>}
    </div>
  );
}

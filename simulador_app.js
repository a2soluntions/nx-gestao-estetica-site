/**
 * Simulador Interativo Oficial 100% Fiel ao NX Gestão Estética v2.5 (Desktop)
 * Inclui os 12 Módulos Reais da Barra Lateral, Header Oficial (Manual, Tela Cheia, Tema Dark/Claro, Sino de Notificações, Usuário)
 * e 100% de padronização visual de cores e tamanhos de cards (sem misturar capturas claras/escuras).
 */

(function () {
  // Estado Global em Memória (Sem Banco de Dados)
  const state = {
    theme: 'dark', // 'dark' | 'light'
    currentPage: 'dashboard',
    fullscreen: false,
    filtroDia: 'Todos',
    filtroMes: 'Outubro',
    filtroAno: '2026',
    servicoSubTab: 'procedimentos', // 'procedimentos' | 'pacotes'
    configSubTab: 'empresa', // 'empresa' | 'usuarios' | 'profissionais' | 'whatsapp' | 'backups' | 'anamnese_cfg'
    estudioTool: 'balao', // 'balao' | 'paquimetro' | 'projecao'
    estudioSlider: 50,
    estudioProjecaoPct: 85,
    estudioMarkers: [
      { x: 34, y: 38, targetX: 43, targetY: 46, label: 'Redução de Linhas (-35%)', tipo: 'balao' },
      { x: 66, y: 52, targetX: 73, targetY: 58, label: 'Simetria Facial: 42,8 mm', tipo: 'paquimetro' }
    ],
    empresa: {
      nome: 'Clínica NX Gestão Estética',
      cnpj: '45.123.890/0001-12',
      telefone: '(34) 9840-8962',
      endereco: 'Av. Brasil, 1450 - Centro',
      backupFreq: 'Sempre ao fechar o sistema',
      notificacoesDesktop: true
    },
    clientes: [
      { id: 1, nome: 'Dra. Fernanda Lima', tel: '(11) 99812-3400', cpf: '341.890.128-00', visitas: 12, totalGasto: 3450.00, ultima: '04/10/2026', pacote: 'Botox + Skinbooster' },
      { id: 2, nome: 'Patrícia Abravanel', tel: '(11) 99104-8821', cpf: '289.441.098-12', visitas: 8, totalGasto: 2180.00, ultima: '05/10/2026', pacote: 'Combo 10x Drenagem (3/10)' },
      { id: 3, nome: 'Mariana Ximenes', tel: '(21) 98834-1029', cpf: '198.332.765-44', visitas: 5, totalGasto: 1490.00, ultima: '02/10/2026', pacote: 'Rejuvenescimento (3/5)' },
      { id: 4, nome: 'Carolina Dieckmann', tel: '(21) 99741-5560', cpf: '412.009.871-33', visitas: 6, totalGasto: 1820.00, ultima: '01/10/2026', pacote: 'Depilação a Laser (5/8)' },
      { id: 5, nome: 'Bianca Andrade', tel: '(11) 98450-9911', cpf: '501.239.884-90', visitas: 4, totalGasto: 980.00, ultima: '05/10/2026', pacote: 'Nenhum' }
    ],
    profissionais: [
      { id: 1, nome: 'Dra. Camila Rocha', esp: 'Harmonização & Injetáveis', comissao: 40, status: 'Ativo' },
      { id: 2, nome: 'Juliana Martins', esp: 'Estética Corporal & Massagem', comissao: 35, status: 'Ativo' },
      { id: 3, nome: 'Ana Paula Souza', esp: 'Estética Facial & Laser', comissao: 35, status: 'Ativo' }
    ],
    servicos: [
      { id: 1, icone: '💉', tipoIcone: 'Injetáveis / HOF', nome: 'Aplicação Toxina Botulínica (Botox)', categoria: 'Harmonização', duracao: '45 min', preco: 890.00 },
      { id: 2, icone: '🧖‍♀️', tipoIcone: 'Limpeza Facial', nome: 'Limpeza de Pele Profunda + Peeling', categoria: 'Estética Facial', duracao: '60 min', preco: 160.00 },
      { id: 3, icone: '🛏️', tipoIcone: 'Maca Clínica', nome: 'Drenagem Linfática Método Renata França', categoria: 'Estética Corporal', duracao: '50 min', preco: 140.00 },
      { id: 4, icone: '⚡', tipoIcone: 'Ponteira Laser', nome: 'Sessão Depilação a Laser Completa', categoria: 'Laser', duracao: '40 min', preco: 220.00 },
      { id: 5, icone: '💧', tipoIcone: 'Sérum Conta-Gotas', nome: 'Microagulhamento com Drug Delivery', categoria: 'Estética Facial', duracao: '60 min', preco: 380.00 },
      { id: 6, icone: '🪨', tipoIcone: 'Pedras Quentes', nome: 'Massagem Relaxante com Pedras Quentes', categoria: 'Spa & Massagem', duracao: '60 min', preco: 150.00 }
    ],
    pacotes: [
      { id: 1, nome: 'Combo Redução de Medidas (10x Drenagem)', cliente: 'Patrícia Abravanel', feitas: 3, total: 10, valor: 1190.00 },
      { id: 2, nome: 'Protocolo Rejuvenescimento Facial (5 Sessões)', cliente: 'Mariana Ximenes', feitas: 3, total: 5, valor: 1450.00 },
      { id: 3, nome: 'Pacote Depilação a Laser (8 Sessões)', cliente: 'Carolina Dieckmann', feitas: 5, total: 8, valor: 1280.00 }
    ],
    estoque: [
      { id: 1, icone: '💉', nome: 'Toxina Botulínica 100U', cat: 'Injetáveis', qtd: 2, min: 5, custo: 420.00, venda: 890.00 },
      { id: 2, icone: '💧', nome: 'Sérum Vitamina C 20% (Home Care)', cat: 'Dermocosméticos', qtd: 3, min: 5, custo: 55.00, venda: 135.00 },
      { id: 3, icone: '🧴', nome: 'Creme Redutor Lipolítico 500g', cat: 'Cabine Corporal', qtd: 8, min: 3, custo: 68.00, venda: 150.00 },
      { id: 4, icone: '🧪', nome: 'Ácido Hialurônico Reticulado 1ml', cat: 'Preenchedores', qtd: 6, min: 4, custo: 290.00, venda: 950.00 },
      { id: 5, icone: '🧤', nome: 'Caixa Luvas Nitrílicas Sem Pó', cat: 'Descartáveis', qtd: 2, min: 4, custo: 32.00, venda: 0.00 }
    ],
    agendamentos: [
      { id: 101, hora: '09:00', data: '05/10/2026', cliente: 'Dra. Fernanda Lima', servico: 'Aplicação Toxina Botulínica (Botox)', prof: 'Dra. Camila Rocha', valor: 890.00, status: 'Confirmado' },
      { id: 102, hora: '10:30', data: '05/10/2026', cliente: 'Patrícia Abravanel', servico: 'Drenagem Linfática (Sessão 3/10)', prof: 'Juliana Martins', valor: 140.00, status: 'Em Atendimento' },
      { id: 103, hora: '13:30', data: '05/10/2026', cliente: 'Mariana Ximenes', servico: 'Limpeza de Pele Profunda + Peeling', prof: 'Ana Paula Souza', valor: 160.00, status: 'Confirmado' },
      { id: 104, hora: '15:00', data: '05/10/2026', cliente: 'Carolina Dieckmann', servico: 'Sessão Depilação a Laser Completa', prof: 'Ana Paula Souza', valor: 220.00, status: 'Aguardando' },
      { id: 105, hora: '16:30', data: '05/10/2026', cliente: 'Bianca Andrade', servico: 'Microagulhamento com Drug Delivery', prof: 'Dra. Camila Rocha', valor: 380.00, status: 'Concluído' }
    ],
    comandaPdv: [
      { nome: 'Limpeza de Pele Profunda + Peeling', tipo: 'Serviço', preco: 160.00 },
      { nome: 'Sérum Vitamina C 20% (Home Care)', tipo: 'Produto', preco: 135.00 }
    ],
    pdvDesconto: 0,
    pdvFormaPag: 'PIX',
    vendasRealizadas: [
      { id: 145, data: '05/10/2026 09:50', cliente: 'Dra. Fernanda Lima', itens: 'Aplicação Toxina Botulínica', prof: 'Dra. Camila Rocha', forma: 'PIX', total: 890.00, comissao: 356.00 },
      { id: 146, data: '05/10/2026 11:20', cliente: 'Bianca Andrade', itens: 'Microagulhamento + Sérum', prof: 'Dra. Camila Rocha', forma: 'Cartão de Crédito', total: 515.00, comissao: 206.00 },
      { id: 147, data: '04/10/2026 16:40', cliente: 'Patrícia Abravanel', itens: 'Combo 10x Drenagem Linfática', prof: 'Juliana Martins', forma: 'PIX', total: 1190.00, comissao: 416.50 },
      { id: 148, data: '04/10/2026 14:15', cliente: 'Mariana Ximenes', itens: 'Limpeza de Pele Profunda', prof: 'Ana Paula Souza', forma: 'Dinheiro', total: 160.00, comissao: 56.00 }
    ],
    lancamentosFin: [
      { id: 1, data: '05/10/2026', desc: 'Comanda #145 - Dra. Fernanda Lima', cat: 'Receita de Procedimentos', tipo: 'Entrada', valor: 890.00, status: 'Pago' },
      { id: 2, data: '05/10/2026', desc: 'Comanda #146 - Bianca Andrade', cat: 'Receita de Procedimentos', tipo: 'Entrada', valor: 515.00, status: 'Pago' },
      { id: 3, data: '04/10/2026', desc: 'Compra de Insumos & Dermocosméticos', cat: 'Fornecedores', tipo: 'Saída', valor: 640.00, status: 'Pago' },
      { id: 4, data: '03/10/2026', desc: 'Energia Elétrica & Internet da Clínica', cat: 'Despesa Fixa', tipo: 'Saída', valor: 380.00, status: 'Pago' }
    ],
    anamneses: [
      { codigo: 'ANM-001', data: '05/10/2026', cliente: 'Dra. Fernanda Lima', queixa: 'Rugas dinâmicas em fronte e glabela', alergia: 'Nenhuma alergia relatada', gestante: 'Não', assinado: true },
      { codigo: 'ANM-002', data: '04/10/2026', cliente: 'Patrícia Abravanel', queixa: 'Retenção hídrica abdominal e flancos', alergia: 'Sensibilidade a cânfora', gestante: 'Não', assinado: true },
      { codigo: 'ANM-003', data: '02/10/2026', cliente: 'Mariana Ximenes', queixa: 'Manchas solares (melasma leve) e poros dilatados', alergia: 'Dipirona', gestante: 'Não', assinado: true }
    ]
  };

  // Paletas Oficiais Idênticas ao ui/theme_manager.py
  const THEMES = {
    dark: {
      bgMain: '#060807',
      bgSidebar: '#050706',
      bgHeader: '#060807',
      bgCard: '#0F1210',
      bgCardClean: '#101613',
      bgCardRow: '#141C17',
      bgInput: '#060907',
      borderCard: '#1E2620',
      borderSidebar: '#121A14',
      borderHeader: 'rgba(0, 255, 65, 0.25)',
      textPrimary: '#FFFFFF',
      textSecondary: '#BAC2BC',
      textMuted: '#8C9990',
      textKpi: '#9CA39E',
      accent: '#00FF41',
      accentHover: '#1AFF53',
      btnText: '#040805',
      bgProgress: '#1F2B22'
    },
    light: {
      bgMain: '#F4F7F5',
      bgSidebar: '#FFFFFF',
      bgHeader: '#FFFFFF',
      bgCard: '#FFFFFF',
      bgCardClean: '#FFFFFF',
      bgCardRow: '#F4F7F5',
      bgInput: '#FFFFFF',
      borderCard: '#D8E3DA',
      borderSidebar: '#E2EBE4',
      borderHeader: 'rgba(0, 168, 45, 0.35)',
      textPrimary: '#121A14',
      textSecondary: '#3D4F42',
      textMuted: '#607366',
      textKpi: '#5A6E60',
      accent: '#00A82D',
      accentHover: '#008F26',
      btnText: '#FFFFFF',
      bgProgress: '#E2EBE4'
    }
  };

  // Lista Oficial dos 12 Módulos da Sidebar na Ordem Exata do Desktop
  const SIDEBAR_ITEMS = [
    { id: 'dashboard', title: 'Dashboard', icon: 'layout-grid' },
    { id: 'agendamentos', title: 'Agendamentos', icon: 'calendar' },
    { id: 'atendimento', title: 'Atendimento', icon: 'stethoscope' },
    { id: 'pdv', title: 'Vendas (PDV)', icon: 'shopping-cart' },
    { id: 'relatorios', title: 'Relatório de Vendas', icon: 'bar-chart-2' },
    { id: 'negocios', title: 'Meus Negócios', icon: 'trending-up' },
    { id: 'financeiro', title: 'Financeiro', icon: 'dollar-sign' },
    { id: 'clientes', title: 'Clientes', icon: 'user' },
    { id: 'anamnese', title: 'Anamnese', icon: 'clipboard-check' },
    { id: 'servicos', title: 'Serviços', icon: 'scissors' },
    { id: 'estoque', title: 'Produtos / Estoque', icon: 'package' },
    { id: 'configuracoes', title: 'Configurações', icon: 'settings' }
  ];

  const PAGE_TITLES = {
    dashboard: 'Dashboard',
    agendamentos: 'Agendamentos',
    atendimento: 'Sala de Atendimento & Estúdio Antes/Depois',
    pdv: 'Vendas (PDV)',
    relatorios: 'Relatório de Vendas',
    negocios: 'Como Vai Meus Negócios',
    financeiro: 'Financeiro & Comissões',
    clientes: 'Clientes',
    anamnese: 'Fichas de Anamnese',
    servicos: 'Serviços & Pacotes Multi-Sessões',
    estoque: 'Produtos / Estoque',
    configuracoes: 'Configurações do Sistema'
  };

  function fmtMoeda(v) {
    return 'R$ ' + Number(v || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Renderizador Principal do Simulador
  window.renderNxWebSimulator = function () {
    const root = document.getElementById('nx-web-app-root');
    if (!root) return;
    const t = THEMES[state.theme];

    root.style.backgroundColor = t.bgMain;
    root.style.color = t.textPrimary;
    root.style.borderColor = t.accent;

    root.innerHTML = `
      <div class="flex flex-col w-full h-full overflow-hidden select-none" style="background:${t.bgMain}; color:${t.textPrimary}; font-family:'Segoe UI','Plus Jakarta Sans',sans-serif;">
        <!-- Barra Superior de Controle daJanela (Estilo Windows + Aviso Simulador) -->
        <div class="h-8 px-3 flex items-center justify-between text-[11px] shrink-0" style="background:#040705; border-bottom:1px solid #142218; color:#9CA39E;">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
            <span class="font-bold text-white ml-1">NX Gestão Estética v2.5</span>
            <span class="hidden sm:inline-block px-2 py-0.5 rounded bg-[#0E2416] text-[#00FF41] font-bold text-[10px]">
              ● Versão Web de Interação (Sem Banco de Dados • Teste todos os 12 menus à vontade)
            </span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="nxSimToggleFullscreen()" class="px-2.5 py-0.5 rounded bg-[#101C14] hover:bg-[#192D20] text-[#00FF41] border border-[#1E3B27] font-bold text-[10px] transition">
              ${state.fullscreen ? '✕ Sair da Tela Cheia (ESC)' : '⛶ Expandir em Tela Cheia'}
            </button>
          </div>
        </div>

        <!-- Corpo Principal: Sidebar (220px) + Área Direita (Header 52px + Conteúdo) -->
        <div class="flex-1 flex overflow-hidden">
          <!-- SIDEBAR OFICIAL (12 MÓDULOS) -->
          <aside class="w-52 shrink-0 flex flex-col justify-between overflow-y-auto px-3 py-4" style="background:${t.bgSidebar}; border-right:1px solid ${t.borderSidebar};">
            <div>
              <!-- Logo Centralizada igual ao dashboard_view.py -->
              <div class="flex flex-col items-center mb-4">
                <img src="assets/logo.png" alt="NX" class="h-12 w-auto object-contain mb-1">
                <span class="text-xs font-bold tracking-wide" style="color:${t.accent};">NX Gestão Estética</span>
              </div>

              <!-- 12 Botões de Navegação -->
              <div class="space-y-1">
                ${SIDEBAR_ITEMS.map(item => {
                  const active = state.currentPage === item.id;
                  const bg = active ? 'rgba(0, 255, 65, 0.08)' : 'transparent';
                  const border = active ? `1px solid ${t.accent}` : '1px solid transparent';
                  const color = active ? (state.theme === 'light' ? t.accent : '#FFFFFF') : t.textMuted;
                  const iconColor = active ? t.accent : t.textMuted;
                  const weight = active ? '600' : '500';
                  return `
                    <button type="button" onclick="nxSimSelectPage('${item.id}')"
                      class="w-full h-9 px-3 rounded-[9px] flex items-center gap-2.5 text-left transition text-[12.5px]"
                      style="background:${bg}; border:${border}; color:${color}; font-weight:${weight};">
                      <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0" style="color:${iconColor};"></i>
                      <span class="truncate">${item.title}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="pt-3 mt-3 text-center text-[10px]" style="border-top:1px solid ${t.borderSidebar}; color:${t.textMuted};">
              v2.5 • SQLite Local (Zero Nuvem)
            </div>
          </aside>

          <!-- CONTAINER DIREITO: HEADER (52px) + PÁGINA ATIVA -->
          <div class="flex-1 flex flex-col overflow-hidden" style="background:${t.bgMain};">
            <!-- HEADER OFICIAL -->
            <header class="h-[50px] px-5 flex items-center justify-between shrink-0" style="background:${t.bgHeader}; border-bottom:1px solid ${t.borderHeader};">
              <h2 class="text-base sm:text-[18px] font-semibold truncate" style="color:${t.textPrimary};">
                ${PAGE_TITLES[state.currentPage] || 'Dashboard'}
              </h2>

              <div class="flex items-center gap-2.5">
                <!-- Badge Teste Grátis 15 Dias -->
                <button type="button" onclick="nxSimAbrirModalLicenca()" class="hidden md:inline-flex items-center h-7 px-2.5 rounded-md text-[11px] font-bold transition"
                  style="background:#261B04; color:#FFB300; border:1px solid #784E06;">
                  ⏳ Teste Grátis: Restam 15 dias
                </button>

                <!-- Botão Manual Embutido -->
                <button type="button" onclick="nxSimAbrirManualModal()" class="inline-flex items-center h-7 px-2.5 rounded-md text-[11.5px] font-semibold transition"
                  style="background:#0E1812; color:#00FF41; border:1px solid #1A3824;">
                  📖 Manual
                </button>

                <!-- Botão Alternar Tema Dark / Claro -->
                <button type="button" onclick="nxSimToggleTheme()" title="Alternar entre Modo Escuro (Dark) e Modo Dia (Claro)"
                  class="w-8 h-8 rounded-lg flex items-center justify-center transition"
                  style="background:${t.bgCard}; border:1px solid ${t.borderCard}; color:${t.accent};">
                  <i data-lucide="${state.theme === 'dark' ? 'sun' : 'moon'}" class="w-4 h-4"></i>
                </button>

                <!-- Sino Central de Notificações -->
                <button type="button" onclick="nxSimAbrirNotificacoesModal()" title="Central de Notificações do Sistema"
                  class="relative w-8 h-8 rounded-lg flex items-center justify-center transition"
                  style="background:${t.bgCard}; border:1px solid ${t.borderCard}; color:${t.textMuted};">
                  <i data-lucide="bell" class="w-4 h-4"></i>
                  <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00FF41] text-[#040805] text-[9px] font-extrabold flex items-center justify-center">3</span>
                </button>

                <!-- Usuário Logado -->
                <div class="hidden sm:flex items-center gap-2 pl-2" style="border-left:1px solid ${t.borderCard};">
                  <div class="text-right leading-tight">
                    <span class="block text-[11.5px] font-semibold" style="color:${t.textPrimary};">Administrador</span>
                    <span class="block text-[10px] font-bold" style="color:${t.accent};">• Admin</span>
                  </div>
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style="background:${t.bgCard}; border:2px solid ${t.accent};">
                    👩‍⚕️
                  </div>
                </div>
              </div>
            </header>

            <!-- CONTEÚDO ROLÁVEL DA PÁGINA ATUAL -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3" style="background:${t.bgMain};">
              ${renderCurrentPageContent(t)}
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  function renderCurrentPageContent(t) {
    switch (state.currentPage) {
      case 'dashboard': return renderDashboard(t);
      case 'agendamentos': return renderAgendamentos(t);
      case 'atendimento': return renderAtendimento(t);
      case 'pdv': return renderPdv(t);
      case 'relatorios': return renderRelatorioVendas(t);
      case 'negocios': return renderMeusNegocios(t);
      case 'financeiro': return renderFinanceiro(t);
      case 'clientes': return renderClientes(t);
      case 'anamnese': return renderAnamnese(t);
      case 'servicos': return renderServicos(t);
      case 'estoque': return renderEstoque(t);
      case 'configuracoes': return renderConfiguracoes(t);
      default: return renderDashboard(t);
    }
  }

  // =========================================================================
  // 1. DASHBOARD (Proporções idênticas ao ui/dashboard_view.py)
  // =========================================================================
  function renderDashboard(t) {
    const mult = state.filtroDia === 'Todos' ? 1 : 0.15;
    const fatMes = (45200 * mult).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    const agDia = state.agendamentos.length;
    const totalCli = state.clientes.length + 1235;

    return `
      <!-- Barra de Filtros: Dia / Mês / Ano + Botão Filtrar -->
      <div class="flex flex-wrap items-center gap-2 pb-1">
        <span class="text-xs font-medium" style="color:${t.textMuted};">Dia</span>
        <select onchange="nxSimSetFiltro('dia', this.value)" class="h-8 px-2.5 rounded-lg text-xs font-medium outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
          <option value="Todos" ${state.filtroDia === 'Todos' ? 'selected' : ''}>Todos</option>
          <option value="Hoje (05)" ${state.filtroDia === 'Hoje (05)' ? 'selected' : ''}>Hoje (05)</option>
        </select>

        <span class="text-xs font-medium ml-1" style="color:${t.textMuted};">Mês</span>
        <select onchange="nxSimSetFiltro('mes', this.value)" class="h-8 px-2.5 rounded-lg text-xs font-medium outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
          <option>Outubro</option><option>Setembro</option><option>Agosto</option>
        </select>

        <span class="text-xs font-medium ml-1" style="color:${t.textMuted};">Ano</span>
        <select class="h-8 px-2.5 rounded-lg text-xs font-medium outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
          <option>2026</option><option>2025</option>
        </select>

        <button type="button" onclick="renderNxWebSimulator()" class="h-8 px-4 rounded-lg text-xs font-bold transition" style="background:${t.accent}; color:${t.btnText};">
          Filtrar
        </button>
      </div>

      <!-- 4 KPI Cards Padrão (Altura Compacta 82px) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div class="h-[82px] rounded-xl px-4 py-3 flex items-center justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div>
            <span class="text-[11.5px] font-medium block" style="color:${t.textKpi};">Total de Clientes</span>
            <span class="text-xl font-bold mt-0.5 block" style="color:${t.textPrimary};">${totalCli}</span>
          </div>
          <i data-lucide="users" class="w-5 h-5" style="color:${t.textMuted};"></i>
        </div>

        <div class="h-[82px] rounded-xl px-4 py-3 flex items-center justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div>
            <span class="text-[11.5px] font-medium block" style="color:${t.textKpi};">Agendamentos do Dia</span>
            <span class="text-xl font-bold mt-0.5 block" style="color:${t.textPrimary};">${agDia}</span>
          </div>
          <i data-lucide="calendar" class="w-5 h-5" style="color:${t.textMuted};"></i>
        </div>

        <div class="h-[82px] rounded-xl px-4 py-3 flex items-center justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div>
            <span class="text-[11.5px] font-medium block" style="color:${t.textKpi};">Faturamento do Mês</span>
            <span class="text-xl font-bold mt-0.5 block" style="color:${t.accent};">R$ ${fatMes}</span>
          </div>
          <i data-lucide="trending-up" class="w-5 h-5" style="color:${t.accent};"></i>
        </div>

        <div class="h-[82px] rounded-xl px-4 py-3 flex items-center justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div>
            <span class="text-[11.5px] font-medium block" style="color:${t.textKpi};">Ticket Médio</span>
            <span class="text-xl font-bold mt-0.5 block" style="color:${t.textPrimary};">R$ 245,00</span>
          </div>
          <i data-lucide="award" class="w-5 h-5" style="color:${t.textMuted};"></i>
        </div>
      </div>

      <!-- Linha do Meio: A Receber / Recebido no Caixa (Esquerda) + Gráfico de Faturamento Mensal (Direita) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        <div class="lg:col-span-4 flex flex-col gap-2.5">
          <div class="h-[92px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <span class="text-[11.5px] font-medium" style="color:${t.textKpi};">A Receber (Fiado / Parcelas)</span>
            <span class="text-lg font-bold mt-0.5" style="color:${t.textPrimary};">R$ 1.850,00</span>
            <span class="text-[10.5px]" style="color:${t.textMuted};">↑ 1.26% (comparativo mensal)</span>
          </div>
          <div class="h-[92px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <span class="text-[11.5px] font-medium" style="color:${t.textKpi};">Recebido no Caixa</span>
            <span class="text-lg font-bold mt-0.5" style="color:${t.textPrimary};">R$ 43.350,00</span>
            <span class="text-[10.5px]" style="color:${t.accent};">↑ 7.1% (comparativo mensal)</span>
          </div>
        </div>

        <div class="lg:col-span-8 h-[194px] rounded-xl p-4 flex flex-col justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold" style="color:${t.textPrimary};">Gráfico de Faturamento Mensal</span>
            <span class="text-[10px] font-bold" style="color:${t.accent};">● Evolução Diária</span>
          </div>
          <!-- Curva SVG Suave Fiel ao LineChartWidget -->
          <svg viewBox="0 0 600 110" class="w-full h-28 overflow-visible">
            <defs>
              <linearGradient id="nxGradLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${t.accent}" stop-opacity="0.32"/>
                <stop offset="100%" stop-color="${t.accent}" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <line x1="0" y1="25" x2="600" y2="25" stroke="${t.borderCard}" stroke-dasharray="3 3" stroke-width="1"/>
            <line x1="0" y1="60" x2="600" y2="60" stroke="${t.borderCard}" stroke-dasharray="3 3" stroke-width="1"/>
            <line x1="0" y1="95" x2="600" y2="95" stroke="${t.borderCard}" stroke-width="1"/>
            <path d="M 10 85 Q 75 70, 130 50 T 250 55 T 370 28 T 490 35 T 590 15 L 590 95 L 10 95 Z" fill="url(#nxGradLine)"/>
            <path d="M 10 85 Q 75 70, 130 50 T 250 55 T 370 28 T 490 35 T 590 15" fill="none" stroke="${t.accent}" stroke-width="2.5"/>
            <circle cx="130" cy="50" r="3.5" fill="${t.accent}"/>
            <circle cx="370" cy="28" r="3.5" fill="${t.accent}"/>
            <circle cx="590" cy="15" r="4" fill="${t.accent}"/>
          </svg>
          <div class="flex justify-between text-[10px]" style="color:${t.textMuted};">
            <span>01 Out</span><span>05 Out</span><span>10 Out</span><span>15 Out</span><span>20 Out</span><span>25 Out</span><span>30 Out</span>
          </div>
        </div>
      </div>

      <!-- 5 Indicadores Compactos do Mês (Altura 78px) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        ${[
          { tit: 'Atendimentos Finalizados', val: '128', diff: '↑ 11.4% no mês', green: false, icon: 'check-circle' },
          { tit: 'Cancelados', val: '4', diff: '↓ 2.1% no mês', green: false, icon: 'x-circle' },
          { tit: 'Faltas', val: '2', diff: 'Reduzido via WhatsApp', green: false, icon: 'user-x' },
          { tit: 'Gastos / Despesas', val: 'R$ 5.120,00', diff: 'Insumos + Fixos', green: false, icon: 'arrow-down-circle' },
          { tit: 'Lucro Líquido', val: 'R$ 38.230,00', diff: '↑ 18.3% margem real', green: true, icon: 'dollar-sign' }
        ].map(ind => `
          <div class="h-[78px] rounded-xl px-3.5 py-2.5 flex items-center gap-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <i data-lucide="${ind.icon}" class="w-5 h-5 shrink-0" style="color:${t.accent};"></i>
            <div class="min-w-0">
              <span class="text-[11px] font-medium truncate block" style="color:${t.textKpi};">${ind.tit}</span>
              <span class="text-sm sm:text-base font-bold block" style="color:${ind.green ? t.accent : t.textPrimary};">${ind.val}</span>
              <span class="text-[10px] truncate block" style="color:${t.textMuted};">${ind.diff}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- 3 Cards Inferiores: Ranking de Serviços + Formas de Pagamento (Rosca %) + Agendamentos (Rosca % & Próximos) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-2.5">
        <!-- Card 1: Ranking -->
        <div class="lg:col-span-4 rounded-xl p-3.5 space-y-2.5" style="background:${t.bgCardClean}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-semibold block" style="color:${t.textPrimary};">Ranking de Serviços Mais Realizados</span>
          ${[
            { nome: 'Aplicação Toxina Botulínica', qtd: '42 sessões', pct: 85 },
            { nome: 'Limpeza de Pele Profunda', qtd: '38 sessões', pct: 74 },
            { nome: 'Drenagem Linfática Corporal', qtd: '31 sessões', pct: 62 },
            { nome: 'Depilação a Laser', qtd: '17 sessões', pct: 40 }
          ].map(rk => `
            <div>
              <div class="flex justify-between text-[11px] mb-1">
                <span style="color:${t.textSecondary};">${rk.nome}</span>
                <span class="font-bold" style="color:${t.accent};">${rk.qtd}</span>
              </div>
              <div class="w-full h-1.5 rounded-full overflow-hidden" style="background:${t.bgProgress};">
                <div class="h-full rounded-full" style="width:${rk.pct}%; background:${t.accent};"></div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Card 2: Formas de Pagamento (Rosca Sem Borda) -->
        <div class="lg:col-span-3 rounded-xl p-3.5 flex flex-col justify-between" style="background:${t.bgCardClean}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-semibold block" style="color:${t.textPrimary};">Formas de Pagamento</span>
          <div class="flex items-center justify-center py-2">
            <svg viewBox="0 0 36 36" class="w-24 h-24">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#00FF41" stroke-width="5" stroke-dasharray="55 45" stroke-dashoffset="25"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#38BDF8" stroke-width="5" stroke-dasharray="30 70" stroke-dashoffset="-30"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#FBBF24" stroke-width="5" stroke-dasharray="15 85" stroke-dashoffset="-60"/>
              <text x="18" y="19.5" text-anchor="middle" font-size="5.5" font-weight="bold" fill="${t.textPrimary}">PIX 55%</text>
            </svg>
          </div>
          <div class="flex flex-wrap justify-center gap-2 text-[10px]" style="color:${t.textMuted};">
            <span><strong style="color:#00FF41;">●</strong> PIX (55%)</span>
            <span><strong style="color:#38BDF8;">●</strong> Cartão (30%)</span>
            <span><strong style="color:#FBBF24;">●</strong> Dinheiro (15%)</span>
          </div>
        </div>

        <!-- Card 3: Agendamentos (Status % & Próximos) -->
        <div class="lg:col-span-5 rounded-xl p-3.5 flex flex-col justify-between" style="background:${t.bgCardClean}; border:1px solid ${t.borderCard};">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold" style="color:${t.textPrimary};">Agendamentos (Status % & Próximos)</span>
            <button type="button" onclick="nxSimSelectPage('agendamentos')" class="text-[10.5px] font-bold hover:underline" style="color:${t.accent};">Ver Agenda ➔</button>
          </div>
          <div class="grid grid-cols-12 gap-3 items-center pt-1">
            <div class="col-span-4 flex flex-col items-center">
              <svg viewBox="0 0 36 36" class="w-20 h-20">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#00FF41" stroke-width="5" stroke-dasharray="60 40" stroke-dashoffset="25"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#38BDF8" stroke-width="5" stroke-dasharray="25 75" stroke-dashoffset="-35"/>
                <circle cx="18" cy="18" r="14" fill="none" stroke="#FBBF24" stroke-width="5" stroke-dasharray="15 85" stroke-dashoffset="-60"/>
                <text x="18" y="19.5" text-anchor="middle" font-size="6" font-weight="bold" fill="${t.textPrimary}">60%</text>
              </svg>
              <span class="text-[9.5px] mt-1" style="color:${t.textMuted};">Confirmados: 60%</span>
            </div>
            <div class="col-span-8 space-y-1.5">
              ${state.agendamentos.slice(0, 3).map(ag => `
                <div class="px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[11px]" style="background:${t.bgCardRow};">
                  <div class="truncate">
                    <strong style="color:${t.accent};">${ag.hora}</strong>
                    <span class="ml-1.5 font-semibold" style="color:${t.textPrimary};">${ag.cliente}</span>
                  </div>
                  <span class="text-[10px] font-bold px-1.5 py-0.5 rounded" style="color:${t.accent};">${ag.status}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. AGENDAMENTOS (Agenda Inteligente + WhatsApp 1 Clique)
  // =========================================================================
  function renderAgendamentos(t) {
    return `
      <!-- KPIs Compactos da Agenda -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div class="h-[72px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Total Hoje</span>
          <span class="text-lg font-bold" style="color:${t.textPrimary};">${state.agendamentos.length} agendamentos</span>
        </div>
        <div class="h-[72px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Confirmados</span>
          <span class="text-lg font-bold" style="color:${t.accent};">${state.agendamentos.filter(a => a.status === 'Confirmado').length}</span>
        </div>
        <div class="h-[72px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Em Atendimento</span>
          <span class="text-lg font-bold text-[#38BDF8]">${state.agendamentos.filter(a => a.status === 'Em Atendimento').length}</span>
        </div>
        <div class="h-[72px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Previsão do Dia</span>
          <span class="text-lg font-bold" style="color:${t.accent};">${fmtMoeda(state.agendamentos.reduce((s, a) => s + a.valor, 0))}</span>
        </div>
      </div>

      <!-- Barra de Novo Agendamento Rápido -->
      <div class="rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-5 gap-2.5 items-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <input id="nx-ag-cli" type="text" placeholder="Nome da Cliente (ex: Juliana Paes)" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <select id="nx-ag-srv" class="h-8 px-2.5 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
          ${state.servicos.map(s => `<option value="${s.nome}|${s.preco}">${s.icone} ${s.nome}</option>`).join('')}
        </select>
        <select id="nx-ag-prof" class="h-8 px-2.5 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
          ${state.profissionais.map(p => `<option value="${p.nome}">${p.nome}</option>`).join('')}
        </select>
        <input id="nx-ag-hora" type="time" value="17:30" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <button type="button" onclick="nxSimAddAgendamento()" class="h-8 rounded-lg text-xs font-bold transition" style="background:${t.accent}; color:${t.btnText};">
          + Agendar Horário
        </button>
      </div>

      <!-- Tabela de Agendamentos -->
      <div class="rounded-xl overflow-x-auto" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr style="background:${t.bgCardRow}; color:${t.textMuted}; border-bottom:1px solid ${t.borderCard};">
              <th class="p-3">Horário</th>
              <th class="p-3">Cliente</th>
              <th class="p-3">Procedimento</th>
              <th class="p-3">Profissional</th>
              <th class="p-3">Valor</th>
              <th class="p-3">Status</th>
              <th class="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            ${state.agendamentos.map((ag, idx) => `
              <tr style="border-bottom:1px solid ${t.borderCard};">
                <td class="p-3 font-mono font-bold" style="color:${t.accent};">${ag.hora}</td>
                <td class="p-3 font-semibold" style="color:${t.textPrimary};">${ag.cliente}</td>
                <td class="p-3" style="color:${t.textSecondary};">${ag.servico}</td>
                <td class="p-3" style="color:${t.textMuted};">${ag.prof}</td>
                <td class="p-3 font-bold" style="color:${t.textPrimary};">${fmtMoeda(ag.valor)}</td>
                <td class="p-3">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold" style="background:rgba(0,255,65,0.12); color:${t.accent};">● ${ag.status}</span>
                </td>
                <td class="p-3 text-right space-x-1.5 whitespace-nowrap">
                  <button type="button" onclick="nxSimWhatsAgendamento(${idx})" class="px-2.5 py-1 rounded text-[11px] font-bold bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-[#040805] transition">
                    📲 WhatsApp
                  </button>
                  <button type="button" onclick="nxSimSelectPage('atendimento')" class="px-2.5 py-1 rounded text-[11px] font-bold transition" style="background:${t.bgCardRow}; color:${t.textPrimary}; border:1px solid ${t.borderCard};">
                    🩺 Atender
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 3. SALA DE ATENDIMENTO & ESTÚDIO CLÍNICO ANTES/DEPOIS
  // =========================================================================
  function renderAtendimento(t) {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <!-- Coluna Esquerda: Fila do Dia & Dados da Sessão -->
        <div class="lg:col-span-4 space-y-3">
          <div class="rounded-xl p-3.5 space-y-2.5" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold" style="color:${t.textPrimary};">🩺 Paciente em Atendimento</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded" style="background:rgba(0,255,65,0.15); color:${t.accent};">Sessão 3 de 5</span>
            </div>
            <div class="p-2.5 rounded-lg text-xs space-y-1" style="background:${t.bgCardRow};">
              <div class="font-bold" style="color:${t.textPrimary};">Dra. Fernanda Lima</div>
              <div style="color:${t.textSecondary};">Procedimento: Harmonização & Botox Facial</div>
              <div style="color:${t.textMuted};">Profissional: Dra. Camila Rocha</div>
            </div>

            <label class="block text-[11px] font-semibold" style="color:${t.textSecondary};">Anotações Clínicas / Parâmetros Usados:</label>
            <textarea rows="2" class="w-full p-2 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">Aplicação de 42U Toxina Botulínica em fronte, glabela e orbicular dos olhos. Paciente sem intercorrências.</textarea>

            <div class="grid grid-cols-2 gap-2 pt-1">
              <button type="button" onclick="nxSimGerarPdfSessao()" class="py-2 px-2.5 rounded-lg text-[11px] font-bold text-center transition" style="background:${t.bgCardRow}; color:${t.accent}; border:1px solid ${t.accent};">
                📄 Gerar PDF Antes/Depois
              </button>
              <button type="button" onclick="nxSimSelectPage('pdv')" class="py-2 px-2.5 rounded-lg text-[11px] font-bold text-center transition" style="background:${t.accent}; color:${t.btnText};">
                🛒 Enviar para PDV
              </button>
            </div>
          </div>

          <!-- Simulador de Projeção de Evolução -->
          <div class="rounded-xl p-3.5 space-y-2" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <div class="flex justify-between items-center text-xs font-bold">
              <span style="color:${t.textPrimary};">🔮 Projeção de Resultado:</span>
              <span id="nx-lbl-proj" style="color:${t.accent};">${state.estudioProjecaoPct}% esperado</span>
            </div>
            <input type="range" min="20" max="100" value="${state.estudioProjecaoPct}"
              oninput="document.getElementById('nx-lbl-proj').innerText = this.value + '% esperado'"
              class="w-full accent-[#00FF41] cursor-pointer">
            <p class="text-[11px]" style="color:${t.textMuted};">Simule o percentual de melhora projetado até a última sessão do pacote.</p>
          </div>
        </div>

        <!-- Coluna Direita: Estúdio Clínico Antes & Depois (100% Vetorial/Canvas Padronizado) -->
        <div class="lg:col-span-8 rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div class="flex flex-wrap items-center justify-between gap-2 pb-2" style="border-bottom:1px solid ${t.borderCard};">
            <div>
              <span class="text-xs sm:text-sm font-bold block" style="color:${t.textPrimary};">📸 Estúdio Fotográfico Antes & Depois (Clique no quadro para marcar)</span>
              <span class="text-[11px]" style="color:${t.textMuted};">Escolha a ferramenta abaixo e clique em qualquer ponto da avaliação:</span>
            </div>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="nxSimSetEstudioTool('balao')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                style="background:${state.estudioTool === 'balao' ? t.accent : t.bgCardRow}; color:${state.estudioTool === 'balao' ? t.btnText : t.textSecondary};">
                📌 Balão com Linha Esticável
              </button>
              <button type="button" onclick="nxSimSetEstudioTool('paquimetro')" class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition"
                style="background:${state.estudioTool === 'paquimetro' ? t.accent : t.bgCardRow}; color:${state.estudioTool === 'paquimetro' ? t.btnText : t.textSecondary};">
                📏 Paquímetro Digital (mm/cm)
              </button>
              <button type="button" onclick="nxSimLimparMarkers()" class="px-2.5 py-1 rounded-lg text-[11px] font-bold text-red-400" style="background:${t.bgCardRow};">
                Limpar
              </button>
            </div>
          </div>

          <!-- Painel Comparador Lado a Lado Padronizado no Tema -->
          <div onclick="nxSimAddMarker(event)" class="relative h-[280px] rounded-xl overflow-hidden cursor-crosshair select-none grid grid-cols-2"
            style="background:#080D0A; border:1px solid ${t.borderCard};">
            <!-- Lado Esquerdo: ANTES -->
            <div class="relative flex flex-col items-center justify-center p-4" style="border-right:2px dashed ${t.accent};">
              <span class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-extrabold">FOTO ANTES (01/09/2026)</span>
              <svg viewBox="0 0 160 180" class="w-36 h-44">
                <ellipse cx="80" cy="90" rx="52" ry="68" fill="#121C15" stroke="#2D4434" stroke-width="2"/>
                <path d="M 55 52 Q 80 58 105 52" fill="none" stroke="#EF4444" stroke-width="1.8" stroke-dasharray="3 2"/>
                <path d="M 58 62 Q 80 67 102 62" fill="none" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="3 2"/>
                <circle cx="62" cy="82" r="5" fill="#3D5945"/>
                <circle cx="98" cy="82" r="5" fill="#3D5945"/>
                <path d="M 66 125 Q 80 132 94 125" fill="none" stroke="#3D5945" stroke-width="2.5"/>
              </svg>
              <span class="text-[11px] text-[#8C9990] mt-1">Linhas de expressão visíveis na fronte</span>
            </div>

            <!-- Lado Direito: DEPOIS -->
            <div class="relative flex flex-col items-center justify-center p-4">
              <span class="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded bg-[#00FF41]/20 border border-[#00FF41]/50 text-[#00FF41] text-[10px] font-extrabold">FOTO DEPOIS (05/10/2026)</span>
              <svg viewBox="0 0 160 180" class="w-36 h-44">
                <ellipse cx="80" cy="90" rx="52" ry="68" fill="#142419" stroke="#00FF41" stroke-width="2"/>
                <circle cx="62" cy="82" r="5" fill="#00FF41"/>
                <circle cx="98" cy="82" r="5" fill="#00FF41"/>
                <path d="M 64 123 Q 80 135 96 123" fill="none" stroke="#00FF41" stroke-width="2.5"/>
              </svg>
              <span class="text-[11px] text-[#00FF41] font-semibold mt-1">Suavização completa • Simetria 98%</span>
            </div>

            <!-- Camada SVG de Linhas Direcionais Esticáveis e Paquímetro -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none">
              ${state.estudioMarkers.map(m => `
                <line x1="${m.x}%" y1="${m.y}%" x2="${m.targetX}%" y2="${m.targetY}%" stroke="${ m.tipo === 'paquimetro' ? '#38BDF8' : '#00FF41' }" stroke-width="2"/>
                <circle cx="${m.targetX}%" cy="${m.targetY}%" r="4.5" fill="${ m.tipo === 'paquimetro' ? '#38BDF8' : '#00FF41' }"/>
              `).join('')}
            </svg>

            <!-- Balões Flutuantes -->
            ${state.estudioMarkers.map(m => `
              <div class="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-[10px] font-bold pointer-events-none shadow-lg whitespace-nowrap"
                style="left:${m.x}%; top:${m.y}%; background:#060907; color:${m.tipo === 'paquimetro' ? '#38BDF8' : '#00FF41'}; border:1.5px solid ${m.tipo === 'paquimetro' ? '#38BDF8' : '#00FF41'};">
                ${m.tipo === 'paquimetro' ? '📏 ' : '📌 '}${m.label}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 4. VENDAS (PDV)
  // =========================================================================
  function renderPdv(t) {
    const subtotal = state.comandaPdv.reduce((s, i) => s + i.preco, 0);
    const total = Math.max(0, subtotal - state.pdvDesconto);

    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <!-- Catálogo Rápido -->
        <div class="lg:col-span-7 rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div class="flex items-center justify-between pb-2" style="border-bottom:1px solid ${t.borderCard};">
            <span class="text-xs sm:text-sm font-bold" style="color:${t.textPrimary};">Catálogo Rápido (Clique para lançar na Comanda)</span>
            <span class="text-[11px]" style="color:${t.accent};">Serviços, Pacotes & Produtos</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${state.servicos.map(s => `
              <button type="button" onclick="nxSimAddPdvItem('${s.nome}', 'Serviço', ${s.preco})"
                class="p-2.5 rounded-lg flex items-center justify-between text-left transition hover:opacity-90"
                style="background:${t.bgCardRow}; border:1px solid ${t.borderCard};">
                <div class="truncate pr-2">
                  <span class="text-xs font-bold block truncate" style="color:${t.textPrimary};">${s.icone} ${s.nome}</span>
                  <span class="text-[10px]" style="color:${t.textMuted};">${s.categoria}</span>
                </div>
                <span class="text-xs font-extrabold shrink-0" style="color:${t.accent};">+ ${fmtMoeda(s.preco)}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Carrinho / Fechamento de Comanda -->
        <div class="lg:col-span-5 rounded-xl p-4 flex flex-col justify-between space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between pb-2" style="border-bottom:1px solid ${t.borderCard};">
              <span class="text-xs sm:text-sm font-bold" style="color:${t.textPrimary};">🧾 Comanda Aberta #0149</span>
              <button type="button" onclick="nxSimClearPdv()" class="text-[11px] text-red-400 hover:underline">Limpar Comanda</button>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
              <select id="nx-pdv-cli" class="h-8 px-2 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
                ${state.clientes.map(c => `<option value="${c.nome}">${c.nome}</option>`).join('')}
              </select>
              <select id="nx-pdv-prof" class="h-8 px-2 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
                ${state.profissionais.map(p => `<option value="${p.nome}">${p.nome}</option>`).join('')}
              </select>
            </div>

            <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              ${state.comandaPdv.length === 0 ? `<div class="text-center py-6 text-xs" style="color:${t.textMuted};">Nenhum item na comanda. Clique nos itens ao lado!</div>` : ''}
              ${state.comandaPdv.map((it, idx) => `
                <div class="px-3 py-2 rounded-lg flex items-center justify-between text-xs" style="background:${t.bgCardRow};">
                  <span class="truncate pr-2 font-medium" style="color:${t.textPrimary};">${it.nome}</span>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="font-bold" style="color:${t.accent};">${fmtMoeda(it.preco)}</span>
                    <button type="button" onclick="nxSimRemovePdvItem(${idx})" class="text-red-400 font-bold">✕</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pt-3 space-y-2.5" style="border-top:1px solid ${t.borderCard};">
            <div class="flex items-center justify-between text-xs">
              <span style="color:${t.textSecondary};">Forma de Pagamento:</span>
              <select onchange="nxSimSetFormaPag(this.value)" class="h-7 px-2 rounded text-xs font-bold outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.accent};">
                <option>PIX</option><option>Cartão de Crédito</option><option>Cartão de Débito</option><option>Dinheiro</option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold" style="color:${t.textPrimary};">Total Líquido:</span>
              <span class="text-xl font-extrabold" style="color:${t.accent};">${fmtMoeda(total)}</span>
            </div>
            <button type="button" onclick="nxSimFinalizarVenda()" class="w-full py-2.5 rounded-lg text-xs font-extrabold transition" style="background:${t.accent}; color:${t.btnText};">
              ✅ Finalizar Venda & Emitir Recibo (80mm / A4)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. RELATÓRIO DE VENDAS
  // =========================================================================
  function renderRelatorioVendas(t) {
    const totalVendas = state.vendasRealizadas.reduce((s, v) => s + v.total, 0);
    const totalComissoes = state.vendasRealizadas.reduce((s, v) => s + v.comissao, 0);

    return `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div class="h-[76px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Faturamento das Vendas Listadas</span>
          <span class="text-lg font-bold" style="color:${t.accent};">${fmtMoeda(totalVendas)}</span>
        </div>
        <div class="h-[76px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Total de Comissões Calculadas</span>
          <span class="text-lg font-bold" style="color:${t.textPrimary};">${fmtMoeda(totalComissoes)}</span>
        </div>
        <div class="h-[76px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Lucro Líquido da Clínica</span>
          <span class="text-lg font-bold" style="color:${t.accent};">${fmtMoeda(totalVendas - totalComissoes)}</span>
        </div>
      </div>

      <div class="rounded-xl overflow-x-auto" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr style="background:${t.bgCardRow}; color:${t.textMuted}; border-bottom:1px solid ${t.borderCard};">
              <th class="p-3">Comanda</th>
              <th class="p-3">Data / Hora</th>
              <th class="p-3">Cliente</th>
              <th class="p-3">Itens</th>
              <th class="p-3">Profissional</th>
              <th class="p-3">Pagamento</th>
              <th class="p-3">Valor Total</th>
              <th class="p-3">Comissão</th>
            </tr>
          </thead>
          <tbody>
            ${state.vendasRealizadas.map(v => `
              <tr style="border-bottom:1px solid ${t.borderCard};">
                <td class="p-3 font-mono font-bold" style="color:${t.accent};">#0${v.id}</td>
                <td class="p-3" style="color:${t.textMuted};">${v.data}</td>
                <td class="p-3 font-semibold" style="color:${t.textPrimary};">${v.cliente}</td>
                <td class="p-3" style="color:${t.textSecondary};">${v.itens}</td>
                <td class="p-3" style="color:${t.textSecondary};">${v.prof}</td>
                <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold" style="background:${t.bgCardRow}; color:${t.accent};">${v.forma}</span></td>
                <td class="p-3 font-bold" style="color:${t.textPrimary};">${fmtMoeda(v.total)}</td>
                <td class="p-3 font-semibold text-[#38BDF8]">${fmtMoeda(v.comissao)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 6. COMO VAI MEUS NEGÓCIOS (Inteligência Analítica)
  // =========================================================================
  function renderMeusNegocios(t) {
    return `
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div class="h-[80px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Taxa de Retorno (Fidelização)</span>
          <span class="text-lg font-bold" style="color:${t.accent};">84,6%</span>
          <span class="text-[10px]" style="color:${t.textMuted};">Clientes com pacotes ativos</span>
        </div>
        <div class="h-[80px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Procedimento Mais Rentável</span>
          <span class="text-sm font-bold truncate" style="color:${t.textPrimary};">💉 Toxina Botulínica</span>
          <span class="text-[10px]" style="color:${t.accent};">Margem líquida: 68%</span>
        </div>
        <div class="h-[80px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Horário de Maior Movimento</span>
          <span class="text-lg font-bold" style="color:${t.textPrimary};">14h às 18h</span>
          <span class="text-[10px]" style="color:${t.textMuted};">Terça a Sexta-feira</span>
        </div>
        <div class="h-[80px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Crescimento Trimestral</span>
          <span class="text-lg font-bold" style="color:${t.accent};">+26,4%</span>
          <span class="text-[10px]" style="color:${t.textMuted};">Acima da meta estipulada</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div class="rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-bold block" style="color:${t.textPrimary};">Desempenho por Profissional (Faturamento & Comissões)</span>
          ${[
            { nome: 'Dra. Camila Rocha (Harmonização)', fat: 'R$ 24.800,00', com: 'R$ 9.920,00', pct: 88 },
            { nome: 'Juliana Martins (Corporal & Pacotes)', fat: 'R$ 12.400,00', com: 'R$ 4.340,00', pct: 64 },
            { nome: 'Ana Paula Souza (Facial & Laser)', fat: 'R$ 8.000,00', com: 'R$ 2.800,00', pct: 48 }
          ].map(p => `
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="font-semibold" style="color:${t.textPrimary};">${p.nome}</span>
                <span class="font-bold" style="color:${t.accent};">${p.fat}</span>
              </div>
              <div class="w-full h-2 rounded-full overflow-hidden" style="background:${t.bgProgress};">
                <div class="h-full rounded-full" style="width:${p.pct}%; background:${t.accent};"></div>
              </div>
              <span class="text-[10px] block" style="color:${t.textMuted};">Comissão acumulada: ${p.com}</span>
            </div>
          `).join('')}
        </div>

        <div class="rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-bold block" style="color:${t.textPrimary};">Origem dos Pacientes da Clínica</span>
          ${[
            { orig: 'Indicação de Pacientes (Boca a Boca)', pct: 48 },
            { orig: 'Instagram & Fotos Antes/Depois', pct: 35 },
            { orig: 'Pesquisa Google / Maps', pct: 17 }
          ].map(o => `
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span style="color:${t.textSecondary};">${o.orig}</span>
                <span class="font-bold" style="color:${t.accent};">${o.pct}%</span>
              </div>
              <div class="w-full h-2 rounded-full overflow-hidden" style="background:${t.bgProgress};">
                <div class="h-full rounded-full" style="width:${o.pct}%; background:${t.accent};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 7. FINANCEIRO & COMISSÕES
  // =========================================================================
  function renderFinanceiro(t) {
    const entradas = state.lancamentosFin.filter(l => l.tipo === 'Entrada').reduce((s, l) => s + l.valor, 0);
    const saidas = state.lancamentosFin.filter(l => l.tipo === 'Saída').reduce((s, l) => s + l.valor, 0);

    return `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <div class="h-[76px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Total de Entradas</span>
          <span class="text-lg font-bold" style="color:${t.accent};">${fmtMoeda(entradas)}</span>
        </div>
        <div class="h-[76px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Total de Saídas / Despesas</span>
          <span class="text-lg font-bold text-red-400">${fmtMoeda(saidas)}</span>
        </div>
        <div class="h-[76px] rounded-xl px-4 py-2.5 flex flex-col justify-center" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-[11px]" style="color:${t.textKpi};">Saldo Líquido em Caixa</span>
          <span class="text-lg font-bold" style="color:${t.accent};">${fmtMoeda(entradas - saidas)}</span>
        </div>
      </div>

      <!-- Novo Lançamento Financeiro -->
      <div class="rounded-xl p-3 grid grid-cols-1 sm:grid-cols-4 gap-2.5" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <input id="nx-fin-desc" type="text" placeholder="Descrição (ex: Conta de Luz / Venda)" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <select id="nx-fin-tipo" class="h-8 px-2.5 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
          <option value="Entrada">🟢 Entrada (Receita)</option>
          <option value="Saída">🔴 Saída (Despesa)</option>
        </select>
        <input id="nx-fin-val" type="number" placeholder="Valor R$ (ex: 250)" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <button type="button" onclick="nxSimAddFinanceiro()" class="h-8 rounded-lg text-xs font-bold transition" style="background:${t.accent}; color:${t.btnText};">
          + Lançar no Caixa
        </button>
      </div>

      <div class="rounded-xl overflow-x-auto" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr style="background:${t.bgCardRow}; color:${t.textMuted}; border-bottom:1px solid ${t.borderCard};">
              <th class="p-3">Data</th>
              <th class="p-3">Descrição</th>
              <th class="p-3">Categoria</th>
              <th class="p-3">Tipo</th>
              <th class="p-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            ${state.lancamentosFin.map(l => `
              <tr style="border-bottom:1px solid ${t.borderCard};">
                <td class="p-3 font-mono" style="color:${t.textMuted};">${l.data}</td>
                <td class="p-3 font-semibold" style="color:${t.textPrimary};">${l.desc}</td>
                <td class="p-3" style="color:${t.textSecondary};">${l.cat}</td>
                <td class="p-3">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold ${l.tipo === 'Entrada' ? 'text-[#00FF41] bg-[#00FF41]/10' : 'text-red-400 bg-red-500/10'}">${l.tipo}</span>
                </td>
                <td class="p-3 text-right font-bold ${l.tipo === 'Entrada' ? 'text-[#00FF41]' : 'text-red-400'}">${fmtMoeda(l.valor)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 8. CLIENTES
  // =========================================================================
  function renderClientes(t) {
    return `
      <div class="rounded-xl p-3 grid grid-cols-1 sm:grid-cols-4 gap-2.5" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <input id="nx-cli-nome" type="text" placeholder="Nome Completo da Cliente" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <input id="nx-cli-tel" type="text" placeholder="WhatsApp (ex: 11 99999-0000)" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <input id="nx-cli-cpf" type="text" placeholder="CPF (Opcional)" class="h-8 px-3 rounded-lg text-xs outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
        <button type="button" onclick="nxSimAddCliente()" class="h-8 rounded-lg text-xs font-bold transition" style="background:${t.accent}; color:${t.btnText};">
          + Cadastrar Cliente
        </button>
      </div>

      <div class="rounded-xl overflow-x-auto" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr style="background:${t.bgCardRow}; color:${t.textMuted}; border-bottom:1px solid ${t.borderCard};">
              <th class="p-3">Nome da Paciente</th>
              <th class="p-3">WhatsApp</th>
              <th class="p-3">CPF</th>
              <th class="p-3">Pacote Ativo</th>
              <th class="p-3">Total Investido</th>
              <th class="p-3 text-right">Prontuário</th>
            </tr>
          </thead>
          <tbody>
            ${state.clientes.map(c => `
              <tr style="border-bottom:1px solid ${t.borderCard};">
                <td class="p-3 font-semibold" style="color:${t.textPrimary};">${c.nome}</td>
                <td class="p-3" style="color:${t.accent};">${c.tel}</td>
                <td class="p-3 font-mono" style="color:${t.textMuted};">${c.cpf}</td>
                <td class="p-3" style="color:${t.textSecondary};">${c.pacote}</td>
                <td class="p-3 font-bold" style="color:${t.textPrimary};">${fmtMoeda(c.totalGasto)}</td>
                <td class="p-3 text-right">
                  <button type="button" onclick="nxSimSelectPage('anamnese')" class="px-2.5 py-1 rounded text-[11px] font-bold" style="background:${t.bgCardRow}; color:${t.accent}; border:1px solid ${t.borderCard};">
                    📋 Ver Anamnese
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 9. FICHAS DE ANAMNESE A4
  // =========================================================================
  function renderAnamnese(t) {
    return `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xs" style="color:${t.textMuted};">Fichas clínicas com assinatura digital e impressão em folha A4.</span>
        <button type="button" onclick="nxSimToast('🖨️ Ficha de Anamnese A4 gerada para impressão!')" class="h-8 px-3.5 rounded-lg text-xs font-bold transition" style="background:${t.accent}; color:${t.btnText};">
          🖨️ Imprimir Ficha A4 em Branco
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${state.anamneses.map(anm => `
          <div class="rounded-xl p-4 space-y-2" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <div class="flex justify-between items-center text-xs">
              <span class="font-mono font-bold" style="color:${t.accent};">${anm.codigo}</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-[#00FF41]/15 text-[#00FF41] font-bold">✓ Assinada</span>
            </div>
            <div class="font-bold text-sm" style="color:${t.textPrimary};">${anm.cliente}</div>
            <div class="text-xs" style="color:${t.textSecondary};"><strong>Queixa Principal:</strong> ${anm.queixa}</div>
            <div class="text-xs" style="color:${t.textMuted};"><strong>Alergias:</strong> ${anm.alergia}</div>
            <button type="button" onclick="nxSimToast('📄 Visualizando Ficha Completa ' + '${anm.codigo}' + ' de ' + '${anm.cliente}')" class="w-full mt-2 py-1.5 rounded-lg text-xs font-bold" style="background:${t.bgCardRow}; color:${t.accent}; border:1px solid ${t.borderCard};">
              Abrir Ficha Clínica A4
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // =========================================================================
  // 10. SERVIÇOS & PACOTES MULTI-SESSÕES (16 Ícones de Estética)
  // =========================================================================
  function renderServicos(t) {
    return `
      <div class="flex items-center gap-2 pb-1">
        <button type="button" onclick="nxSimSetServicoTab('procedimentos')" class="px-4 py-1.5 rounded-lg text-xs font-bold transition"
          style="background:${state.servicoSubTab === 'procedimentos' ? t.accent : t.bgCard}; color:${state.servicoSubTab === 'procedimentos' ? t.btnText : t.textSecondary}; border:1px solid ${t.borderCard};">
          ✨ Procedimentos & Ícones de Estética (${state.servicos.length})
        </button>
        <button type="button" onclick="nxSimSetServicoTab('pacotes')" class="px-4 py-1.5 rounded-lg text-xs font-bold transition"
          style="background:${state.servicoSubTab === 'pacotes' ? t.accent : t.bgCard}; color:${state.servicoSubTab === 'pacotes' ? t.btnText : t.textSecondary}; border:1px solid ${t.borderCard};">
          🎁 Pacotes Multi-Sessões (${state.pacotes.length})
        </button>
      </div>

      ${state.servicoSubTab === 'procedimentos' ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${state.servicos.map(s => `
            <div class="rounded-xl p-3.5 flex items-center justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style="background:${t.bgCardRow}; border:1px solid ${t.borderCard};">
                  ${s.icone}
                </div>
                <div class="min-w-0">
                  <span class="text-xs font-bold block truncate" style="color:${t.textPrimary};">${s.nome}</span>
                  <span class="text-[10.5px] block" style="color:${t.textMuted};">${s.tipoIcone} • ${s.duracao}</span>
                </div>
              </div>
              <span class="text-xs font-extrabold shrink-0 ml-2" style="color:${t.accent};">${fmtMoeda(s.preco)}</span>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${state.pacotes.map((pk, idx) => {
            const pct = Math.min(100, Math.round((pk.feitas / pk.total) * 100));
            return `
              <div class="rounded-xl p-4 space-y-2.5 flex flex-col justify-between" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="font-bold" style="color:${t.accent};">🎁 Pacote Multi-Sessões</span>
                    <span class="font-bold" style="color:${t.textPrimary};">${fmtMoeda(pk.valor)}</span>
                  </div>
                  <div class="text-xs font-bold" style="color:${t.textPrimary};">${pk.nome}</div>
                  <div class="text-[11px] mt-0.5" style="color:${t.textMuted};">Paciente: ${pk.cliente}</div>
                  <div class="mt-2.5">
                    <div class="flex justify-between text-[11px] font-bold mb-1">
                      <span style="color:${t.accent};">Sessão ${pk.feitas} de ${pk.total}</span>
                      <span style="color:${t.textSecondary};">Restam ${pk.total - pk.feitas}</span>
                    </div>
                    <div class="w-full h-2 rounded-full overflow-hidden" style="background:${t.bgProgress};">
                      <div class="h-full rounded-full transition-all duration-300" style="width:${pct}%; background:${t.accent};"></div>
                    </div>
                  </div>
                </div>
                <button type="button" onclick="nxSimDarBaixaPacote(${idx})" class="w-full py-2 rounded-lg text-xs font-bold transition"
                  style="background:${t.accent}; color:${t.btnText};">
                  ✅ Dar Baixa em +1 Sessão
                </button>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;
  }

  // =========================================================================
  // 11. PRODUTOS / ESTOQUE
  // =========================================================================
  function renderEstoque(t) {
    const criticos = state.estoque.filter(e => e.qtd <= e.min);
    return `
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2 text-xs">
          <span class="px-2.5 py-1 rounded-lg font-bold" style="background:${t.bgCard}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
            Total de Itens: ${state.estoque.length}
          </span>
          <span class="px-2.5 py-1 rounded-lg font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30">
            ⚠️ Abaixo do Mínimo: ${criticos.length} item(ns)
          </span>
        </div>
        <button type="button" onclick="nxSimGerarReposicao()" class="h-8 px-3.5 rounded-lg text-xs font-bold transition" style="background:${t.accent}; color:${t.btnText};">
          🛒 Gerar Lista de Reposição
        </button>
      </div>

      <div class="rounded-xl overflow-x-auto" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr style="background:${t.bgCardRow}; color:${t.textMuted}; border-bottom:1px solid ${t.borderCard};">
              <th class="p-3">Produto / Insumo</th>
              <th class="p-3">Categoria</th>
              <th class="p-3">Qtd Atual</th>
              <th class="p-3">Mínimo</th>
              <th class="p-3">Status</th>
              <th class="p-3 text-right">Ajustar Estoque</th>
            </tr>
          </thead>
          <tbody>
            ${state.estoque.map((p, idx) => {
              const baixo = p.qtd <= p.min;
              return `
                <tr style="border-bottom:1px solid ${t.borderCard};">
                  <td class="p-3 font-semibold" style="color:${t.textPrimary};">${p.icone} ${p.nome}</td>
                  <td class="p-3" style="color:${t.textSecondary};">${p.cat}</td>
                  <td class="p-3 font-bold" style="color:${baixo ? '#F59E0B' : t.accent};">${p.qtd} un</td>
                  <td class="p-3" style="color:${t.textMuted};">${p.min} un</td>
                  <td class="p-3">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${baixo ? 'bg-amber-500/15 text-amber-400' : 'bg-[#00FF41]/15 text-[#00FF41]'}">
                      ${baixo ? '⚠️ Repor Estoque' : '✓ Normal'}
                    </span>
                  </td>
                  <td class="p-3 text-right space-x-1">
                    <button type="button" onclick="nxSimAjustarEstoque(${idx}, -1)" class="w-6 h-6 rounded font-bold" style="background:${t.bgCardRow}; color:${t.textPrimary};">-</button>
                    <button type="button" onclick="nxSimAjustarEstoque(${idx}, 1)" class="w-6 h-6 rounded font-bold" style="background:${t.accent}; color:${t.btnText};">+</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // =========================================================================
  // 12. CONFIGURAÇÕES DO SISTEMA (Todas as Abas Reais do config_view.py)
  // =========================================================================
  function renderConfiguracoes(t) {
    const tabs = [
      { id: 'empresa', label: '🏢 Empresa & Aparência' },
      { id: 'usuarios', label: '👥 Usuários & Permissões' },
      { id: 'profissionais', label: '👩‍⚕️ Profissionais & Comissões' },
      { id: 'whatsapp', label: '📲 Mensagem WhatsApp' },
      { id: 'backups', label: '💾 Backups & Rede Local (LAN)' }
    ];

    return `
      <!-- Sub-Abas de Configuração -->
      <div class="flex flex-wrap items-center gap-1.5 pb-1">
        ${tabs.map(tb => `
          <button type="button" onclick="nxSimSetConfigTab('${tb.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition"
            style="background:${state.configSubTab === tb.id ? t.accent : t.bgCard}; color:${state.configSubTab === tb.id ? t.btnText : t.textSecondary}; border:1px solid ${t.borderCard};">
            ${tb.label}
          </button>
        `).join('')}
      </div>

      ${state.configSubTab === 'empresa' ? `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div class="lg:col-span-7 rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <span class="text-xs font-bold block" style="color:${t.textPrimary};">Dados da Clínica / Estabelecimento</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div>
                <label class="block text-[11px] mb-1" style="color:${t.textMuted};">Nome Fantasia da Clínica</label>
                <input type="text" value="${state.empresa.nome}" class="w-full h-8 px-3 rounded-lg outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
              </div>
              <div>
                <label class="block text-[11px] mb-1" style="color:${t.textMuted};">CNPJ / CPF</label>
                <input type="text" value="${state.empresa.cnpj}" class="w-full h-8 px-3 rounded-lg outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
              </div>
              <div>
                <label class="block text-[11px] mb-1" style="color:${t.textMuted};">Telefone / WhatsApp</label>
                <input type="text" value="${state.empresa.telefone}" class="w-full h-8 px-3 rounded-lg outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
              </div>
              <div>
                <label class="block text-[11px] mb-1" style="color:${t.textMuted};">Endereço para Recibos e PDFs</label>
                <input type="text" value="${state.empresa.endereco}" class="w-full h-8 px-3 rounded-lg outline-none" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">
              </div>
            </div>
            <button type="button" onclick="nxSimToast('✅ Configurações da empresa salvas com sucesso!')" class="px-4 py-2 rounded-lg text-xs font-bold" style="background:${t.accent}; color:${t.btnText};">
              Salvar Dados da Clínica
            </button>
          </div>

          <div class="lg:col-span-5 rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <span class="text-xs font-bold block" style="color:${t.textPrimary};">Aparência do Sistema (Tema Uniforme)</span>
            <p class="text-[11px]" style="color:${t.textMuted};">Alterne todo o sistema entre o Modo Escuro Executivo (Dark) e o Modo Dia (Claro):</p>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" onclick="nxSimSetTheme('dark')" class="p-3 rounded-xl text-xs font-bold text-center border"
                style="background:#060807; color:#00FF41; border-color:${state.theme === 'dark' ? '#00FF41' : '#1E2620'};">
                🌙 Modo Escuro (Dark)
              </button>
              <button type="button" onclick="nxSimSetTheme('light')" class="p-3 rounded-xl text-xs font-bold text-center border"
                style="background:#FFFFFF; color:#00A82D; border-color:${state.theme === 'light' ? '#00A82D' : '#D8E3DA'};">
                ☀️ Modo Dia (Claro)
              </button>
            </div>
          </div>
        </div>
      ` : ''}

      ${state.configSubTab === 'usuarios' ? `
        <div class="rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-bold block" style="color:${t.textPrimary};">Controle de Permissões da Barra Lateral por Cargo</span>
          <p class="text-[11px]" style="color:${t.textMuted};">Defina exatamente quais menus a Recepcionista ou Esteticista podem visualizar:</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            ${SIDEBAR_ITEMS.map(it => `
              <label class="p-2.5 rounded-lg flex items-center gap-2 cursor-pointer" style="background:${t.bgCardRow}; border:1px solid ${t.borderCard};">
                <input type="checkbox" checked class="accent-[#00FF41]">
                <span style="color:${t.textPrimary};">${it.title}</span>
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${state.configSubTab === 'profissionais' ? `
        <div class="rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-bold block" style="color:${t.textPrimary};">Profissionais & Porcentagem de Comissão</span>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            ${state.profissionais.map(p => `
              <div class="p-3.5 rounded-xl space-y-1" style="background:${t.bgCardRow}; border:1px solid ${t.borderCard};">
                <div class="text-xs font-bold" style="color:${t.textPrimary};">👩‍⚕️ ${p.nome}</div>
                <div class="text-[11px]" style="color:${t.textMuted};">${p.esp}</div>
                <div class="text-xs font-bold pt-1" style="color:${t.accent};">Comissão Automática: ${p.comissao}%</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${state.configSubTab === 'whatsapp' ? `
        <div class="rounded-xl p-4 space-y-3" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
          <span class="text-xs font-bold block" style="color:${t.textPrimary};">Modelo de Mensagem Automática do WhatsApp</span>
          <textarea rows="4" class="w-full p-3 rounded-lg text-xs outline-none font-mono" style="background:${t.bgInput}; border:1px solid ${t.borderCard}; color:${t.textPrimary};">Olá, *{nome}*! Tudo bem?\nSeu agendamento está confirmado para *{data}* às *{horario}* na *{empresa}*! ✨\n💆 Procedimento: {servico}\n👩‍⚕️ Profissional: {profissional}</textarea>
          <button type="button" onclick="nxSimToast('✅ Modelo de mensagem do WhatsApp salvo!')" class="px-4 py-2 rounded-lg text-xs font-bold" style="background:${t.accent}; color:${t.btnText};">
            Salvar Modelo de Mensagem
          </button>
        </div>
      ` : ''}

      ${state.configSubTab === 'backups' ? `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="rounded-xl p-4 space-y-2.5" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <span class="text-xs font-bold block" style="color:${t.accent};">💾 Backups Automáticos Locais</span>
            <p class="text-xs" style="color:${t.textSecondary};">Pasta oficial protegida: <code class="font-mono">C:\\NX_Gestao_Estetica\\backups</code></p>
            <p class="text-[11px]" style="color:${t.textMuted};">O sistema realiza cópia automática do banco SQLite sempre ao fechar e limpa cópias antigas.</p>
            <button type="button" onclick="nxSimToast('💾 Backup manual criado em C:\\\\NX_Gestao_Estetica\\\\backups!')" class="px-4 py-2 rounded-lg text-xs font-bold" style="background:${t.accent}; color:${t.btnText};">
              Criar Cópia de Segurança Agora
            </button>
          </div>
          <div class="rounded-xl p-4 space-y-2.5" style="background:${t.bgCard}; border:1px solid ${t.borderCard};">
            <span class="text-xs font-bold block" style="color:${t.accent};">🖧 Rede Local (LAN) • Multi-PCs em 1 Clique</span>
            <p class="text-xs" style="color:${t.textSecondary};">Conecte a recepção e os consultórios no mesmo banco de dados local sem precisar de internet.</p>
            <button type="button" onclick="nxSimToast('🖧 Servidor de Rede Local configurado com 1 clique!')" class="px-4 py-2 rounded-lg text-xs font-bold" style="background:${t.bgCardRow}; color:${t.accent}; border:1px solid ${t.accent};">
              ⚡ Configurar Servidor de Rede (1 Clique)
            </button>
          </div>
        </div>
      ` : ''}
    `;
  }

  // =========================================================================
  // AÇÕES DE INTERAÇÃO DO USUÁRIO NO SIMULADOR
  // =========================================================================
  window.nxSimSelectPage = function (pageId) {
    state.currentPage = pageId;
    renderNxWebSimulator();
  };

  window.nxSimToggleTheme = function () {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    renderNxWebSimulator();
  };

  window.nxSimSetTheme = function (themeName) {
    state.theme = themeName;
    renderNxWebSimulator();
  };

  window.nxSimToggleFullscreen = function () {
    const container = document.getElementById('painel-exp-simulador');
    if (!container) return;
    state.fullscreen = !state.fullscreen;
    if (state.fullscreen) {
      container.className = 'fixed inset-2 z-[120] rounded-2xl overflow-hidden border-2 border-[#00FF41] shadow-2xl flex flex-col text-left';
    } else {
      container.className = 'rounded-2xl overflow-hidden border-2 border-[#00FF41]/60 shadow-2xl flex flex-col h-[690px] text-left';
    }
    renderNxWebSimulator();
  };

  window.nxSimSetFiltro = function (campo, valor) {
    if (campo === 'dia') state.filtroDia = valor;
    if (campo === 'mes') state.filtroMes = valor;
    renderNxWebSimulator();
  };

  window.nxSimSetServicoTab = function (tab) {
    state.servicoSubTab = tab;
    renderNxWebSimulator();
  };

  window.nxSimSetConfigTab = function (tab) {
    state.configSubTab = tab;
    renderNxWebSimulator();
  };

  window.nxSimSetEstudioTool = function (tool) {
    state.estudioTool = tool;
    renderNxWebSimulator();
  };

  window.nxSimLimparMarkers = function () {
    state.estudioMarkers = [];
    renderNxWebSimulator();
  };

  window.nxSimAddMarker = function (e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const clickY = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    const boxX = Math.max(12, Math.min(88, clickX - 8));
    const boxY = Math.max(14, Math.min(86, clickY - 10));
    state.estudioMarkers.push({
      x: boxX,
      y: boxY,
      targetX: clickX,
      targetY: clickY,
      tipo: state.estudioTool,
      label: state.estudioTool === 'paquimetro' ? 'Medida: 38,4 mm' : 'Ponto Clínico (-1,5 cm)'
    });
    renderNxWebSimulator();
  };

  window.nxSimAddAgendamento = function () {
    const cli = (document.getElementById('nx-ag-cli')?.value || '').trim() || 'Paciente Teste Online';
    const srvRaw = document.getElementById('nx-ag-srv')?.value || 'Limpeza de Pele|160';
    const [srv, precoStr] = srvRaw.split('|');
    const prof = document.getElementById('nx-ag-prof')?.value || 'Dra. Camila Rocha';
    const hora = document.getElementById('nx-ag-hora')?.value || '17:30';
    state.agendamentos.unshift({
      id: Date.now(),
      hora,
      data: '05/10/2026',
      cliente: cli,
      servico: srv,
      prof,
      valor: parseFloat(precoStr) || 160,
      status: 'Confirmado'
    });
    renderNxWebSimulator();
    nxSimToast(`✅ Agendamento de ${cli} às ${hora} registrado!`);
  };

  window.nxSimWhatsAgendamento = function (idx) {
    const ag = state.agendamentos[idx];
    if (!ag) return;
    nxSimToast(
      `📲 MENSAGEM PRONTA PARA WHATSAPP:\n\n` +
      `Olá, *${ag.cliente}*! Tudo bem?\n` +
      `Seu agendamento está confirmado para hoje às *${ag.hora}* na *${state.empresa.nome}*! ✨\n` +
      `💆 Procedimento: ${ag.servico}\n👩‍⚕️ Profissional: ${ag.prof}`
    );
  };

  window.nxSimDarBaixaPacote = function (idx) {
    const pk = state.pacotes[idx];
    if (!pk) return;
    if (pk.feitas < pk.total) {
      pk.feitas++;
      renderNxWebSimulator();
      nxSimToast(`✅ Baixa realizada! ${pk.nome}: Sessão ${pk.feitas} de ${pk.total} concluída.`);
    } else {
      nxSimToast(`🎉 Todas as ${pk.total} sessões deste pacote já foram concluídas!`);
    }
  };

  window.nxSimAjustarEstoque = function (idx, delta) {
    const item = state.estoque[idx];
    if (!item) return;
    item.qtd = Math.max(0, item.qtd + delta);
    renderNxWebSimulator();
  };

  window.nxSimGerarReposicao = function () {
    const baixos = state.estoque.filter(e => e.qtd <= e.min);
    if (baixos.length === 0) {
      nxSimToast('✅ Todos os produtos estão acima do estoque mínimo!');
      return;
    }
    const lista = baixos.map(b => `• ${b.nome} (Atual: ${b.qtd} un | Mínimo: ${b.min} un)`).join('\n');
    nxSimToast(`🛒 LISTA AUTOMÁTICA DE REPOSIÇÃO:\n\n${lista}`);
  };

  window.nxSimAddPdvItem = function (nome, tipo, preco) {
    state.comandaPdv.push({ nome, tipo, preco });
    renderNxWebSimulator();
  };

  window.nxSimRemovePdvItem = function (idx) {
    state.comandaPdv.splice(idx, 1);
    renderNxWebSimulator();
  };

  window.nxSimClearPdv = function () {
    state.comandaPdv = [];
    renderNxWebSimulator();
  };

  window.nxSimSetFormaPag = function (forma) {
    state.pdvFormaPag = forma;
  };

  window.nxSimFinalizarVenda = function () {
    if (state.comandaPdv.length === 0) {
      nxSimToast('⚠️ Adicione pelo menos 1 item na comanda antes de finalizar!');
      return;
    }
    const cli = document.getElementById('nx-pdv-cli')?.value || 'Dra. Fernanda Lima';
    const prof = document.getElementById('nx-pdv-prof')?.value || 'Dra. Camila Rocha';
    const total = state.comandaPdv.reduce((s, i) => s + i.preco, 0);
    const comissao = total * 0.4;
    const resumoItens = state.comandaPdv.map(i => i.nome).join(' + ');

    state.vendasRealizadas.unshift({
      id: 149 + state.vendasRealizadas.length,
      data: '05/10/2026 Agora',
      cliente: cli,
      itens: resumoItens,
      prof,
      forma: state.pdvFormaPag,
      total,
      comissao
    });
    state.lancamentosFin.unshift({
      id: Date.now(),
      data: '05/10/2026',
      desc: `Venda PDV - ${cli}`,
      cat: 'Receita PDV',
      tipo: 'Entrada',
      valor: total,
      status: 'Pago'
    });
    state.comandaPdv = [];
    renderNxWebSimulator();
    nxSimToast(
      `🧾 VENDA FINALIZADA E CUPOM 80MM EMITIDO!\n\n` +
      `Cliente: ${cli}\nProfissional: ${prof}\n` +
      `Total Recebido (${state.pdvFormaPag}): ${fmtMoeda(total)}\n` +
      `Comissão Calculada: ${fmtMoeda(comissao)}`
    );
  };

  window.nxSimAddFinanceiro = function () {
    const desc = (document.getElementById('nx-fin-desc')?.value || '').trim() || 'Lançamento Manual';
    const tipo = document.getElementById('nx-fin-tipo')?.value || 'Entrada';
    const val = parseFloat(document.getElementById('nx-fin-val')?.value) || 150;
    state.lancamentosFin.unshift({
      id: Date.now(),
      data: '05/10/2026',
      desc,
      cat: tipo === 'Entrada' ? 'Receita Avulsa' : 'Despesa Operacional',
      tipo,
      valor: val,
      status: 'Pago'
    });
    renderNxWebSimulator();
    nxSimToast(`✅ Lançamento "${desc}" (${fmtMoeda(val)}) registrado no Caixa!`);
  };

  window.nxSimAddCliente = function () {
    const nome = (document.getElementById('nx-cli-nome')?.value || '').trim() || 'Nova Paciente';
    const tel = (document.getElementById('nx-cli-tel')?.value || '').trim() || '(11) 99999-0000';
    const cpf = (document.getElementById('nx-cli-cpf')?.value || '').trim() || '000.000.000-00';
    state.clientes.unshift({
      id: Date.now(),
      nome,
      tel,
      cpf,
      visitas: 1,
      totalGasto: 0,
      ultima: '05/10/2026',
      pacote: 'Nenhum'
    });
    renderNxWebSimulator();
    nxSimToast(`✅ Cliente "${nome}" cadastrada com sucesso!`);
  };

  window.nxSimGerarPdfSessao = function () {
    nxSimToast('📄 Relatório Clínico Antes & Depois (PDF A4) gerado com as marcações e medidas do paciente!');
  };

  window.nxSimAbrirManualModal = function () {
    nxSimToast(
      `📖 MANUAL DE INSTRUÇÕES EMBUTIDO (10 CAPÍTULOS):\n\n` +
      `1. Primeiro Acesso & Login Padrão (admin@admin.com / admin)\n` +
      `2. Teste Grátis de 15 Dias & Ativação Vitalícia\n` +
      `3. Dashboard & Indicadores com Porcentagem\n` +
      `4. Agenda Inteligente & WhatsApp em 1 Clique\n` +
      `5. Sala de Atendimento, Paquímetro & Balões Esticáveis\n` +
      `6. Pacotes Multi-Sessões (5, 10 ou mais sessões)\n` +
      `7. Serviços & Produtos com 16 Ícones de Estética\n` +
      `8. Frente de Caixa (PDV) & Recibo 80mm / A4\n` +
      `9. Financeiro & Rateio Automático de Comissões\n` +
      `10. Backup Automático em C:\\NX_Gestao_Estetica & Rede Local`
    );
  };

  window.nxSimAbrirNotificacoesModal = function () {
    const criticos = state.estoque.filter(e => e.qtd <= e.min).length;
    nxSimToast(
      `🔔 CENTRAL DE NOTIFICAÇÕES DO SISTEMA:\n\n` +
      `• 📦 Alerta de Estoque Mínimo: ${criticos} produto(s) precisam de reposição.\n` +
      `• 📅 Agendamentos de Hoje: ${state.agendamentos.length} horários programados.\n` +
      `• 💾 Backup Automático: Ativo e salvo em C:\\NX_Gestao_Estetica\\backups.`
    );
  };

  window.nxSimAbrirModalLicenca = function () {
    nxSimToast(
      `🛡️ LICENCIAMENTO NX GESTÃO ESTÉTICA:\n\n` +
      `• Status no Instalador: 15 Dias de Teste Grátis Totalmente Liberados!\n` +
      `• Licença Definitiva: Pagamento Único de R$ 97,00 (Sem mensalidades).`
    );
  };

  window.nxSimToast = function (msg) {
    const modal = document.getElementById('nx-sim-modal');
    const txt = document.getElementById('nx-sim-modal-text');
    if (modal && txt) {
      txt.innerText = msg;
      modal.classList.remove('hidden');
    } else {
      alert(msg);
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderNxWebSimulator();
  });
})();

/**
 * API Serverless Vercel - Mercado Pago Checkout
 * Endpoint: /api/criar-preferencia
 * 
 * Cria uma preferência oficial de pagamento no Mercado Pago (Checkout Pro)
 * com suporte nativo a PIX instantâneo, Cartão de Crédito e Saldo MP.
 * Utiliza a variável de ambiente segura MP_ACCESS_TOKEN configurada na Vercel.
 */

const PLANOS_DISPONIVEIS = {
  '1pc': {
    id: 'nx-estetica-1pc',
    title: 'NX Gestão Estética v2.5 - 1 PC (Licença Vitalícia)',
    description: 'Software de Gestão para Clínicas e Salões • Licença Vitalícia para 1 Computador (Zero Mensalidades)',
    price: 97.00
  },
  '3pcs': {
    id: 'nx-estetica-3pcs',
    title: 'NX Gestão Estética v2.5 - 3 PCs (Rede LAN)',
    description: 'Software de Gestão para Clínicas e Salões • Licença Vitalícia para 3 Computadores em Rede Local',
    price: 197.00
  },
  '6pcs': {
    id: 'nx-estetica-6pcs',
    title: 'NX Gestão Estética v2.5 - Até 6 PCs (Clínica Completa)',
    description: 'Software de Gestão para Clínicas e Salões • Licença Vitalícia para até 6 Computadores em Rede',
    price: 297.00
  }
};

export default async function handler(req, res) {
  // Configuração de CORS para permitir requisições do próprio domínio
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Utilize POST.' });
  }

  const token = process.env.MP_ACCESS_TOKEN ? process.env.MP_ACCESS_TOKEN.trim() : '';
  if (!token) {
    console.error('ERRO: MP_ACCESS_TOKEN não está definido nas variáveis de ambiente da Vercel.');
    return res.status(500).json({
      error: 'Serviço de pagamento não configurado. Por favor, adicione MP_ACCESS_TOKEN na Vercel.'
    });
  }

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const host = 'https://nx-gestao-estetica-site.vercel.app';
    const planoId = body.planoId && PLANOS_DISPONIVEIS[body.planoId] ? body.planoId : '1pc';
    const planoEscolhido = PLANOS_DISPONIVEIS[planoId];

    const email = body.email ? String(body.email).trim() : '';
    const nome = body.nome ? String(body.nome).trim() : '';

    const preferenceData = {
      items: [
        {
          id: planoEscolhido.id,
          title: planoEscolhido.title,
          description: planoEscolhido.description,
          picture_url: `${host}/assets/logo.png`,
          category_id: 'services',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: Number(planoEscolhido.price)
        }
      ],
      back_urls: {
        success: `${host}/obrigado.html?plano=${planoId}`,
        pending: `${host}/obrigado.html?plano=${planoId}`,
        failure: `${host}/index.html`
      },
      auto_return: 'approved'
    };

    if (email) {
      preferenceData.payer = {
        email: email,
        name: nome || undefined
      };
    }

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(preferenceData)
    });

    const rawText = await mpResponse.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Resposta não-JSON do Mercado Pago:', mpResponse.status, rawText);
      return res.status(502).json({
        error: `Resposta inesperada do Mercado Pago (Status: ${mpResponse.status})`,
        respostaBruta: rawText.slice(0, 300)
      });
    }

    if (!mpResponse.ok) {
      console.error('Erro na resposta do Mercado Pago:', data);
      return res.status(mpResponse.status).json({
        error: data.message || data.error || 'Falha ao gerar preferência no Mercado Pago',
        detalhes: data
      });
    }

    return res.status(200).json({
      id: data.id,
      init_point: data.init_point, // Link oficial para redirecionar o cliente para pagar
      sandbox_init_point: data.sandbox_init_point
    });

  } catch (error) {
    console.error('Erro interno ao processar preferência:', error);
    return res.status(500).json({
      error: 'Erro interno ao comunicar com o Mercado Pago: ' + (error.message || String(error))
    });
  }
}

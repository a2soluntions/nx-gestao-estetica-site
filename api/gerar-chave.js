import crypto from 'crypto';

/**
 * API Serverless Vercel - Gerador Automático de Chave Vitalícia
 * Endpoint: /api/gerar-chave
 * 
 * Gera a Chave de Ativação Definitiva oficial para o Hardware ID (HWID) do cliente,
 * mantendo a proteção por máquina intacta e entregando 100% no navegador.
 */

const MASTER_SECRET_KEY = process.env.NX_MASTER_SECRET || 'NX_ESTETICA_ADVANCED_KEYGEN_MASTER_2026_@#K99_SECURE';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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

  try {
    let body = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    let hwid = String(body.hwid || '').trim().toUpperCase();

    // Validação de formato de Hardware ID: NX-XXXX-XXXX-XXXX-XXXX
    if (!hwid) {
      return res.status(400).json({ error: 'Por favor, informe o Código do Computador (Hardware ID).' });
    }

    const regexHWID = /^NX-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    if (!regexHWID.test(hwid)) {
      return res.status(400).json({
        error: 'Formato de Hardware ID inválido. O código deve ter o padrão NX-XXXX-XXXX-XXXX-XXXX (ex: NX-C74B-2035-878C-3B87).'
      });
    }

    const tipo = 'V'; // Vitalícia
    const exp_str = 'PERP';
    const payload = `${hwid}|${tipo}|${exp_str}`;

    const sig = crypto
      .createHmac('sha256', MASTER_SECRET_KEY)
      .update(payload, 'utf8')
      .digest('hex')
      .toUpperCase()
      .slice(0, 16);

    const chave = `NX${tipo}-${exp_str}-${sig.slice(0, 4)}-${sig.slice(4, 8)}-${sig.slice(8, 12)}-${sig.slice(12, 16)}`;

    return res.status(200).json({
      success: true,
      hwid: hwid,
      chave: chave,
      tipo: 'Licença Vitalícia (Perpétua)',
      mensagem: 'Chave gerada com sucesso! Copie e cole na tela de Ativação do seu sistema.'
    });

  } catch (error) {
    console.error('Erro ao gerar chave de licença:', error);
    return res.status(500).json({
      error: 'Erro interno ao gerar a chave de licença.'
    });
  }
}

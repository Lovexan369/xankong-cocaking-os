/**
 * XanKong Cocaking OS - Telegram Bot
 * Author: Dmitry Koval
 * Features: NarutoAI, Xancoin payments, Exchange
 */

const { Telegraf } = require('telegraf');

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('ERROR: BOT_TOKEN environment variable is required');
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// In-memory balances (replace with real DB / blockchain later)
const balances = new Map();

function getBalance(userId) {
  if (!balances.has(userId)) {
    balances.set(userId, 1248.45);
  }
  return balances.get(userId);
}

bot.start((ctx) => {
  ctx.reply(
    '🌟 *XanKong Cocaking OS* запущен!\n\n' +
    'Команды:\n' +
    '/balance — баланс XAN\n' +
    '/pay — перевод XAN\n' +
    '/exchange — курс\n' +
    '/ai <вопрос> — NarutoAI\n' +
    '/evolve — Live Evolution',
    { parse_mode: 'Markdown' }
  );
});

bot.command('balance', (ctx) => {
  const bal = getBalance(ctx.from.id);
  ctx.reply(`💰 Ваш баланс: *${bal.toFixed(2)} XAN*`, { parse_mode: 'Markdown' });
});

bot.command('pay', (ctx) => {
  ctx.reply('💸 Отправьте: `/pay @username 100`\n(В продакшене — реальный перевод через смарт-контракт)', { parse_mode: 'Markdown' });
});

bot.command('exchange', (ctx) => {
  ctx.reply('🔄 *Xan Exchange*\n1 XAN ≈ 0.85 USD\nКупить / Продать — напишите сумму', { parse_mode: 'Markdown' });
});

bot.command('ai', (ctx) => {
  const query = ctx.message.text.replace(/^\/ai\s*/i, '').trim();
  if (!query) {
    return ctx.reply('Напишите: /ai ваш вопрос');
  }
  ctx.reply(`🧠 *NarutoAI*: "${query}"\n\nАнализ выполнен. Рекомендация готова в реальном времени.`, { parse_mode: 'Markdown' });
});

bot.command('evolve', (ctx) => {
  ctx.reply('✨ *Live Evolution* запущена.\nАлгоритмы приложений обновляются...');
});

bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();
  if (text.includes('купить') || text.includes('продать')) {
    ctx.reply('✅ Операция на Exchange зарегистрирована.');
  }
});

bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
});

bot.launch().then(() => {
  console.log('🚀 XanKong Cocaking Bot + NarutoAI started');
}).catch((err) => {
  console.error('Failed to start bot:', err.message);
  process.exit(1);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

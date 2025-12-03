const { Client, GatewayIntentBits } = require("discord.js");

// ---------- تابع تبدیل یوزرنیم با شیفت ۳تایی ----------
function shiftUsername(str) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const lettersUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  let result = "";

  for (let char of str) {
    if (letters.includes(char)) {
      result += letters[(letters.indexOf(char) + 3) % 26];
    } else if (lettersUp.includes(char)) {
      result += lettersUp[(lettersUp.indexOf(char) + 3) % 26];
    } else if (numbers.includes(char)) {
      result += numbers[(numbers.indexOf(char) + 3) % 10];
    } else {
      result += char;
    }
  }

  return result;
}

// ---------- شروع ربات ----------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const now = Date.now();
  const joinedAt = member.joinedAt ? member.joinedAt.getTime() : null;
  if (!joinedAt) return;

  const diffDays = (now - joinedAt) / (1000 * 60 * 60 * 24);
  if (diffDays > 30) return;

  const safeName = encodeURIComponent(shiftUsername(member.user.username));
  const link = `https://shop-venturestorms.ir/dc/?dc=${safeName}`;

  const message = 
`سلام! 🙌
به سرور ونچراستورم خوش اومدی 🌟

این لینک اختصاصی شماست:
🔗 ${link}

اگر سوالی داشتی همینجا پیام بده ❤️`;

  try {
    await member.send(message);
    console.log(`📨 DM sent to: ${member.user.tag}`);
  } catch (err) {
    console.log(`🔒 نمی‌توانم DM ارسال کنم به ${member.user.tag}`);
  }
});

// لاگین با توکن از Environment Variable
client.login(process.env.DISCORD_TOKEN);

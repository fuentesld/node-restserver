//=========
// Puerto
// ========

process.env.PORT = process.env.PORT || 3000;

//=========
// Entorno
// ========
process.env.NODE_ENV = process.env.NODE_ENV || "env";

//=========
// Vencimiento toke
// ========
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = "5 days";

//=========
// Seed de verificación
// ========
process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

//=========
// DB
// ========

let urlDB;

if (process.env.NODE_ENV === "env") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//=========
// Google client
// ========

process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "566164050738-h3k4ppoh0bvfmau23csong404eh4grds.apps.googleusercontent.com";

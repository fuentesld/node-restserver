//=========
// Puerto
// ========

process.env.PORT = process.env.PORT || 3000;

//=========
// Entorno
// ========
process.env.NODE_ENV = process.env.PORT || "env";

//=========
// DB
// ========

let urlDB;

if (process.env.NODE_ENV === "env") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB =
    "mongodb://cafe-user:Persi2520.@ds037498.mlab.com:37498/fuentesld-cafe";
}

process.env.URLDB = urlDB;

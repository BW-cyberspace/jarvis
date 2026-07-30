#!/usr/bin/env node
// Serves the JARVIS dashboard at http://localhost:1963 so Chrome permanently
// remembers microphone (and pop-up) permission — file:// pages get asked every
// time. Zero dependencies. Usage: node serve.js  (or double-click
// start-jarvis.bat on Windows).

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 1963; // the year Tony Stark first suited up
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".json": "application/json",
  ".md":   "text/markdown; charset=utf-8",
  ".wav":  "audio/wav",
  ".mp3":  "audio/mpeg",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/dashboard.html";
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end("Forbidden"); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, "127.0.0.1", () => {
  console.log(`J.A.R.V.I.S. online at http://localhost:${PORT}`);
  console.log("Keep this window open. Ctrl+C to shut down.");
});

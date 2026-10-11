import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEPLOYMENT_ID = "dpl_8TRzETrDMHBaHiS5zjKfpJKGU6Yd";
const TEAM_ID = "team_ZgwGgLDmdc3ARbDWGePDC1v0";
const LIVE_ORIGIN = "https://www.joeldelgadomusic.com";
const MAX_BUFFER = 256 * 1024 * 1024;

const BINARY_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".mov", ".ico"]);

function vercelApi(apiPath) {
  const sep = apiPath.includes("?") ? "&" : "?";
  const route = `${apiPath}${sep}teamId=${TEAM_ID}`;
  const result = spawnSync("vercel", ["api", route], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: MAX_BUFFER,
    shell: process.platform === "win32",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "vercel api failed");
  }
  return JSON.parse(result.stdout.replace(/^\uFEFF/, "").trim());
}

function collectFiles(nodes, prefix = "") {
  const files = [];
  for (const node of nodes) {
    const rel = prefix ? `${prefix}/${node.name}` : node.name;
    if (node.type === "directory") {
      if (node.name === "dist") continue;
      if (node.children?.length) files.push(...collectFiles(node.children, rel));
    } else if (node.type === "file" && node.uid) {
      files.push({ rel, uid: node.uid });
    }
  }
  return files;
}

function toProjectPath(deployRel) {
  const parts = deployRel.split("/");
  if (parts[0] === "src") parts.shift();
  return parts.join("/");
}

async function downloadFromLive(urlPath, dest) {
  const rel = urlPath.replace(/^\//, "").replace(/^public\//, "");
  const origins = [LIVE_ORIGIN, "https://joeldelgadomusic.com"];
  let res;
  for (const origin of origins) {
    res = await fetch(`${origin}/${rel}`);
    if (res.ok) break;
  }
  if (!res?.ok) throw new Error(`Live fetch failed for ${urlPath}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const tree = vercelApi(`/v6/deployments/${DEPLOYMENT_ID}/files`);

const deployFiles = collectFiles(tree);
const pulled = [];

for (const { rel, uid } of deployFiles) {
  const projectRel = toProjectPath(rel);
  if (!projectRel) continue;

  const dest = path.join(ROOT, projectRel);
  const ext = path.extname(projectRel).toLowerCase();
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  if (ext === ".mp4" || ext === ".mov") {
    try {
      const data = vercelApi(`/v8/deployments/${DEPLOYMENT_ID}/files/${uid}`);
      fs.writeFileSync(dest, Buffer.from(data.data, "base64"));
    } catch {
      await downloadFromLive(projectRel.replace(/\\/g, "/"), dest);
    }
  } else {
    const data = vercelApi(`/v8/deployments/${DEPLOYMENT_ID}/files/${uid}`);
    fs.writeFileSync(dest, Buffer.from(data.data, "base64"));
  }

  pulled.push(projectRel);
  process.stdout.write(`.\n`);
}

const deployPaths = new Set(deployFiles.map((f) => toProjectPath(f.rel)).filter(Boolean));
const removed = [];
for (const rel of [
  "src/components/ThemeSwitcher.jsx",
  "src/data/themes.js",
  "src/theme.js",
]) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full) && !deployPaths.has(rel)) {
    fs.unlinkSync(full);
    removed.push(rel);
  }
}

console.log(
  JSON.stringify(
    {
      deploymentId: DEPLOYMENT_ID,
      pulled: pulled.length,
      removed,
    },
    null,
    2,
  ),
);

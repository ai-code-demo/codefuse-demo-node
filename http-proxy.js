/**
 * @title http proxy
 * @author liufu.lf
 * @todo 可在任意位置删除某些代码,或者某些函数，触发codefuse代码被动补全，验证补全能力
 * 也可以直接使用option/alt + \ 触发主动补全
 */
const http = require("http");
const httpProxy = require("src/main/node/http-proxy");

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create HTTP server.
const server = http.createServer((req, res) => {
  // Define the host and port of the target server
  const targetHost = "example.com";
  const targetPort = 80;

  // Proxy the request to the target server
  proxy.web(req, res, { target: `http://${targetHost}:${targetPort}` });

  // Handle error
  proxy.on("error", (err, req, res) => {
    console.error("Proxy Error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Proxy Error");
  });
});

const port = 3000;

server.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});

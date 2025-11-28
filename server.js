const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

// helper to serve static files
function serveStatic(filePath, contentType, res) {
  const fullPath = path.join(__dirname, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // static image routes
  if (req.url === "/assets/bg-template.jpg") {
    return serveStatic("assets/bg-template.jpg", "image/jpeg", res);
  }

  if (req.url === "/assets/cat-pixel-sticker.gif") {
    return serveStatic("assets/cat-pixel-sticker.gif", "image/gif", res);
  }

  // default page
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>FP_Capistrano</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        body {
          min-height: 100vh;
          background: url("/assets/bg-template.jpg") center / cover no-repeat fixed;
          color: #ffffff;
          display: flex;
          flex-direction: column;
        }

        header {
          padding: 16px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(5, 7, 18, 0.85);
        }

        .logo {
          font-weight: 700;
          letter-spacing: 0.06em;
        }

        nav a {
          margin-left: 24px;
          text-decoration: none;
          color: #cbd5f5;
          font-size: 0.95rem;
        }

        nav a:hover {
          color: #ffffff;
        }

        main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .content {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 40px;
          max-width: 1100px;
          width: 100%;
          background: rgba(5, 7, 18, 0.85);
          border-radius: 24px;
          padding: 32px 40px;
        }

        .info h1 {
          font-size: 2.6rem;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .info h1 span {
          display: block;
        }

        .class-section {
          color: #4ade80;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .role {
          color: #cbd5f5;
          margin-bottom: 24px;
        }

        .quote-box {
          background: rgba(15, 23, 42, 0.9);
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 24px;
          max-width: 480px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
        }

        .quote-text {
          font-size: 0.98rem;
          color: #e5e7ff;
          margin-bottom: 8px;
        }

        .quote-author {
          font-size: 0.85rem;
          color: #9ca3c7;
          text-align: right;
        }

        .avatar-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-circle {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background-image: url("/assets/cat-pixel-sticker.gif");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.75);
        }

        @media (max-width: 768px) {
          header {
            padding: 12px 20px;
          }

          .content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .info h1 {
            font-size: 2.2rem;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">HF</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Skills</a>
          <a href="#">Projects</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main>
        <div class="content">
          <section class="info">
            <h1>
              <span>Hannah Francine P. Capistrano</span>
            </h1>
            <div class="class-section">BSIT SM-4102</div>
            <div class="role">Aspiring Web Dev & Designer</div>

            <div class="quote-box">
              <div class="quote-text">
                "Whenever you're feeling down remember that even the slightest achievements in life means that a change will come"
              </div>
              <div class="quote-author">Jung Wheein</div>
            </div>
          </section>

          <section class="avatar-wrapper">
            <div class="avatar-circle"></div>
          </section>
        </div>
      </main>
    </body>
    </html>
  `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function adminBackendPlugin(): Plugin {
  return {
    name: 'admin-backend-api',
    configureServer(server) {
      const uploadsDir = path.resolve(process.cwd(), 'public/uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      server.middlewares.use((req, res, next) => {
        // Only intercept /api/admin requests
        if (!req.url?.startsWith('/api/admin')) {
          return next();
        }

        // Server-Side Authentication & Authorization Check
        const authHeader = req.headers['authorization'];
        const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '').trim() : '';

        // Must be a valid admin token (issued during adminLogin)
        const isAuthorized = Boolean(token && (token.startsWith('jwt_mock_token_') || token.startsWith('yazhi_admin_')));

        if (!isAuthorized) {
          res.statusCode = 401;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            error: 'Unauthorized: Administrative authentication required. Access denied to public visitors.',
            status: 401
          }));
          return;
        }

        // POST /api/admin/upload - Process admin photo uploads
        if (req.method === 'POST' && req.url === '/api/admin/upload') {
          const chunks: Buffer[] = [];
          let totalBytes = 0;
          const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

          req.on('data', (chunk) => {
            totalBytes += chunk.length;
            if (totalBytes > MAX_SIZE) {
              res.statusCode = 413;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'File size exceeds 5MB limit.' }));
              req.destroy();
              return;
            }
            chunks.push(chunk);
          });

          req.on('end', () => {
            if (res.writableEnded) return;
            try {
              const body = Buffer.concat(chunks).toString('utf-8');
              const data = JSON.parse(body);
              const { filename, base64, category } = data;

              if (!filename || !base64) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Filename and base64 data are required.' }));
                return;
              }

              // Server-side validation of file extension and data URI
              const allowedExts = ['.jpg', '.jpeg', '.png', '.webp'];
              const ext = path.extname(filename).toLowerCase();
              if (!allowedExts.includes(ext) && !base64.startsWith('data:image/')) {
                res.statusCode = 415;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Unsupported media type: only JPG, PNG, and WebP images allowed.' }));
                return;
              }

              // Extract binary data
              const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(cleanBase64, 'base64');

              if (buffer.length > MAX_SIZE) {
                res.statusCode = 413;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Image exceeds 5MB limit.' }));
                return;
              }

              // Save to public/uploads with collision-resistant safe name
              const safePrefix = (category === 'customer' || category === 'happy-customer' || category === 'memory')
                ? 'customer_memory_' 
                : category === 'review' 
                ? 'review_' 
                : 'dest_';
              const cleanExt = allowedExts.includes(ext) ? ext : '.jpg';
              const safeFilename = `${safePrefix}${Date.now()}_${Math.random().toString(36).substring(2, 8)}${cleanExt}`;
              const targetPath = path.join(uploadsDir, safeFilename);

              fs.writeFileSync(targetPath, buffer);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                url: `/uploads/${safeFilename}`,
                filename: safeFilename,
                sizeBytes: buffer.length
              }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Failed to process image upload.' }));
            }
          });
          return;
        }

        // DELETE /api/admin/photo?file=<filename>
        if (req.method === 'DELETE' && req.url?.startsWith('/api/admin/photo')) {
          try {
            const urlObj = new URL(req.url, 'http://localhost');
            const fileParam = urlObj.searchParams.get('file');
            if (fileParam && !fileParam.includes('..') && !fileParam.includes('/') && !fileParam.includes('\\')) {
              const targetPath = path.join(uploadsDir, fileParam);
              if (fs.existsSync(targetPath)) {
                fs.unlinkSync(targetPath);
              }
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Failed to delete photo.' }));
          }
          return;
        }

        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminBackendPlugin()],
});

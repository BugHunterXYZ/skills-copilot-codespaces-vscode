// Create web server
// Run server
// Load comments from comments.json
// Add comment to comments.json
// Respond with comments.json
// Handle errors
// Handle POST requests

// Step 1: Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const method = req.method;
  const urlPath = url.parse(req.url).pathname;
  const fullPath = path.join(__dirname, urlPath);

  // Step 2: Load comments from comments.json
  if (urlPath === '/comments' && method === 'GET') {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading comments');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }

  // Step 3: Add comment to comments.json
  if (urlPath === '/comments' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const comments = JSON.parse(body);
      fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error saving comment');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(body);
      });
    });
  }

  // Step 4: Respond with comments.json
  if (urlPath === '/comments' && method === 'GET') {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading comments');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }

  // Step 5: Handle errors
if (urlPath === '/comments' && method === 'GET') {
    fs.readFile(path.join(__dirname, 'comments.json'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading comments');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
    });
} else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
}

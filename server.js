import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Working hours: Monday to Friday, 9 to 17
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('The web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Apply working hours middleware to all routes
app.use(workingHoursMiddleware);

// Serve static files (CSS)
app.use(express.static(path.join(path.resolve(), 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve('views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.resolve('views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve('views', 'contact.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

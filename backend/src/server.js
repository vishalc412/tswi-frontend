const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/warryworks/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Hypothecation Management API is healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Addition endpoint - Create new hypothecation
app.post('/warryworks/addition', (req, res) => {
  const { chasiNo, eng_no, hpa_from, hpa_upto, docurl, regnNo } = req.body;

  // Validation
  if (!chasiNo || !eng_no || !hpa_from || !hpa_upto || !docurl || !regnNo) {
    return res.status(400).json({
      responseCode: '0',
      responseMessage: 'Missing required fields',
      status: 'error',
      statusText: 'All fields are required: chasiNo, eng_no, hpa_from, hpa_upto, docurl, regnNo'
    });
  }

  // Simulate database operation
  const referenceNumber = `REF${Date.now()}`;
  const dataReferenceId = `DATA${Date.now()}`;

  console.log('Addition Request:', { chasiNo, eng_no, regnNo });

  res.json({
    responseCode: '1',
    refrenceNumber: referenceNumber,
    responseMessage: 'Hypothecation added successfully',
    dataReferenceId: dataReferenceId,
    status: 'ok',
    statusText: 'Hypothecation agreement created successfully'
  });
});

// Continuation endpoint - Extend existing hypothecation
app.post('/warryworks/continuation', (req, res) => {
  const { transactionId, fncrCode, chasiNo, regnNo, hpc_from, hpc_upto, docurl } = req.body;

  // Validation
  if (!transactionId || !fncrCode || !chasiNo || !regnNo || !hpc_from || !hpc_upto || !docurl) {
    return res.status(400).json({
      responseCode: '0',
      responseMessage: 'Missing required fields',
      status: 'error',
      statusText: 'All fields are required: transactionId, fncrCode, chasiNo, regnNo, hpc_from, hpc_upto, docurl'
    });
  }

  // Validate fncrCode is a number
  if (isNaN(fncrCode)) {
    return res.status(400).json({
      responseCode: '0',
      responseMessage: 'Invalid fncrCode',
      status: 'error',
      statusText: 'fncrCode must be a valid number'
    });
  }

  // Simulate database operation
  const referenceNumber = `CONT${Date.now()}`;
  const dataReferenceId = `DATA${Date.now()}`;

  console.log('Continuation Request:', { transactionId, chasiNo, regnNo, fncrCode });

  res.json({
    responseCode: '1',
    refrenceNumber: referenceNumber,
    responseMessage: 'Hypothecation continued successfully',
    dataReferenceId: dataReferenceId,
    status: 'ok',
    statusText: 'Hypothecation agreement extended successfully'
  });
});

// Termination endpoint - Close hypothecation
app.post('/warryworks/termination', (req, res) => {
  const { regnNo, chassisNo, terminationDt, docUrl } = req.body;

  // Validation
  if (!regnNo || !chassisNo || !terminationDt || !docUrl) {
    return res.status(400).json({
      responseCode: '0',
      responseMessage: 'Missing required fields',
      status: 'error',
      statusText: 'All fields are required: regnNo, chassisNo, terminationDt, docUrl'
    });
  }

  // Simulate database operation
  const referenceNumber = `TERM${Date.now()}`;
  const dataReferenceId = `DATA${Date.now()}`;

  console.log('Termination Request:', { chassisNo, regnNo, terminationDt });

  res.json({
    responseCode: '1',
    refrenceNumber: referenceNumber,
    responseMessage: 'Hypothecation terminated successfully',
    dataReferenceId: dataReferenceId,
    status: 'ok',
    statusText: 'Hypothecation agreement closed successfully'
  });
});

// Generate report endpoint
app.get('/warryworks/report/generate', (req, res) => {
  const { report_date } = req.query;

  if (!report_date) {
    return res.status(400).json({
      status: 'error',
      message: 'report_date parameter is required'
    });
  }

  console.log('Report Generation Request:', { report_date });

  // Simulate report generation
  const recordCount = Math.floor(Math.random() * 100) + 1;

  res.json({
    status: 'ok',
    message: 'Report generated successfully',
    reportDate: report_date,
    recordCount: recordCount,
    generatedAt: new Date().toISOString()
  });
});

// Download report endpoint
app.get('/warryworks/report/download', (req, res) => {
  const { report_date } = req.query;

  if (!report_date) {
    return res.status(400).json({
      status: 'error',
      message: 'report_date parameter is required'
    });
  }

  console.log('Report Download Request:', { report_date });

  // Generate sample CSV data
  const csvData = [
    'Date,Chassis Number,Registration Number,Engine Number,HPA From,HPA Upto,Status,Reference Number',
    `${report_date},MB1234567890ABCDE,MH12AB1234,ENG123456,${report_date},2025-12-31,Active,REF1234567890`,
    `${report_date},VN9876543210XYZHJ,DL01CD5678,ENG987654,${report_date},2025-12-31,Active,REF0987654321`,
    `${report_date},TN5555555555ABCDE,KA03EF9012,ENG555555,${report_date},2025-12-31,Terminated,REF5555555555`
  ].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=hypothecation_report_${report_date}.csv`);
  res.send(csvData);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(70));
  console.log('MS EXIMP Hypothecation Management - Backend API');
  console.log('='.repeat(70));
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/warryworks/health`);
  console.log('='.repeat(70));
});

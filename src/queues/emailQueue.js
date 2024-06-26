const { Queue, Worker } = require('bullmq');
const emailController = require('../controllers/emailController');

const emailQueue = new Queue('emailQueue');

emailQueue.add('processEmail', { emailContent: 'Email content here' });

const worker = new Worker('emailQueue', async job => {
  const { emailContent } = job.data;
  await emailController.processEmail(emailContent);
});

worker.on('completed', job => {
  console.log(`Job completed with result ${job.returnvalue}`);
});

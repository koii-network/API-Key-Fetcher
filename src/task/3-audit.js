import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";

export async function audit(submission, roundNumber, submitterKey) {
  try {
    // Split the submission string by '&'
    const [pubkey, credentialCount] = submission.split('&');
    
    // Convert credentialCount to number
    const count = parseInt(credentialCount);
    
    // Validate the submission
    if (isNaN(count) || count === 0) {
      console.log('Invalid submission: credential count must be greater than 0');
      return false;
    }
    
    // console.log(`Audit passed: Found ${count} credentials`);
    return true;

  } catch (error) {
    console.error('Audit error:', error);
    return false;
  }
}

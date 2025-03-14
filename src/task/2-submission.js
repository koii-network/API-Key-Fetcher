import { namespaceWrapper, MAIN_ACCOUNT_PUBKEY } from "@_koii/task-manager/namespace-wrapper";

export async function submission(roundNumber) {
  /**
   * Submit the task proofs for auditing
   * Must return a string of max 512 bytes to be submitted on chain
   */
  try {
    let credentialCount = 0;

    // Check for github_username
    const githubUsername = await namespaceWrapper.getSecret("github_username");
    if (githubUsername) credentialCount++;

    // Check for github_token
    const githubToken = await namespaceWrapper.getSecret("github_token");
    if (githubToken) credentialCount++;

    // Check for claude_api_key
    const claudeApiKey = await namespaceWrapper.getSecret("claude_api_key");
    if (claudeApiKey) credentialCount++;

    // If no credentials found, skip submission
    if (credentialCount === 0) {
      console.log('No credentials found, skipping submission');
      return;
    }

    // Create submission string with format: MAIN_ACCOUNT_PUBKEY&credentialCount
    const submissionString = `${MAIN_ACCOUNT_PUBKEY}&${credentialCount}`;
    
    console.log('Submitting credential count:', credentialCount);
    return submissionString;

  } catch (error) {
    console.error("MAKE SUBMISSION ERROR:", error);
    return; // Return nothing in case of error
  }
}

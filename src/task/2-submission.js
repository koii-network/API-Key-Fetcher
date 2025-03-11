import { namespaceWrapper } from "@_koii/task-manager/namespace-wrapper";

export async function submission(roundNumber) {
  /**
   * Submit the task proofs for auditing
   * Must return a string of max 512 bytes to be submitted on chain
   */
  try {
    console.log('No submission for this task');
  } catch (error) {
    console.error("MAKE SUBMISSION ERROR:", error);
  }
}

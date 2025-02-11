import { Action } from "../../types/action";
import { SolanaAgentKit } from "../../agent";
import { z } from "zod";
import { verify_program } from "../../tools";

const verifyProgramAction: Action = {
  name: "VERIFY_PROGRAM_ACTION",
  similes: [
    "verify solana program",
    "verify on-chain program",
    "verify program deployment",
    "sign program verification"
  ],
  description: "Verify a Solana program deployment by signing a verification PDA. Takes a program ID and GitHub repository URL as input.",
  examples: [
    {
      input: {
        programId: "VERFMzqZQwqn6CmQQPqZQVpC2U6RXpUZYS3qLdwKTLh",
        repositoryUrl: "https://github.com/username/program",
        commitHash: "abc123",
      },
      output: {
        status: "success",
        message: "Program verified successfully",
        verificationPda: "verif12345...",
      },
      explanation: "Verify a Solana program using its program ID and source repository"
    }
  ],
  schema: z.object({
    programId: z.string(),
    repositoryUrl: z.string().url(),
    commitHash: z.string().optional(),
    binaryHash: z.string().optional()
  }),
  handler: async (agent: SolanaAgentKit, input: Record<string, any>) => {
    const verificationPda = await verify_program(agent, {
      programId: input.programId,
      repositoryUrl: input.repositoryUrl,
      commitHash: input.commitHash,
      binaryHash: input.binaryHash
    });

    return {
      status: "success", 
      message: "Program verified successfully",
      verificationPda
    };
  }
};

export default verifyProgramAction; 
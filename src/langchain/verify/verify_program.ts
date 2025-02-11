import { Tool } from "langchain/tools";
import { SolanaAgentKit } from "../../agent";
import { PublicKey } from "@solana/web3.js";

export class SolanaVerifyProgramTool extends Tool {
  name = "verify_program";
  description = `Verify a Solana program deployment by signing a verification PDA.
  
  Inputs (JSON string):
  - programId: string, the program ID to verify
  - repositoryUrl: string, the GitHub repository URL containing the program source
  - commitHash: string (optional), specific commit hash to verify
  - binaryHash: string (optional), expected binary hash`;

  constructor(private solanaKit: SolanaAgentKit) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const params = JSON.parse(input);
      
      const verificationPda = await this.solanaKit.verifyProgram({
        programId: params.programId,
        repositoryUrl: params.repositoryUrl,
        commitHash: params.commitHash,
        binaryHash: params.binaryHash
      });

      return JSON.stringify({
        status: "success",
        message: "Program verified successfully",
        verificationPda
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: "VERIFY_PROGRAM_ERROR"
      });
    }
  }
} 
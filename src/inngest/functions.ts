import { inngest } from "./client";
import { prisma } from "@/lib/prisma";

export const evaluateKeywordsCron = inngest.createFunction(
  { id: "evaluate-keywords-cron" },
  { cron: "TZ=UTC 0 0 * * *" }, // Run daily at midnight
  async ({ event, step }) => {
    
    const targetKeywords = await step.run("fetch-keywords", async () => {
      return await prisma.targetKeyword.findMany({
        include: { brand: true },
      });
    });

    const results = await step.run("simulate-llm-search", async () => {
      // Here we would normally map over targetKeywords and call OpenAI/Claude
      // For now, we return mock results
      return targetKeywords.map((kw) => {
        const statuses = ["Highly Recommended", "Briefly Mentioned", "Not Mentioned"];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        const models = ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"];
        const randomModel = models[Math.floor(Math.random() * models.length)];

        return {
          keywordId: kw.id,
          aiModelName: randomModel,
          status: randomStatus,
          sentiment: randomStatus === "Highly Recommended" ? "Positive" : "Neutral",
          recommendationRank: randomStatus === "Highly Recommended" ? 1 : 0,
        };
      });
    });

    await step.run("save-audit-logs", async () => {
      await prisma.aiAuditLog.createMany({
        data: results,
      });
    });

    return { message: "Audit completed successfully", count: results.length };
  }
);

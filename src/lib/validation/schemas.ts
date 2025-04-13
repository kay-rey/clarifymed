import { z } from "zod";

// export const medicalTermSchema = z.object({
//   term: z.string().min(1),
//   definition: z.string().min(1),
//   technicalDefinition: z.string().optional(),
//   category: z.array(z.string()).optional(),
//   synonyms: z.array(z.string()).optional(),
//   metadata: z.object({
//     complexity: z.enum(['basic', 'intermediate', 'advanced']),
//     language: z.string(),
//     verified: z.boolean()
//   }).optional()
// })

export const medicalAiPromptSchema = z.object({
	question: z.string().min(1),
});

export const medicalQuerySchema = z.object({
	userId: z.string(),
	originalText: z.string().min(1),
	status: z.enum(["pending", "completed", "failed"]),
});

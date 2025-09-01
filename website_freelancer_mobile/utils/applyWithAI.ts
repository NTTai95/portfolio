import { apiGet } from "@/api/baseApi";
import axios, { AxiosRequestConfig } from "axios";

type ParamValue = string | string[];

const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyAFx5_9uZBNrUwRc5wtwvX4wBXPHkpS1cg";

/**
 * Gọi AI Gemini để sinh thư ứng tuyển
 * @param id                ID công việc
 * @param applyBudget       Ngân sách freelancer mong muốn
 * @param applyDurationHours Thời gian freelancer dự tính
 * @param applyContent      Nội dung hiện tại (nếu có)
 * @returns                 Nội dung ứng tuyển được AI sinh ra
 */
export async function applyWithAI({
    id,
    applyBudget,
    applyDurationHours,
    applyContent,
}: {
    id: ParamValue;
    applyBudget: number;
    applyDurationHours: number;
    applyContent: string;
}): Promise<string> {
    // 1. Lấy dữ liệu gốc từ backend của bạn
    const { data: info } = await apiGet<{
        jobTitle: string;
        jobDescription: string;
        jobSkills: string[];
        jobLanguages: string[];
        jobDurationHours: number;
        jobBudget: number;
        employerFullName: string;
        employerIsMale: boolean;
        employerBirthday: string;
        freelancerFullName: string;
        freelancerBirthday: string;
        freelancerSkills: string[];
        freelancerLanguages: string[];
        freelancerIsMale: boolean;
    }>(`/meta/job/${id}/apply/ai`);

    // 2. Tạo prompt cho Gemini
    const prompt = `
You are a professional AI writing assistant specializing in job applications for freelancers. Your task is to generate a polished, professional, and persuasive Vietnamese cover letter using only the authentic information provided below.

Important requirements:
- Write in polite, formal, and professional Vietnamese.
- Structure the letter clearly with an opening, body, and conclusion.
- Use normal spacing and line breaks only. Do not include any markdown, bullet points, or special formatting.
- The tone should be confident yet humble, tailored to the specific job and client.
- Highlight the freelancer's relevant skills and strengths based on the job requirements.
- Emphasize compatibility between freelancer and job (skills match, budget alignment, language, timeline).
- If the freelancer's expectations differ from the job's (e.g., budget or timeline), explain the value or reason briefly and persuasively.
- If there is an existing draft application content, improve and refine it, not just copy it.
- Do not invent or assume any information not included.
- Prioritize clarity, conciseness, and sincerity. Avoid clichés or overly generic phrases.

Use the following real data to generate the letter:

--- Job Information ---
Title: ${info.jobTitle}
Description: ${info.jobDescription}
Required Skills: ${info.jobSkills.join(", ")}
Required Languages: ${info.jobLanguages.join(", ")}
Estimated Duration: ${info.jobDurationHours} hours
Budget: ${info.jobBudget.toLocaleString("vi-VN")} VND

--- Client Information ---
Full Name: ${info.employerFullName}
Birthday: ${info.employerBirthday}
Gender: ${info.employerIsMale ? "Male" : "Female"}

--- Freelancer Information ---
Full Name: ${info.freelancerFullName}
Birthday: ${info.freelancerBirthday}
Gender: ${info.freelancerIsMale ? "Male" : "Female"}
Skills: ${info.freelancerSkills.join(", ")}
Languages: ${info.freelancerLanguages.join(", ")}

--- Application Details (from freelancer) ---
Expected Budget: ${applyBudget.toLocaleString("vi-VN")} VND
Expected Completion Time: ${applyDurationHours} hours
${applyContent ? `Current application content: ${applyContent}` : ""}

Please return only the final Vietnamese cover letter in plain text format, with professional and appropriate line breaks. No markdown, no HTML, no extra output.
`.trim();

    console.log(prompt);
    // 3. Gọi đến Gemini API
    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const body = {
        contents: [
            {
                parts: [
                    {
                        text: prompt,
                    },
                ],
            },
        ],
    };

    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios.post(url, body, config);

    const aiText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

    return aiText;
}

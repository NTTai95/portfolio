import { GoogleGenerativeAI } from "@google/generative-ai"
import profileApi from "@api/profileApi";
import jobPostApi from "@api/jobspostApi";
import skillApi from "@api/skillApi";

const genAI = new GoogleGenerativeAI("AIzaSyDXn4J0zCXwHa52WWD9soClmz7Q8Mg76-E");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Hàm generateRecruitmentContent sử dụng Gemini API để tạo nội dung bài tuyển dụng.
 *
 * @param {string} jobPostId - Mã định danh bài tuyển dụng.
 * @param {Object} details - Các thông tin cần thiết cho nội dung bài tuyển dụng.
 * @param {string} details.freelancerName - Tên của freelancer.
 * @param {string} details.freelancerDOB - Ngày sinh của freelancer (định dạng YYYY-MM-DD).
 * @param {string} details.freelancerIntro - Giới thiệu về freelancer.
 * @param {string} details.freelancerSkills - Những kỹ năng của freelancer.
 * @param {string|number} details.budget - Ngân sách của bài tuyển dụng.
 * @param {string} details.jobTitle - Tiêu đề của bài tuyển dụng.
 * @param {string} details.jobContent - Nội dung chi tiết của bài tuyển dụng.
 * @param {string} details.employerName - Tên của nhà tuyển dụng.
 * @returns {Promise<string>} - Nội dung bài tuyển dụng (đoạn text tiếng Việt).
 */
async function generateRecruitmentContent(details) {
  const {
    freelancerName,
    freelancerDOB,
    freelancerIntro,
    freelancerSkills,
    jobTitle,
    jobContent,
    jobSkills,
    recruiterName,
    representativeName,
    exp
  } = details;

  // Tính tuổi từ ngày sinh của freelancer.
  const birthDate = new Date(freelancerDOB);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  // Xây dựng prompt bằng tiếng Anh để tối ưu hiệu suất của Gemini API,
  // nhưng kết quả trả về yêu cầu là tiếng Việt.
  const prompt = `Act as a professional freelancer applying for a job. You must generate a highly professional and engaging job application letter in Vietnamese that captivates the recruiter's attention. Your output should be structured and clearly divided, using technical and impressive language. Base your response on the following provided freelancer sample data:

Freelancer Name: ${freelancerName}
Age: ${age} (Date of Birth: ${freelancerDOB})
Introduction: ${freelancerIntro}
Skills: ${freelancerSkills}
Job Title: ${jobTitle}
Job Content: ${jobContent}
Job Skills: ${jobSkills}
Recruiter Name: ${recruiterName}
Representative Name: ${representativeName}
Experience: 
${exp}

Note: The provided data fields might be incomplete. If any field is missing or empty, do not reference it or include any placeholder text (for example, do not use terms like [số năm kinh nghiệm] do not use terms like [Tên công ty] or [kỹ năng của bạn]). Simply omit those sections.

Mandatory guidelines:

Do not propose any new price (e.g., avoid statements like "Giá tôi muốn đề xuất là 100.000 VND").
Always include the freelancer’s name in the application (e.g., "Tôi là Nguyễn Văn A").
Adjust your tone and style appropriately based on the freelancer's age.
When describing skills, align closely with the provided Introduction and Skills information.
Clearly state what you will do for the recruiter's project based on the job requirements and the freelancer's profile.
Greet the recruiter by name (e.g., "Chào Công ty ABC") and also greet the representative as the application is addressed to them.
Avoid using any vulgar language.
Output plain text only without any markdown characters (such as **, [], or /*).
The entire output must be written in Vietnamese.
Generate the job application letter accordingly.`;

  console.log(prompt);

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            }
          ],
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      }
    });
    return result.response.text();
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

const generateContentApply = async (jobPostId, exp = "") => {

  const resJobPost = await jobPostApi.getById(jobPostId);
  const resJobSkills = await skillApi.getByIds(resJobPost?.data?.skillIds);
  const logined = JSON.parse(sessionStorage.getItem("logined"));
  const resProfile = await profileApi.getByAccountId(logined?.id);
  const resFreelancerSkills = await skillApi.getByIds(resProfile?.data?.freelancer?.skillIds);
  const resProfileRecruiter = await profileApi.getByRecruiterId(resJobPost?.data?.recruiterId);

  const details = {
    freelancerName: resProfile?.data?.fullName,
    freelancerDOB: resProfile?.data?.birthday,
    freelancerIntro: resProfile?.data?.freelancer?.introduce,
    freelancerSkills: resFreelancerSkills?.data?.map((skill => skill?.name)).join(", "),
    jobTitle: resJobPost?.data?.title,
    jobContent: resJobPost?.data?.description,
    jobSkills: resJobSkills?.data?.map((skill => skill?.name)).join(", "),
    recruiterName: resProfileRecruiter?.data?.recruiter?.name,
    representativeName: resProfileRecruiter?.data?.fullName,
    exp: exp
  };

  try {
    return await generateRecruitmentContent(details);
  } catch (err) {
    console.error("Failed to generate recruitment content:", err);
  }
}

export default { generateContentApply };

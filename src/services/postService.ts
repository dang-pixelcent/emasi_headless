import api from "@/config/configApi";
import { buildMenuTree, formatUppercaseFirstLetter } from "@/utils/string";
const rootUrl = process.env.GATSBY_WPGRAPHQL_URL || "http://localhost:8000";

class PostService {
  static token: string | null = null;
  static async getToken() {
    if (this.token) return this.token;

    // 1. Kiểm tra xem biến môi trường có đọc được không
    console.log("🔑 DEBUG CREDENTIALS:");
    console.log(
      "- User:",
      process.env.GATSBY_WP_USER ? "Đã nhập" : "❌ Bị NULL/Undefined",
    );
    console.log(
      "- Pass:",
      process.env.GATSBY_WP_PASSWORD ? "Đã nhập" : "❌ Bị NULL/Undefined",
    );

    if (!process.env.GATSBY_WP_USER || !process.env.GATSBY_WP_PASSWORD) {
      throw new Error(
        "Thiếu User/Pass trong file .env. Hãy thêm GATSBY_WP_USER và GATSBY_WP_PASSWORD",
      );
    }

    try {
      const loginResponse = await api.post("", {
        query: `
              mutation Login($username: String!, $password: String!) {
                login(input: {
                  clientMutationId: "gatsby-preview",
                  username: $username,
                  password: $password
                }) { 
                    authToken 
                    user { id name } # Lấy thêm info để check
                }
              }
            `,
        variables: {
          username: process.env.GATSBY_WP_USER,
          password: process.env.GATSBY_WP_PASSWORD,
        },
      });

      // 2. Log toàn bộ phản hồi từ WordPress xem nó chửi cái gì
      // console.log(
      //   "📩 WP LOGIN RESPONSE:",
      //   JSON.stringify(loginResponse.data, null, 2)
      // );

      const loginData = loginResponse.data;

      // Check lỗi từ phía GraphQL (VD: sai pass, chưa cài plugin JWT)
      if (loginData.errors) {
        console.error("❌ WP Trả về lỗi Login:", loginData.errors);
        throw new Error(loginData.errors[0].message);
      }

      this.token = loginData?.data?.login?.authToken;

      if (!this.token) {
        // Trường hợp không có error nhưng cũng không có token (Data rỗng)
        throw new Error(
          "API không trả về authToken (Có thể chưa cài plugin WPGraphQL JWT Authentication)",
        );
      }

      return this.token;
    } catch (err: any) {
      console.error("❌ LỖI GỌI API LOGIN:", err);
      throw err;
    }
  }

  static async getPreviewById(id: string, type: string = "post") {
    console.log(`🔍 DEBUG START: Đang lấy preview cho ID=${id}, Type=${type}`);

    // 1. Check biến môi trường
    if (!process.env.GATSBY_WP_USER || !process.env.GATSBY_WP_PASSWORD) {
      console.error(
        "❌ LỖI: Thiếu GATSBY_WP_USER hoặc PASSWORD trong file .env",
      );
      throw new Error("Missing Env Vars");
    }

    try {
      // 2. Thử lấy token
      console.log("... Đang xin Token ...");
      const token = await this.getToken();
      console.log("✅ Đã có Token:", token.substring(0, 10) + "...");

      const query = `
        query GetPreview($id: ID!) {
          ${type}(id: $id, idType: DATABASE_ID) {
            databaseId
            title
            flexibleContentMain
          }
        }
      `;

      // 3. Gọi API lấy bài viết
      console.log("... Đang gọi API lấy bài viết ...");
      const response = await api.post(
        "",
        { query, variables: { id } },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // 4. Check kết quả thô
      // console.log(
      //   "📩 API Response RAW:",
      //   JSON.stringify(response.data, null, 2)
      // );

      if (response?.data?.errors) {
        console.error("❌ API trả về lỗi GraphQL:", response.data.errors);
        throw new Error(response.data.errors[0].message);
      }

      if (!response?.data?.data?.[type]) {
        console.error(
          `❌ API trả về thành công nhưng data của [${type}] là NULL. Có thể sai ID hoặc sai Type Name.`,
        );
      }

      return response?.data;
    } catch (error: any) {
      console.error("❌ LỖI CRITICAL:", error);
      throw error; // Ném lỗi ra ngoài để UI hiển thị
    }
  }
}

export default PostService;

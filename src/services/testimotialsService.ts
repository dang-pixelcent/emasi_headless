import api from "@/config/configApi";
import axios from "axios";

class testimotialsService {
  static async findAll(link: string) {
    try {
      const response = await axios.get(link, { params: { limit: 10 } });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}

export default testimotialsService;

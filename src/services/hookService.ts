import axios from "axios";

export class HookService {
  static async MedicalHistoryForm(data: any) {
    try {
      const response = await axios.post("/api/medical-history", data);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data ?? error;
    }
  }
}

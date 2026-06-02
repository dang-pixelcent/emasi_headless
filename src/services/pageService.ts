import api from "@/config/configApi";

class PageService {
  static async getPageById(id: string) {
    if (!id) throw new Error("Missing id");
    const query = ` query GetPage($id: ID!) {
            page(id: $id, idType: ID) {
              id
              flexibleContentMain
            }
          }`;
    const response = await api.post("", {
      query,
      variables: { id },
    });
    if (response?.data?.errors) {
      throw new Error(
        response.data.errors.map((err: any) => err.message).join(", ")
      );
    }
    console.log("response", response.data);
    return response.data?.data;
  }
}

export default PageService;

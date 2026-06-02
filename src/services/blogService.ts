import api from "@/config/configApi";

interface FindAll {
  keyword?: string;
  take?: number;
  page?: number;
}

class BlogService {
  static async findAll(data: FindAll) {}
}

export default BlogService;

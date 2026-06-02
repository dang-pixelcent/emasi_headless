import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import axios from "axios";

const getZapierUrl = () => {
  return (
    process.env.HOOK_MEDICAL_HISTORY_FORM ||
    process.env.GATSBY_HOOK_MEDICAL_HISTORY_FORM ||
    ""
  );
};

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const zapierUrl = getZapierUrl();
  if (!zapierUrl) {
    res.status(500).json({ message: "Zapier hook URL is not configured" });
    return;
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : (req.body ?? {});
    const response = await axios.post(zapierUrl, body, {
      headers: { "Content-Type": "application/json" },
    });
    res.status(200).json({ ok: true, data: response.data });
  } catch (error: any) {
    res
      .status(500)
      .json({ ok: false, message: error?.message ?? "Request failed" });
  }
}

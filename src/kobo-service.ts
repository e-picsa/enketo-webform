import FormDataNode from "form-data";
import { xmlStringToFile, xmlToJson } from "./utils";

export interface IKoboServiceConfig {
  authToken: string;
}

export interface IHttpResponse {
  status: number;
  data: unknown;
}

/**
 * Service for submitting forms to KoBoToolbox.
 */
export class KoboService {
  /**
   * KoBoToolbox API endpoints
   */
  public apiEndpoints = {
    v1: "https://kc.kobotoolbox.org/api/v1",
    v2: "https://kf.kobotoolbox.org/api/v2",
  };

  /**
   * HTTP request handler
   */
  public httpHandlers = {
    req: (endpoint: string, options: RequestInit) =>
      fetch(endpoint, options).then(async (res) => {
        const status = res.status;
        const text = await res.text();
        return { status, text };
      }),
  };

  constructor(private config: IKoboServiceConfig) {}

  /**
   * Submits XML data to KoBoToolbox API v1.
   * @param xmlSubmission - The XML submission string
   * @returns Promise resolving to HTTP response
   */
  public async submitXMLSubmission(
    xmlSubmission: string,
  ): Promise<IHttpResponse> {
    const formattedXML = this.formatXML(xmlSubmission);
    const { v1 } = this.apiEndpoints;
    const endpoint = `${v1}/submissions`;

    const xml_submission_file = xmlStringToFile(formattedXML);
    let headers = {
      Authorization: `Token ${this.config.authToken}`,
      "X-OpenRosa-Version": "1.0",
    };
    let body: FormData | FormDataNode;

    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      const formData = new FormData();
      formData.append("xml_submission_file", xml_submission_file);
      body = formData;
    } else {
      const formData = new FormDataNode();
      headers = { ...headers, ...formData.getHeaders() };
      body = formData;
    }
    const { status, text } = await this.httpHandlers.req(endpoint, {
      method: "POST",
      headers,
      body,
    });
    return this.formatResponse(status, text);
  }

  private async formatResponse(status: number, text: string) {
    let data: unknown = text;

    if (status === 200 || status === 202) {
      const responseJson = xmlToJson(this.formatXML(text), {
        ignoreAttributes: false,
      });
      data = responseJson["OpenRosaResponse"];
      if (
        data["message"].constructor === {}.constructor &&
        "#text" in data["message"]
      ) {
        data["message"] = data["message"]["#text"];
      }
    }
    return { status, data };
  }

  public wipUpdateJSONSubmission(data: Record<string, unknown>, id: string) {
    if (!id) {
      throw new Error("ID required for update");
    }
    const payload = {
      data: JSON.stringify(data),
      submission_ids: [id],
    };
    console.log({ payload });
  }

  private formatXML(xmlString: string) {
    xmlString = xmlString.trim();
    if (!xmlString.startsWith("<?xml"))
      xmlString = `<?xml version="1.0" encoding="utf-8"?>\n${xmlString}`;
    return xmlString;
  }
}

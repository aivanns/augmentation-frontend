import { apiInstance } from "../../../shared/api/axios";
import { ENDPOINTS } from "../../../shared/constants";

export const dashboardApi = {
  uploadFile: (file: File, count: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('count', count.toString());

    return apiInstance.post(ENDPOINTS.UPLOAD_FILE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};
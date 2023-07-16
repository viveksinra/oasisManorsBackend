
import {prospectService} from "../../services";
export const useImgUpload = async (e) => {
  if (e) {
    const selectedFile = e;
    const imgData = new FormData();
    imgData.append("photo", selectedFile, selectedFile.name);
    return await prospectService.imgUpload(imgData);
  }
};

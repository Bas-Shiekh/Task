import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { IImage } from "../../interfaces";

const ImageUploader: React.FC<IImage> = ({ base64Image, setBase64Image }) => {
  const handleImageChange = (event: any) => {
    const file = event.file.originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Image(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div style={{ display: "flex" }}>
      {" "}
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        onChange={handleImageChange}
      >
        {uploadButton}
      </Upload>
      {base64Image && (
        <img
          src={base64Image}
          alt="avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "5px",
          }}
        />
      )}
    </div>
  );
};

export default ImageUploader;

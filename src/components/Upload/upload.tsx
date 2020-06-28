import React, {ChangeEvent, FC, useRef} from 'react'
import axios from 'axios'

import Button from "../Button/button";

export interface UploadProps {
  action: string,
  onProgress?: (percentage: number, file: File) => void,
  onSuccess?: (data: any, file: File) => void,
  onError?: (err: any, file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onError,
    onSuccess
  } = props

  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (fileInput.current) {
      // 触发input点击事件
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  // 上传文件
  const uploadFiles = (files: FileList) => {
    // 将FileList转化为数组
    let postFiles = Array.from(files)
    postFiles.forEach(async file => {
      const formData = new FormData()
      formData.append(file.name, file)
      try {
        // 发送请求
        const resp = await axios.post(action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          // 发送中触发onProgress生命周期函数
          onUploadProgress: (e) => {
            let percentage = Math.round((e.loaded * 100) / e.total) || 0
            if (percentage < 100) {
              if (onProgress) {
                onProgress(percentage, file)
              }
            }
          }
        })
        // 成功
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
      } catch (e) {
        // 失败
        if (onError) {
          onError(e, file)
        }
      }
    })
  }

  return (
    <div className="akita-upload-component">
      <Button
        btnType={'primary'}
        onClick={handleClick}
      >
        Upload File
      </Button>
      <input
        style={{ display: 'none' }}
        type="file"
        className="akita-file-input"
        ref={fileInput}
        onChange={handleFileChange}
      />
    </div>
  )
}

export default Upload

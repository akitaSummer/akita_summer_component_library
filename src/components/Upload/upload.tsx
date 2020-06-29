import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'

import Button from "../Button/button";
import UploadList from "./uploadList";

export type UploadFileStatue = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string,
  size: number,
  name: string,
  status?: UploadFileStatue,
  percent?: number,
  raw?: File,
  response?: any,
  error?: any
}

export interface UploadProps {
  action: string,
  defaultFileList?: UploadFile[],
  onProgress?: (percentage: number, file: File) => void,
  onSuccess?: (data: any, file: File) => void,
  onError?: (err: any, file: File) => void,
  beforeUpload?: (file: File) => boolean | Promise<File>,
  onChange?: (file: File) => File,
  onRemove?: (file: UploadFile) => void
}


export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onProgress,
    onError,
    onSuccess,
    beforeUpload,
    onChange,
    onRemove
  } = props

  const [ fileList, setFileList ] = useState<UploadFile[]>(defaultFileList || [])
  // 更新fileList的状态
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {...file, ...updateObj}
        } else {
          return file
        }
      })
    })
  }
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

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }

  // 上传文件
  const uploadFiles = (files: FileList) => {
    // 将FileList转化为数组
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result !== false) {
          post(file)
        }
      }
      post(file)
    })
  }

  const post = async (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    setFileList([_file, ...fileList])
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
            // 更新百分比
            updateFileList(_file, { percent: percentage, status: 'uploading'})
            if (onProgress) {
              onProgress(percentage, file)
            }
          }
        }
      })
      // 成功
      updateFileList(_file, { status: 'success', response: resp.data })
      if (onSuccess) {
        onSuccess(resp.data, file)
      }
    } catch (e) {
      // 失败
      updateFileList(_file, { status: 'error', response: e })
      if (onError) {
        onError(e, file)
      }
    } finally {
      if (onChange) {
        onChange(file)
      }
    }
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
      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload

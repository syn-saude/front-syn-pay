import { use, useEffect, useState } from "react"
import { redefinirImgAvatar } from "@/services/editUser"
import { ImagePlus, Trash2, User } from "lucide-react"
import Dropzone from "react-dropzone"
import { toast } from "react-toastify"

import { IEditImgAvatarRequest } from "@/app/editar-usuario/interface"

import { Avatar, AvatarFallback, AvatarImage } from "../avatar"
import useAuth from "@/hooks/useAuth"

interface FileUploadProps {
  avatarUrl: string
}

export default function FileUpload({ avatarUrl }: FileUploadProps) {
  const { setUrlAvatar } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setSelectedFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  useEffect(() => {
    if (selectedFile !== null) {
      handleSubmit(selectedFile)
    }
  }, [selectedFile])



  async function handleSubmit(selectedFile: any) {
    
    try {
      let resp = await redefinirImgAvatar(selectedFile)
      setUrlAvatar(resp.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Dropzone onDrop={handleFileSelect}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="flex flex-col items-center gap-7">
              <div {...getRootProps()} className="relative">
                <Avatar
                  className="h-32 w-32 cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  {selectedFile ? (
                    <AvatarImage src={URL.createObjectURL(selectedFile)} />
                  ) : (
                    <>
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>
                        <User size={42} strokeWidth={1.75} />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </div>
              <div className="flex items-center gap-5">
                <div
                  {...getRootProps()}
                  className="text-blue-700 hover:text-blue-400"
                >
                  <ImagePlus
                    className=" top-0 right-0 cursor-pointer"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                    size={30}
                  />
                  {/* <input {...getInputProps()} id="fileInput" style={{ display: 'none' }} /> */}
                </div>
                <div className="text-red-700 hover:text-red-400">
                  {selectedFile && (
                    <Trash2
                      className="cursor-pointer"
                      onClick={removeFile}
                      size={28}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </>
  )
}

import { use, useEffect, useState } from "react"
import { redefinirImgAvatar } from "@/services/editUser"
import { ImagePlus, Trash2, User } from "lucide-react"
import Dropzone from "react-dropzone"
import Cropper from "react-easy-crop"
import { toast } from "react-toastify"

import useAuth from "@/hooks/useAuth"
import { IEditImgAvatarRequest } from "@/app/editar-usuario/interface"

import { Avatar, AvatarFallback, AvatarImage } from "../avatar"
import ModalCropper from "./modalCropper"

export default function FileUpload() {
  const { user, setUrlAvatar } = useAuth()
  const [selectedFile, setSelectedFile] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [urlArquivoCropper, setUrlArquivoCropper] = useState("")

  const handleFileSelect = (acceptedFiles) => {
    const file = acceptedFiles[0]
    setSelectedFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  useEffect(() => {
    if (selectedFile !== null) {
      const novaUrl = URL.createObjectURL(selectedFile)
      setUrlArquivoCropper(novaUrl)
      setModalIsOpen(true)
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

  function handleCloseModal() {
    // router.push("/financiamentos")
    setModalIsOpen(false)
    setTimeout(() => {}, 400)
  }

  return (
    <>
      <Dropzone onDrop={handleFileSelect}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div className="flex flex-col items-center gap-7">
              <div {...getRootProps()} className="relative">
                <Avatar
                  key={user?.urlAvatar}
                  className="h-32 w-32 cursor-pointer"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <AvatarImage src={user?.urlAvatar} />
                  <AvatarFallback>
                    <User size={42} strokeWidth={1.75} />
                  </AvatarFallback>
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
      {modalIsOpen && (
        <ModalCropper
          imgEdit={urlArquivoCropper}
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          onImgChange={(myBlob) => {
            let file = new File([myBlob], "imagem.jpg")
            handleSubmit(file)
            handleCloseModal()
          }}
        />
      )}
      {/* <Cropper
        image={this.state.image}
        crop={this.state.crop}
        zoom={this.state.zoom}
        aspect={this.state.aspect}
        onCropChange={this.onCropChange}
        onCropComplete={this.onCropComplete}
        onZoomChange={this.onZoomChange}
      /> */}
    </>
  )
}
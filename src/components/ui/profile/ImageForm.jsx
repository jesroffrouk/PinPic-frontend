import { useState,useRef,useCallback } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import { useSetUserProfileMutation } from "../../../lib/features/apiSlice";

export default function ImageForm({closeModal}) {

  const [image,setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const [setProfileImage,{error: setProfileError}] = useSetUserProfileMutation();

  const onClose = () => {
    closeModal()
    setIsDragging(false);
    setPreview(null);
    setFileName("");
    setError("");
    };
  
  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, or WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("That image is over 5MB. Try a smaller file.");
      return;
    }
    setError("");
    setImage(file)
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const onInputChange = (e) => handleFile(e.target.files?.[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const onSave = async() => {
    if (!image) return;

    const formdata = new FormData()
    formdata.append('image',image)
    try {
      await setProfileImage(formdata).unwrap();
    } catch (error) {
      console.error("error in setProfileImage",error);
      setError(setProfileError?.message || "error in setting profile")
    }
      onClose();
  };


  return (

    <>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
          onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm popup_background overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE9DF]">
              <h2 className="text-[15px] font-bold text-white">Set profile picture</h2>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-blue-950 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col items-center gap-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden border-2 ${
                  isDragging
                    ? "border-[#5B4B8A] bg-[#5B4B8A]/5"
                    : "border-dashed border-[#D9D4C8] hover:border-[#B8AFE0] bg-blue-950/40"
                }`}
              >
                {preview ? (
                  <img src={preview} alt="Selected preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2 px-4 text-center">
                    <Upload size={22} className="text-white" />
                    <span className="text-xs text-[#8A8272] leading-snug">
                      Drag a photo here, or click to browse
                    </span>
                  </div>
                )}
              </div>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onInputChange}
                className="hidden"
              />

              {fileName && !error && (
                <div className="flex items-center gap-2 text-xs text-white max-w-full">
                  <span className="truncate max-w-[180px]">{fileName}</span>
                  <button
                    onClick={() => {
                      setPreview(null);
                      setFileName("");
                    }}
                    className="text-white hover:underline flex items-center gap-1 shrink-0"
                  >
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              )}

              {error && <p className="text-xs text-white">{error}</p>}

              <p className="text-[11px] text-white text-center">
                JPG, PNG, or WEBP. Up to 5MB.
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-2 px-5 py-4 border-t border-[#EDE9DF] bg-primary">
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-full text-sm text-white border border-[#D9D4C8] hover:bg-blue-950 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={!preview}
                className="flex-1 py-2 rounded-full text-sm text-white bg-primary hover:bg-[#4A3C73] disabled:opacity-40 disabled:hover:bg-[#5B4B8A] transition-colors"
              >
                Save picture
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

// use error inline for error handling
// improve ui to loading when uplaoding..
import { useState, useRef, useCallback } from "react";
import {
  ImagePlus,
  X,
  Type,
  BookOpen,
  Send,
  ChevronLeft,
  Check,
  AlignLeft,
  Maximize2,
} from "lucide-react";
import Contianer from "../components/ui/Container";
import Background from "../components/ui/Background";
import useLocation from "../lib/hooks/useLocation";
import { useSetImagesMutation } from "../lib/features/apiSlice";

const StoryEditor = ({storyEditorOpen,discardStory,finishStory,title,textareaRef,draftStory,setDraftStory,draftWordCount}) => (
    <>
          <div
            className={`slide-up${storyEditorOpen ? " open" : ""} fixed inset-0 z-50 bg-[#020c1b] flex flex-col left-1/2 -translate-x-1/2 w-full`}
          >
            {/* Topbar */}
            <div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-3 border-b border-blue-900/20">
              <button
                className="flex items-center gap-1.5 text-slate-400 text-sm px-1 py-1.5 rounded-lg hover:text-slate-200 transition-colors"
                onClick={discardStory}
              >
                <ChevronLeft size={18} strokeWidth={1.8} />
                Discard
              </button>
              <span className="font-playfair text-sm text-slate-500 italic tracking-wide">Story</span>
              <button
                className="flex items-center gap-1.5 bg-blue-900/30 border border-blue-700/40 rounded-full px-4 py-1.5 text-blue-300 text-[13px] font-medium hover:bg-blue-900/50 transition-colors"
                onClick={finishStory}
              >
                <Check size={13} strokeWidth={2.2} />
                Done
              </button>
            </div>

            {/* Title context */}
            <div className="shrink-0 px-5 pt-4 pb-1">
              <p className={`font-playfair leading-snug truncate ${title.trim() ? "text-[18px] text-slate-400 italic" : "text-[15px] text-slate-700"}`}>
                {title.trim() || "Untitled story"}
              </p>
            </div>
            <div className="shrink-0 mx-5 mb-1 h-px bg-linear-to-r from-blue-800/30 to-transparent" />

            {/* Textarea */}
            <div className="flex-1 overflow-y-auto px-5 py-3">
              <textarea
                ref={textareaRef}
                className="placeholder-style no-resize font-dm w-full min-h-full bg-transparent border-none outline-none text-slate-300 text-regular font-light leading-[1.9] caret-blue-400"
                style={{ minHeight: "60vh" }}
                placeholder="Every great story starts with a single word. Write yours here, freely and without distraction…"
                value={draftStory}
                onChange={(e) => setDraftStory(e.target.value)}
              />
            </div>

            {/* Footer */}
            <div className="shrink-0 flex items-center justify-between px-5 py-3 pb-8 border-t border-blue-900/10">
              <span className="text-verysmall text-slate-600 tracking-wide">
                {draftWordCount > 0 ? `${draftWordCount} ${draftWordCount === 1 ? "word" : "words"}` : "Start writing…"}
              </span>
              <span className="text-[11px] text-slate-700">
                {draftStory.length > 0 ? `${draftStory.length} chars` : ""}
              </span>
            </div>
          </div>
    </>
)

const CoverImageUpload = ({handleDrop,setDragOver,imagePreview,fileInputRef,image,setImage,setImagePreview,handleImageChange,dragOver}) => (
    <>
          <div
            className={`relative w-full min-h-44 border-b border-blue-900/20 cursor-pointer transition-colors duration-200 ${dragOver ? "bg-blue-950/60" : "bg-slate-900/50"}`}
            onClick={() => !imagePreview && fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <>
                <img src={imagePreview} alt="Cover" className="absolute inset-0 w-full h-full object-cover" />
                {/* Bottom gradient + filename */}
                <div className="absolute inset-0 bg-linear-to-t from-[#020c1b]/90 via-transparent to-transparent flex items-end px-4 pb-4">
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 backdrop-blur-sm border border-slate-700/40 rounded-full px-3 py-1">
                    <ImagePlus size={10} />
                    {image?.name?.length > 26 ? image.name.slice(0, 26) + "…" : image?.name}
                  </span>
                </div>
                {/* Remove */}
                <button
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#020c1b]/75 border border-white/10 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-red-900/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage(null);
                    setImagePreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <X size={13} className="text-slate-300" />
                </button>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-14 h-14 rounded-full border border-blue-700/40 bg-blue-900/10 flex items-center justify-center">
                  <ImagePlus size={22} className="text-blue-400" strokeWidth={1.5} />
                </div>
                <p className="text-secondary-text text-sm">Tap to upload a cover photo</p>
                <p className="text-tertiary-text/40 text-xs">JPG, PNG, WEBP · Single image</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0])}
            />
          </div>
    </>
)

const FormArea = ({title,setTitle,wordCount,openStoryEditor,storyPreview,submitted,isReady,handleSubmit,image}) => (
    <>
          <div className="relative z-10 flex flex-col gap-5 px-5 pt-6 pb-10 flex-1">

            {/* Title Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Type size={11} strokeWidth={2} className="text-tertiary-text/90" />
                <span className="text-verysmall font-medium tracking-[0.12em] uppercase text-secondary-text">Title</span>
                <span className="w-1.25 h-1.25 rounded-full bg-blue-500/70 inline-block" />
              </div>
              <input
                className="title-ph w-full bg-slate-900/60 border border-blue-900/30 rounded-xl px-4 py-3.5 font-playfair text-[17px] font-medium text-slate-200 outline-none transition-all focus:border-primary-border/50 focus:ring-2 focus:ring-blue-900/30 caret-blue-400"
                type="text"
                placeholder="Give your story a title…"
                value={title}
                maxLength={120}
                onChange={(e) => setTitle(e.target.value)}
              />
              {title.length > 90 && (
                <p className="text-right text-[11px] text-slate-500">{120 - title.length} chars left</p>
              )}
            </div>

            {/* Story Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={11} strokeWidth={2} className="text-tertiary-text/90" />
                  <span className="text-verysmall font-medium tracking-[0.12em] uppercase text-secondary-text">Story</span>
                </div>
                {wordCount > 0 && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 bg-blue-950/40 border border-blue-900/30 rounded-full px-2.5 py-0.5">
                    <AlignLeft size={9} />
                    {wordCount} {wordCount === 1 ? "word" : "words"}
                  </span>
                )}
              </div>

              <button
                className="w-full bg-slate-900/60 border border-blue-900/30 rounded-xl px-4 pt-3.5 pb-3 text-left flex flex-col gap-3 min-h-19 transition-all hover:border-primary-border/40 active:ring-2 active:ring-blue-900/30"
                onClick={openStoryEditor}
              >
                <p className={`text-sm leading-relaxed ${storyPreview ? "text-slate-300 font-light" : "text-slate-600 italic"}`}>
                  {storyPreview || "Tap to write your story…"}
                </p>
                <span className="flex items-center gap-1.5 self-end text-[10px] tracking-widest uppercase text-blue-500/70 font-medium">
                  <Maximize2 size={10} />
                  Open editor
                </span>
              </button>
            </div>

            {/* Submit */}
            <div className="flex flex-col gap-2 mt-1">
              <button
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 text-[15px] font-medium tracking-wide transition-all duration-200 ${
                  submitted
                    ? "bg-emerald-900/60 border border-emerald-700/40 text-emerald-300"
                    : isReady
                    ? "bg-blue-700 hover:bg-blue-600 active:scale-[0.98] text-white shadow-lg shadow-blue-950/60"
                    : "bg-slate-800/50 border border-slate-700/30 text-slate-600 cursor-not-allowed"
                }`}
                disabled={!isReady}
                onClick={handleSubmit}
              >
                {submitted ? (
                  <><Check size={17} strokeWidth={2.2} /> Posted successfully</>
                ) : (
                  <><Send size={16} strokeWidth={1.8} /> Publish Story</>
                )}
              </button>

              {!isReady && (
                <p className="text-center text-verysmall text-slate-600">
                  {!image && !title
                    ? "Add a photo and title to continue"
                    : !image
                    ? "Add a cover photo to continue"
                    : "Add a title to continue"}
                </p>
              )}
            </div>
          </div>
    </>
)

const PageHeader = () => (
    <>
    <Contianer>
        <section className="pt-5 pb-3">
          <div className="relative z-10 flex items-center justify-between">
            <div>
                <h1 className="title_name">
                    New Post
                </h1>
                <p className="place_muted_name">📍 Manhattan · Live</p>
            </div>

            <span className="text-verysmall font-medium tracking-[0.12em] uppercase text-tertiary-text bg-blue-950/50 border border-primary-border/40 rounded-full px-3 py-1.25">
              Draft
            </span>
          </div>
      </section>
    </Contianer>
    </>
)


export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [storyEditorOpen, setStoryEditorOpen] = useState(false);
  const [draftStory, setDraftStory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const {location: userLocation} = useLocation() 
  const [trigger,{data,error}] = useSetImagesMutation()

  const wordCount = story.trim() ? story.trim().split(/\s+/).length : 0;
  const draftWordCount = draftStory.trim() ? draftStory.trim().split(/\s+/).length : 0;

  const handleImageChange = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageChange(e.dataTransfer.files[0]);
  }, [handleImageChange]);

  const openStoryEditor = () => {
    setDraftStory(story);
    setStoryEditorOpen(true);
    setTimeout(() => textareaRef.current?.focus(), 120);
  };

  const finishStory = () => {
    setStory(draftStory);
    setStoryEditorOpen(false);
  };

  const discardStory = () => {
    setDraftStory(story);
    setStoryEditorOpen(false);
  };

  const handleSubmit = async() => {
    if (!image || !title.trim()) return;
    setSubmitted(true);
    // input validate
    const formdata = new FormData()
    formdata.append('image',image)
    formdata.append('title',title)
    formdata.append('content',story)
    formdata.append('latitude',userLocation.latitude)
    formdata.append('longitude',userLocation.longitude)
    await trigger(formdata)
    // post handling
    setImage(null)
    setTitle('')
    setStory('')
    setDraftStory('')
    setSubmitted(false)
  };

  const isReady = image && title.trim().length > 0;

  const storyPreview = story.trim().length > 0
    ? story.trim().split(/\s+/).slice(0, 22).join(" ") + (story.trim().split(/\s+/).length > 22 ? "…" : "")
    : null;

  return (
    <>
      <style>{`
        .slide-up { transform: translateY(100%); transition: transform 0.38s cubic-bezier(0.32,0.72,0,1); }
        .slide-up.open { transform: translateY(0%); }
        .no-resize { resize: none; }
        .placeholder-style::placeholder { color: rgba(100,116,139,0.45); font-style: italic; }
        .title-ph::placeholder { color: rgba(100,116,139,0.4); font-style: italic; }
      `}</style>


        <Background>
          {/* Ambient glow top-right */}
          {/* <div className="pointer-events-none absolute -top-20 -right-12 w-60 h-60 rounded-full bg-blue-800 opacity-[0.08] blur-3xl" /> */}

          {/* ── Page Header ── */}
          <PageHeader />


          {/* ── Cover Image Upload ── */}
          <CoverImageUpload 
                handleDrop={handleDrop}
                setDragOver={setDragOver}
                imagePreview={imagePreview}
                fileInputRef={fileInputRef}
                image={image}
                setImage={setImage}
                setImagePreview={setImagePreview}
                handleImageChange={handleImageChange}
                dragOver={dragOver}
            />


          {/* ── Form Area ── */}
          <FormArea 
                title={title}
                setTitle={setTitle}
                wordCount={wordCount}
                openStoryEditor={openStoryEditor}
                storyPreview={storyPreview}
                submitted={submitted}
                isReady={isReady}
                handleSubmit={handleSubmit}
                image={image}
          />

          {/* ── Full-screen Story Editor ── */}
              <StoryEditor 
                storyEditorOpen={storyEditorOpen}
                discardStory={discardStory}
                finishStory={finishStory}
                title={title}
                textareaRef={textareaRef}
                draftStory={draftStory}
                setDraftStory={setDraftStory}
                draftWordCount={draftWordCount}
                />

      </Background>
    </>
  );
}
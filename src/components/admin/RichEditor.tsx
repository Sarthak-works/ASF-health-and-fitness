"use client";
import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { uploadImage } from "@/lib/upload";

function Btn({
  on,
  label,
  active,
}: {
  on: () => void;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={on}
      className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-[#7e22ce] bg-[#7e22ce] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[320px] p-4 focus:outline-none font-sans prose-headings:font-heading [&_p]:font-sans [&_li]:font-sans [&_blockquote]:font-sans",
      },
    },
  });
  if (!editor) return null;

  const addImage = async (file?: File) => {
    if (!file) return;
    try {
      const url = await uploadImage(file);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (e) {
      alert("Upload failed: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div className="border rounded-lg bg-white dark:border-gray-700">
      <div className="flex flex-wrap gap-2 p-2 border-b dark:border-gray-700">
        <Btn
          label="B"
          active={editor.isActive("bold")}
          on={() => editor.chain().focus().toggleBold().run()}
        />
        <Btn
          label="I"
          active={editor.isActive("italic")}
          on={() => editor.chain().focus().toggleItalic().run()}
        />
        <Btn
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          on={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <Btn
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          on={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <Btn
          label="• List"
          active={editor.isActive("bulletList")}
          on={() => editor.chain().focus().toggleBulletList().run()}
        />
        <Btn
          label="1. List"
          active={editor.isActive("orderedList")}
          on={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <Btn
          label="Quote"
          active={editor.isActive("blockquote")}
          on={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <Btn label="🖼 Image" on={() => fileRef.current?.click()} />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            addImage(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

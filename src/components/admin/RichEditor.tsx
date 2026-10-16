"use client";
import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Table,
  Link as LinkIcon,
  Unlink,
  ImagePlus,
  Image as ImageIcon,
  Undo2,
  Redo2,
} from "lucide-react";
import { uploadImage } from "@/lib/upload";

function Btn({
  on,
  label,
  title,
  active,
  disabled,
}: {
  on: () => void;
  label: React.ReactNode;
  title: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={on}
      title={title}
      aria-label={title}
      disabled={disabled}
      className={`inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-md border px-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-[#7e22ce] bg-[#7e22ce] text-white"
          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-6 w-px self-center bg-gray-200" />;

const icon = "h-4 w-4";

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image,
      TableKit.configure({ table: { resizable: true } }),
    ],
    content: value,
    immediatelyRender: false,
    // Re-render on every change so toolbar active/disabled states stay in sync.
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[320px] p-4 focus:outline-none font-sans prose-headings:font-heading [&_p]:font-sans [&_li]:font-sans [&_blockquote]:font-sans",
      },
    },
  });

  if (!editor) return null;

  const e = editor;
  const s = {
    bold: e.isActive("bold"),
    italic: e.isActive("italic"),
    underline: e.isActive("underline"),
    strike: e.isActive("strike"),
    h1: e.isActive("heading", { level: 1 }),
    h2: e.isActive("heading", { level: 2 }),
    h3: e.isActive("heading", { level: 3 }),
    bullet: e.isActive("bulletList"),
    ordered: e.isActive("orderedList"),
    quote: e.isActive("blockquote"),
    link: e.isActive("link"),
    inTable: e.isActive("table"),
    canUndo: e.can().undo(),
    canRedo: e.can().redo(),
  };

  const chain = () => editor.chain().focus();

  const addImage = async (file?: File) => {
    if (!file) return;
    try {
      const url = await uploadImage(file);
      chain().setImage({ src: url }).run();
    } catch (e) {
      alert("Upload failed: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  const addImageUrl = () => {
    const url = prompt("Image URL");
    if (url) chain().setImage({ src: url }).run();
  };

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = prompt("Link URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") return chain().extendMarkRange("link").unsetLink().run();
    if (editor.state.selection.empty && !s.link) {
      // No text selected: insert the URL itself as the link text.
      chain()
        .insertContent({
          type: "text",
          text: url,
          marks: [{ type: "link", attrs: { href: url } }],
        })
        .run();
      return;
    }
    chain().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white">
      <div className="sticky top-0 z-10 flex flex-wrap gap-1.5 rounded-t-lg border-b border-gray-200 bg-white p-2">
        <Btn title="Bold" label={<Bold className={icon} />} active={s.bold} on={() => chain().toggleBold().run()} />
        <Btn title="Italic" label={<Italic className={icon} />} active={s.italic} on={() => chain().toggleItalic().run()} />
        <Btn title="Underline" label={<Underline className={icon} />} active={s.underline} on={() => chain().toggleUnderline().run()} />
        <Btn title="Strikethrough" label={<Strikethrough className={icon} />} active={s.strike} on={() => chain().toggleStrike().run()} />
        <Sep />
        <Btn title="Heading 1" label={<Heading1 className={icon} />} active={s.h1} on={() => chain().toggleHeading({ level: 1 }).run()} />
        <Btn title="Heading 2" label={<Heading2 className={icon} />} active={s.h2} on={() => chain().toggleHeading({ level: 2 }).run()} />
        <Btn title="Heading 3" label={<Heading3 className={icon} />} active={s.h3} on={() => chain().toggleHeading({ level: 3 }).run()} />
        <Sep />
        <Btn title="Bullet list" label={<List className={icon} />} active={s.bullet} on={() => chain().toggleBulletList().run()} />
        <Btn title="Numbered list" label={<ListOrdered className={icon} />} active={s.ordered} on={() => chain().toggleOrderedList().run()} />
        <Btn title="Quote" label={<Quote className={icon} />} active={s.quote} on={() => chain().toggleBlockquote().run()} />
        <Btn title="Divider" label={<Minus className={icon} />} on={() => chain().setHorizontalRule().run()} />
        <Sep />
        <Btn
          title="Insert table"
          label={<Table className={icon} />}
          active={s.inTable}
          on={() => chain().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        />
        <Btn title="Add row above" label="+Row↑" disabled={!s.inTable} on={() => chain().addRowBefore().run()} />
        <Btn title="Add row below" label="+Row↓" disabled={!s.inTable} on={() => chain().addRowAfter().run()} />
        <Btn title="Delete row" label="DelRow" disabled={!s.inTable} on={() => chain().deleteRow().run()} />
        <Btn title="Add column left" label="+Col←" disabled={!s.inTable} on={() => chain().addColumnBefore().run()} />
        <Btn title="Add column right" label="+Col→" disabled={!s.inTable} on={() => chain().addColumnAfter().run()} />
        <Btn title="Delete column" label="DelCol" disabled={!s.inTable} on={() => chain().deleteColumn().run()} />
        <Btn title="Delete table" label="DelTable" disabled={!s.inTable} on={() => chain().deleteTable().run()} />
        <Sep />
        <Btn title="Add / edit link" label={<><LinkIcon className={icon} /> Link</>} active={s.link} on={setLink} />
        <Btn title="Remove link" label={<Unlink className={icon} />} disabled={!s.link} on={() => chain().extendMarkRange("link").unsetLink().run()} />
        <Btn title="Upload image" label={<><ImagePlus className={icon} /> Image</>} on={() => fileRef.current?.click()} />
        <Btn title="Image from URL" label={<ImageIcon className={icon} />} on={addImageUrl} />
        <Sep />
        <Btn title="Undo" label={<Undo2 className={icon} />} disabled={!s.canUndo} on={() => chain().undo().run()} />
        <Btn title="Redo" label={<Redo2 className={icon} />} disabled={!s.canRedo} on={() => chain().redo().run()} />
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

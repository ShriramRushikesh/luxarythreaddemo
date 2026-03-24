"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link as LinkIcon, 
  Undo, 
  Redo,
  Heading1,
  Heading2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RichTextEditor = ({ 
  value, 
  onChange,
  placeholder = "Write something beautiful..."
}: { 
  value: string, 
  onChange: (v: string) => void,
  placeholder?: string
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-6 text-[11px] font-bold uppercase tracking-widest leading-relaxed',
      },
    },
  });

  if (!editor) return null;

  const MenuButton = ({ 
    onClick, 
    isActive = false, 
    children 
  }: { 
    onClick: () => void, 
    isActive?: boolean, 
    children: React.ReactNode 
  }) => (
    <Button
       type="button"
       variant="ghost"
       size="icon"
       onClick={onClick}
       className={cn(
         "w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all",
         isActive ? "bg-black text-white dark:bg-white dark:text-black" : "text-gray-400"
       )}
    >
       {children}
    </Button>
  );

  return (
    <div className="border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 shadow-sm focus-within:border-black dark:focus-within:border-white transition-all">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-50 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/50">
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          isActive={editor.isActive('bold')}
        >
          <Bold className="w-3.5 h-3.5" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          isActive={editor.isActive('italic')}
        >
          <Italic className="w-3.5 h-3.5" />
        </MenuButton>
        <div className="w-px h-4 bg-gray-200 dark:bg-zinc-800 mx-1" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          isActive={editor.isActive('heading', { level: 1 })}
        >
          <Heading1 className="w-3.5 h-3.5" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          isActive={editor.isActive('heading', { level: 2 })}
        >
          <Heading2 className="w-3.5 h-3.5" />
        </MenuButton>
        <div className="w-px h-4 bg-gray-200 dark:bg-zinc-800 mx-1" />
        <MenuButton 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          isActive={editor.isActive('bulletList')}
        >
          <List className="w-3.5 h-3.5" />
        </MenuButton>
        <MenuButton 
          onClick={() => editor.chain().focus().toggleOrderedList().run()} 
          isActive={editor.isActive('orderedList')}
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </MenuButton>
        <div className="w-px h-4 bg-gray-200 dark:bg-zinc-800 mx-1" />
        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="w-3.5 h-3.5" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="w-3.5 h-3.5" />
        </MenuButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;

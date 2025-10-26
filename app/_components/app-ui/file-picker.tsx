"use client";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { FileIcon } from "lucide-react";

import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/app/_lib/utils";
import { Button } from "../ui/button";

interface FilePickerProps extends React.ComponentProps<typeof Empty> {
  name: string;
}

export function FilePicker({ name, className, ...props }: FilePickerProps) {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((incomingFiles: File[]) => {
    if (hiddenInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(incomingFiles[0]);
      hiddenInputRef.current.files = dataTransfer.files;
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      maxFiles: 1,
    });

  const file = acceptedFiles[0];

  return (
    <Empty
      className={cn(
        "bg-secondary/40 border border-dashed p-4 text-center transition md:p-8",
        isDragActive && "border-brand",
        className,
      )}
      {...props}
      {...getRootProps()}
    >
      {/* Hidden file input that actually submits with the form */}
      <input {...getInputProps()} name={name} ref={hiddenInputRef} />

      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className={cn(isDragActive && "bg-brand/20")}
        >
          <FileIcon className={cn(isDragActive && "text-brand")} />
        </EmptyMedia>
        <EmptyTitle>Upload image</EmptyTitle>
        <EmptyDescription>
          {isDragActive ? "Drop file here" : "Drag & drop, or click to choose"}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {file ? (
          <p>Selected: {file.name}</p>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => hiddenInputRef.current?.click()}
          >
            Open
          </Button>
        )}
      </EmptyContent>
    </Empty>
  );
}

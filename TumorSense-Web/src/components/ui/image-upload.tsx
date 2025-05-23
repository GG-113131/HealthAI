
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useImageUpload } from "@/hooks/use-image-upload"
import { Upload, Trash2, X } from "lucide-react"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onUpload?: (url: string, file: File) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
    currentFile
  } = useImageUpload({
    onUpload: (url: string, file: File) => {
      onUpload?.(url, file);
    },
  })

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        // Create a new FileList-like object
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        
        const fakeEvent = {
          target: {
            files: dataTransfer.files
          }
        } as React.ChangeEvent<HTMLInputElement>;
        
        handleFileChange(fakeEvent);
      }
    },
    [handleFileChange],
  )

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-lg">
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-semibold text-foreground">Image Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Upload an image to begin AI analysis
        </p>
      </div>

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-all duration-300 hover:bg-muted hover:border-muted-foreground/50",
            isDragging && "border-primary/50 bg-primary/5 scale-105",
          )}
        >
          <div className="rounded-full bg-background p-4 shadow-lg">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-base font-medium text-foreground">Click to select image</p>
            <p className="text-sm text-muted-foreground mt-1">
              or drag and drop file here
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supports JPG, PNG, GIF
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-64 overflow-hidden rounded-lg border">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-9 w-9 p-0"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="h-9 w-9 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={handleRemove}
                className="ml-auto rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WebsiteCardProps {
  name: string;
  description: string;
  url: string;
  icon: string;
  onEdit: () => void;
  onDelete: () => void;
}

const WebsiteCard = ({ name, description, url, icon, onEdit, onDelete }: WebsiteCardProps) => {
  return (
    <div className="website-card group">
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className="h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
            <img
              src={icon}
              alt={`${name} icon`}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://picsum.photos/100"; // Fallback image
              }}
            />
          </div>
          <div className="flex-1">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              {name}
              <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default WebsiteCard;

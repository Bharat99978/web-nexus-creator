
import { ExternalLink } from "lucide-react";

interface WebsiteCardProps {
  name: string;
  description: string;
  url: string;
  icon: string;
}

const WebsiteCard = ({ name, description, url, icon }: WebsiteCardProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="website-card group block"
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-lg">
          <img
            src={icon}
            alt={`${name} icon`}
            className="h-full w-full object-cover"
            loading="lazy"
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
  );
};

export default WebsiteCard;

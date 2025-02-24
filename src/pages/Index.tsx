
import { useState } from "react";
import WebsiteCard from "../components/WebsiteCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

interface Website {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
}

const Index = () => {
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: "1",
      name: "Example Website",
      description: "A sample website to demonstrate the layout",
      url: "https://example.com",
      icon: "https://picsum.photos/100",
    },
  ]);

  const [newWebsite, setNewWebsite] = useState({
    name: "",
    description: "",
    url: "",
    icon: "",
  });

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebsite.name || !newWebsite.url) {
      toast.error("Please fill in all required fields");
      return;
    }

    const website: Website = {
      id: Math.random().toString(36).substring(7),
      ...newWebsite,
      icon: newWebsite.icon || "https://picsum.photos/100",
    };

    setWebsites([...websites, website]);
    setNewWebsite({ name: "", description: "", url: "", icon: "" });
    toast.success("Website added successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">My Websites</h1>
          <p className="text-lg text-muted-foreground">
            A collection of my web projects and applications
          </p>
        </div>

        <form onSubmit={handleAddWebsite} className="mb-12">
          <div className="grid gap-4 rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Add New Website</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Input
                  placeholder="Website Name"
                  value={newWebsite.name}
                  onChange={(e) =>
                    setNewWebsite({ ...newWebsite, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Input
                  placeholder="Website URL"
                  type="url"
                  value={newWebsite.url}
                  onChange={(e) =>
                    setNewWebsite({ ...newWebsite, url: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Input
                placeholder="Description (optional)"
                value={newWebsite.description}
                onChange={(e) =>
                  setNewWebsite({ ...newWebsite, description: e.target.value })
                }
              />
            </div>
            <div>
              <Input
                placeholder="Icon URL (optional)"
                type="url"
                value={newWebsite.icon}
                onChange={(e) =>
                  setNewWebsite({ ...newWebsite, icon: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="ml-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Website
            </Button>
          </div>
        </form>

        <div className="grid-fade grid gap-4 md:grid-cols-2">
          {websites.map((website) => (
            <WebsiteCard key={website.id} {...website} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;


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

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWebsite.name || !newWebsite.url) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingId) {
      setWebsites(websites.map(website => 
        website.id === editingId ? { ...website, ...newWebsite } : website
      ));
      setEditingId(null);
      toast.success("Website updated successfully!");
    } else {
      const website: Website = {
        id: Math.random().toString(36).substring(7),
        ...newWebsite,
        icon: newWebsite.icon || "https://picsum.photos/100",
      };
      setWebsites([...websites, website]);
      toast.success("Website added successfully!");
    }
    
    setNewWebsite({ name: "", description: "", url: "", icon: "" });
  };

  const handleEdit = (website: Website) => {
    setNewWebsite({
      name: website.name,
      description: website.description,
      url: website.url,
      icon: website.icon,
    });
    setEditingId(website.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setWebsites(websites.filter(website => website.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setNewWebsite({ name: "", description: "", url: "", icon: "" });
    }
    toast.success("Website deleted successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">My Websites</h1>
          <p className="text-lg text-muted-foreground">
            A collection of my web projects and applications
          </p>
        </div>

        <form onSubmit={handleAddWebsite} className="mb-12">
          <div className="grid gap-4 rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Website" : "Add New Website"}
            </h2>
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
            <div className="flex justify-end gap-2">
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null);
                    setNewWebsite({ name: "", description: "", url: "", icon: "" });
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" />
                {editingId ? "Update Website" : "Add Website"}
              </Button>
            </div>
          </div>
        </form>

        <div className="grid-fade grid gap-4 md:grid-cols-2">
          {websites.map((website) => (
            <WebsiteCard
              key={website.id}
              {...website}
              onEdit={() => handleEdit(website)}
              onDelete={() => handleDelete(website.id)}
            />
          ))}
        </div>

        <div className="mt-20 developer-section rounded-xl border bg-card p-8">
          <div className="footer-fade-in relative z-10 text-center">
            <h2 className="mb-4 text-2xl font-bold">Developer</h2>
            <div className="mb-6">
              <h3 className="developer-name mb-2">भारत सिंग</h3>
              <h4 className="text-lg text-muted-foreground">(Bharat Singh)</h4>
              <p className="mt-2 text-muted-foreground">
                Full Stack Developer & Digital Creator
              </p>
              <a
                href="https://telegram.me/Official_ARK00"
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-link"
              >
                Connect on Telegram
              </a>
            </div>
            <div className="mt-8 border-t pt-6">
              <p className="copyright-text">
                © {new Date().getFullYear()} भारत सिंग. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { ChevronsUpDown } from "lucide-react";
import FormattedMarkdown from "./ui/formatted-markdown";

interface SavedNote {
  _id: string;
  userId: string;
  question: string;
  response: string;
  createdAt: string;
}

export function SavedNotes() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<SavedNote | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      if (user?.sub) {
        try {
          const response = await axios.get(`/api/saved-responses?userId=${user.sub}`);
          setNotes(response.data);
        } catch (error) {
          console.error("Failed to fetch saved notes:", error);
        }
      }
    };

    fetchNotes();
  }, [user?.sub]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Saved Medical Notes</h1>
      </header>

      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? notes.find((note) => note._id === value)?.question
                : "Select a saved question..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandEmpty>No saved questions found.</CommandEmpty>
              <CommandGroup>
                {notes.map((note) => (
                  <CommandItem
                    key={note._id}
                    value={note._id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setSelectedNote(
                        currentValue === value
                          ? null
                          : notes.find((note) => note._id === currentValue) || null
                      );
                      setOpen(false);
                    }}
                  >
                    <span className="line-clamp-1">{note.question}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedNote && (
          <div className="rounded-lg border p-4 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Response</h2>
              <div className="prose prose-sm max-w-none">
                <FormattedMarkdown content={selectedNote.response} />
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Saved on: {new Date(selectedNote.createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

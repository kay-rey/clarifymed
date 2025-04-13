import { SidebarLayout } from '@/components/SidebarLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FilePlus } from 'lucide-react'
import React from 'react'

// Mock data for saved medical queries and AI responses
const mockSavedNotes = [
  {
    id: '1',
    query: 'What is the difference between Type 1 and Type 2 diabetes?',
    response: 'Type 1 diabetes is an autoimmune condition where the body cannot produce insulin because the immune system has destroyed the cells that produce it. Type 2 diabetes occurs when the body becomes resistant to insulin or doesn\'t produce enough insulin to maintain normal blood glucose levels.',
    date: 'April 10, 2025',
    category: 'Endocrinology',
  },
  {
    id: '2',
    query: 'What are the symptoms of COVID-19?',
    response: 'Common symptoms of COVID-19 include fever, cough, fatigue, shortness of breath, loss of taste or smell, sore throat, headache, and body aches. Symptoms can range from mild to severe and typically appear 2-14 days after exposure to the virus.',
    date: 'April 8, 2025',
    category: 'Infectious Disease',
  },
  {
    id: '3',
    query: 'How does hypertension affect the body long-term?',
    response: 'Long-term hypertension can damage blood vessels throughout the body, leading to various complications including heart disease, heart attack, stroke, heart failure, kidney damage or failure, vision loss, sexual dysfunction, and cognitive decline or dementia.',
    date: 'April 5, 2025',
    category: 'Cardiology',
  },
  {
    id: '4',
    query: 'What are the recommended treatments for migraine headaches?',
    response: 'Treatment for migraines includes pain-relieving medications (like NSAIDs, triptans, anti-nausea medications) and preventive medications (beta blockers, antidepressants, anti-seizure drugs). Lifestyle modifications such as identifying and avoiding triggers, maintaining regular sleep patterns, exercise, and stress management are also important.',
    date: 'April 1, 2025',
    category: 'Neurology',
  },
]

const SavedNotes = () => {
  return (
    <SidebarLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Saved Medical Notes</h1>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockSavedNotes.length > 0 ? mockSavedNotes.map((note) => (
            <Card key={note.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="line-clamp-1">{note.query}</CardTitle>
                    <CardDescription>
                      {note.date}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-4 text-sm">{note.response}</p>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <Button variant="destructive" size="sm" className="text-black hover:text-ghost/90">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          )) : (
            <div className="col-span-full flex flex-col items-center justify-center bg-muted/30 rounded-xl p-10 text-center min-h-[300px]">
              <div className="mb-4 rounded-full bg-muted p-6">
                <FilePlus className="text-muted-foreground w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium mb-2">No saved notes yet</h3>
              <p className="text-muted-foreground max-w-md">
                Your saved medical queries and AI responses will appear here. Start a conversation in the dashboard to get answers to your medical questions.
              </p>
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}

export default SavedNotes
import { createCampaign } from '@/app/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AddCampaignPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 -z-10"></div>
      
      <Card className="w-full max-w-2xl bg-zinc-950/50 border-zinc-800 text-zinc-100 backdrop-blur-md shadow-2xl">
        <form action={createCampaign}>
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
              Create New Campaign
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Set up your generative engine optimization tracking. Enter your brand, competitors, and target queries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="brandName" className="text-zinc-300">Your Brand Name</Label>
              <Input 
                id="brandName" 
                name="brandName" 
                placeholder="e.g., Notion, Vercel, AEO-Radar" 
                required 
                className="bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="competitors" className="text-zinc-300">Competitors (Comma Separated)</Label>
              <Input 
                id="competitors" 
                name="competitors" 
                placeholder="e.g., Asana, Monday, ClickUp" 
                className="bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 transition-colors"
              />
              <p className="text-xs text-zinc-500">Add up to 3 main competitors to track share of voice against.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-zinc-300">Target Queries (Comma Separated)</Label>
              <Input 
                id="keywords" 
                name="keywords" 
                placeholder="e.g., best project management tool, Notion alternatives" 
                required 
                className="bg-zinc-900/50 border-zinc-800 focus:border-indigo-500 transition-colors"
              />
              <p className="text-xs text-zinc-500">What questions are your users asking AI models?</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant="outline" className="border-zinc-800 hover:bg-zinc-800 hover:text-white" type="button">
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all">
              Launch Campaign
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

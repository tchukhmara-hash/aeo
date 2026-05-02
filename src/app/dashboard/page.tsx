import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TrendChart from '@/components/dashboard/TrendChart'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function DashboardPage() {
  const brand = await prisma.brand.findFirst({
    include: {
      targetKeywords: {
        include: {
          auditLogs: {
            orderBy: { date: 'desc' },
            take: 10,
          }
        }
      }
    }
  })

  const auditLogs = brand?.targetKeywords.flatMap(k => k.auditLogs) || []
  
  // Fake data for visual preview if no DB data
  const mockLogs = [
    { id: '1', date: new Date(), aiModelName: 'ChatGPT-4o', status: 'Highly Recommended', keyword: { keyword: 'best project management tool' } },
    { id: '2', date: new Date(Date.now() - 86400000), aiModelName: 'Claude 3.5 Sonnet', status: 'Briefly Mentioned', keyword: { keyword: 'Notion alternatives' } },
    { id: '3', date: new Date(Date.now() - 172800000), aiModelName: 'Gemini 1.5 Pro', status: 'Not Mentioned', keyword: { keyword: 'team collaboration software' } },
  ]
  
  const displayLogs = auditLogs.length > 0 ? auditLogs : mockLogs

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
              {brand ? brand.name : 'Your Brand'} AEO Dashboard
            </h1>
            <p className="text-zinc-400 mt-2">Track your Generative Engine Optimization performance across top AI models.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <Card className="lg:col-span-2 bg-zinc-900/40 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl">Share of AI Recommendations (30 Days)</CardTitle>
              <CardDescription className="text-zinc-500">Frequency of recommendation vs top competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm flex flex-col justify-center items-center text-center p-6">
            <h3 className="text-zinc-400 text-lg font-medium mb-2">Overall AEO Score</h3>
            <div className="text-7xl font-black bg-gradient-to-br from-indigo-400 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
              82
            </div>
            <p className="text-zinc-500 mt-4 text-sm">Top 15% in your industry</p>
            <div className="mt-8 w-full space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">ChatGPT</span>
                <span className="text-green-400">90%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Claude</span>
                <span className="text-yellow-400">75%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Gemini</span>
                <span className="text-green-400">81%</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Audit Logs</CardTitle>
            <CardDescription className="text-zinc-500">Latest scrape results from AI search engines</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">AI Model</TableHead>
                  <TableHead className="text-zinc-400">Target Query</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayLogs.map((log: any) => (
                  <TableRow key={log.id} className="border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                    <TableCell className="text-zinc-300">
                      {new Date(log.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-zinc-200 font-medium">{log.aiModelName}</TableCell>
                    <TableCell className="text-zinc-400">{log.keyword?.keyword}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          log.status === 'Highly Recommended' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                          log.status === 'Briefly Mentioned' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

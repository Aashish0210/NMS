'use client'

import { useState } from 'react'
import { submitReport } from '../actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ContentSafetyChecklist } from '@/components/portal/ContentSafetyChecklist'
import { FileText, Send } from 'lucide-react'

interface NewReportFormProps {
  regions: { id: string; safe_display_name: string }[]
  error?: string
}

export function NewReportForm({ regions, error }: NewReportFormProps) {
  const [safetyChecks, setSafetyChecks] = useState<Record<string, boolean>>({})

  const handleSafetyChange = (id: string, checked: boolean) => {
    setSafetyChecks((prev) => ({ ...prev, [id]: checked }))
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a] flex items-center gap-2">
          <FileText className="h-6 w-6" /> Submit Field Report
        </h1>
        <p className="text-muted-foreground mt-1">
          Complete all fields carefully. Reports are submitted for leadership review.
        </p>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium border border-destructive/20">
          {error}
        </div>
      )}

      <form action={submitReport}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title *</Label>
              <Input id="title" name="title" placeholder="E.g. Monthly Update — Central Region" required />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region_id">Region</Label>
                <select
                  id="region_id"
                  name="region_id"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">— No region —</option>
                  {regions.map((r) => (
                    <option key={r.id} value={r.id}>{r.safe_display_name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sensitivity_level">Sensitivity Level *</Label>
                <select
                  id="sensitivity_level"
                  name="sensitivity_level"
                  required
                  defaultValue="high"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Full Report Content *</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Provide your detailed field report here. This content is visible only to authorized internal personnel."
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sanitized_summary">Sanitized Summary *</Label>
              <p className="text-[11px] text-muted-foreground">
                Write a version safe for wider distribution. Remove all names, exact locations, travel details, and identifiable information.
              </p>
              <Textarea
                id="sanitized_summary"
                name="sanitized_summary"
                placeholder="A safe-for-distribution summary without sensitive identifying details."
                className="min-h-[120px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <ContentSafetyChecklist
              checkedItems={safetyChecks}
              onChange={handleSafetyChange}
            />
            {/* Hidden inputs to pass safety checks to server action */}
            <input type="hidden" name="contains_names" value={String(safetyChecks['real_names'] || false)} />
            <input type="hidden" name="contains_exact_locations" value={String(safetyChecks['exact_location'] || false)} />
            <input type="hidden" name="contains_faces" value={String(safetyChecks['faces_photos'] || false)} />
            <input type="hidden" name="contains_travel_details" value={String(safetyChecks['travel_plans'] || false)} />
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-[#1a2a3a] hover:bg-[#1a2a3a]/90 px-8">
            <Send className="h-4 w-4 mr-2" /> Submit for Review
          </Button>
        </div>
      </form>
    </div>
  )
}

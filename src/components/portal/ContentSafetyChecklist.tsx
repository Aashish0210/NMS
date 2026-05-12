'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'
import { AlertTriangle, ShieldAlert } from 'lucide-react'

interface SafetyCheckItem {
  id: string
  label: string
  highRisk: boolean
}

const SAFETY_ITEMS: SafetyCheckItem[] = [
  { id: 'real_names', label: 'Contains real full names of field workers or local believers', highRisk: true },
  { id: 'exact_location', label: 'Contains exact village, town, or GPS location', highRisk: true },
  { id: 'faces_photos', label: 'Contains faces in photos', highRisk: true },
  { id: 'travel_plans', label: 'Contains travel plans or schedules', highRisk: true },
  { id: 'restricted_areas', label: 'Names restricted areas explicitly', highRisk: true },
  { id: 'govt_sensitive', label: 'Contains government-sensitive language', highRisk: true },
  { id: 'unreviewed_testimony', label: 'Includes unreviewed testimonies', highRisk: false },
  { id: 'sensitive_documents', label: 'Includes downloadable sensitive documents', highRisk: true },
]

interface ContentSafetyChecklistProps {
  checkedItems: Record<string, boolean>
  onChange: (id: string, checked: boolean) => void
  className?: string
}

export function ContentSafetyChecklist({ checkedItems, onChange, className }: ContentSafetyChecklistProps) {
  const highRiskChecked = SAFETY_ITEMS.filter(
    (item) => item.highRisk && checkedItems[item.id]
  )

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="h-5 w-5 text-[#1a2a3a]" />
        <h3 className="text-base font-semibold text-[#1a2a3a]">Content Safety Checklist</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Review the following before submitting. Check all items that apply to this content.
      </p>

      <div className="space-y-3">
        {SAFETY_ITEMS.map((item) => (
          <label
            key={item.id}
            className="flex items-start gap-3 cursor-pointer rounded-lg border border-border p-3 transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={checkedItems[item.id] || false}
              onChange={(e) => onChange(item.id, e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1a2a3a] focus:ring-[#1a2a3a]"
            />
            <span className="text-sm text-foreground leading-tight">
              {item.label}
              {item.highRisk && (
                <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-medium text-red-700">
                  HIGH RISK
                </span>
              )}
            </span>
          </label>
        ))}
      </div>

      {highRiskChecked.length > 0 && (
        <Alert className="mt-4 border-red-300 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 font-semibold">Security Warning</AlertTitle>
          <AlertDescription className="text-red-700 text-sm">
            This content may expose sensitive field information. Please sanitize before sharing
            beyond approved internal leadership. {highRiskChecked.length} high-risk item(s) flagged.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

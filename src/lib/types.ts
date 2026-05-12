export type UserRole = 
  | 'super_admin' 
  | 'leadership' 
  | 'regional_coordinator' 
  | 'field_missionary' 
  | 'prayer_partner' 
  | 'donor_partner'

export type UserStatus = 'pending' | 'approved' | 'rejected' | 'inactive'

export interface Profile {
  id: string
  full_name: string
  email: string
  role: UserRole
  status: UserStatus
  region_id: string | null
  organization_position: string | null
  created_at: string
  updated_at: string
}

export interface Region {
  id: string
  name: string
  safe_display_name: string
  sensitivity_level: string
  created_at: string
}

export interface FieldReport {
  id: string
  title: string
  content: string
  sanitized_summary: string
  author_id: string
  region_id: string | null
  status: 'draft' | 'submitted' | 'under_review' | 'approved_internal' | 'approved_public' | 'rejected'
  sensitivity_level: 'low' | 'medium' | 'high' | 'restricted'
  contains_names: boolean
  contains_exact_locations: boolean
  contains_faces: boolean
  contains_travel_details: boolean
  reviewer_id: string | null
  review_notes: string | null
  created_at: string
  updated_at: string
  profiles?: { full_name: string }
  regions?: { safe_display_name: string }
}

export interface PrayerUpdate {
  id: string
  title: string
  content: string
  sanitized_content: string
  author_id: string
  region_id: string | null
  visibility: 'internal' | 'prayer_partners' | 'donor_partners' | 'public_safe'
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  sensitivity_level: string
  created_at: string
  updated_at: string
  profiles?: { full_name: string }
}

export interface Resource {
  id: string
  title: string
  description: string
  file_url: string | null
  content: string | null
  category: 'training' | 'operations' | 'general'
  visibility_role: string
  region_id: string | null
  uploaded_by: string
  created_at: string
  profiles?: { full_name: string }
}

export interface Announcement {
  id: string
  title: string
  body: string
  visibility_role: string
  region_id: string | null
  created_by: string
  created_at: string
  profiles?: { full_name: string }
}

export interface AuditLog {
  id: string
  user_id: string
  action: string
  entity_type: string
  entity_id: string | null
  metadata: Record<string, unknown>
  created_at: string
  profiles?: { full_name: string }
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  leadership: 'Leadership',
  regional_coordinator: 'Regional Coordinator',
  field_missionary: 'Field Missionary',
  prayer_partner: 'Prayer Partner',
  donor_partner: 'Donor Partner',
}

export const ROLE_HIERARCHY: UserRole[] = [
  'super_admin',
  'leadership',
  'regional_coordinator',
  'field_missionary',
  'prayer_partner',
  'donor_partner',
]

export function hasMinRole(userRole: UserRole, minRole: UserRole): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) <= ROLE_HIERARCHY.indexOf(minRole)
}

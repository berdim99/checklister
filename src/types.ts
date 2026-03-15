export interface ChecklistItem {
  action: string;
  value: string | null;
}

export interface ChecklistSection {
  name: string;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  name: string;
  sections: ChecklistSection[];
}

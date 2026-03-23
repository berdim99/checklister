export interface ChecklistItem {
  action: string;
  value: string | null;
}

export interface ChecklistSubsection {
  name: string;
  items: ChecklistItem[];
}

export interface ChecklistSection {
  name: string;
  items?: ChecklistItem[];
  subsections?: ChecklistSubsection[];
}

export interface Checklist {
  id: string;
  name: string;
  sections: ChecklistSection[];
}

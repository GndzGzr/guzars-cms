export interface Tag {
  slug: string;
  name: string;
}

export interface NoteLink {
  id: number;
  source: { slug: string; title: string };
  target: { slug: string; title: string };
  context_text?: string;
}

export interface InternalDependency {
  slug: string;
  title: string;
}

export interface Note {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  note_type: string;
  created_at: string;
  updated_at: string;
  tags: Tag[];
  incoming_links?: NoteLink[];
  outgoing_links?: NoteLink[];
  internal_link_dependencies?: InternalDependency[];
}
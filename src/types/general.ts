export enum GEO_PAGE_COMPONENT {
  CONTENT_WRAP = "content_wrap",
}

export enum PAGE_COMPONENT {
  CONTENT_WRAP = "content_wrap",
  HERO_BANNER = "hero_banner",
  POPULAR_SERVICES = "popular_services",
  CONTENT_WITH_IMAGE = "content_with_image",
  OUR_TEAM = "our_team",
  TESTIMONIALS = "testimonials",
  CTA = "cta",
  THANK_YOU_CONTENT = "thank_you_content",
  APPOINTMENT = "appointment_content",
  CONTENT_FULL_TEXT_BG = "content_full_text_bg",
  CONTENT_TWO_COLUMN_TEXT_OTHER = "content_two_column_text_other",
  COMMON_EFFECTS = "common_effects",
  RELATED_SERVICES = "related_services",
  FAQS = "faqs",
  CONTENT_ALIGN_LEFT = "content_align_left",
  CONTENT_TWO_COLUMN_TEXT = "content_two_column_text",
  CONTENT_FULL_TEXT = "content_full_text",
  BENEFITS = "benefits",
  CUSTOM_CONTENT = "custom_content",
  BANNER = "banner",
  OUR_JOURNEY = "our_journey",
  CONTENT_WITH_IMAGE_OTHER = "content_with_image_other",
  OUR_MEIDCAL = "our_medical",
  MEET_THE_TEAM = "meet_the_team",
  METHODS = "methods",
  RELATED_ARTICLES = "related_articles",
  BLOG_LISTS = "blog_lists",
  CONTENT_WITH_TABS = "content_with_tabs",
  TEAM_BANNER = "team_banner",
  MEDICAL_HISTORY_QUESTIONNAIRE = "medical_history_questionnaire"
}

export interface SelectOption{
  id: string | number;
  name: string;
}

export interface Background {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: Date;
  modified: Date;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Button {
  title: string;
  url: string;
  target: string;
}

export interface Item {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: Date;
  modified: Date;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Image {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  thumbnail: string;
  "thumbnail-width": number;
  "thumbnail-height": number;
  medium: string;
  "medium-width": number;
  "medium-height": number;
  medium_large: string;
  "medium_large-width": number;
  "medium_large-height": number;
  large: string;
  "large-width": number;
  "large-height": number;
  "1536x1536": string;
  "1536x1536-width": number;
  "1536x1536-height": number;
  "2048x2048": string;
  "2048x2048-width": number;
  "2048x2048-height": number;
}

export type OpeningHours = { day: string; hour: string }[];

export interface Icon {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface TeamMember {
  id: number;
  name: string;
  permalink: string;
  avatar: string;
  position: string;
  excerpt: string;
  fullcontent: string;
}
export interface sectionData {
  acf_fc_layout: string;
  heading: string;
  sub_heading?: string;
  description: string;
  image?: Image;
  background?: Background;
  button?: Button;
  icon?: Icon;
  team_list?: TeamMember[];
  items?: Items[];
}

interface Items {
  icon: Icon;
  title: string;
  description: string;
}

export interface step {
  title: string;
  description: string;
  button: Button;
}

export interface Gallery {
  button: Button;
  gallery: Image[];
  title: string;
}

export interface Menu {
  id: number;
  label: string;
  order?: number;
  url: string;
  target?: string;
  description?: string;
  children?: Menu[];
}

export interface FooterData {
  logo: string;
  medical_history_form: Medicalhistoryform;
  our_location: string;
  opening_hours: Openinghour[];
  menu_footer: Menufooter[];
  maps: string;
  copyright: string;
  quick_link: Menufooter[];
  socials: Socials;
}

interface Socials {
  instagram: string;
  facebook: string;
  twitter: string;
  google: string;
  youtube: string;
  tiktok: string;
}

interface Menufooter {
  item: Medicalhistoryform;
}

interface Openinghour {
  day: string;
  hour: string;
}

interface Medicalhistoryform {
  title: string;
  url: string;
  target: string;
}

export interface HeaderData {
  address: string;
  booking_mobile: {
    target: string;
    title: string;
    url: string;
  };
  booking_online: {
    target: string;
    title: string;
    url: string;
  };
  logo: string;
  logo_white?: string;
  menu: Menu[];
  phone: {
    target: string;
    title: string;
    url: string;
  };
}

interface Tracking {
  header: string;
  body: string;
  footer: string;
}

export interface ThemeOption {
  footerGroup: FooterData;
  headerGroup: HeaderData;
  headerFooterTracking: Tracking;
}

export interface TestimonialsV2 {
  avatar: Avatar;
  name: string;
  position: string;
  quote: string;
}

interface Avatar {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}
export type ScriptItem = {
  src?: string | null;
  async?: boolean;
  content?: string;
  attributes?: Record<string, string>; // Tất cả attributes của script (data-widget-id, etc.)
};

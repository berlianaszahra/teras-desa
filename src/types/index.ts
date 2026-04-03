// Tipe-tipe TypeScript terpusat yang diturunkan dari spesifikasi API Teras Desa.

export interface ApiResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type UserRole = 'citizen' | 'admin';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePictureUrl?: string;
  role: UserRole;
}

export interface AuthToken {
  token: string;
}

export interface RegisterPayload {
  username: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type ProjectStatus = 'perencanaan' | 'berjalan' | 'selesai';
export type TimelineStatus = 'selesai' | 'diproses' | 'belum';

export interface ProjectListItem {
  id: string;
  title: string;
  location: string;
  totalBudget: string; // Anggaran dikirim sebagai string BigInt oleh API
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate: string;
  images: string[];
}

export interface Timeline {
  id?: string;
  stageName: string;
  stageDate: string;
  status: TimelineStatus;
}

export interface Expense {
  id?: string;
  expenseName: string;
  amount: string; // Jumlah dikirim sebagai string BigInt oleh API
  percentage: string;
}

export interface ProjectUpdate {
  id: string;
  progress: number;
  description: string;
  createdAt: string;
}

export interface CommentAuthor {
  id: string;
  name: string;
  username: string;
}

export interface Comment {
  id: string;
  comment: string;
  isAnonymous: boolean;
  createdAt: string;
  // Penulis berupa objek saat komentar publik; berupa string tersamar (mis. "B***") saat anonim.
  author: CommentAuthor | string;
}

export interface ProjectDetail extends ProjectListItem {
  description: string;
  timelines: Timeline[];
  expenses: Expense[];
  updates: ProjectUpdate[];
  comments: Comment[];
}

// Payload untuk POST /projects menggunakan format snake_case sesuai kebutuhan API.
export interface TimelinePayload {
  stage_name: string;
  stage_date: string;
  status: TimelineStatus;
}

export interface ExpensePayload {
  expense_name: string;
  amount: number;
  percentage: number;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  location: string;
  total_budget: number;
  start_date: string;
  end_date: string;
  status: ProjectStatus | string;
  timeline?: TimelinePayload[];
  expenses?: ExpensePayload[];
}

export interface ProjectListParams {
  search?: string;
  tahun?: string;
  page?: number;
  limit?: number;
}

export type ReportStatus = 'diterima' | 'diproses' | 'selesai';

export interface ReportListItem {
  id: string;
  title: string;
  location: string;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  images: string[];
  user: {
    name: string;
    username: string;
  };
  project?: {
    id: string;
    title: string;
  };
}

export interface ReportDetail extends ReportListItem {
  description: string;
  user: {
    id: string;
    name: string;
    username: string;
    phoneNumber: string;
  };
  verifier?: {
    id: string;
    name: string;
  };
}

export interface ReportListParams {
  status?: ReportStatus;
  page?: number;
  limit?: number;
}

export interface CreateReportPayload {
  title: string;
  description: string;
  location: string;
  project_id?: string;
  images?: File[];
}

export interface DashboardStats {
  total_budget: string; // Anggaran dikirim sebagai string BigInt oleh API
  reports: {
    total: number;
    unprocessed: number;
  };
  projects: {
    total: number;
    active: number;
    finished: number;
  };
}

export interface ReportPieBreakdown {
  status: ReportStatus;
  count: number;
  percentage: number;
}

export interface ReportsPieData {
  total: number;
  breakdown: ReportPieBreakdown[];
}

export interface AddCommentPayload {
  comment: string;
  is_anonymous: boolean;
}

export interface UpdateProfilePayload {
  name?: string;
  username?: string;
  email?: string;
  phone_number?: string;
}

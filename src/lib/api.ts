import type {
  ApiResponse,
  PaginatedResponse,
  User,
  AuthToken,
  RegisterPayload,
  LoginPayload,
  ProjectListItem,
  ProjectDetail,
  ProjectListParams,
  CreateProjectPayload,
  ProjectUpdate,
  Comment,
  AddCommentPayload,
  ReportListItem,
  ReportDetail,
  ReportListParams,
  CreateReportPayload,
  ReportStatus,
  DashboardStats,
  ReportsPieData,
  UpdateProfilePayload,
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

// Mengambil JWT dari localStorage; mengembalikan null saat dijalankan di sisi server.
function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Membuat header fetch; menghilangkan Content-Type untuk multipart agar browser bisa menetapkan boundary-nya sendiri.
function buildHeaders(includeAuth = true, isFormData = false): HeadersInit {
  const headers: Record<string, string> = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';
  if (includeAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// Melempar Error dengan pesan dari server jika respons non-2xx; jika berhasil, mengembalikan JSON yang sudah diparse.
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `HTTP Error ${res.status}`;
    try {
      const body = await res.json();
      if (typeof body.errors === 'string') message = body.errors;
      else if (Array.isArray(body.errors) && body.errors[0]?.message) message = body.errors[0].message;
      else if (body.message) message = body.message;
    } catch {
      // Gagal parse JSON — gunakan pesan error HTTP default
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

// Mengubah objek params menjadi query string, melewati nilai undefined dan string kosong.
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== '') searchParams.set(key, String(val));
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

// Auth

export async function register(payload: RegisterPayload): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: buildHeaders(false),
    body: JSON.stringify(payload),
  });
  return handleResponse<ApiResponse<User>>(res);
}

export async function login(payload: LoginPayload): Promise<ApiResponse<AuthToken>> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: buildHeaders(false),
    body: JSON.stringify(payload),
  });
  return handleResponse<ApiResponse<AuthToken>>(res);
}

// Menukar access token Google OAuth dengan JWT milik aplikasi.
export async function loginWithGoogle(idToken: string): Promise<ApiResponse<AuthToken>> {
  const res = await fetch(`${BASE_URL}/users/google-login`, {
    method: 'POST',
    headers: buildHeaders(false),
    body: JSON.stringify({ idToken }),
  });
  return handleResponse<ApiResponse<AuthToken>>(res);
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/users/current`, {
    headers: buildHeaders(true),
  });
  return handleResponse<ApiResponse<User>>(res);
}

// Mengunggah foto profil baru sebagai multipart/form-data dan mengembalikan URL hasil unggahan.
export async function updateProfilePicture(imageFile: File): Promise<ApiResponse<{ profilePictureUrl: string }>> {
  const formData = new FormData();
  formData.append('image', imageFile);
  const res = await fetch(`${BASE_URL}/users/profile-picture`, {
    method: 'PATCH',
    headers: buildHeaders(true, true),
    body: formData,
  });
  return handleResponse<ApiResponse<{ profilePictureUrl: string }>>(res);
}

// Memperbarui informasi profil pengguna (nama, username, email, phone).
export async function updateProfile(payload: UpdateProfilePayload): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'PATCH',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });
  return handleResponse<ApiResponse<User>>(res);
}

// Proyek

export async function createProject(payload: CreateProjectPayload): Promise<ApiResponse<ProjectDetail>> {
  const res = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });
  return handleResponse<ApiResponse<ProjectDetail>>(res);
}

export async function getProjects(params: ProjectListParams = {}): Promise<PaginatedResponse<ProjectListItem>> {
  const qs = buildQueryString(params as Record<string, string | number | undefined>);
  const res = await fetch(`${BASE_URL}/projects${qs}`, {
    headers: buildHeaders(false),
  });
  return handleResponse<PaginatedResponse<ProjectListItem>>(res);
}

export async function getProjectById(id: string): Promise<ApiResponse<ProjectDetail>> {
  const res = await fetch(`${BASE_URL}/projects/${id}`, {
    headers: buildHeaders(false),
  });
  return handleResponse<ApiResponse<ProjectDetail>>(res);
}

export async function getProjectComments(projectId: string): Promise<ApiResponse<Comment[]>> {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/comments`, {
    headers: buildHeaders(false),
  });
  return handleResponse<ApiResponse<Comment[]>>(res);
}

export async function addComment(projectId: string, payload: AddCommentPayload): Promise<ApiResponse<Comment>> {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/comments`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });
  return handleResponse<ApiResponse<Comment>>(res);
}

export async function updateProjectProgress(
  projectId: string,
  payload: { progress: number; description: string }
): Promise<ApiResponse<{ message: string }>> {
  const res = await fetch(`${BASE_URL}/projects/${projectId}/updates`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(payload),
  });
  return handleResponse<ApiResponse<{ message: string }>>(res);
}

// Laporan

// Mengirim laporan warga sebagai multipart/form-data untuk mendukung lampiran gambar opsional.
export async function createReport(payload: CreateReportPayload): Promise<ApiResponse<ReportListItem>> {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('location', payload.location);
  if (payload.project_id) formData.append('project_id', payload.project_id);
  if (payload.images) payload.images.forEach((file) => formData.append('images', file));
  const res = await fetch(`${BASE_URL}/reports`, {
    method: 'POST',
    headers: buildHeaders(true, true),
    body: formData,
  });
  return handleResponse<ApiResponse<ReportListItem>>(res);
}

export async function getReports(params: ReportListParams = {}): Promise<PaginatedResponse<ReportListItem>> {
  const qs = buildQueryString(params as Record<string, string | number | undefined>);
  const res = await fetch(`${BASE_URL}/reports${qs}`, {
    headers: buildHeaders(true),
  });
  return handleResponse<PaginatedResponse<ReportListItem>>(res);
}

export async function getMyReports(): Promise<ApiResponse<ReportListItem[]>> {
  const res = await fetch(`${BASE_URL}/reports/me`, {
    headers: buildHeaders(true),
  });
  return handleResponse<ApiResponse<ReportListItem[]>>(res);
}

export async function getReportById(id: string): Promise<ApiResponse<ReportDetail>> {
  const res = await fetch(`${BASE_URL}/reports/${id}`, {
    headers: buildHeaders(true),
  });
  return handleResponse<ApiResponse<ReportDetail>>(res);
}

export async function updateReportStatus(
  id: string,
  status: ReportStatus
): Promise<ApiResponse<{ id: string; status: ReportStatus; verifiedBy: string; updatedAt: string }>> {
  const res = await fetch(`${BASE_URL}/reports/${id}/status`, {
    method: 'PATCH',
    headers: buildHeaders(true),
    body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}

// Statistik

// Respons statistik di-cache selama 60 detik di konteks Next.js SSR agar tidak membebani API di setiap request.
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  const res = await fetch(`${BASE_URL}/statistics/dashboard`, {
    headers: buildHeaders(false),
    next: { revalidate: 60 },
  } as RequestInit);
  return handleResponse<ApiResponse<DashboardStats>>(res);
}

export async function getReportsPie(): Promise<ApiResponse<ReportsPieData>> {
  const res = await fetch(`${BASE_URL}/statistics/reports-pie`, {
    headers: buildHeaders(false),
    next: { revalidate: 60 },
  } as RequestInit);
  return handleResponse<ApiResponse<ReportsPieData>>(res);
}

// Utilitas

// Mengubah angka BigInt yang diserialkan menjadi string Rupiah yang mudah dibaca, dengan opsi singkatan (mis. "Rp 1,3 M").
export function formatRupiah(value: string | number, abbreviated = false): string {
  const num = typeof value === 'string' ? Number(value) : value;
  if (abbreviated) {
    if (num >= 1_000_000_000) return `Rp ${(num / 1_000_000_000).toFixed(1).replace('.', ',')} M`;
    if (num >= 1_000_000) return `Rp ${(num / 1_000_000).toFixed(0)} Jt`;
  }
  return `Rp ${num.toLocaleString('id-ID')}`;
}

export const PROJECT_STATUS_LABEL: Record<string, string> = {
  perencanaan: 'Perencanaan',
  berjalan: 'Berjalan',
  selesai: 'Selesai',
};

export const REPORT_STATUS_LABEL: Record<string, string> = {
  diterima: 'Diterima',
  diproses: 'Diproses',
  selesai: 'Selesai',
};
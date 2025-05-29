// ailabApi.ts

// Supported effect types
export type EffectType =
  | "filter"
  | "hairstyle"
  | "smile"
  | "retouch"
  | "lipcolor"
  | "tryon"
  | "enhance"
  | "swap";

// API URL mapping
const API_ENDPOINTS: Record<EffectType, string> = {
  filter: "https://www.ailabapi.com/api/portrait/effects/face-filter",
  hairstyle:
    "https://www.ailabapi.com/api/portrait/effects/hairstyle-editor-pro",
  smile: "https://www.ailabapi.com/api/portrait/effects/emotion-editor",
  retouch: "https://www.ailabapi.com/api/portrait/effects/smart-beauty",
  lipcolor: "https://www.ailabapi.com/api/portrait/effects/lips-color-changer",
  tryon: "https://www.ailabapi.com/api/portrait/editing/try-on-clothes-pro",
  enhance: "https://www.ailabapi.com/api/portrait/effects/enhance-face",
  swap: "https://www.ailabapi.com/api/portrait/effects/face-attribute-editing",
};

// Insert your API key here
const API_KEY = process.env.AI_LAB_API_KEY;

// === PARAMETER INTERFACES ===

export interface FilterParams {
  resource_type: string;
  strength: string;
}

export interface HairstyleParams {
  task_type: string;
  hair_style: string;
  auto: string;
  color: string;
  image_size: string;
}

export interface SmileParams {
  service_choice: string;
}

export interface RetouchParams {
  multi_face: string;
  beauty_level: string;
  task_type: string;
}

export interface LipColorParams {
  lip_color_infos: string;
}

export interface TryOnParams {
  task_type: string;
  person_image: File;
  top_garment: File;
  bottom_garment: File;
  resolution: string;
  restore_face: string;
}

export interface SwapParams {
  action_type: string;
  quality_control: string;
  face_location: string;
}

export async function applyFilter(
  image: File,
  params: FilterParams
): Promise<string> {
  return sendFormData("filter", { image }, params);
}

export async function applyHairstyle(
  image: File,
  params: HairstyleParams
): Promise<string> {
  return sendFormData("hairstyle", { image }, params);
}

export async function applySmile(
  image_target: File,
  params: SmileParams
): Promise<string> {
  return sendFormData("smile", { image_target }, params);
}

export async function applyRetouch(
  image_target: File,
  params: RetouchParams
): Promise<string> {
  return sendFormData("retouch", { image_target }, params);
}

export async function applyLipColor(
  image: File,
  params: LipColorParams
): Promise<string> {
  return sendFormData("lipcolor", { image }, params);
}

export async function applyTryOn(params: TryOnParams): Promise<string> {
  const formData = new FormData();

  formData.append("task_type", params.task_type);
  formData.append("person_image", params.person_image);
  formData.append("top_garment", params.top_garment);
  formData.append("bottom_garment", params.bottom_garment);
  formData.append("resolution", params.resolution);
  formData.append("restore_face", params.restore_face);

  return sendRequest("tryon", formData);
}

export async function applyEnhance(image: File): Promise<string> {
  return sendFormData("enhance", { image }, {});
}

export async function applySwap(
  image: File,
  params: SwapParams
): Promise<string> {
  return sendFormData("swap", { image }, params);
}

// === GENERIC REQUEST ===

function createFormData(
  files: Record<string, File | string>,
  params: Record<string, string>
): FormData {
  const formData = new FormData();

  // Add files and strings
  Object.entries(files).forEach(([key, value]) => {
    formData.append(key, value);
  });

  Object.entries(params).forEach(([key, value]) => {
    if (!formData.has(key)) {
      formData.append(key, value);
    }
  });

  return formData;
}

async function sendFormData(
  effectType: EffectType,
  files: Record<string, File | string>,
  params: Record<string, string>
): Promise<string> {
  const formData = createFormData(files, params);
  return sendRequest(effectType, formData);
}

async function sendRequest(
  effectType: EffectType,
  formData: FormData
): Promise<string> {
  const response = await fetch(API_ENDPOINTS[effectType], {
    method: "POST",
    headers: {
      "ailabapi-api-key": API_KEY,
    },
    body: formData,
  });

  const data = await response.json();

  if (data.code === 200) {
    return data;
  } else {
    throw new Error("Ошибка обработки изображения");
  }
}

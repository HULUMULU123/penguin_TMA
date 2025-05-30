// Supported effect types

export type EffectType =
  | "filter"
  | "hairstyle"
  | "smile"
  | "retouch"
  | "lipcolor"
  | "tryon"
  | "enhance"
  | "gender"
  | "age";

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
  gender:
    "https://www.ailabapi.com/api/portrait/effects/face-attribute-editing",
  age: "https://www.ailabapi.com/api/portrait/effects/face-attribute-editing",
};

function pickParams<T>(
  params: Record<string, any>,
  keys: (keyof T)[],
  defaults: Partial<T>
): T {
  if (typeof params !== "object" || params === null) {
    params = {};
  }

  const result: Partial<T> = { ...defaults };
  keys.forEach((key) => {
    if (key in params) {
      result[key] = params[key];
    }
  });
  return result as T;
}

// Insert your API key here
const API_KEY = import.meta.env.VITE_AI_LAB_API_KEY;
// const API_KEY = "TEST_API";
// === IMAGE URL TO FILE ===

async function resolveImageInput(
  input: File | string,
  fileName = "image.jpg"
): Promise<File> {
  if (typeof input === "string") {
    const res = await fetch(input);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type || "image/jpeg" });
  }
  return input;
}

// === PARAMETER INTERFACES (без image) ===

export interface FilterParams {
  resource_type: string;
  strength: number;
}

export interface HairstyleParams {
  task_type: string;
  hair_style: string;
  auto: number;
  color: string;
  image_size: number;
}

export interface SmileParams {
  service_choice: number;
}

export interface RetouchParams {
  multi_face: string;
  beauty_level: number;
  task_type: string;
}

export interface LipColorInfo {
  rgba: {
    r: number; // 0–255
    g: number; // 0–255
    b: number; // 0–255
    a: number; // 0–100
  };
  face_rect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface LipColorParams {
  lip_color_infos: LipColorInfo[];
}

export interface TryOnParams {
  person_image: File | string;
  top_garment: File | string;
  bottom_garment: File | string;
  task_type: string;
  resolution: number;
  restore_face: boolean;
}

export interface SwapParams {
  action_type: string;
  quality_control: string;
  target: number;
  // face_location: string;
}

// === EFFECT FUNCTIONS ===

export async function applyFilter(
  image: File | string,
  rangeParam: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  console.log(rawParams, "test");

  const params = pickParams<FilterParams>(
    rawParams,
    ["resource_type", "strength"],
    {
      resource_type: "10001", // по умолчанию можно задать "style" или "filter"
      strength: rangeParam,
    }
  );
  return sendFormData("filter", { image: resolved }, params);
}

export async function applyHairstyle(
  image: File | string,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  const params = pickParams<HairstyleParams>(
    rawParams,
    ["task_type", "hair_style", "auto", "color", "image_size"],
    {
      task_type: "async",
      hair_style: "BuzzCut",
      auto: 1,
      color: "blonde",
      image_size: 1,
    }
  );
  return sendFormData("hairstyle", { image: resolved }, params);
}

export async function applySmile(
  image: File | string,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  const params = pickParams<SmileParams>(rawParams, ["service_choice"], {
    service_choice: 10,
  });
  return sendFormData("smile", { image_target: resolved }, params);
}

export async function applyRetouch(
  image: File | string,
  rangeParam: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  const params = pickParams<RetouchParams>(
    rawParams,
    ["multi_face", "beauty_level", "task_type"],
    {
      multi_face: "1",
      beauty_level: rangeParam,
      task_type: "sync",
    }
  );
  return sendFormData("retouch", { image_target: resolved }, params);
}

export async function applyLipColor(
  image: File | string,
  rgbaValue: any,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  console.log(rgbaValue);
  const defaultInfo = [
    {
      rgba: rgbaValue, // #FF3366, alpha 80%
    },
  ];

  const infos: LipColorInfo[] = Array.isArray(rawParams.lip_color_infos)
    ? rawParams.lip_color_infos.slice(0, 3) // максимум 3 лица
    : defaultInfo;

  const params: LipColorParams = {
    lip_color_infos: infos,
  };

  return sendFormData(
    "lipcolor",
    { image: resolved },
    {
      lip_color_infos: JSON.stringify(params.lip_color_infos),
    }
  );
}

export async function applyTryOn(rawParams: any = {}): Promise<string> {
  const person_image = await resolveImageInput(
    rawParams.person_image,
    "person.jpg"
  );
  const top_garment = await resolveImageInput(rawParams.top_garment, "top.jpg");
  const bottom_garment = await resolveImageInput(
    rawParams.bottom_garment,
    "bottom.jpg"
  );

  const params = pickParams<TryOnParams>(
    rawParams,
    ["task_type", "resolution", "restore_face"],
    {
      task_type: "async",
      resolution: -1,
      restore_face: true,
    }
  );

  const formData = new FormData();
  formData.append("task_type", params.task_type);
  formData.append("person_image", person_image);
  formData.append("top_garment", top_garment);
  formData.append("bottom_garment", bottom_garment);
  formData.append("resolution", params.resolution);
  formData.append("restore_face", params.restore_face);

  return sendRequest("tryon", formData);
}

export async function applyEnhance(image: File | string): Promise<string> {
  const resolved = await resolveImageInput(image);
  return sendFormData("enhance", { image: resolved }, {});
}

export async function applyGender(
  image: File | string,
  gender: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  const params = pickParams<SwapParams>(
    rawParams,
    ["action_type", "quality_control"],
    {
      action_type: "V2_GENDER",
      quality_control: "HIGH",
      target: gender,
      // face_location: "auto",
    }
  );
  return sendFormData("gender", { image: resolved }, params);
}

export async function applyAge(
  image: File | string,
  age: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  const params = pickParams<SwapParams>(
    rawParams,
    ["action_type", "quality_control"],
    {
      action_type: "V2_AGE",
      quality_control: "HIGH",
      target: age,
      // face_location: "auto",
    }
  );
  return sendFormData("age", { image: resolved }, params);
}
// === GENERIC REQUESTS ===

function createFormData(
  files: Record<string, File | string>,
  params: Record<string, string>
): FormData {
  const formData = new FormData();
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
  console.log(data);
  if (data.error_code === 0) {
    return data;
  } else {
    throw new Error("Ошибка обработки изображения");
  }
}

// === FUNCTION MAPPING ===

export const EFFECT_FUNCTIONS: Record<EffectType, Function> = {
  filter: applyFilter,
  hairstyle: applyHairstyle,
  smile: applySmile,
  retouch: applyRetouch,
  lipcolor: applyLipColor,
  tryon: applyTryOn,
  enhance: applyEnhance,
  gender: applyGender,
  age: applyAge,
};

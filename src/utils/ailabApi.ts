// @ts-nocheck
// Типы поддерживаемых эффектов
export type EffectType =
  | "filter"
  | "hairstyle_old"
  | "haircolor"
  | "smile"
  | "retouch"
  | "lipcolor"
  | "tryon"
  | "enhance"
  | "gender"
  | "age"
  | "facebeauty"
  | "hairstyle"
  | "size"
  | "makeup";

// URL API для каждого типа эффекта
const API_ENDPOINTS: Record<EffectType, string> = {
  filter: "https://tgbotface.fun/api/face-filter",
  hairstyle_old: "https://tgbotface.fun/api/hairstyle",
  haircolor: "https://tgbotface.fun/api/hairstyle",
  smile: "https://tgbotface.fun/api/emotion-editor",
  retouch: "https://tgbotface.fun/api/smart-beauty",
  lipcolor: "https://tgbotface.fun/api/lips-color-changer",
  tryon: "https://tgbotface.fun/api/try-on-closes",
  enhance: "https://tgbotface.fun/api/enhance-face",
  gender: "https://tgbotface.fun/api/face-attribute",
  age: "https://tgbotface.fun/api/face-attribute",
  facebeauty: "https://tgbotface.fun/api/face-beauty-pro",
  hairstyle: "https://tgbotface.fun/api/hairstyle-editor",
  size: "https://tgbotface.fun/api/face-beauty-pro",
  makeup: "https://tgbotface.fun/api/face-makeup",
};

function pickParams<T>(
  params: Partial<T>,
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

// Функция для преобразования URL изображения или File в File объект

// Старая функция без проверки размера

// async function resolveImageInput(
//   input: File | string,
//   fileName = "image.jpg"
// ): Promise<File> {
//   if (typeof input === "string") {
//     const res = await fetch(input);
//     const blob = await res.blob();
//     return new File([blob], fileName, { type: blob.type || "image/jpeg" });
//   }
//   return input;
// }

export async function resolveImageInput(
  input: File | string,
  fileName = "image.jpg"
): Promise<File> {
  let file: File;

  // Загрузка из URL, если input - строка
  if (typeof input === "string") {
    const res = await fetch(input);
    if (!res.ok) {
      throw new Error(
        `Не удалось загрузить изображение по URL: ${res.statusText}`
      );
    }
    const blob = await res.blob();
    file = new File([blob], fileName, { type: blob.type || "image/jpeg" });
  } else {
    file = input;
  }

  // Загружаем изображение
  const bitmap = await createImageBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;

  // Проверка минимального размера
  if (width < 200 || height < 200) {
    throw new Error(
      `Изображение слишком маленькое. Минимальное разрешение 200x200, текущее ${width}x${height}`
    );
  }

  // Проверка, является ли файл JPEG
  const isJpeg = file.type === "image/jpeg" || /\.(jpe?g)$/i.test(file.name);

  // Проверка, нужно ли перекодировать или сжимать
  const needResize = width > 1999 || height > 1999;
  const needReencode = !isJpeg || needResize;

  // Если не нужно менять — возвращаем оригинал
  if (!needReencode) return file;

  // Подготовка canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Не удалось получить 2D контекст для canvas");

  // Масштабируем, если нужно
  if (needResize) {
    const scale = Math.min(1999 / width, 1999 / height);
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  // Преобразование в JPEG
  const jpegBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Не удалось конвертировать изображение в JPEG"));
      },
      "image/jpeg",
      0.8
    );
  });
  return new File([jpegBlob], fileName.replace(/\.\w+$/, ".jpg"), {
    type: "image/jpeg",
  });
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

// export async function applyHairstyle(
//   image: File | string,
//   hair_style: string,
//   color: string = "",
//   rawParams: any = {}
// ): Promise<string> {
//   const resolved = await resolveImageInput(image);
//   let params;
//   if (color === "") {
//     params = pickParams<HairstyleParams>(
//       rawParams,
//       ["task_type", "hair_style", "auto", "color", "image_size"],
//       {
//         task_type: "async",
//         hair_style: hair_style,
//         auto: 1,
//         image_size: 1,
//       }
//     );
//   } else {
//     params = pickParams<HairstyleParams>(
//       rawParams,
//       ["task_type", "hair_style", "auto", "color", "image_size"],
//       {
//         task_type: "async",
//         hair_style: hair_style,
//         color: color,
//         auto: 1,
//         image_size: 1,
//       }
//     );
//   }
//   console.log(params);
//   const responseData = await sendFormData(
//     "hairstyle",
//     { image: resolved },
//     params
//   );

//   if (!responseData?.task_id) {
//     throw new Error("task_id не получен от API");
//   }

//   // Дожидаемся результата
//   const resultUrl = await pollAsyncResult(responseData.task_id);
//   return resultUrl;
// }

// export async function applySmile(
//   image: File | string,
//   rawParams: any = {}
// ): Promise<string> {
//   const resolved = await resolveImageInput(image);
//   const params = pickParams<SmileParams>(rawParams, ["service_choice"], {
//     service_choice: 10,
//   });
//   return sendFormData("smile", { image_target: resolved }, params);
// }

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
      rgba: rgbaValue,
    },
  ];

  const infos: LipColorInfo[] = Array.isArray(rawParams.lip_color_infos)
    ? rawParams.lip_color_infos.slice(0, 3) // максимум 3 лица
    : defaultInfo;

  const params: LipColorParams = {
    lip_color_infos: infos,
  };
  console.log(JSON.stringify(params.lip_color_infos));
  return sendFormData(
    "lipcolor",
    { image: resolved },
    {
      lip_color_infos: JSON.stringify(params.lip_color_infos),
    }
  );
}

export async function applyTryOn(
  image: File | string,
  topGarment: File | string,
  rawParams: any = {}
): Promise<string> {
  const person_image = await resolveImageInput(image, "person.jpg");
  const top_garment = await resolveImageInput(topGarment, "top.jpg");
  // const bottom_garment = await resolveImageInput(
  //   rawParams.bottom_garment,
  //   "bottom.jpg"
  // );

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

  formData.append("resolution", params.resolution);
  formData.append("restore_face", params.restore_face);

  return sendRequest("tryon", formData);
}

export async function applyEnhance(image: File | string): Promise<string> {
  const resolved = await resolveImageInput(image);
  console.log(resolved);
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
// ----------Новая версия ---------------------------
export async function applyFaceBeautyFilter(
  image: File | string,
  field: string,
  rangeParam: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  console.log(field, rangeParam);
  const params = {
    [field]: rangeParam, // динамический ключ
  };
  console.log(params, "params in facebeauty");
  return sendFormData("facebeauty", { image: resolved }, params);
}

export async function applyHairstyle(
  image: File | string,
  hair_type: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  console.log(hair_type);
  const params = {
    hair_type: hair_type, // динамический ключ
  };
  console.log(params, "params in hair");
  return sendFormData("hairstyle", { image: resolved }, params);
}

export async function applySize(
  image: File | string,
  field: string,
  rangeParam: number,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  console.log(field, rangeParam);
  const params = {
    [field]: rangeParam, // динамический ключ
  };
  console.log(params, "params in size");
  return sendFormData("facebeauty", { image: resolved }, params);
}

export async function applySmile(
  image: File | string,
  rawParams: any = {}
): Promise<string> {
  const resolved = await resolveImageInput(image);
  const params = pickParams<SmileParams>(rawParams, ["service_choice"], {
    service_choice: 10,
  });
  console.log(params, "smile");
  return sendFormData("smile", { image_target: resolved }, params);
}

export async function applyMakeup(
  image: File | string,
  resource_type: string,
  strength: number
) {
  const resolved = await resolveImageInput(image);
  const params = { resource_type: resource_type, strength };
  console.log(params, "makeup");
  return sendFormData("makeup", { image: resolved }, params);
}

export async function applyFace(
  image: File | string,
  shape_type: string,
  strength: number
) {
  const resolved = await resolveImageInput(image);
  const params = { shape_type: shape_type, strength };
  console.log(params, "face");
  return sendFormData("face", { image: resolved }, params);
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
  const token = sessionStorage.getItem("token");
  const response = await fetch(API_ENDPOINTS[effectType], {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
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

async function pollAsyncResult(taskId: string): Promise<string> {
  const MAX_ATTEMPTS = 20;
  const DELAY_MS = 3000;
  const token = sessionStorage.getItem("token");

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const res = await fetch(
      `https://tgbotface.fun/api/result?task_id=${taskId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();
    console.log("Результат опроса:", data);

    if (data?.task_status === 2 && data?.data?.images?.length > 0) {
      return data;
    }

    // fallback: если нет data.images, но есть direct result
    if (data?.image_url) {
      return data;
    }

    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  }

  throw new Error("Время ожидания результата истекло");
}

// === FUNCTION MAPPING ===

export const EFFECT_FUNCTIONS: Record<EffectType, Function> = {
  filter: applyFilter,
  hairstyle: applyHairstyle,
  haircolor: applyHairstyle,
  smile: applySmile,
  retouch: applyRetouch,
  lipcolor: applyLipColor,
  tryon: applyTryOn,
  enhance: applyEnhance,
  gender: applyGender,
  age: applyAge,
  facebeauty: applyFaceBeautyFilter,
  size: applySize,
  makeup: applyMakeup,
  face: applyFace,
};

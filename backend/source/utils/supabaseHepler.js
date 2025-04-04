
import { supabase } from "./supabase.js";

export const uploadPhoto = async(file) => {
    const buffer = Buffer.from(file, "base64");
    const { data, error } = await supabase.storage.from("photo").upload(`tes_${Date.now()}_tis`, buffer, {
        contentType: ["image/jpeg", "image/png"],
        upsert: true
    });
    if (error) throw new Error("Ошибка загрузки фото");
    return getUrlPhoto(data.path);;
};

export const getUrlPhoto = async(filename) => {
    const { error, data } = supabase.storage.from("photo").getPublicUrl(filename);
    if (error) throw new Error("Ошибка загрузки фото");
    else return data.publicUrl;
};
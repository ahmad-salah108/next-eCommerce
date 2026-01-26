import { createClient } from "@/lib/supabase/server";

type Props = {
  file: File;
  oldImageUrl?: string;
  table: string;
  path: string;
};

export async function uploadImage({ file, oldImageUrl, table, path }: Props) {
  const supabase = await createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(table)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error(uploadError);
    throw uploadError;
  }

  // DELETE old image on update
  if (oldImageUrl) {
    const path = oldImageUrl.split(`/${table}/`)[1];
    await supabase.storage.from(table).remove([path]);
  }

  // Return new image
  const { data } = supabase.storage.from(table).getPublicUrl(filePath);
  return data.publicUrl;
}

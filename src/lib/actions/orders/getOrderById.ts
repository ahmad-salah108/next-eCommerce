"use server"
import { Order } from "@/types/Order";
import { createClient } from "../../supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function getOrderById(id: string) {
  const supabase = await createClient();

  const {
    data: order,
    error,
  }: { data: Order | null; error: PostgrestError | null } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error)
    throw error
  }

  return order;
}

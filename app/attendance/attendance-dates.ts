import { createClient } from "../utils/supabase";

export async function getAttendanceDates(supabase: Awaited<ReturnType<typeof createClient>>): Promise<string[]> {
  const attendanceDates: string[] = [];
  let lastDate: string | null = null;

  while (true) {
    let query = supabase
      .from("attendance_dates")
      .select("attendance_date")
      .order("attendance_date", { ascending: true })
      .limit(1000);

    if (lastDate) {
      query = query.gt("attendance_date", lastDate);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error al consultar fechas de asistencia:", error);
      throw new Error("No se pudieron consultar las fechas de asistencia.");
    }
    if (!data) {
      throw new Error("La consulta de fechas de asistencia no devolvió datos.");
    }
    if (data.length === 0) return attendanceDates;

    attendanceDates.push(...data.map((row) => row.attendance_date));
    lastDate = data[data.length - 1].attendance_date;
  }
}

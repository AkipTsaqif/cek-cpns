import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Formasi, JenjangPendidikanMenu } from '@/lib/types'
import { ColumnDef } from "@tanstack/react-table"
import { getFormasi } from "./actions";
import MainComponent from "@/components/client/MainComponent";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const urlParams = new URLSearchParams(searchParams);

  const { data: tingkat_pendidikan, error } = await supabase.from('distinct_jenjang_pendidikan').select('*');

  const jenjang =  urlParams.get('jenjang') || "";
  const jurusan = urlParams.get('jurusan') || "";

  let formasiAwal: any[] = []
  if (jenjang !== "" && jurusan !== "") {
    const { data, error } = await supabase
        .from('sscasn_pendidikan')
        .select('cepat_kode, nama')
        .eq('jenjang_pendidikan', jenjang)
        .ilike('nama', `%${jurusan}%`);

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      formasiAwal = data;
    }
  } else {
    console.log('Jenjang or Jurusan is empty');
  }

  const formasi = formasiAwal ? await Promise.all(formasiAwal.map(item => getFormasi(item.cepat_kode))) : [];
  const formasiDetail = formasi.filter(item => item.length !== 0).map(item => item.data).flat();

  console.log(formasi);

  return (
    <div className="flex flex-col p-6 gap-3">
      <h1 className="text-2xl font-bold">Cek Formasi CPNS {new Date().getFullYear()}</h1>
      <MainComponent tingkat_pendidikan={tingkat_pendidikan || []} data={formasiDetail} />
    </div>
  );
}

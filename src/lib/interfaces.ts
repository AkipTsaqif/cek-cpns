import { JenjangPendidikanMenu, Formasi } from '@/lib/types';
import { ColumnDef } from "@tanstack/react-table";

export interface Pendidikan {
    id: number;
    cepat_kode: string;
    nama: string;
    tingkat_pendidikan_id: string;
    jenjang_pendidikan: string;
}

export interface MainComponentProps {
    tingkat_pendidikan: JenjangPendidikanMenu[];
    data: Formasi[];
}
export type Formasi = {
    formasi_id: string;
    ins_nm: string;
    jp_nama: string;
    formasi_nm: string;
    jabatan_nm: string;
    lokasi_nm: string;
    jumlah_formasi: number;
    disable: number;
    gaji_min: number;
    gaji_max: number;
}

export type JenjangPendidikanMenu = {
    tingkat_pendidikan_id: string | null;
    jenjang_pendidikan: string | null;
}
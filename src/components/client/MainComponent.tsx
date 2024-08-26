"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Formasi, JenjangPendidikanMenu } from "@/lib/types";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MainComponentProps } from "@/lib/interfaces";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";

const columns: ColumnDef<Formasi>[] = [
    {
        accessorKey: "ins_nm",
        header: "Institusi",
        size: 100,
    },
    {
        accessorKey: "jp_nama",
        header: "Jenis",
        meta: {
            align: "center",
        },
        size: 40,
    },
    {
        accessorKey: "formasi_nm",
        header: "Formasi",
        meta: {
            align: "center",
        },
        size: 100,
    },
    {
        accessorKey: "jabatan_nm",
        header: "Jabatan",
        size: 100,
    },
    {
        accessorKey: "lokasi_nm",
        header: "Lokasi",
        size: 400,
    },
    {
        accessorKey: "jumlah_formasi",
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center hover:bg-neutral-200 px-2 cursor-pointer rounded-sm font-bold"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    <span>Jumlah Formasi</span>
                </div>
            );
        },
        meta: {
            align: "center",
        },
        size: 70,
    },
    {
        accessorKey: "gaji_min",
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center hover:bg-neutral-200 px-2 cursor-pointer rounded-sm font-extrabold"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    <span>Gaji Min</span>
                </div>
            );
        },
        size: 55,
        meta: {
            align: "center",
        },
        cell: (row) => {
            const value = row.getValue() as number;
            return `${(value / 1000000).toFixed(2)} Juta`;
        },
    },
    {
        accessorKey: "gaji_max",
        header: ({ column }) => {
            return (
                <div
                    className="flex items-center hover:bg-neutral-200 px-2 cursor-pointer rounded-sm font-bold"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    <span>Gaji Max</span>
                </div>
            );
        },
        size: 55,
        meta: {
            align: "center",
        },
        cell: (row) => {
            const value = row.getValue() as number;
            return `${(value / 1000000).toFixed(2)} Juta`;
        },
    },
    {
        accessorKey: "disable",
        header: "Khusus Disabilitas?",
        size: 50,
        cell: (row) => (row.getValue() === 1 ? "Ya" : "Tidak"),
    },
];

const MainComponent: React.FC<MainComponentProps> = ({
    tingkat_pendidikan,
    data,
}) => {
    const [selectedJenjang, setSelectedJenjang] = useState<string>("");
    const { replace } = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const [tempJurusan, setTempJurusan] = useState<string>(
        searchParams.get("jurusan") || ""
    );

    const handleJenjangChange = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value === "-") {
            params.delete("jenjang");
        } else {
            params.set("jenjang", value);
        }

        replace(`${pathName}?${params.toString()}`);
    };

    const handleJurusanChange = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const params = new URLSearchParams(searchParams);

        if (event.key === "Enter") {
            params.set("jurusan", event.currentTarget.value);
        }

        replace(`${pathName}?${params.toString()}`);
    };

    const handleTempJurusanChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTempJurusan(event.target.value);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)]">
            <div className="flex gap-4 w-1/2">
                <div className="w-1/3">
                    <Label>Pilih Jenjang</Label>
                    <Select
                        value={searchParams.get("jenjang")!}
                        onValueChange={handleJenjangChange}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Jenjang Pendidikan" />
                        </SelectTrigger>
                        <SelectContent>
                            {tingkat_pendidikan ? (
                                tingkat_pendidikan.map((item) => (
                                    <SelectItem
                                        key={item.tingkat_pendidikan_id}
                                        value={
                                            item.jenjang_pendidikan
                                                ? item.jenjang_pendidikan
                                                : ""
                                        }
                                    >
                                        {item.jenjang_pendidikan}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem key="0" value="-">
                                    Tidak ada data
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-2/3">
                    <Label htmlFor="jurusan">Filter Jurusan</Label>
                    <Input
                        id="jurusan"
                        placeholder="Filter jurusan"
                        value={tempJurusan}
                        onKeyDown={handleJurusanChange}
                        onChange={handleTempJurusanChange}
                    />
                </div>
            </div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default MainComponent;

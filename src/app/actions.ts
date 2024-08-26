"use server"

export async function getFormasi(code: string | null) {
    const res = await fetch(`https://api-sscasn.bkn.go.id/2024/portal/spf?kode_ref_pend=${code}&offset=0`, {
        headers: {
            Origin: "https://sscasn.bkn.go.id",
        }
    })
    const data = await res.json();
    return await data.data;
}